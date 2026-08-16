import React, {
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import "../stylesheets/Escena2R.css";

import fondo from "../assets/bosquet.webm";
import ash from "../assets/ash.webm";
import cartelash from "../assets/cartelash.webm";
import kris from "../assets/kristoferson.webm";
import kriscartel from "../assets/kriscartel.webm";


export const Escena2alfa = forwardRef(
  ({ cambiarEscena }, ref) => {

    // =========================================================
    // REFS
    // =========================================================

    const escenaRef = useRef(null);

    const fondoRef = useRef(null);

    const krisRef = useRef(null);
    const krisCartelRef = useRef(null);

    const ashRef = useRef(null);
    const ashCartelRef = useRef(null);

    // Timeline de la cámara
    const cameraTimelineRef = useRef(null);

    // Evitar múltiples inicios
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


      // =====================================================
      // 1. REPRODUCIR FONDO
      // =====================================================

      if (fondoRef.current) {

        fondoRef.current.currentTime = 0;

        fondoRef.current
          .play()
          .catch(() => {});

      }


      // =====================================================
      // 2. REPRODUCIR ASH
      // =====================================================

      if (ashRef.current) {

        // Ash empieza quieto desde el inicio.
        // NO saltamos al segundo 11 todavía.

        ashRef.current.currentTime = 0;

        ashRef.current
          .play()
          .catch(() => {});

      }


      // =====================================================
      // 3. REPRODUCIR KRISTOFERSON
      // =====================================================

      if (krisRef.current) {

        krisRef.current.currentTime = 0;

        krisRef.current
          .play()
          .catch(() => {});

      }


      // =====================================================
      // 4. INICIAR CÁMARA
      // =====================================================

      iniciarCamara();

    };


    // =========================================================
    // CÁMARA
    // =========================================================

    const iniciarCamara = () => {

      const escena = escenaRef.current;

      if (!escena) return;


      // Detener cualquier movimiento anterior

      gsap.killTweensOf(escena);


      // =====================================================
      // POSICIÓN INICIAL
      // =====================================================

      gsap.set(escena, {

        scale: 1,
        x: 0,
        y: 0,

        transformOrigin: "50% 50%"

      });


      // =====================================================
      // TIMELINE
      // =====================================================

      const tl = gsap.timeline();

      cameraTimelineRef.current = tl;


      // =====================================================
      // 1. ZOOM HACIA KRISTOFERSON
      // =====================================================

      tl.to(escena, {

        scale: 3,

        x: -320,

        y: -120,

        duration: 3,

        ease: "power3.inOut",

        onComplete: () => {

          // =================================================
          // CARTEL DE KRISTOFERSON
          // =================================================

          if (krisCartelRef.current) {

            krisCartelRef.current.currentTime = 0;

            krisCartelRef.current
              .play()
              .catch(() => {});

          }

        }

      });


      // =====================================================
      // 2. ESPERA PARA EL CARTEL
      // =====================================================

      tl.to({}, {

        duration: 3

      });


      // =====================================================
      // 3. BAJAR CÁMARA
      // =====================================================

      tl.to(escena, {

        y: -250,

        duration: 2,

        ease: "power2.inOut"

      });


      // =====================================================
      // 4. VOLVER ARRIBA
      // =====================================================

      tl.to(escena, {

        y: -160,

        duration: 2.2,

        ease: "power2.inOut"

      });


      // =====================================================
      // 5. PEQUEÑA ESPERA
      // =====================================================

      tl.to({}, {

        duration: 0.5

      });


      // =====================================================
      // 6. PASAR HACIA ASH
      // =====================================================

      tl.to(escena, {

        scale: 3,

        x: 560,

        y: -190,

        duration: 9,

        ease: "power2.inOut",


       

        // =================================================
        // CUANDO TERMINA EL ÚLTIMO MOVIMIENTO
        // PASAMOS A ESCENA 5
        // =================================================

        onComplete: () => {

          if (cambiarEscena) {

            cambiarEscena(5);

          }

        }

      });


      // =====================================================
      // 7. CARTEL DE ASH
      // =====================================================

      tl.call(() => {

        if (ashCartelRef.current) {

          ashCartelRef.current.currentTime = 0;

          ashCartelRef.current
            .play()
            .catch(() => {});

        }

      });

    };


    // =========================================================
    // PAUSAR TODA LA ESCENA
    // =========================================================

    const pausarTodo = () => {

      const videos = [

        fondoRef.current,

        krisRef.current,

        krisCartelRef.current,

        ashRef.current,

        ashCartelRef.current

      ];


      // -------------------------------------------------------
      // PAUSAR VIDEOS
      // -------------------------------------------------------

      videos.forEach((video) => {

        if (video) {

          video.pause();

        }

      });


      // -------------------------------------------------------
      // PAUSAR CÁMARA GSAP
      // -------------------------------------------------------

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

        krisRef.current,

        krisCartelRef.current,

        ashRef.current,

        ashCartelRef.current

      ];


      // -------------------------------------------------------
      // REANUDAR VIDEOS
      // -------------------------------------------------------

      videos.forEach((video) => {

        if (video) {

          video
            .play()
            .catch(() => {});

        }

      });


      // -------------------------------------------------------
      // REANUDAR CÁMARA GSAP
      // -------------------------------------------------------

      if (cameraTimelineRef.current) {

        cameraTimelineRef.current.resume();

      }

    };


    // =========================================================
    // EXPONER FUNCIONES A INTERFAZCAP
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
            KRISTOFERSON
        ================================================= */}

        <video
          ref={krisRef}
          className="kris"

          muted
          playsInline
          preload="auto"

          onClick={iniciarEscena}
        >

          <source
            src={kris}
            type="video/webm"
          />

        </video>


        {/* =================================================
            CARTEL KRISTOFERSON
        ================================================= */}

        <video
          ref={krisCartelRef}
          className="kriscartel"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={kriscartel}
            type="video/webm"
          />

        </video>


        {/* =================================================
            ASH
        ================================================= */}

        <video
          ref={ashRef}
          className="ash"

          muted
          playsInline
          preload="auto"

          onClick={iniciarEscena}
        >

          <source
            src={ash}
            type="video/webm"
          />

        </video>


        {/* =================================================
            CARTEL ASH
        ================================================= */}

        <video
          ref={ashCartelRef}
          className="cartelash"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={cartelash}
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