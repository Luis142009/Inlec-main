
import React, {
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import Bunce from "../assets/Bunce.webm";
import escenario8 from "../assets/escenario8.webm";

import "../stylesheets/Escena8.css";


export const Escena8 = forwardRef(
  ({ cambiarEscena }, ref) => {

    // =========================================================
    // REFS
    // =========================================================

    const escena8Ref = useRef(null);

    const escenario8Ref = useRef(null);
    const bunceRef = useRef(null);

    const movimientoIniciado = useRef(false);

    const timelineRef = useRef(null);


    // =========================================================
    // INICIAR ESCENA
    // =========================================================

    const iniciarCamara = () => {

      // -------------------------------------------------------
      // EVITAR QUE SE EJECUTE MÁS DE UNA VEZ
      // -------------------------------------------------------

      if (movimientoIniciado.current) {
        return;
      }

      movimientoIniciado.current = true;


      const escena = escena8Ref.current;
      const bunce = bunceRef.current;
      const escenario = escenario8Ref.current;


      if (!escena) {
        return;
      }


      // =======================================================
      // REINICIAR VIDEOS
      // =======================================================

      if (bunce) {

        bunce.currentTime = 0;

        bunce
          .play()
          .catch(() => {});

      }


      if (escenario) {

        escenario.currentTime = 0;

        escenario
          .play()
          .catch(() => {});

      }


      // =======================================================
      // POSICIÓN INICIAL DE CÁMARA
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
          ease: "power2.inOut"
        },

        onComplete: () => {

          // ===================================================
          // DETENER VIDEOS
          // ===================================================

          if (bunce) {
            bunce.pause();
          }

          if (escenario) {
            escenario.pause();
          }


          // ===================================================
          // PASAR A LA ESCENA 12
          // ===================================================

          cambiarEscena(12);

        }

      });


      timelineRef.current = tl;


      // =======================================================
      // 1. ZOOM INICIAL
      // 0 → 3 SEGUNDOS
      // =======================================================

      tl.to(escena, {

        scale: 1.8,

        x: -100,

        y: -80,

        duration: 3

      });


      // =======================================================
      // 2. MOVIMIENTO HACIA ARRIBA
      // 3 → 6 SEGUNDOS
      // =======================================================

      tl.to(escena, {

        scale: 1.8,

        x: -100,

        y: -300,

        duration: 3

      });


      // =======================================================
      // 3. ZOOM HACIA BUNCE
      // 6 → 8 SEGUNDOS
      // =======================================================

      tl.to(escena, {

        scale: 2.8,

        x: -300,

        y: 40,

        duration: 2

      });


      // =======================================================
      // 4. SE MANTIENE
      // 8 → 9 SEGUNDOS
      // =======================================================

      tl.to({}, {

        duration: 1

      });


      // =======================================================
      // 5. MOVIMIENTO FINAL
      // 9 → 12 SEGUNDOS
      // =======================================================

      tl.to(escena, {

        scale: 1.9,

        x: -400,

        y: -240,

        duration: 3

      });


      // =======================================================
      // 6. ESPERA FINAL
      // 12 → 14 SEGUNDOS
      // =======================================================

      tl.to({}, {

        duration: 2

      });

    };


    // =========================================================
    // PAUSAR TODA LA ESCENA
    // =========================================================

    const pausarTodo = () => {

      const videos = [

        escenario8Ref.current,

        bunceRef.current

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

        escenario8Ref.current,

        bunceRef.current

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

      pausarTodo,

      reanudarTodo,

      iniciarCamara

    }));


    // =========================================================
    // RETURN
    // =========================================================

    return (

      <div
        ref={escena8Ref}
        className="escena8"
      >

        {/* =================================================
            ESCENARIO
        ================================================= */}

        <video
          ref={escenario8Ref}

          className="escenario8"

          muted

          playsInline

          preload="auto"

        >

          <source
            src={escenario8}
            type="video/webm"
          />

        </video>


        {/* =================================================
            BUNCE
        ================================================= */}

        <video
          ref={bunceRef}

          className="bunce8"

          muted

          playsInline

          preload="auto"

          onClick={iniciarCamara}

          style={{
            cursor: "pointer"
          }}

        >

          <source
            src={Bunce}
            type="video/webm"
          />

        </video>


      </div>

    );

  }
);

