import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import fondo20 from "../assets/fondo20.webm";
import multi20 from "../assets/multi20.webm";
import fox20 from "../assets/fox20.webm";

import "../stylesheets/Escena19.css";


// =========================================================
// ESCENA 22 (componente Escena19)
//
// 3 videos webm de 12 s que van sincronizados:
//   fondo20 -> el fondo
//   multi20 -> capa a pantalla completa (varios elementos)
//   fox20   -> el Sr. Fox
//
// Al entrar quedan quietos en el primer cuadro. Al dar click en
// el Sr. Fox arrancan los 3 a la vez y se mueve la cámara.
// =========================================================

// Pasar a la siguiente escena cuando termine el video
const AVANZAR_AL_TERMINAR = true;
const ESCENA_SIGUIENTE = 23;


export const Escena19 = forwardRef(
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
    const multiRef = useRef(null);
    const foxRef = useRef(null);

    // Timeline de la cámara (para poder pausarla)
    const camaraTlRef = useRef(null);

    // Para saber, sin depender de renders, si ya se hizo click
    const iniciadoRef = useRef(false);


    const obtenerMedios = () => {

      return [
        fondoRef.current,
        multiRef.current,
        foxRef.current
      ].filter(Boolean);

    };


    // =========================================================
    // CÁMARA
    // 1) zoom inicial
    // 2) nos vamos a la derecha
    // 3) regresamos al medio
    // 4) subimos
    //
    // x negativo = la cámara va a la derecha
    // y positivo = la cámara sube
    //
    // Máximo sin ver el borde: (scale - 1) / 2 * ancho (o alto)
    // Ej.: scale 1.3 -> 15 % del ancho y 15 % del alto
    // =========================================================

    const crearCamara = () => {

      const escena = escenaRef.current;

      if (!escena) {
        return null;
      }

      // Posición inicial
      gsap.set(escena, {
        scale: 1,
        x: 0,
        y: 0,
        transformOrigin: "50% 50%"
      });

      const tl = gsap.timeline({ paused: true });

      // 1) Zoom inicial (0 s -> 3 s)
      tl.to(escena, {

        scale: 3.0,
        x: 900,
        y: -680,

        duration: 3,

        ease: "power2.inOut"

      }, 0);

      // 2) Nos vamos a la derecha (3 s -> 6.5 s)
      tl.to(escena, {

        scale: 1.3,
        x: -220,
        y: 0,

        duration: 3.5,

        ease: "power2.inOut"

      }, 3);

      // 3) Regresamos al medio (6.5 s -> 9 s)
      tl.to(escena, {

        scale: 1.3,
        x: 0,
        y: 0,

        duration: 2.5,

        ease: "power2.inOut"

      }, 6.5);

      // 4) Subimos (9 s -> 12 s)
      tl.to(escena, {

        scale: 1.3,
        x: 0,
        y: 120,

        duration: 3,

        ease: "power2.inOut"

      }, 9);

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

      // Cámara

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


    // Cuando termina el video
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


    const listo = !iniciado;

    return (

      <div className="escena19-wrapper">

        <div className="escena19">

          {/* CÁMARA: todo lo que está dentro se mueve junto */}
          <div ref={escenaRef} className="camara19">


            {/* FONDO (al terminar pasa a la siguiente escena) */}

            <video
              ref={fondoRef}
              className="fondo19"

              src={fondo20}

              muted
              playsInline
              preload="auto"

              onEnded={terminarEscena}
            />


            {/* MULTI (capa a pantalla completa) */}

            <video
              ref={multiRef}
              className="multi19"

              src={multi20}

              muted
              playsInline
              preload="auto"
            />


            {/* SR. FOX (click: inicia la escena) */}

            <video
              ref={foxRef}
              className={"srfox19" + (listo ? " srfox19--listo" : "")}

              src={fox20}

              muted
              playsInline
              preload="auto"

              onClick={() => iniciarEscena("fox")}
              onKeyDown={teclaPersonaje("fox")}
              role="button"
              tabIndex={listo ? 0 : -1}
              aria-label="Tocar al señor Fox"
            />

          </div>

        </div>

      </div>

    );

  }
);

Escena19.displayName = "Escena19";

export default Escena19;