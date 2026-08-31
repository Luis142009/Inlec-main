
import React, {
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import Bean from "../assets/Bean9.webm";
import fondo9 from "../assets/fondo9.webm";
import esqueleto from "../assets/esqueleto.webm";
import lapiz from "../assets/lapiz.webm";

import huella from "../assets/svg/huella.svg";

import tocar from "../assets/audio/tocar.mp3";

import "../stylesheets/Escena9.css";


export const Escena9 = forwardRef(
  (
    {
      cambiarEscena,
      onRecoger,

      // IMPORTANTE:
      // InterfazCap enviará objetoRecogido
      objetoRecogido
    },
    ref
  ) => {


    // =========================================================
    // REFS
    // =========================================================

    const escena9Ref = useRef(null);

    const fondo9Ref = useRef(null);
    const beanRef = useRef(null);
    const esqueletoRef = useRef(null);
    const lapizRef = useRef(null);

    const huellasRef = useRef(null);


    // =========================================================
    // AUDIO
    // =========================================================

    const tocarRef = useRef(
      new Audio(tocar)
    );


    const movimientoIniciado = useRef(false);

    const timelineRef = useRef(null);


    // =========================================================
    // REPRODUCIR VIDEO
    // =========================================================

    const reproducirVideo = (video) => {

      if (!video) {
        return;
      }

      video.currentTime = 0;

      video
        .play()
        .catch(() => {});

    };


    // =========================================================
    // CLICK EN HUELLAS
    // =========================================================

    const clickHuellas = (e) => {

      e.stopPropagation();


      // =======================================================
      // SI YA FUE RECOGIDA
      // =======================================================

      if (objetoRecogido) {
        return;
      }


      // =======================================================
      // SONIDO INMEDIATO AL HACER CLICK
      // =======================================================

      tocarRef.current.currentTime = 0;

      tocarRef.current
        .play()
        .catch(() => {});


      // =======================================================
      // OBTENER ELEMENTOS
      // =======================================================

      const huellas = huellasRef.current;
      const escena = escena9Ref.current;


      if (!huellas || !escena) {
        return;
      }


      // =======================================================
      // OBTENER POSICIONES
      // =======================================================

      const escenaRect =
        escena.getBoundingClientRect();

      const huellasRect =
        huellas.getBoundingClientRect();


      // =======================================================
      // CENTRO DE LA ESCENA
      // =======================================================

      const centroX =
        escenaRect.width / 2;

      const centroY =
        escenaRect.height / 2;


      // =======================================================
      // CENTRO DE LAS HUELLAS
      // =======================================================

      const huellasX =
        huellasRect.left -
        escenaRect.left +
        huellasRect.width / 2;

      const huellasY =
        huellasRect.top -
        escenaRect.top +
        huellasRect.height / 2;


      // =======================================================
      // OFFSET DE CÁMARA
      // =======================================================

      const offsetX =
        centroX - huellasX;

      const offsetY =
        centroY - huellasY;


      // =======================================================
      // BUSCAR SLOT
      // =======================================================

      const slots =
        document.querySelectorAll(".slot");

      const slotDestino =
        slots[0];


      if (!slotDestino) {

        console.warn(
          "No se encontró el slot de destino."
        );

        return;
      }


      // =======================================================
      // POSICIÓN DEL SLOT
      // =======================================================

      const slotRect =
        slotDestino.getBoundingClientRect();


      const dx =
        slotRect.left +
        slotRect.width / 2 -
        (
          huellasRect.left +
          huellasRect.width / 2
        );


      const dy =
        slotRect.top +
        slotRect.height / 2 -
        (
          huellasRect.top +
          huellasRect.height / 2
        );


      // =======================================================
      // EVITAR DOBLE CLICK
      // =======================================================

      gsap.killTweensOf(huellas);


      // =======================================================
      // TIMELINE
      // =======================================================

      const tl = gsap.timeline({

        onComplete: () => {

          // =====================================================
          // AVISAR A INTERFAZCAP
          // =====================================================

          if (onRecoger) {

            onRecoger("huella");

          }

        }

      });


      // =======================================================
      // 1. BRILLO + GIRO
      // =======================================================

      tl.to(huellas, {

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


      // =======================================================
      // 2. CÁMARA HACIA LAS HUELLAS
      // =======================================================

      tl.to(
        escena,
        {

          scale: 2,

          x: offsetX,

          y: offsetY,

          duration: 0.45,

          ease: "power2.out"

        },
        "<"
      );


      // =======================================================
      // 3. ESPERA
      // =======================================================

      tl.to({}, {

        duration: 0.15

      });


      // =======================================================
      // 4. REGRESAR CÁMARA
      // =======================================================

      tl.to(escena, {

        scale: 1,

        x: 0,

        y: 0,

        duration: 0.45,

        ease: "power2.inOut"

      });


      // =======================================================
      // 5. MOVER HUELLAS AL SLOT
      // =======================================================

      tl.to(
        huellas,
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


      // =======================================================
      // 6. REBOTE
      // =======================================================

      tl.to(huellas, {

        scale: 0.5,

        duration: 0.12,

        ease: "back.out(4)"

      });


      // =======================================================
      // 7. DESAPARECER
      // =======================================================

      tl.to(huellas, {

        opacity: 0,

        duration: 0.15

      });


      // =======================================================
      // 8. LIMPIAR FILTRO
      // =======================================================

      tl.set(huellas, {

        clearProps: "filter"

      });

    };


    // =========================================================
    // INICIAR CÁMARA
    // =========================================================

    const iniciarCamara = () => {

      if (movimientoIniciado.current) {
        return;
      }

      movimientoIniciado.current = true;


      const escena = escena9Ref.current;

      const fondo = fondo9Ref.current;
      const bean = beanRef.current;
      const esqueletoVideo = esqueletoRef.current;
      const lapizVideo = lapizRef.current;


      if (!escena) {
        return;
      }


      // =======================================================
      // REINICIAR VIDEOS
      // =======================================================

      [
        fondo,
        bean,
        esqueletoVideo,
        lapizVideo
      ].forEach((video) => {

        if (video) {

          video.pause();

          video.currentTime = 0;

        }

      });


      // =======================================================
      // FONDO + BEAN
      // =======================================================

      reproducirVideo(fondo);
      reproducirVideo(bean);


      // =======================================================
      // POSICIÓN INICIAL
      // =======================================================

      gsap.set(escena, {

        scale: 1,

        x: 0,

        y: 0,

        transformOrigin: "center center"

      });


      // =======================================================
      // TIMELINE
      // =======================================================

      const tl = gsap.timeline({

        defaults: {

          ease: "power3.inOut"

        }

      });


      timelineRef.current = tl;


      // =======================================================
      // 1. ZOOM BEAN
      // =======================================================

      tl.to(escena, {

        duration: 3,

        scale: 1.8,

        x: -180,

        y: -70

      });


      // =======================================================
      // PAUSA
      // =======================================================

      tl.to({}, {

        duration: 1

      });


      // =======================================================
      // 2. ESQUELETO
      // =======================================================

      tl.to(escena, {

        duration: 3,

        scale: 2.5,

        x: 720,

        y: -40,

        onComplete: () => {

          reproducirVideo(esqueletoVideo);

        }

      });


      // =======================================================
      // MANTENER ESQUELETO
      // =======================================================

      tl.to({}, {

        duration: 2

      });


      // =======================================================
      // 3. LÁPIZ
      // =======================================================

      tl.to(escena, {

        duration: 3,

        scale: 2.5,

        x: -1020,

        y: -40,

        onComplete: () => {

          reproducirVideo(lapizVideo);

        }

      });


      // =======================================================
      // MANTENER LÁPIZ
      // =======================================================

      tl.to({}, {

        duration: 1

      });


      // =======================================================
      // 4. VOLVER
      // =======================================================

      tl.to(escena, {

        duration: 3.5,

        scale: 1,

        x: 0,

        y: 0

      });


      // =======================================================
      // 5. SEGUNDO ZOOM BEAN
      // =======================================================

      tl.to(escena, {

        duration: 3.5,

        scale: 2.8,

        x: -180,

        y: 50

      });


      // =======================================================
      // MANTENER BEAN
      // =======================================================

      tl.to({}, {

        duration: 2

      });


      // =======================================================
      // 6. VOLVER
      // =======================================================

      tl.to(escena, {

        duration: 3.5,

        scale: 1,

        x: 0,

        y: 0

      });


      // =======================================================
      // FINAL
      // =======================================================

      tl.call(() => {

        // Final de la animación

      });

    };


    // =========================================================
    // PAUSAR TODA LA ESCENA
    // =========================================================

    const pausarTodo = () => {

      const videos = [

        fondo9Ref.current,
        beanRef.current,
        esqueletoRef.current,
        lapizRef.current

      ];


      videos.forEach((video) => {

        if (video) {

          video.pause();

        }

      });


      if (timelineRef.current) {

        timelineRef.current.pause();

      }

    };


    // =========================================================
    // REANUDAR TODA LA ESCENA
    // =========================================================

    const reanudarTodo = () => {

      const videos = [

        fondo9Ref.current,
        beanRef.current,
        esqueletoRef.current,
        lapizRef.current

      ];


      videos.forEach((video) => {

        if (video) {

          video
            .play()
            .catch(() => {});

        }

      });


      if (timelineRef.current) {

        timelineRef.current.resume();

      }

    };


    // =========================================================
    // EXPONER FUNCIONES
    // =========================================================

    useImperativeHandle(ref, () => ({

      iniciarCamara,

      pausarTodo,

      reanudarTodo

    }));


    // =========================================================
    // RETURN
    // =========================================================

    return (

      <div
        ref={escena9Ref}
        className="escena9"
      >


        {/* =================================================
            FONDO
        ================================================= */}

        <video
          ref={fondo9Ref}
          className="fondo9"
          muted
          playsInline
          preload="auto"
        >

          <source
            src={fondo9}
            type="video/webm"
          />

        </video>


        {/* =================================================
            BEAN
        ================================================= */}

        <video
          ref={beanRef}
          className="bean9"
          muted
          playsInline
          preload="auto"
          onClick={iniciarCamara}
          style={{
            cursor: "pointer"
          }}
        >

          <source
            src={Bean}
            type="video/webm"
          />

        </video>


        {/* =================================================
            ESQUELETO
        ================================================= */}

        <video
          ref={esqueletoRef}
          className="esqueleto9"
          muted
          playsInline
          preload="auto"
        >

          <source
            src={esqueleto}
            type="video/webm"
          />

        </video>


        {/* =================================================
            LÁPIZ
        ================================================= */}

        <video
          ref={lapizRef}
          className="lapiz9"
          muted
          playsInline
          preload="auto"
        >

          <source
            src={lapiz}
            type="video/webm"
          />

        </video>


        {/* =================================================
            HUELLAS
        ================================================= */}

        {!objetoRecogido && (

          <img
            ref={huellasRef}
            src={huella}
            className="huellas9"
            alt="Huellas"
            draggable={false}
            onClick={clickHuellas}
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

