import React, {
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import "../stylesheets/Escena2R.css";

import fondo from "../assets/2B.webm";
import charles from "../assets/charlesb.webm";
import cartelchar from "../assets/cartelchar.webm";
import junior from "../assets/junior.webm";
import carteljun from "../assets/carteljun.webm";


export const Escena2beta = forwardRef(
  ({ cambiarEscena }, ref) => {

    // =========================================================
    // REFS
    // =========================================================

    const escenaRef = useRef(null);

    const fondoRef = useRef(null);

    const charlesRef = useRef(null);
    const charlesCartelRef = useRef(null);

    const juniorRef = useRef(null);
    const juniorCartelRef = useRef(null);

    const cameraTimelineRef = useRef(null);

    const escenaIniciada = useRef(false);


    // =========================================================
    // INICIAR ESCENA
    // =========================================================

    const iniciarEscena = () => {

      // Evitar múltiples clicks
      if (escenaIniciada.current) {
        return;
      }

      escenaIniciada.current = true;


      // =======================================================
      // REPRODUCIR FONDO
      // =======================================================

      if (fondoRef.current) {

        fondoRef.current.currentTime = 0;

        fondoRef.current
          .play()
          .catch(() => {});

      }


      // =======================================================
      // REPRODUCIR CHARLES
      // =======================================================

      if (charlesRef.current) {

        charlesRef.current.currentTime = 0;

        charlesRef.current
          .play()
          .catch(() => {});

      }


      // =======================================================
      // REPRODUCIR JUNIOR
      // =======================================================

      if (juniorRef.current) {

        juniorRef.current.currentTime = 0;

        juniorRef.current
          .play()
          .catch(() => {});

      }


      // =======================================================
      // INICIAR CÁMARA
      // =======================================================

      iniciarCamara();

    };


    // =========================================================
    // CÁMARA
    // =========================================================

    const iniciarCamara = () => {

      const escena = escenaRef.current;

      if (!escena) {
        return;
      }


      // Detener cualquier movimiento anterior
      gsap.killTweensOf(escena);


      // =======================================================
      // POSICIÓN INICIAL
      // =======================================================

      gsap.set(escena, {

        scale: 1,
        x: 0,
        y: 0,

        transformOrigin: "50% 50%"

      });


      // =======================================================
      // TIMELINE
      // =======================================================

      const tl = gsap.timeline();

      cameraTimelineRef.current = tl;


      // =======================================================
      // 1. ZOOM HACIA CHARLES
      // =======================================================

      tl.to(escena, {

        scale: 3,

        x: -290,

        y: -290,

        duration: 3,

        ease: "power3.inOut",

        onComplete: () => {

          // =================================================
          // CARTEL DE CHARLES
          // =================================================

          if (charlesCartelRef.current) {

            charlesCartelRef.current.currentTime = 0;

            charlesCartelRef.current
              .play()
              .catch(() => {});

          }

        }

      });


      // =======================================================
      // 2. ESPERA CARTEL CHARLES
      // =======================================================

      tl.to({}, {

        duration: 3

      });


      // =======================================================
      // 3. VOLVER ARRIBA
      // =======================================================

      tl.to(escena, {

        y: -500,

        duration: 2.2,

        ease: "power2.inOut"

      });


      // =======================================================
      // 4. PEQUEÑA ESPERA
      // =======================================================

      tl.to({}, {

        duration: 0.5

      });


      // =======================================================
      // 5. PASAR HACIA JUNIOR
      // =======================================================

      tl.to(escena, {

        scale: 3,

        x: 560,

        y: -450,

        duration: 3,

        ease: "power2.inOut"

      });


      // =======================================================
      // 6. CARTEL DE JUNIOR
      // =======================================================

      tl.call(() => {

        if (juniorCartelRef.current) {

          juniorCartelRef.current.currentTime = 1;

          juniorCartelRef.current
            .play()
            .catch(() => {});

        }

      });


      // =======================================================
      // 7. ESPERA FINAL
      // =======================================================

      tl.to({}, {

        duration: 2

      });


      // =======================================================
      // 8. PASAR A ESCENA 3
      // =======================================================

      tl.call(() => {

        cambiarEscena(6);

      });

    };


    // =========================================================
    // PAUSAR TODA LA ESCENA
    // =========================================================

    const pausarTodo = () => {

      const videos = [

        fondoRef.current,

        charlesRef.current,

        charlesCartelRef.current,

        juniorRef.current,

        juniorCartelRef.current

      ];


      videos.forEach((video) => {

        if (video) {

          video.pause();

        }

      });


      // Pausar cámara

      if (cameraTimelineRef.current) {

        cameraTimelineRef.current.pause();

      }

    };


    // =========================================================
    // REANUDAR TODA LA ESCENA
    // =========================================================

    const reanudarTodo = () => {

      const videos = [

        fondoRef.current,

        charlesRef.current,

        charlesCartelRef.current,

        juniorRef.current,

        juniorCartelRef.current

      ];


      videos.forEach((video) => {

        if (video) {

          video
            .play()
            .catch(() => {});

        }

      });


      // Reanudar cámara

      if (cameraTimelineRef.current) {

        cameraTimelineRef.current.resume();

      }

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
        ref={escenaRef}
        className="escena2alfa"
      >


        {/* =================================================
            CHARLES
        ================================================= */}

        <video
          ref={charlesRef}
          className="charles"

          muted
          playsInline
          preload="auto"

          loop

          onClick={iniciarEscena}

        >

          <source
            src={charles}
            type="video/webm"
          />

        </video>


        {/* =================================================
            CARTEL CHARLES
        ================================================= */}

        <video
          ref={charlesCartelRef}
          className="cartelchar"

          muted
          playsInline
          preload="auto"

        >

          <source
            src={cartelchar}
            type="video/webm"
          />

        </video>


        {/* =================================================
            JUNIOR
        ================================================= */}

        <video
          ref={juniorRef}
          className="junior"

          muted
          playsInline
          preload="auto"

          onClick={iniciarEscena}

        >

          <source
            src={junior}
            type="video/webm"
          />

        </video>


        {/* =================================================
            CARTEL JUNIOR
        ================================================= */}

        <video
          ref={juniorCartelRef}
          className="cartejun"

          muted
          playsInline
          preload="auto"

        >

          <source
            src={carteljun}
            type="video/webm"
          />

        </video>


        {/* =================================================
            FONDO
        ================================================= */}

        <video
          ref={fondoRef}
          className="fondo"

          muted
          playsInline
          preload="auto"

        >

          <source
            src={fondo}
            type="video/webm"
          />

        </video>


      </div>

    );

  }
);