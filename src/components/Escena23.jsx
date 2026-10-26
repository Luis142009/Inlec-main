import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import fondo23 from "../assets/fondo23.webm";
import banquete23 from "../assets/banquete23.webm";
import fox23 from "../assets/fox23.webm";

import "../stylesheets/Escena23.css";


// =========================================================
// ESCENA 26 (componente Escena23) - ÚLTIMA ESCENA
//
// 3 videos webm sincronizados (todos a 30 fps):
//   fondo23    -> el fondo, 1920x1080, 9.57 s
//   banquete23 -> la mesa, 1596x984 con transparencia, 10 s
//   fox23      -> el Sr. Fox caminando, 1920x784 con transparencia, 8 s
//
// Al entrar quedan quietos en el primer cuadro. Al dar click
// arrancan los 3 a la vez y se mueve la cámara.
// El más largo es el banquete (10 s): cuando termina se acaba la escena.
// Es la última escena: al terminar NO avanza a otra.
// =========================================================

const AVANZAR_AL_TERMINAR = false;
const ESCENA_SIGUIENTE = 27;


export const Escena23 = forwardRef(
  (
    {
      cambiarEscena,

      // Reproduce el audio del personaje (lo maneja InterfazCap).
      // Recibe "fox".
      onPersonajeClick
    },
    ref
  ) => {

    // true cuando ya se dio click en el Sr. Fox
    const [iniciado, setIniciado] = useState(false);

    // Contenedor que se mueve (la "cámara")
    const escenaRef = useRef(null);

    const fondoRef = useRef(null);
    const banqueteRef = useRef(null);
    const foxRef = useRef(null);

    // Timeline de la cámara (para poder pausarla)
    const camaraTlRef = useRef(null);

    // Para saber, sin depender de renders, si ya se hizo click
    const iniciadoRef = useRef(false);


    const obtenerMedios = () => {

      return [
        fondoRef.current,
        banqueteRef.current,
        foxRef.current
      ].filter(Boolean);

    };


    // =========================================================
    // CÁMARA
    // Empuje lento durante los 10 s que dura la escena.
    // Máximo sin ver el borde: (scale - 1) / 2 * ancho (o alto)
    // =========================================================

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

      // 0 s -> 10 s: acercamiento suave hacia la mesa
      tl.to(escena, {
        scale: 1.12,
        x: 0,
        y: -20,
        duration: 10,
        ease: "power1.inOut"
      }, 0);

      return tl;

    };


    // Limpieza al salir de la escena
    useEffect(() => {

      return () => {

        camaraTlRef.current?.kill();

        obtenerMedios().forEach((medio) => {

          try {
            medio.pause();
          } catch {}

        });

      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // Algunos navegadores no pintan el primer cuadro de un video
    // pausado hasta que se hace un "seek"; así se fuerza a mostrarlo
    const mostrarPrimerCuadro = (e) => {

      if (iniciadoRef.current) {
        return;
      }

      try {
        e.currentTarget.currentTime = 0.01;
      } catch {}

    };


    // Si un video no carga, se ve el motivo en la consola (F12)
    const avisarError = (nombre) => (e) => {

      const err = e.currentTarget.error;

      console.error(
        `Escena 26: no cargó el video "${nombre}"`,
        err?.code,
        err?.message,
        e.currentTarget.currentSrc
      );

    };


    // Click en el Sr. Fox: arrancan los 3 videos y la cámara juntos
    const iniciarEscena = (personaje) => {

      if (iniciadoRef.current) {
        return;
      }

      iniciadoRef.current = true;
      setIniciado(true);

      obtenerMedios().forEach((medio) => {

        try {

          medio.currentTime = 0;

          medio
            .play()
            .catch(() => {});

        } catch {}

      });

      camaraTlRef.current?.kill();

      camaraTlRef.current = crearCamara();

      camaraTlRef.current?.play(0);

      if (onPersonajeClick) {

        onPersonajeClick(personaje);

      }

    };


    // Enter / espacio para quien use teclado
    const teclaPersonaje = (personaje) => (e) => {

      if (e.key === "Enter" || e.key === " ") {

        e.preventDefault();

        iniciarEscena(personaje);

      }

    };


    // Cuando termina el banquete (el video más largo)
    const terminarEscena = () => {

      obtenerMedios().forEach((medio) => {

        try {
          medio.pause();
        } catch {}

      });

      camaraTlRef.current?.pause();

      if (AVANZAR_AL_TERMINAR && cambiarEscena) {

        cambiarEscena(ESCENA_SIGUIENTE);

      }

    };


    const pausarTodo = () => {

      obtenerMedios().forEach((medio) => {

        try {
          medio.pause();
        } catch {}

      });

      camaraTlRef.current?.pause();

    };


    // Solo reanuda si ya se dio click; antes de eso todo está quieto
    const reanudarTodo = () => {

      if (!iniciadoRef.current) {
        return;
      }

      obtenerMedios().forEach((medio) => {

        try {

          medio
            .play()
            .catch(() => {});

        } catch {}

      });

      camaraTlRef.current?.resume();

    };


    useImperativeHandle(
      ref,
      () => ({

        pausarTodo,

        reanudarTodo

      }),
      []
    );


    // true mientras todavía no se ha dado click
    const listo = !iniciado;

    return (

      <div className="escena23-wrapper">

        <div className="escena23">

          {/* CÁMARA: todo lo que está dentro se mueve junto */}
          <div ref={escenaRef} className="camara23">


            {/* FONDO */}

            <video
              ref={fondoRef}
              className="fondo23"

              src={fondo23}

              muted
              playsInline
              preload="auto"

              onLoadedData={mostrarPrimerCuadro}
              onError={avisarError("fondo23")}
            />


            {/* BANQUETE (la mesa, con transparencia) */}

            <video
              ref={banqueteRef}
              className="banquete23"

              src={banquete23}

              muted
              playsInline
              preload="auto"

              onLoadedData={mostrarPrimerCuadro}
              onError={avisarError("banquete23")}

              onEnded={terminarEscena}
            />


            {/* SR. FOX (con transparencia, camina de izquierda a derecha) */}

            <video
              ref={foxRef}
              className="srfox23"

              src={fox23}

              muted
              playsInline
              preload="auto"

              onLoadedData={mostrarPrimerCuadro}
              onError={avisarError("fox23")}
            />


            {/* CAPA DE CLICK: al inicio el Sr. Fox casi no se ve (entra por
                la izquierda), así que el click vale en toda la escena */}

            {listo && (

              <div
                className="inicio23"

                onClick={() => iniciarEscena("fox")}
                onKeyDown={teclaPersonaje("fox")}
                role="button"
                tabIndex={0}
                aria-label="Tocar para comenzar la escena"
              />

            )}

          </div>

        </div>

      </div>

    );

  }
);

Escena23.displayName = "Escena23";

export default Escena23;