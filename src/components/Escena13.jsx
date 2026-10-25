import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import gsap from "gsap";

import mesa13 from "../assets/mesa.webm";
import fondo13 from "../assets/fondoescena13.webm";
import srfox13 from "../assets/srfox13.webm";      // Sr. Fox (sentado en el taburete)
import srafox13 from "../assets/srafox13.webm";      // Sra. Fox (con el papel)
import junior13 from "../assets/junior13.webm";     // Junior

import "../stylesheets/Escena13.css";


// Pasar a la siguiente escena cuando TERMINEN todos los videos
// (fondo, Sr. Fox y Sra. Fox duran 8 s; Junior dura 10 s)
const AVANZAR_AL_TERMINAR = true;
const ESCENA_SIGUIENTE = 17;

// Videos que marcan el final de la escena (fondo, Sra. Fox, Sr. Fox y Junior).
// La mesa se reproduce con ellos pero no cuenta para avanzar.
const VIDEOS_QUE_CUENTAN = 4;


// =========================================================
// CÁMARA (GSAP)  ->  DESACTIVADA POR AHORA (0 movimiento)
// =========================================================
// Cuando quieras moverla, pon ACTIVAR_CAMARA = true y agrega
// movimientos en construirLineaCamara (misma lógica de siempre:
// tl.to(camara, { scale, x, y, duration, ease }, segundoDeInicio)).
// La línea de tiempo sigue el tiempo del video de fondo (0 a 8 s).

const ACTIVAR_CAMARA = false;

const EASE_CAMARA = "power2.inOut";

const construirLineaCamara = (tl, camara) => {

  // Ejemplo (comentado):
  // tl.to(camara, {
  //   scale: 1.5,
  //   x: 0,
  //   y: 0,
  //   duration: 3,
  //   ease: EASE_CAMARA
  // }, 0);

};


// =========================================================
// ESCENA 16  (componente Escena13)
// =========================================================

export const Escena13 = forwardRef(
  ({ cambiarEscena, onPersonajeClick }, ref) => {

    // =======================================================
    // REFS
    // =======================================================

    const fondo13Ref = useRef(null);
    const srfox13Ref = useRef(null);
    const srafox13Ref = useRef(null);
    const junior13Ref = useRef(null);
    const mesa13Ref = useRef(null);

    const escenaIniciada = useRef(false);
    const videosTerminados = useRef(0);

    const camaraRef = useRef(null);
    const camaraTlRef = useRef(null);
    const rafRef = useRef(null);


    const obtenerVideos = () => [
      fondo13Ref.current,
      srfox13Ref.current,
      srafox13Ref.current,
      junior13Ref.current,
      mesa13Ref.current
    ].filter(Boolean);


    // =======================================================
    // CÁMARA: crear la línea de tiempo al montar
    // =======================================================

    useEffect(() => {

      const camara = camaraRef.current;

      if (!ACTIVAR_CAMARA || !camara) {
        return;
      }

      gsap.set(camara, {
        scale: 1,
        x: 0,
        y: 0,
        transformOrigin: "50% 50%"
      });

      const tl = gsap.timeline({ paused: true });

      construirLineaCamara(tl, camara);

      camaraTlRef.current = tl;

      return () => {
        tl.kill();
        camaraTlRef.current = null;
      };

    }, []);


    // La cámara va al segundo en el que está el video de fondo
    const actualizarCamara = () => {

      const tl = camaraTlRef.current;
      const fondo = fondo13Ref.current;

      if (tl && fondo) {
        tl.time(fondo.currentTime);
      }

      rafRef.current = requestAnimationFrame(actualizarCamara);

    };


    // =======================================================
    // INICIAR ESCENA (click en cualquier personaje)
    // =======================================================

    const iniciarEscena = () => {

      if (escenaIniciada.current) {
        return;
      }

      escenaIniciada.current = true;
      videosTerminados.current = 0;

      obtenerVideos().forEach((video) => {

        video.currentTime = 0;

        video
          .play()
          .catch(() => {});

      });

      if (ACTIVAR_CAMARA) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(actualizarCamara);
      }

    };


    const alClickPersonaje = (personaje) => {

      if (escenaIniciada.current) {
        return;
      }

      iniciarEscena();

      if (onPersonajeClick) {
        onPersonajeClick(personaje);
      }

    };


    // =======================================================
    // FIN DE LA ESCENA (cuando termina el último video)
    // =======================================================

    const alTerminarVideo = () => {

      videosTerminados.current += 1;

      if (
        videosTerminados.current >= VIDEOS_QUE_CUENTAN &&
        AVANZAR_AL_TERMINAR &&
        cambiarEscena
      ) {
        cambiarEscena(ESCENA_SIGUIENTE);
      }

    };


    // =======================================================
    // PAUSAR / REANUDAR
    // =======================================================

    const pausarTodo = () => {

      obtenerVideos().forEach((video) => {
        video.pause();
      });

    };


    const reanudarTodo = () => {

      obtenerVideos().forEach((video) => {

        if (!video.ended) {
          video
            .play()
            .catch(() => {});
        }

      });

    };


    // =======================================================
    // LIMPIEZA
    // =======================================================

    useEffect(() => {

      return () => {
        cancelAnimationFrame(rafRef.current);
      };

    }, []);


    // =======================================================
    // EXPONER FUNCIONES
    // =======================================================

    useImperativeHandle(ref, () => ({

      iniciarTodo: iniciarEscena,

      estaIniciada: () => escenaIniciada.current,

      pausarTodo,

      reanudarTodo

    }));


    // =======================================================
    // RETURN
    // =======================================================

    return (

      <div className="escena13-wrapper">

        <div
          ref={camaraRef}
          className="escena13"
        >

          {/* FONDO */}

          <video
            ref={fondo13Ref}
            className="fondo13"
            muted
            playsInline
            preload="auto"
            onEnded={alTerminarVideo}
          >
            <source src={fondo13} type="video/webm" />
          </video>


          {/* SRA. FOX (click para iniciar) */}

          <video
            ref={srafox13Ref}
            className="srafox13"
            muted
            playsInline
            preload="auto"
            onClick={() => alClickPersonaje("sraFox")}
            onEnded={alTerminarVideo}
          >
            <source src={srafox13} type="video/webm" />
          </video>


          {/* SR. FOX (click para iniciar) */}

          <video
            ref={srfox13Ref}
            className="srfox13"
            muted
            playsInline
            preload="auto"
            onClick={() => alClickPersonaje("srFox")}
            onEnded={alTerminarVideo}
          >
            <source src={srfox13} type="video/webm" />
          </video>


          {/* JUNIOR (click para iniciar) */}

          <video
            ref={junior13Ref}
            className="junior13"
            muted
            playsInline
            preload="auto"
            onClick={() => alClickPersonaje("junior")}
            onEnded={alTerminarVideo}
          >
            <source src={junior13} type="video/webm" />
          </video>


          {/* MESA (por encima de los personajes, sin clicks) */}

          <video
            ref={mesa13Ref}
            className="mesa13"
            muted
            playsInline
            preload="auto"
          >
            <source src={mesa13} type="video/webm" />
          </video>


        </div>

      </div>

    );

  }
);