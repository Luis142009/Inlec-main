import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import gsap from "gsap";

import fondo15 from "../assets/fondo15.webm";
import periodico15 from "../assets/periodico15.webm";

import "../stylesheets/Escena15.css";


// Pasar a la siguiente escena cuando TERMINEN los videos
// (fondo dura 4.8 s, periódico dura 5 s)
const AVANZAR_AL_TERMINAR = true;
const ESCENA_SIGUIENTE = 19;

// Videos que marcan el final de la escena (fondo y periódico)
const VIDEOS_QUE_CUENTAN = 2;

// Segundo del video del periódico en el que desaparece
const SEGUNDO_DESAPARECE_PERIODICO = 4.65;


// =========================================================
// CÁMARA (GSAP)
// =========================================================
// La escena EMPIEZA con un zoom fuerte sobre el periódico (quieta).
// Al hacer click en el periódico la cámara vuelve a la posición
// normal y, cuando termina de volver, se reproduce la animación.
//
// El zoom se define en coordenadas del escenario de 1920x1080:
//   ZOOM_ESCALA: cuánto se acerca
//   FOCO_X / FOCO_Y: el punto del escenario que queda en el centro
//     (el periódico está más o menos en x 748, y 948; el foco está
//      un poco más arriba para que no se vea fuera del escenario
//      por abajo con un zoom tan fuerte)
// Los x / y en px se calculan solos según el tamaño real del escenario.

const ESCENARIO_ANCHO = 1920;
const ESCENARIO_ALTO = 1080;

const ZOOM_ESCALA = 3.8;
const FOCO_X = 748;
const FOCO_Y = 925;

const DURACION_VUELTA = 1.6;     // segundos que tarda la cámara en volver
const EASE_CAMARA = "power2.inOut";

// true = la animación arranca cuando la cámara termina de volver
// false = arranca a la vez que la cámara empieza a volver
const ANIMAR_AL_TERMINAR_CAMARA = true;


// Fases de la escena
const FASE = {
  ESPERANDO: "esperando",   // zoom en el periódico, esperando el click
  VOLVIENDO: "volviendo",   // la cámara regresa a la posición normal
  ANIMANDO: "animando"      // la animación corre
};


// =========================================================
// ESCENA 18  (componente Escena15)
// =========================================================

export const Escena15 = forwardRef(
  ({ cambiarEscena, onPersonajeClick }, ref) => {

    // =======================================================
    // REFS
    // =======================================================

    const fondo15Ref = useRef(null);
    const periodico15Ref = useRef(null);

    const camaraRef = useRef(null);
    const camaraTweenRef = useRef(null);

    const escenaIniciada = useRef(false);
    const videosTerminados = useRef(0);

    const faseRef = useRef(FASE.ESPERANDO);
    const [fase, setFaseState] = useState(FASE.ESPERANDO);

    // true cuando el periódico llega a su segundo de desaparición
    const [periodicoOculto, setPeriodicoOculto] = useState(false);

    const setFase = (nuevaFase) => {
      faseRef.current = nuevaFase;
      setFaseState(nuevaFase);
    };


    const obtenerVideos = () => [
      fondo15Ref.current,
      periodico15Ref.current
    ].filter(Boolean);


    // =======================================================
    // POSICIÓN DEL ZOOM (en px reales del escenario)
    // =======================================================

    const calcularPoseZoom = () => {

      const camara = camaraRef.current;

      const ancho = camara?.offsetWidth || ESCENARIO_ANCHO;
      const alto = camara?.offsetHeight || ESCENARIO_ALTO;

      const dx = FOCO_X - ESCENARIO_ANCHO / 2;
      const dy = FOCO_Y - ESCENARIO_ALTO / 2;

      return {
        scale: ZOOM_ESCALA,
        x: -ZOOM_ESCALA * dx * (ancho / ESCENARIO_ANCHO),
        y: -ZOOM_ESCALA * dy * (alto / ESCENARIO_ALTO)
      };

    };


    // =======================================================
    // CÁMARA: empezar con zoom en el periódico
    // =======================================================

    useEffect(() => {

      const camara = camaraRef.current;

      if (!camara) {
        return;
      }

      gsap.set(camara, {
        ...calcularPoseZoom(),
        transformOrigin: "50% 50%"
      });

      // Si la ventana cambia de tamaño mientras se espera el click,
      // se recalcula el zoom
      const alRedimensionar = () => {

        if (faseRef.current === FASE.ESPERANDO) {
          gsap.set(camara, calcularPoseZoom());
        }

      };

      window.addEventListener("resize", alRedimensionar);

      return () => {
        window.removeEventListener("resize", alRedimensionar);
        camaraTweenRef.current?.kill();
        camaraTweenRef.current = null;
      };

    }, []);


    // =======================================================
    // ARRANCAR LA ANIMACIÓN (fondo + periódico)
    // =======================================================

    const arrancarAnimacion = () => {

      setFase(FASE.ANIMANDO);

      videosTerminados.current = 0;

      obtenerVideos().forEach((video) => {

        video.currentTime = 0;

        video
          .play()
          .catch(() => {});

      });

    };


    // =======================================================
    // INICIAR ESCENA (click en el periódico)
    // =======================================================

    const iniciarEscena = () => {

      if (escenaIniciada.current) {
        return;
      }

      escenaIniciada.current = true;

      setFase(FASE.VOLVIENDO);

      if (!ANIMAR_AL_TERMINAR_CAMARA) {
        arrancarAnimacion();
      }

      camaraTweenRef.current = gsap.to(camaraRef.current, {
        scale: 1,
        x: 0,
        y: 0,
        duration: DURACION_VUELTA,
        ease: EASE_CAMARA,
        onComplete: () => {

          camaraTweenRef.current = null;

          if (ANIMAR_AL_TERMINAR_CAMARA) {
            arrancarAnimacion();
          }

        }
      });

    };


    const alClickPeriodico = () => {

      if (escenaIniciada.current) {
        return;
      }

      iniciarEscena();

      if (onPersonajeClick) {
        onPersonajeClick("periodico");
      }

    };


    // =======================================================
    // FIN DE LA ESCENA (cuando terminan los videos)
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


    // El periódico desaparece en el segundo 2 de su video
    // (sigue el tiempo del propio video, así que si se pausa, espera)
    const alAvanzarPeriodico = () => {

      const periodico = periodico15Ref.current;

      if (
        periodico &&
        !periodicoOculto &&
        periodico.currentTime >= SEGUNDO_DESAPARECE_PERIODICO
      ) {
        setPeriodicoOculto(true);
      }

    };


    // =======================================================
    // PAUSAR / REANUDAR
    // =======================================================

    const pausarTodo = () => {

      camaraTweenRef.current?.pause();

      obtenerVideos().forEach((video) => {
        video.pause();
      });

    };


    const reanudarTodo = () => {

      // Esperando el click: nada que reanudar
      if (faseRef.current === FASE.ESPERANDO) {
        return;
      }

      // La cámara aún está volviendo
      if (faseRef.current === FASE.VOLVIENDO) {

        camaraTweenRef.current?.resume();

        if (!ANIMAR_AL_TERMINAR_CAMARA) {
          obtenerVideos().forEach((video) => {
            if (!video.ended) {
              video.play().catch(() => {});
            }
          });
        }

        return;

      }

      obtenerVideos().forEach((video) => {

        if (!video.ended) {
          video
            .play()
            .catch(() => {});
        }

      });

    };


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

    const esperando = fase === FASE.ESPERANDO;

    return (

      <div className="escena15-wrapper">

        {/* La cámara es el propio .escena15 */}

        <div
          ref={camaraRef}
          className="escena15"
        >

          {/* FONDO (sin clicks) */}

          <video
            ref={fondo15Ref}
            className="fondo15"
            muted
            playsInline
            preload="auto"
            onEnded={alTerminarVideo}
          >
            <source src={fondo15} type="video/webm" />
          </video>


          {/* PERIÓDICO (click para iniciar) */}

          <video
            ref={periodico15Ref}
            className={`periodico15 ${esperando ? "periodico15-activo" : ""} ${periodicoOculto ? "periodico15-oculto" : ""}`}
            muted
            playsInline
            preload="auto"
            onClick={alClickPeriodico}
            onTimeUpdate={alAvanzarPeriodico}
            onEnded={alTerminarVideo}
          >
            <source src={periodico15} type="video/webm" />
          </video>

        </div>

      </div>

    );

  }
);