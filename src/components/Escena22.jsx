import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import primero24 from "../assets/primero24.webm";
import segundo24 from "../assets/segundo24.webm";
import fox24 from "../assets/fox24.webm";

import "../stylesheets/Escena22.css";


// =========================================================
// ESCENA 25 del reproductor (componente Escena22)
//
// 3 videos webm que van sincronizados (de abajo hacia arriba):
//   segundo24 -> la capa de abajo, 23.8 s (trae audio). Se ve a
//                través de las partes transparentes de primero24
//   primero24 -> el fondo (las botellas), 5 s
//   fox24     -> el Sr. Fox caminando con la bolsa, 8 s
//
// A los 6 s de la escena (TIEMPO_OCULTAR_PRIMERO), primero24
// desaparece y se queda a la vista solo segundo24.
//
// Al entrar quedan quietos en el primer cuadro. Al dar click en
// la escena arrancan los 3 a la vez. La cámara ya viene dentro de
// los videos, así que aquí no se mueve nada más.
//
// segundo24 es el más largo: él marca el tiempo, los otros dos lo
// siguen y se quedan en su último cuadro cuando terminan. La escena
// acaba cuando termina segundo24.
// =========================================================

// Pasar a la siguiente escena cuando termine el video
const AVANZAR_AL_TERMINAR = false;
const ESCENA_SIGUIENTE = 26;

// Si el fondo se desfasa más de esto (segundos) del Sr. Fox,
// se vuelve a sincronizar
const DESFASE_MAXIMO = 0.08;

// primero24 desaparece cuando la escena llega a este segundo
// (se cuenta con el tiempo del video, así que si se pausa la
// escena el conteo también se pausa)
const TIEMPO_OCULTAR_PRIMERO = 4;


export const Escena22 = forwardRef(
  (
    {
      cambiarEscena,

      // Volumen de efectos de la interfaz (0 a 1). Se aplica al
      // audio que trae el video segundo24.
      volumen = 0.7,

      // Opcional: avisa a InterfazCap que se inició la escena
      onPersonajeClick
    },
    ref
  ) => {

    // =========================================================
    // ESTADO Y REFS
    // =========================================================

    // true cuando ya se dio click para iniciar
    const [iniciado, setIniciado] = useState(false);

    // true cuando ya pasaron los 6 s: primero24 desaparece y se ve
    // solo segundo24
    const [primeroOculto, setPrimeroOculto] = useState(false);
    const primeroOcultoRef = useRef(false);

    const iniciadoRef = useRef(false);
    const terminadaRef = useRef(false);
    const rafRef = useRef(null);

    const segundoRef = useRef(null);
    const primeroRef = useRef(null);
    const foxRef = useRef(null);


    const obtenerMedios = () =>
      [segundoRef.current, primeroRef.current, foxRef.current]
        .filter(Boolean);


    // =========================================================
    // SINCRONIZAR (primero24 y fox24 siguen a segundo24, que dura más)
    // =========================================================

    const sincronizar = () => {

      const segundo = segundoRef.current;

      if (!segundo) {
        return;
      }

      [primeroRef.current, foxRef.current]
        .filter(Boolean)
        .forEach((video) => {

          // Un video que ya terminó se queda en su último cuadro
          if (video.ended) {
            return;
          }

          // Nunca se pide pasar de su propio final
          const objetivo = Math.min(
            segundo.currentTime,
            video.duration || segundo.currentTime
          );

          if (Math.abs(video.currentTime - objetivo) > DESFASE_MAXIMO) {
            video.currentTime = objetivo;
          }

        });

    };


    const vigilar = () => {

      sincronizar();

      // Pasados los 6 s, primero24 desaparece (con un fundido)
      if (
        !primeroOcultoRef.current &&
        segundoRef.current &&
        segundoRef.current.currentTime >= TIEMPO_OCULTAR_PRIMERO
      ) {

        primeroOcultoRef.current = true;

        setPrimeroOculto(true);

      }

      rafRef.current = requestAnimationFrame(vigilar);

    };


    // =========================================================
    // VOLUMEN (el de la interfaz, para el audio de segundo24)
    // =========================================================

    useEffect(() => {

      if (segundoRef.current) {
        segundoRef.current.volume = Math.min(1, Math.max(0, volumen));
      }

    }, [volumen]);


    // =========================================================
    // LIMPIEZA AL SALIR DE LA ESCENA
    // =========================================================

    useEffect(() => {

      return () => {

        cancelAnimationFrame(rafRef.current);

        obtenerMedios().forEach((medio) => {
          try {
            medio.pause();
          } catch {}
        });

      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // =========================================================
    // CLICK EN LA ESCENA: arrancan los 2 videos juntos
    // =========================================================

    const iniciar = () => {

      if (iniciadoRef.current) {
        return;
      }

      iniciadoRef.current = true;
      setIniciado(true);

      obtenerMedios().forEach((medio) => {

        try {

          medio.currentTime = 0;

          medio.play().catch(() => {});

        } catch {}

      });

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(vigilar);

      if (onPersonajeClick) {
        onPersonajeClick("fox");
      }

    };


    // Enter / espacio para quien use teclado
    const teclaEscena = (e) => {

      if (e.key === "Enter" || e.key === " ") {

        e.preventDefault();

        iniciar();

      }

    };


    // =========================================================
    // CUANDO TERMINA EL VIDEO MÁS LARGO (segundo24)
    // =========================================================

    const alTerminar = () => {

      if (terminadaRef.current) {
        return;
      }

      terminadaRef.current = true;

      cancelAnimationFrame(rafRef.current);

      obtenerMedios().forEach((medio) => {
        try {
          medio.pause();
        } catch {}
      });

      if (AVANZAR_AL_TERMINAR && cambiarEscena) {
        cambiarEscena(ESCENA_SIGUIENTE);
      }

    };


    // =========================================================
    // PAUSAR / REANUDAR (botón de pausa de la interfaz)
    // Antes del click todo está quieto, así que reanudar no hace nada
    // =========================================================

    const pausarTodo = () => {

      cancelAnimationFrame(rafRef.current);

      obtenerMedios().forEach((medio) => {
        try {
          medio.pause();
        } catch {}
      });

      sincronizar();

    };


    const reanudarTodo = () => {

      if (!iniciadoRef.current || terminadaRef.current) {
        return;
      }

      obtenerMedios().forEach((medio) => {

        // Un video que ya terminó reiniciaría con play(): se deja quieto
        if (medio.ended) {
          return;
        }

        try {
          medio.play().catch(() => {});
        } catch {}

      });

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(vigilar);

    };


    useImperativeHandle(
      ref,
      () => ({

        pausarTodo,

        reanudarTodo

      }),
      []
    );


    // =========================================================
    // RETURN
    // =========================================================

    const listo = !iniciado;

    return (

      <div
        className={"escena22-wrapper" + (listo ? " escena22-wrapper--lista" : "")}

        onClick={iniciar}
        onKeyDown={teclaEscena}

        role="button"
        tabIndex={listo ? 0 : -1}
        aria-label="Tocar para iniciar la escena"
      >

        <div className="escena22">

          {/* CÁMARA: todo lo que está dentro se mueve junto */}
          <div className="camara22">

            {/* CAPA DE ABAJO (trae audio; al terminar acaba la escena) */}

            <video
              ref={segundoRef}
              className="segundo22"
              playsInline
              preload="auto"
              onEnded={alTerminar}
            >
              <source src={segundo24} type="video/webm" />
            </video>


            {/* FONDO (las botellas), encima de segundo24 */}

            <video
              ref={primeroRef}
              className={"primero22" + (primeroOculto ? " primero22--oculto" : "")}
              muted
              playsInline
              preload="auto"
            >
              <source src={primero24} type="video/webm" />
            </video>


            {/* SR. FOX CAMINANDO (encima de todo) */}

            <video
              ref={foxRef}
              className="fox22"
              muted
              playsInline
              preload="auto"
            >
              <source src={fox24} type="video/webm" />
            </video>

          </div>

        </div>

      </div>

    );

  }
);

Escena22.displayName = "Escena22";

export default Escena22;