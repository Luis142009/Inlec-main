import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import fondo20 from "../assets/fondo21.webm";
import multi20 from "../assets/ash21.webm";
import fox20 from "../assets/fox21.webm";

import "../stylesheets/Escena20.css";


// Pasar a la siguiente escena cuando termine el video
const AVANZAR_AL_TERMINAR = false;
const ESCENA_SIGUIENTE = 24;

// Teclas que hacen avanzar al Sr. Fox (mantenerlas presionadas)
// A y la flecha izquierda. Si quieres D / → cambia esta línea.
const TECLAS_AVANZAR = ["a", "arrowleft"];

// Si un video se desfasa más de esto (segundos) del Sr. Fox,
// se vuelve a sincronizar
const DESFASE_MAXIMO = 0.08;

// Duración de los videos (segundos)
const DURACION = 12;


// =========================================================
// ESCENA 23 (componente Escena20) - INTERACTIVA
//
// Misma lógica que la Escena16:
// mientras se mantiene presionada la tecla, los 3 videos
// (fondo, multi y Sr. Fox) avanzan; al soltarla se detienen.
// La cámara está atada al tiempo del Sr. Fox.
// =========================================================

export const Escena20 = forwardRef(
  ({ cambiarEscena }, ref) => {

    // =======================================================
    // REFS Y ESTADO
    // =======================================================

    const escenaRef = useRef(null);

    const fondoRef = useRef(null);
    const multiRef = useRef(null);
    const foxRef = useRef(null);

    const camaraTlRef = useRef(null);

    const pausadoRef = useRef(false);
    const terminadaRef = useRef(false);
    const avanzandoRef = useRef(false);
    const rafRef = useRef(null);

    const [avisoVisible, setAvisoVisible] = useState(true);


    const obtenerMedios = () =>
      [fondoRef.current, multiRef.current, foxRef.current]
        .filter(Boolean);


    // =======================================================
    // CÁMARA (tiempos en segundos del video, 0 a 12)
    // =======================================================

    const crearCamara = () => {

      const escena = escenaRef.current;

      if (!escena) {
        return null;
      }

      gsap.set(escena, {
        scale: 1,
        x: 0,
        y: 0,
        transformOrigin: "50% 50%"
      });

      const tl = gsap.timeline({ paused: true });

      // 1) Zoom inicial (0 s -> 3 s)
      tl.to(escena, {
        scale: 1.3, x: 0, y: 0,
        duration: 3, ease: "power2.inOut"
      }, 0);

      // 2) Nos vamos a la derecha (3 s -> 6.5 s)
      tl.to(escena, {
        scale: 1.3, x: -120, y: 0,
        duration: 3.5, ease: "power2.inOut"
      }, 3);

      // 3) Regresamos al medio (6.5 s -> 9 s)
      tl.to(escena, {
        scale: 1.3, x: 0, y: 0,
        duration: 2.5, ease: "power2.inOut"
      }, 6.5);

      // 4) Subimos (9 s -> 12 s)
      tl.to(escena, {
        scale: 1.3, x: 0, y: 60,
        duration: 3, ease: "power2.inOut"
      }, 9);

      return tl;

    };


    // =======================================================
    // SINCRONIZAR (fondo y multi siguen al Sr. Fox;
    // la cámara sigue el tiempo del Sr. Fox)
    // =======================================================

    const sincronizar = () => {

      const fox = foxRef.current;

      if (!fox) {
        return;
      }

      [fondoRef.current, multiRef.current]
        .filter(Boolean)
        .forEach((video) => {

          if (
            Math.abs(video.currentTime - fox.currentTime) >
            DESFASE_MAXIMO
          ) {
            video.currentTime = fox.currentTime;
          }

        });

      camaraTlRef.current?.time(
        Math.min(fox.currentTime, DURACION)
      );

    };


    const vigilar = () => {

      sincronizar();

      if (avanzandoRef.current) {
        rafRef.current = requestAnimationFrame(vigilar);
      }

    };


    // =======================================================
    // AVANZAR / DETENER
    // =======================================================

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

      obtenerMedios().forEach((video) => {
        video.play().catch(() => {});
      });

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(vigilar);

    };


    const detener = () => {

      avanzandoRef.current = false;

      cancelAnimationFrame(rafRef.current);

      obtenerMedios().forEach((video) => {
        video.pause();
      });

      sincronizar();

    };


    // =======================================================
    // CÁMARA: se crea al entrar y se limpia al salir
    // =======================================================

    useEffect(() => {

      camaraTlRef.current = crearCamara();

      return () => {

        camaraTlRef.current?.kill();

        cancelAnimationFrame(rafRef.current);

        obtenerMedios().forEach((medio) => {
          try {
            medio.pause();
          } catch {}
        });

      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
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

      cancelAnimationFrame(rafRef.current);

      obtenerMedios().forEach((video) => {
        video.pause();
      });

      if (AVANZAR_AL_TERMINAR && cambiarEscena) {
        cambiarEscena(ESCENA_SIGUIENTE);
      }

    };


    // =======================================================
    // PAUSAR / REANUDAR (botón de pausa de la interfaz)
    // =======================================================

    const pausarTodo = () => {

      pausadoRef.current = true;

      detener();

    };


    const reanudarTodo = () => {

      pausadoRef.current = false;

    };


    useImperativeHandle(ref, () => ({

      pausarTodo,

      reanudarTodo

    }));


    // =======================================================
    // RETURN
    // =======================================================

    return (

      <div className="escena20-wrapper">

        <div className="escena20">

          {/* CÁMARA: todo lo que está dentro se mueve junto */}
          <div ref={escenaRef} className="camara20">

            <video
              ref={fondoRef}
              className="fondo20c"
              muted
              playsInline
              preload="auto"
            >
              <source src={fondo20} type="video/webm" />
            </video>

            <video
              ref={multiRef}
              className="multi20c"
              muted
              playsInline
              preload="auto"
            >
              <source src={multi20} type="video/webm" />
            </video>

            {/* SR. FOX */}
            <video
              ref={foxRef}
              className="srfox20c"
              muted
              playsInline
              preload="auto"
              onEnded={alTerminar}
            >
              <source src={fox20} type="video/webm" />
            </video>

          </div>

        </div>


        {/* AVISO */}

        {avisoVisible && (

          <div className="noticia-objetos">

            Ayuda al Sr. fox a reconciliarse con Ash
            manteniendo presionada la tecla A o la flecha ←

          </div>

        )}

      </div>

    );

  }
);

Escena20.displayName = "Escena20";

export default Escena20;