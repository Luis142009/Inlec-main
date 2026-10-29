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

import escopeta from "../assets/svg/Escopeta.svg";
import craneo from "../assets/svg/craneo.svg";

import tocar from "../assets/audio/tocar.mp3";

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
      onPersonajeClick,

      // InterfazCap avisa si ya se recogieron
      onRecoger,
      escopetaRecogida,
      craneoRecogido
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

    // OBJETOS RECOGIBLES
    const escopetaRef = useRef(null);
    const craneoRef = useRef(null);

    // Evita recoger dos objetos a la vez (cada uno vuela a un slot distinto)
    const recogiendoRef = useRef(false);

    const tocarRef = useRef(null);

    if (!tocarRef.current) {
      tocarRef.current = new Audio(tocar);
    }

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
    // CLICK EN UN OBJETO (escopeta o cráneo)
    // brillo + cámara + rebote + vuelo al slot
    // =========================================================

    const recogerObjeto = (e, clave, elementoRef, yaRecogido) => {

      e.stopPropagation();

      if (yaRecogido || recogiendoRef.current) {
        return;
      }

      const objeto = elementoRef.current;
      const camara = escenaRef.current;

      if (!objeto || !camara) {
        return;
      }

      const slotDestino =
        document.querySelector(".slot.slot-vacio") ||
        document.querySelectorAll(".slot")[0];

      if (!slotDestino) {

        console.warn("No se encontró el slot de destino.");

        return;
      }

      recogiendoRef.current = true;


      // SONIDO INMEDIATO
      tocarRef.current.currentTime = 0;

      tocarRef.current
        .play()
        .catch(() => {});


      // Si la escena ya arrancó, se congela todo (videos, globo y
      // cámara) mientras se recoge el objeto, y luego sigue igual
      const estabaIniciada = iniciadoRef.current;

      if (estabaIniciada) {
        pausarTodo();
      }


      // =====================================================
      // ESTADO ACTUAL DE LA CÁMARA
      // =====================================================

      const escalaActual =
        Number(gsap.getProperty(camara, "scale")) || 1;

      const xActual =
        Number(gsap.getProperty(camara, "x")) || 0;

      const yActual =
        Number(gsap.getProperty(camara, "y")) || 0;


      // =====================================================
      // POSICIONES
      // =====================================================

      const camaraRect = camara.getBoundingClientRect();
      const objetoRect = objeto.getBoundingClientRect();
      const slotRect = slotDestino.getBoundingClientRect();

      const camaraCentroX = camaraRect.left + camaraRect.width / 2;
      const camaraCentroY = camaraRect.top + camaraRect.height / 2;

      const objetoCentroX = objetoRect.left + objetoRect.width / 2;
      const objetoCentroY = objetoRect.top + objetoRect.height / 2;

      // ZOOM DE LA CÁMARA SOBRE EL OBJETO
      const ZOOM = 2;

      const offsetX =
        -ZOOM * (objetoCentroX - camaraCentroX) / escalaActual;

      const offsetY =
        -ZOOM * (objetoCentroY - camaraCentroY) / escalaActual;

      // VUELO AL SLOT (en px locales de la escena)
      const dx =
        (slotRect.left + slotRect.width / 2 - objetoCentroX) /
        escalaActual;

      const dy =
        (slotRect.top + slotRect.height / 2 - objetoCentroY) /
        escalaActual;


      gsap.killTweensOf(objeto);


      // =====================================================
      // TIMELINE
      // =====================================================

      const tl = gsap.timeline({

        onComplete: () => {

          recogiendoRef.current = false;

          if (estabaIniciada) {
            reanudarTodo();
          }

          if (onRecoger) {
            onRecoger(clave);
          }

        }

      });

      // 1. BRILLO + GIRO
      tl.to(objeto, {

        filter: `
          drop-shadow(0 0 50px #ffffff)
          drop-shadow(0 0 120px #ffe600)
          drop-shadow(0 0 220px #ffd000)
          drop-shadow(0 0 340px #ff9900)
        `,

        scale: 1.35,

        rotation: 360,

        duration: 0.35,

        ease: "back.out(2)"

      });

      // 2. CÁMARA HACIA EL OBJETO
      tl.to(
        camara,
        {
          scale: ZOOM,
          x: offsetX,
          y: offsetY,
          duration: 0.45,
          ease: "power2.out"
        },
        "<"
      );

      // 3. ESPERA
      tl.to({}, { duration: 0.15 });

      // 4. REGRESAR CÁMARA A DONDE ESTABA
      tl.to(camara, {
        scale: escalaActual,
        x: xActual,
        y: yActual,
        duration: 0.45,
        ease: "power2.inOut"
      });

      // 5. MOVER EL OBJETO AL SLOT
      tl.to(
        objeto,
        {
          x: dx,
          y: dy,
          scale: 0.4,
          rotation: 1080,
          duration: 0.8,
          ease: "power3.inOut"
        },
        "<"
      );

      // 6. REBOTE
      tl.to(objeto, {
        scale: 0.5,
        duration: 0.12,
        ease: "back.out(4)"
      });

      // 7. DESAPARECER
      tl.to(objeto, {
        opacity: 0,
        duration: 0.15
      });

      // 8. LIMPIAR FILTRO
      tl.set(objeto, { clearProps: "filter" });

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


            {/* ESCOPETA (OBJETO RECOGIBLE) */}

            {!escopetaRecogida && (

              <img
                ref={escopetaRef}
                src={escopeta}
                className="escopeta18"
                alt="Escopeta"
                draggable={false}
                onClick={(e) =>
                  recogerObjeto(
                    e,
                    "escopeta",
                    escopetaRef,
                    escopetaRecogida
                  )
                }
                style={{
                  cursor: "pointer",
                  userSelect: "none"
                }}
              />

            )}


            {/* CRÁNEO (OBJETO RECOGIBLE) */}

            {!craneoRecogido && (

              <img
                ref={craneoRef}
                src={craneo}
                className="craneo18"
                alt="Cráneo"
                draggable={false}
                onClick={(e) =>
                  recogerObjeto(
                    e,
                    "craneo",
                    craneoRef,
                    craneoRecogido
                  )
                }
                style={{
                  cursor: "pointer",
                  userSelect: "none"
                }}
              />

            )}

          </div>

        </div>

      </div>

    );

  }
);

Escena18.displayName = "Escena18";

export default Escena18;