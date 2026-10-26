import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import sr10 from "../assets/sr10.webm";
import mesa10 from "../assets/mesa10.webm";
import luz from "../assets/luz.webm";
import fondo10 from "../assets/cocina10.webm";

import pluma from "../assets/svg/pluma.svg";

import tocar from "../assets/audio/tocar.mp3";

import "../stylesheets/Escena10.css";


// Pasar a la siguiente escena cuando termine la animación del Sr. Fox
const AVANZAR_AL_TERMINAR = true;
const ESCENA_SIGUIENTE = 14;


export const Escena10 = forwardRef(
  (
    {
      cambiarEscena,
      onRecoger,
      objetoRecogido
    },
    ref
  ) => {

    // =========================================================
    // ESTADOS
    // =========================================================

    const [mostrarMesa1, setMostrarMesa1] = useState(true);


    // =========================================================
    // REFS
    // =========================================================

    const escena10Ref = useRef(null);

    const fondo10Ref = useRef(null);
    const sr10Ref = useRef(null);
    const mesa10Ref = useRef(null);
    const mesa10Ref2 = useRef(null);
    const luzRef = useRef(null);

    const plumaRef = useRef(null);

    const camaraRef = useRef(null);


    // =========================================================
    // AUDIO
    // =========================================================

    const tocarRef = useRef(null);

    if (!tocarRef.current) {

      tocarRef.current = new Audio(tocar);

    }


    // =========================================================
    // OBTENER TODOS LOS VIDEOS
    // =========================================================

    const obtenerVideos = () => {

      return [
        fondo10Ref.current,
        sr10Ref.current,
        mesa10Ref.current,
        mesa10Ref2.current,
        luzRef.current
      ].filter(Boolean);

    };


    // =========================================================
    // CLICK EN LA PLUMA
    // brillo + cámara + rebote + vuelo al slot
    // =========================================================

    const clickPluma = (e) => {

      e.stopPropagation();


      // SI YA FUE RECOGIDA
      if (objetoRecogido) {
        return;
      }


      // SONIDO INMEDIATO
      tocarRef.current.currentTime = 0;

      tocarRef.current
        .play()
        .catch(() => {});


      const plumaEl = plumaRef.current;
      const escena = escena10Ref.current;

      if (!plumaEl || !escena) {
        return;
      }


      // =======================================================
      // SLOT DESTINO (primer slot vacío)
      // =======================================================

      const slotDestino =
        document.querySelector(".slot.slot-vacio") ||
        document.querySelectorAll(".slot")[0];

      if (!slotDestino) {

        console.warn(
          "No se encontró el slot de destino."
        );

        return;
      }


      // =======================================================
      // ESTADO ACTUAL DE LA CÁMARA
      // (la escena 10 tiene su propia cámara animada, así que
      // se pausa y luego se devuelve exactamente a donde estaba)
      // =======================================================

      const escalaActual =
        Number(gsap.getProperty(escena, "scale")) || 1;

      const xActual =
        Number(gsap.getProperty(escena, "x")) || 0;

      const yActual =
        Number(gsap.getProperty(escena, "y")) || 0;

      if (camaraRef.current) {

        camaraRef.current.pause();

      }


      // =======================================================
      // POSICIONES
      // =======================================================

      const escenaRect =
        escena.getBoundingClientRect();

      const plumaRect =
        plumaEl.getBoundingClientRect();

      const slotRect =
        slotDestino.getBoundingClientRect();


      const escenaCentroX =
        escenaRect.left + escenaRect.width / 2;

      const escenaCentroY =
        escenaRect.top + escenaRect.height / 2;

      const plumaCentroX =
        plumaRect.left + plumaRect.width / 2;

      const plumaCentroY =
        plumaRect.top + plumaRect.height / 2;


      // ZOOM DE LA CÁMARA SOBRE LA PLUMA
      const ZOOM = 2;

      const offsetX =
        -ZOOM *
        (plumaCentroX - escenaCentroX) /
        escalaActual;

      const offsetY =
        -ZOOM *
        (plumaCentroY - escenaCentroY) /
        escalaActual;


      // VUELO AL SLOT (en px locales de la escena)
      const dx =
        (
          slotRect.left + slotRect.width / 2 -
          plumaCentroX
        ) / escalaActual;

      const dy =
        (
          slotRect.top + slotRect.height / 2 -
          plumaCentroY
        ) / escalaActual;


      // EVITAR DOBLE CLICK
      gsap.killTweensOf(plumaEl);


      // =======================================================
      // TIMELINE
      // =======================================================

      const tl = gsap.timeline({

        onComplete: () => {

          // Reanudar la cámara de la escena
          if (camaraRef.current) {

            camaraRef.current.resume();

          }

          // Avisar a InterfazCap
          if (onRecoger) {

            onRecoger("pluma");

          }

        }

      });


      // 1. BRILLO + GIRO
      tl.to(plumaEl, {

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


      // 2. CÁMARA HACIA LA PLUMA
      tl.to(
        escena,
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
      tl.to({}, {

        duration: 0.15

      });


      // 4. REGRESAR CÁMARA A DONDE ESTABA
      tl.to(escena, {

        scale: escalaActual,

        x: xActual,

        y: yActual,

        duration: 0.45,

        ease: "power2.inOut"

      });


      // 5. MOVER LA PLUMA AL SLOT
      tl.to(
        plumaEl,
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
      tl.to(plumaEl, {

        scale: 0.5,

        duration: 0.12,

        ease: "back.out(4)"

      });


      // 7. DESAPARECER
      tl.to(plumaEl, {

        opacity: 0,

        duration: 0.15

      });


      // 8. LIMPIAR FILTRO
      tl.set(plumaEl, {

        clearProps: "filter"

      });

    };


    // =========================================================
    // CLICK EN FOX
    // INICIAR TODAS LAS ANIMACIONES
    // =========================================================

    const iniciarAnimaciones = () => {

      const escena = escena10Ref.current;

      if (!escena) {
        return;
      }


      // MOSTRAR MESA 1
      setMostrarMesa1(true);


      // REINICIAR VIDEOS
      const videos = obtenerVideos();

      videos.forEach((video) => {

        try {

          video.currentTime = 0;

          video
            .play()
            .catch(() => {});

        } catch {}

      });


      // MATAR CUALQUIER CÁMARA ANTERIOR
      if (camaraRef.current) {

        camaraRef.current.kill();

      }


      // REINICIAR CÁMARA
      gsap.set(escena, {

        scale: 1,
        x: 0,
        y: 0,

        transformOrigin: "center center"

      });


      // TIMELINE DE CÁMARA
      const tl = gsap.timeline();

      camaraRef.current = tl;


      // 1. ZOOM HACIA FOX
      tl.to(escena, {

        scale: 1.7,

        x: -350,
        y: 0,

        duration: 2.8,

        ease: "power2.inOut"

      });


      // 2. DESPLAZAMIENTO HACIA LA IZQUIERDA
      tl.to(escena, {

        scale: 1.6,

        x: 250,
        y: 0,

        duration: 1.2,

        ease: "power2.inOut"

      });


      // 3. REGRESAR AL CENTRO
      tl.to(escena, {

        scale: 1.2,

        x: 0,
        y: 0,

        duration: 3.5,

        ease: "power2.inOut"

      });


      // 4. SUBIR Y ACERCARSE
      tl.to(escena, {

        scale: 1.7,

        x: 260,
        y: -250,

        duration: 3.5,

        ease: "power2.inOut"

      });


      // 5. PAUSA
      tl.to({}, {

        duration: 7.5

      });


      // 6. REGRESAR AL CENTRO
      tl.to(escena, {

        scale: 1.2,

        x: 0,
        y: 0,

        duration: 2.2,

        ease: "power2.inOut"

      });


      // 7. PAUSA
      tl.to({}, {

        duration: 2.7

      });


      // 8. BAJAR CÁMARA
      tl.to(escena, {

        scale: 1.2,

        x: 0,
        y: -100,

        duration: 2.2,

        ease: "power2.inOut"

      });

    };


    // =========================================================
    // OCULTAR MESA 1 EN EL SEGUNDO 3
    // =========================================================

    const revisarTiempoFox = () => {

      const video = sr10Ref.current;

      if (!video) {
        return;
      }


      if (
        video.currentTime >= 3 &&
        mostrarMesa1
      ) {

        setMostrarMesa1(false);

      }

    };


    // =========================================================
    // CUANDO TERMINA FOX
    // (la animación del Sr. Fox marca el final de la escena)
    // =========================================================

    const terminarFox = () => {

      const videos = obtenerVideos();

      videos.forEach((video) => {

        try {

          video.pause();

        } catch {}

      });


      // PASAR A LA SIGUIENTE ESCENA
      if (AVANZAR_AL_TERMINAR && cambiarEscena) {

        cambiarEscena(ESCENA_SIGUIENTE);

      }

    };


    // =========================================================
    // PAUSAR TODO
    // =========================================================

    const pausarTodo = () => {

      const videos = obtenerVideos();

      videos.forEach((video) => {

        try {

          video.pause();

        } catch {}

      });


      // PAUSAR CÁMARA
      if (camaraRef.current) {

        camaraRef.current.pause();

      }

    };


    // =========================================================
    // REANUDAR TODO
    // =========================================================

    const reanudarTodo = () => {

      const videos = obtenerVideos();

      videos.forEach((video) => {

        try {

          video
            .play()
            .catch(() => {});

        } catch {}

      });


      // REANUDAR CÁMARA
      if (camaraRef.current) {

        camaraRef.current.resume();

      }

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

    return (

      <div
        ref={escena10Ref}
        className="escena10"
      >


        {/* =====================================================
            FONDO
        ===================================================== */}

        <video
          ref={fondo10Ref}
          className="fondo10"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={fondo10}
            type="video/webm"
          />

        </video>


        {/* =====================================================
            SR. FOX
        ===================================================== */}

        <video
          ref={sr10Ref}
          className="sr10"

          muted
          playsInline
          preload="auto"

          onClick={iniciarAnimaciones}

          onTimeUpdate={revisarTiempoFox}

          onEnded={terminarFox}

          style={{
            cursor: "pointer"
          }}
        >

          <source
            src={sr10}
            type="video/webm"
          />

        </video>


        {/* =====================================================
            MESA 1
        ===================================================== */}

        {mostrarMesa1 && (

          <video
            ref={mesa10Ref}
            className="mesa10"

            muted
            playsInline
            preload="auto"
          >

            <source
              src={mesa10}
              type="video/webm"
            />

          </video>

        )}


        {/* =====================================================
            MESA 2
        ===================================================== */}

        <video
          ref={mesa10Ref2}
          className="mesa10 mesa10-2"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={mesa10}
            type="video/webm"
          />

        </video>


        {/* =====================================================
            LUZ
        ===================================================== */}

        <video
          ref={luzRef}
          className="luz10"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={luz}
            type="video/webm"
          />

        </video>


        {/* =====================================================
            PLUMA (OBJETO RECOGIBLE)
        ===================================================== */}

        {!objetoRecogido && (

          <img
            ref={plumaRef}
            src={pluma}
            className="pluma10"
            alt="Pluma"
            draggable={false}
            onClick={clickPluma}
            style={{
              cursor: "pointer",
              userSelect: "none"
            }}
          />

        )}


      </div>

    );

  }
);