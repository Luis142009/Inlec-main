import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import fondo16 from "../assets/fondo16.webm";
import caminando16 from "../assets/caminando16.webm";

import "../stylesheets/Escena16.css";


// Al terminar la caminata (la familia sale de la cueva) pasa a la escena 20
const AVANZAR_AL_TERMINAR = true;
const ESCENA_SIGUIENTE = 20;

// Teclas que hacen avanzar a la familia (mantenerlas presionadas)
const TECLAS_AVANZAR = ["d", "arrowright"];

// Si el fondo se desfasa más de esto (segundos) del video de la familia,
// se vuelve a sincronizar
const DESFASE_MAXIMO = 0.08;


// =========================================================
// ESCENA 19  (componente Escena16)
// =========================================================
// Los dos videos (fondo y familia caminando) duran 12 s y van
// sincronizados. Mientras se mantiene presionada D (o la flecha →)
// los dos avanzan; al soltar la tecla se detienen.

export const Escena16 = forwardRef(
  ({ cambiarEscena }, ref) => {

    // =======================================================
    // REFS Y ESTADO
    // =======================================================

    const fondo16Ref = useRef(null);
    const caminando16Ref = useRef(null);

    const pausadoRef = useRef(false);
    const terminadaRef = useRef(false);
    const avanzandoRef = useRef(false);
    const rafRef = useRef(null);

    // El aviso desaparece cuando se presiona la tecla por primera vez
    const [avisoVisible, setAvisoVisible] = useState(true);


    // =======================================================
    // MOVER / DETENER LA ANIMACIÓN
    // =======================================================

    const sincronizarFondo = () => {

      const fondo = fondo16Ref.current;
      const caminando = caminando16Ref.current;

      if (!fondo || !caminando) {
        return;
      }

      if (
        Math.abs(fondo.currentTime - caminando.currentTime) >
        DESFASE_MAXIMO
      ) {
        fondo.currentTime = caminando.currentTime;
      }

    };


    const vigilarSincronia = () => {

      sincronizarFondo();

      if (avanzandoRef.current) {
        rafRef.current = requestAnimationFrame(vigilarSincronia);
      }

    };


    const avanzar = () => {

      if (
        avanzandoRef.current ||
        pausadoRef.current ||
        terminadaRef.current
      ) {
        return;
      }

      avanzandoRef.current = true;

      setAvisoVisible(false);

      [fondo16Ref.current, caminando16Ref.current]
        .filter(Boolean)
        .forEach((video) => {
          video.play().catch(() => {});
        });

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(vigilarSincronia);

    };


    const detener = () => {

      avanzandoRef.current = false;

      cancelAnimationFrame(rafRef.current);

      [fondo16Ref.current, caminando16Ref.current]
        .filter(Boolean)
        .forEach((video) => {
          video.pause();
        });

      sincronizarFondo();

    };


    // =======================================================
    // TECLADO
    // =======================================================

    useEffect(() => {

      const esTeclaAvanzar = (event) =>
        TECLAS_AVANZAR.includes(event.key.toLowerCase());

      const teclaPresionada = (event) => {

        if (!esTeclaAvanzar(event)) {
          return;
        }

        event.preventDefault();

        avanzar();

      };

      const teclaSoltada = (event) => {

        if (!esTeclaAvanzar(event)) {
          return;
        }

        event.preventDefault();

        detener();

      };

      // Si la ventana pierde el foco con la tecla presionada,
      // no se queda avanzando sola
      const perdioFoco = () => detener();

      window.addEventListener("keydown", teclaPresionada);
      window.addEventListener("keyup", teclaSoltada);
      window.addEventListener("blur", perdioFoco);

      return () => {
        window.removeEventListener("keydown", teclaPresionada);
        window.removeEventListener("keyup", teclaSoltada);
        window.removeEventListener("blur", perdioFoco);
        cancelAnimationFrame(rafRef.current);
      };

    }, []);


    // =======================================================
    // FIN DE LA ESCENA
    // =======================================================

    const alTerminar = () => {

      if (terminadaRef.current) {
        return;
      }

      terminadaRef.current = true;
      avanzandoRef.current = false;

      if (AVANZAR_AL_TERMINAR && cambiarEscena) {
        cambiarEscena(ESCENA_SIGUIENTE);
      }

    };


    // =======================================================
    // PAUSAR / REANUDAR (botón de pausa de la interfaz)
    // =======================================================
    // Mientras está en pausa las teclas no hacen nada. Al reanudar,
    // la animación solo se mueve si se vuelve a presionar la tecla.

    const pausarTodo = () => {

      pausadoRef.current = true;

      detener();

    };


    const reanudarTodo = () => {

      pausadoRef.current = false;

    };


    // =======================================================
    // EXPONER FUNCIONES
    // =======================================================

    useImperativeHandle(ref, () => ({

      pausarTodo,

      reanudarTodo

    }));


    // =======================================================
    // RETURN
    // =======================================================

    return (

      <div className="escena16-wrapper">

        <div className="escena16">

          {/* FONDO (la cueva) */}

          <video
            ref={fondo16Ref}
            className="fondo16"
            muted
            playsInline
            preload="auto"
          >
            <source src={fondo16} type="video/webm" />
          </video>


          {/* FAMILIA FOX CAMINANDO */}

          <video
            ref={caminando16Ref}
            className="caminando16"
            muted
            playsInline
            preload="auto"
            onEnded={alTerminar}
          >
            <source src={caminando16} type="video/webm" />
          </video>

        </div>


        {/* AVISO */}

        {avisoVisible && (

          <div className="noticia-objetos">

            Ayuda a la familia Fox a salir de la cueva
            manteniendo presionada la tecla D o la flecha →

          </div>

        )}

      </div>

    );

  }
);