import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect
} from "react";

import { gsap } from "gsap";

import arbo3s from "../assets/arbol3s.webm";
import escenario3 from "../assets/escenario3.webm";

import "../stylesheets/Escena3.css";


export const Escena3 = forwardRef(
  ({ cambiarEscena }, ref) => {

    // =========================================================
    // REFS
    // =========================================================

    const escenaRef = useRef(null);

    const arbo3sRef = useRef(null);
    const escenario3Ref = useRef(null);

    const cameraTimelineRef = useRef(null);

    const escenaIniciada = useRef(false);


    // =========================================================
    // POSICIÓN INICIAL DE LA CÁMARA
    // =========================================================

    useEffect(() => {

      const escena = escenaRef.current;

      if (!escena) return;


      gsap.set(escena, {

        scale: 1.7,

        x: -100,

        y: 150,

        transformOrigin: "50% 50%"

      });

    }, []);


    // =========================================================
    // INICIAR ESCENA
    // =========================================================

    const iniciarEscena = () => {

      // Evitar múltiples inicios
      if (escenaIniciada.current) {
        return;
      }

      escenaIniciada.current = true;


      // =====================================================
      // 1. REPRODUCIR ÁRBOLES
      // =====================================================

      if (arbo3sRef.current) {

        arbo3sRef.current.currentTime = 0;

        arbo3sRef.current
          .play()
          .catch(() => {});

      }


      // =====================================================
      // 2. REPRODUCIR ESCENARIO
      // =====================================================

      if (escenario3Ref.current) {

        escenario3Ref.current.currentTime = 0;

        escenario3Ref.current
          .play()
          .catch(() => {});

      }


      // =====================================================
      // 3. INICIAR CÁMARA
      // =====================================================

      iniciarCamara();

    };


    // =========================================================
    // CÁMARA
    // =========================================================

   // =========================================================
// CÁMARA
// =========================================================

const iniciarCamara = () => {

  const escena = escenaRef.current;

  if (!escena) return;


  // ---------------------------------------------------------
  // DETENER MOVIMIENTO ANTERIOR
  // ---------------------------------------------------------

  gsap.killTweensOf(escena);


  // ---------------------------------------------------------
  // CREAR TIMELINE
  // ---------------------------------------------------------

  const tl = gsap.timeline();

  cameraTimelineRef.current = tl;


  // =========================================================
  // 1. BAJAR
  // =========================================================

  tl.to(escena, {

    y: -237,

    duration: 2.5,

    ease: "power3.inOut"

  });


  // =========================================================
  // 2. ALEJARSE Y VOLVER A POSICIÓN NORMAL
  // =========================================================

  tl.to(escena, {

    scale: 1,

    y: 0,

    x: -10,

    duration: 3,

    ease: "power2.out",

    // =======================================================
    // CUANDO TERMINE LA CÁMARA → ESCENA 4
    // =======================================================

    onComplete: () => {

      if (cambiarEscena) {

        cambiarEscena(7);

      }

    }

  });

};


    // =========================================================
    // PAUSAR TODA LA ESCENA
    // =========================================================

    const pausarTodo = () => {

      const videos = [

        arbo3sRef.current,
        escenario3Ref.current

      ];


      videos.forEach((video) => {

        if (video) {

          video.pause();

        }

      });


      // -------------------------------------------------------
      // PAUSAR CÁMARA
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

        arbo3sRef.current,
        escenario3Ref.current

      ];


      videos.forEach((video) => {

        if (video) {

          video
            .play()
            .catch(() => {});

        }

      });


      // -------------------------------------------------------
      // REANUDAR CÁMARA
      // -------------------------------------------------------

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
        className="escena3"
        onClick={iniciarEscena}
      >


        {/* =================================================
            ÁRBOLES
        ================================================= */}

        <video
          ref={arbo3sRef}
          className="arbo3s"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={arbo3s}
            type="video/webm"
          />

        </video>


        {/* =================================================
            ESCENARIO
        ================================================= */}

        <video
          ref={escenario3Ref}
          className="escenario3"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={escenario3}
            type="video/webm"
          />

        </video>


      </div>

    );

  }
);