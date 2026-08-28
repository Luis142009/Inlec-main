import React, {
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import olor from "../assets/olor.webm";
import boggis7 from "../assets/boggis7.webm";
import fondo7 from "../assets/escenario7.webm";

import "../stylesheets/Escena7.css";


export const Escena7 = forwardRef(
  ({ cambiarEscena }, ref) => {

    // =========================================================
    // REFS
    // =========================================================

    const escena7Ref = useRef(null);

    const fondo7Ref = useRef(null);
    const boggis7Ref = useRef(null);
    const olorRef = useRef(null);

    const movimientoIniciado = useRef(false);


    // =========================================================
    // MOVIMIENTO DE CÁMARA
    // =========================================================

    const iniciarCamara = () => {

      if (movimientoIniciado.current) {
        return;
      }

      movimientoIniciado.current = true;

      const escena = escena7Ref.current;

      if (!escena) {
        return;
      }


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
      // OLOR - POSICIÓN INICIAL
      // =======================================================

      if (olorRef.current) {

        gsap.set(olorRef.current, {
          opacity: 0,
          scale: 1,
          transformOrigin: "center center"
        });

      }


      // =======================================================
      // SECUENCIA DE CÁMARA
      // =======================================================

      const tl = gsap.timeline();


      // -------------------------------------------------------
      // 1. ACERCAMIENTO HACIA BOGGIS
      // -------------------------------------------------------

      tl.to(escena, {
        scale: 1.8,
        y: -270,
        duration: 2.5,
        ease: "power2.inOut"
      });


      // -------------------------------------------------------
      // 2. SUBE
      // -------------------------------------------------------

      tl.to(escena, {
        scale: 2.4,
        x: -80,
        y: -210,
        duration: 2.0,
        ease: "power2.inOut"
      });


      // -------------------------------------------------------
      // 3. VOLVEMOS A SUBIR
      // -------------------------------------------------------

      tl.to(escena, {
        scale: 2.3,
        y: -450,
        duration: 1.5,
        ease: "power2.inOut"
      });


      // -------------------------------------------------------
      // 4. ZOOM HACIA LA CARA DE BOGGIS
      // -------------------------------------------------------

      tl.to(escena, {
        scale: 3.8,
        x: -350,
        y: -100,
        duration: 4.0,
        ease: "power2.inOut"
      });


      // -------------------------------------------------------
      // 4.5. APARECE OLOR
      // -------------------------------------------------------

      tl.to(olorRef.current, {

        opacity: 1,

        duration: 0.3,

        ease: "power1.out",

        onStart: () => {

          if (olorRef.current) {

            olorRef.current.currentTime = 0;

            olorRef.current
              .play()
              .catch(() => {});

          }

        }

      });


      // -------------------------------------------------------
      // 4.6. OLOR SE MANTIENE
      // -------------------------------------------------------

      tl.to({}, {
        duration: 3.0
      });


      // -------------------------------------------------------
      // 5. REGRESO DE CÁMARA
      // -------------------------------------------------------

      tl.to(escena, {
        scale: 1.0,
        x: 0,
        y: 0,
        duration: 2.0,
        ease: "power2.inOut"
      });


      // -------------------------------------------------------
      // 5.1. OLOR SE AGRANDA
      // -------------------------------------------------------

      tl.to(
        olorRef.current,
        {
          scale: 3.5,
          duration: 2.0,
          ease: "power2.inOut"
        },
        "<"
      );


      // -------------------------------------------------------
// 6. DESAPARECE OLOR
// -------------------------------------------------------

tl.to(olorRef.current, {
  opacity: 0,
  duration: 0.15,
  ease: "power1.in",

  onComplete: () => {

    if (olorRef.current) {
      olorRef.current.pause();
      olorRef.current.currentTime = 0;
    }

  }
});


// =======================================================
// 7. CAMBIO INMEDIATO A ESCENA 8
// =======================================================

tl.eventCallback("onComplete", () => {

  cambiarEscena(10);

});

    };


    // =========================================================
    // INICIAR VIDEOS
    // =========================================================

    const iniciarVideos = () => {

      // -------------------------------------------------------
      // FONDO
      // -------------------------------------------------------

      if (fondo7Ref.current) {

        fondo7Ref.current.currentTime = 0;

        fondo7Ref.current
          .play()
          .catch(() => {});

      }


      // -------------------------------------------------------
      // BOGGIS
      // -------------------------------------------------------

      if (boggis7Ref.current) {

        boggis7Ref.current.currentTime = 0;

        boggis7Ref.current
          .play()
          .catch(() => {});

      }

    };


    // =========================================================
    // CLICK EN BOGGIS
    // =========================================================

    const handleBoggisClick = () => {

      iniciarVideos();

      iniciarCamara();

    };


    // =========================================================
    // PAUSAR TODA LA ESCENA
    // =========================================================

    const pausarTodo = () => {

      const videos = [
        fondo7Ref.current,
        boggis7Ref.current,
        olorRef.current
      ];

      videos.forEach((video) => {

        if (video) {
          video.pause();
        }

      });

      gsap.globalTimeline.pause();

    };


    // =========================================================
    // REANUDAR TODA LA ESCENA
    // =========================================================

    const reanudarTodo = () => {

      const videos = [
        fondo7Ref.current,
        boggis7Ref.current,
        olorRef.current
      ];

      videos.forEach((video) => {

        if (video) {

          video
            .play()
            .catch(() => {});

        }

      });

      gsap.globalTimeline.resume();

    };


    // =========================================================
    // EXPONER FUNCIONES
    // =========================================================

    useImperativeHandle(ref, () => ({
      pausarTodo,
      reanudarTodo
    }));


    // =========================================================
    // RETURN
    // =========================================================

    return (

      <div
        ref={escena7Ref}
        className="escena7"
      >

        {/* =================================================
            FONDO
        ================================================= */}

        <video
          ref={fondo7Ref}
          className="fondo7"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={fondo7}
            type="video/webm"
          />

        </video>


        {/* =================================================
            BOGGIS
        ================================================= */}

        <video
          ref={boggis7Ref}
          className="boggis7"

          muted
          playsInline
          preload="auto"

          onClick={handleBoggisClick}

          style={{
            cursor: "pointer"
          }}
        >

          <source
            src={boggis7}
            type="video/webm"
          />

        </video>


        {/* =================================================
            OLOR
        ================================================= */}

        <video
          ref={olorRef}
          className="olor"

          muted
          playsInline
          preload="auto"

          style={{
            opacity: 0
          }}
        >

          <source
            src={olor}
            type="video/webm"
          />

        </video>

      </div>

    );

  }
);