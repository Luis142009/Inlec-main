import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import fondo19 from "../assets/fondo19.webm";
import fox19 from "../assets/fox19.webm";
import sra19 from "../assets/sra19.webm";
import dialogo19 from "../assets/dialogo.webm";

import "../stylesheets/Escena18.css";


// =========================================================
// ESCENA 21 (componente Escena18)
//
// 4 videos webm de 30 s que van sincronizados:
//   fondo19  -> la cueva
//   fox19    -> el Sr. Fox
//   sra19    -> la Sra. Fox
//   dialogo  -> los globos de diálogo
//
// Al entrar quedan quietos en el primer cuadro. Al dar click en
// el Sr. Fox o en la Sra. Fox arrancan los 4 a la vez, salen los
// diálogos y se mueve la cámara.
// =========================================================

// Pasar a la siguiente escena cuando termine el video
const AVANZAR_AL_TERMINAR = true;
const ESCENA_SIGUIENTE = 22;


export const Escena18 = forwardRef(
  (
    {
      cambiarEscena,

      // Reproduce el audio del personaje (lo maneja InterfazCap,
      // así respeta el volumen y la pausa globales).
      // Recibe "fox" o "sra".
      onPersonajeClick
    },
    ref
  ) => {

    // =========================================================
    // ESTADO
    // =========================================================

    // true cuando ya se dio click en alguno de los dos
    const [iniciado, setIniciado] = useState(false);


    // =========================================================
    // REFS
    // =========================================================

    // Contenedor que se mueve (la "cámara")
    const escenaRef = useRef(null);

    const fondoRef = useRef(null);
    const foxRef = useRef(null);
    const sraRef = useRef(null);
    const dialogoRef = useRef(null);

    // Animación de entrada del globo (para poder pausarla)
    const popDialogoRef = useRef(null);

    // Timeline de la cámara (para poder pausarla)
    const camaraTlRef = useRef(null);

    // Para saber, sin depender de renders, si ya se hizo click
    const iniciadoRef = useRef(false);


    // =========================================================
    // VIDEOS
    // =========================================================

    const obtenerMedios = () => {

      return [
        fondoRef.current,
        foxRef.current,
        sraRef.current,
        dialogoRef.current
      ].filter(Boolean);

    };


    // =========================================================
    // CÁMARA
    // 1) zoom lento
    // 2) movimiento lento a la derecha
    // 3) regresa un poco
    //
    // Máximo de x sin ver el borde: (scale - 1) / 2 * ancho
    // Ej.: ancho 1280 y scale 1.25 -> máximo 160 px
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

      // 1) Zoom lento (0 s -> 9 s)
      tl.to(escena, {

        scale: 1.25,
        x: 0,
        y: 100,

        duration: 5,

        ease: "power2.inOut"

      }, 0);

      // 2) Movimiento lento a la derecha (9 s -> 21 s)
      tl.to(escena, {

        scale: 1.75,
        x: -480,
        y: 100,

        duration: 4,

        ease: "power2.inOut"

      }, 9);

      // 3) Regresa un poco (21 s -> 30 s)
      tl.to(escena, {

        scale: 1.15,
        x: -50,
        y: 0,

        duration: 9,

        ease: "power2.inOut"

      }, 21);

      return tl;

    };


    // =========================================================
    // LIMPIEZA AL SALIR DE LA ESCENA
    // =========================================================

    useEffect(() => {

      return () => {

        popDialogoRef.current?.kill();
        camaraTlRef.current?.kill();

        obtenerMedios().forEach((medio) => {

          try {
            medio.pause();
          } catch {}

        });

      };

      // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);


    // =========================================================
    // CLICK EN EL SR. FOX O LA SRA. FOX
    // - arrancan los 4 videos juntos
    // - arranca la cámara
    // - sale el globo de diálogo
    // =========================================================

    const iniciarDialogos = (personaje) => {

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


      // El globo aparece con un pequeño "pop"

      popDialogoRef.current = gsap.fromTo(
        dialogoRef.current,

        { opacity: 0, scale: 0.6 },

        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.7)"
        }
      );


      if (onPersonajeClick) {

        onPersonajeClick(personaje);

      }

    };


    // Enter / espacio para quien use teclado

    const teclaPersonaje = (personaje) => (e) => {

      if (e.key === "Enter" || e.key === " ") {

        e.preventDefault();

        iniciarDialogos(personaje);

      }

    };


    // =========================================================
    // CUANDO TERMINA EL VIDEO
    // =========================================================

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


    // =========================================================
    // PAUSAR TODO
    // =========================================================

    const pausarTodo = () => {

      obtenerMedios().forEach((medio) => {

        try {
          medio.pause();
        } catch {}

      });

      popDialogoRef.current?.pause();
      camaraTlRef.current?.pause();

    };


    // =========================================================
    // REANUDAR TODO
    // (solo si ya se dio click; antes de eso todo está quieto)
    // =========================================================

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

      popDialogoRef.current?.resume();
      camaraTlRef.current?.resume();

    };


    // =========================================================
    // EXPONER FUNCIONES AL COMPONENTE PADRE
    // =========================================================

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

    // Props comunes de los dos personajes (click, teclado y accesibilidad)
    const propsPersonaje = (personaje, etiqueta) => ({

      onClick: () => iniciarDialogos(personaje),

      onKeyDown: teclaPersonaje(personaje),

      role: "button",

      tabIndex: listo ? 0 : -1,

      "aria-label": etiqueta

    });

    return (

      <div className="escena18-wrapper">

        {/* overflow hidden: al hacer zoom nada se sale de la escena */}
        <div className="escena18" style={{ overflow: "hidden" }}>

          {/* CÁMARA: todo lo que está dentro se mueve junto */}
          <div ref={escenaRef} className="camara18">


            {/* FONDO */}

            <video
              ref={fondoRef}
              className="fondo18"

              src={fondo19}

              muted
              playsInline
              preload="auto"

              onEnded={terminarEscena}
            />


            {/* SR. FOX (click: inicia los diálogos) */}

            <video
              ref={foxRef}
              className={"srfox18" + (listo ? " srfox18--listo" : "")}

              src={fox19}

              muted
              playsInline
              preload="auto"

              {...propsPersonaje("fox", "Tocar al señor Fox")}
            />


            {/* SRA. FOX (click: inicia los diálogos) */}

            <video
              ref={sraRef}
              className={"srafox18" + (listo ? " srafox18--listo" : "")}

              src={sra19}

              muted
              playsInline
              preload="auto"

              {...propsPersonaje("sra", "Tocar a la señora Fox")}
            />


            {/* DIÁLOGOS (ocultos hasta el click) */}

            <video
              ref={dialogoRef}
              className="dialogo18"

              src={dialogo19}

              muted
              playsInline
              preload="auto"
            />

          </div>

        </div>

      </div>

    );

  }
);

Escena18.displayName = "Escena18";

export default Escena18;