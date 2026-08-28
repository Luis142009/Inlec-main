import {
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import "../stylesheets/Escena2.css";

import hojas from "../assets/hojass.webm";
import sr2 from "../assets/srfox2.webm";
import pasto2 from "../assets/pasto2.webm";
import fondo2 from "../assets/fondo2.webm";
import cartel from "../assets/cartel.webm";
import sol2 from "../assets/sol2.webm";
import tronco from "../assets/tronco.webm";
import sombra3 from "../assets/sombra3.webm";
import sombras from "../assets/sombras.webm";


export const Parte2dela1 = forwardRef(
  ({ cambiarEscena }, ref) => {

    // =========================================================
    // REF PRINCIPAL DE LA ESCENA
    // =========================================================

    const screenRef = useRef(null);


    // =========================================================
    // REFS DE VIDEOS
    // =========================================================

    const fondoRef = useRef(null);
    const sr2Ref = useRef(null);
    const pasto2Ref = useRef(null);
    const hojasRef = useRef(null);
    const cartelRef = useRef(null);
    const sol2Ref = useRef(null);
    const troncoRef = useRef(null);
    const sombra3Ref = useRef(null);
    const sombrasRef = useRef(null);


    // =========================================================
    // CONTROL
    // =========================================================

    const escenaIniciada = useRef(false);

    const cameraTimelineRef = useRef(null);


    // =========================================================
    // OBTENER TODOS LOS VIDEOS
    // =========================================================

    const obtenerVideos = () => {

      return [
        fondoRef.current,
        sr2Ref.current,
        pasto2Ref.current,
        hojasRef.current,
        cartelRef.current,
        sol2Ref.current,
        troncoRef.current,
        sombra3Ref.current,
        sombrasRef.current
      ];

    };


    // =========================================================
    // REPRODUCIR TODOS LOS VIDEOS
    // =========================================================

    const reproducirVideos = () => {

      const videos = obtenerVideos();

      videos.forEach((video) => {

        if (!video) return;

        video
          .play()
          .catch(() => {});

      });

    };


    // =========================================================
    // PAUSAR TODOS LOS VIDEOS
    // =========================================================

    const pausarVideos = () => {

      const videos = obtenerVideos();

      videos.forEach((video) => {

        if (!video) return;

        video.pause();

      });

    };


    // =========================================================
    // CREAR CINEMÁTICA DE CÁMARA
    // =========================================================

    const crearCinematica = () => {

      const escena = screenRef.current;

      if (!escena) return null;


      // -------------------------------------------------------
      // Limpiar cámara anterior
      // -------------------------------------------------------

      if (cameraTimelineRef.current) {

        cameraTimelineRef.current.kill();

      }

      gsap.killTweensOf(escena);


      // -------------------------------------------------------
      // Posición inicial
      // -------------------------------------------------------

      gsap.set(escena, {

        scale: 1,

        x: 0,

        y: 0,

        filter: "blur(0px)",

        transformOrigin: "center center"

      });


      // -------------------------------------------------------
      // Crear timeline PAUSADO
      // -------------------------------------------------------

      const tl = gsap.timeline({

        paused: true

      });


      cameraTimelineRef.current = tl;


      // =======================================================
      // 1. ZOOM AL CARTEL
      // =======================================================

      tl.to(escena, {

        scale: 2.5,

        x: 230,

        y: -100,

        duration: 2.5,

        ease: "power3.inOut"

      });


      // =======================================================
      // 2. BLUR
      // =======================================================

      tl.to(
        escena,
        {

          filter: "blur(5px)",

          duration: 0.3

        },
        "<"
      );


      // =======================================================
      // 3. RECUPERAR FOCO
      // =======================================================

      tl.to(escena, {

        filter: "blur(0px)",

        duration: 0.4

      });


      // =======================================================
      // 4. ESPERA
      // =======================================================

      tl.to({}, {

        duration: 1

      });


      // =======================================================
      // 5. VIAJE HACIA SEÑOR FOX
      // =======================================================

      tl.to(escena, {

        scale: 2.2,

        x: 0,

        y: -90,

        duration: 2.5,

        ease: "power2.inOut"

      });


      // =======================================================
      // 6. SUBIR HACIA LA CARA
      // =======================================================

      tl.to(escena, {

        y: -390,

        duration: 3,

        ease: "power2.inOut"

      });


      // =======================================================
      // 7. PAUSA
      // =======================================================

      tl.to({}, {

        duration: 0.2

      });


      // =======================================================
      // 8. SUBIR UN POCO MÁS
      // =======================================================

      tl.to(escena, {

        y: 20,

        duration: 2.1,

        ease: "power2.inOut"

      });


      // =======================================================
      // 9. PAUSA CONTEMPLATIVA
      // =======================================================

      tl.to({}, {

        duration: 0.5

      });


      // =======================================================
      // 10. REGRESO
      // =======================================================

      tl.to(escena, {

        scale: 1,

        x: 0,

        y: 0,

        duration: 3,

        ease: "power4.inOut"

      });


      // =======================================================
      // 11. PASAR A ESCENA 3
      // =======================================================

      tl.call(() => {

        cambiarEscena(3);

      });


      return tl;

    };


    // =========================================================
    // INICIAR TODA LA ESCENA
    // =========================================================

    const iniciarTodo = () => {

      // =======================================================
      // SI YA ESTÁ INICIADA
      // =======================================================

      if (escenaIniciada.current) {

        // Si estaba pausada, simplemente reanudar

        if (cameraTimelineRef.current) {

          cameraTimelineRef.current.resume();

        }

        reproducirVideos();

        return;

      }


      // =======================================================
      // MARCAR COMO INICIADA
      // =======================================================

      escenaIniciada.current = true;


      // =======================================================
      // REINICIAR VIDEOS
      // =======================================================

      const videos = obtenerVideos();

      videos.forEach((video) => {

        if (!video) return;

        video.currentTime = 0;

      });


      // =======================================================
      // REPRODUCIR VIDEOS
      // =======================================================

      reproducirVideos();


      // =======================================================
      // CREAR CÁMARA
      // =======================================================

      const timeline = crearCinematica();


      // =======================================================
      // INICIAR CÁMARA
      // =======================================================

      if (timeline) {

        timeline.play();

      }

    };


    // =========================================================
    // PAUSAR TODA LA ESCENA
    // =========================================================

    const pausarTodo = () => {

      // -------------------------------------------------------
      // PAUSAR VIDEOS
      // -------------------------------------------------------

      pausarVideos();


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

      // -------------------------------------------------------
      // REPRODUCIR VIDEOS
      // -------------------------------------------------------

      reproducirVideos();


      // -------------------------------------------------------
      // SI NO EXISTE LA CÁMARA TODAVÍA
      // -------------------------------------------------------

      if (!cameraTimelineRef.current) {

        iniciarTodo();

        return;

      }


      // -------------------------------------------------------
      // REANUDAR CÁMARA
      // -------------------------------------------------------

      cameraTimelineRef.current.resume();

    };


    // =========================================================
    // EXPONER FUNCIONES A INTERFAZCAP
    // =========================================================

    useImperativeHandle(ref, () => ({

      iniciarTodo,

      pausarTodo,

      reanudarTodo

    }));


    // =========================================================
    // RETURN
    // =========================================================

    return (

      <div
        ref={screenRef}
        className="screen"
      >


        {/* =================================================
            FONDO
        ================================================= */}

        <video
          ref={fondoRef}
          className="scream"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={fondo2}
            type="video/webm"
          />

        </video>


        {/* =================================================
            SEÑOR FOX
        ================================================= */}

        <video
          ref={sr2Ref}
          className="sr2"

          muted
          playsInline
          preload="auto"

          onClick={iniciarTodo}

          style={{
            cursor: "pointer"
          }}
        >

          <source
            src={sr2}
            type="video/webm"
          />

        </video>


        {/* =================================================
            PASTO
        ================================================= */}

        <video
          ref={pasto2Ref}
          className="pasto2"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={pasto2}
            type="video/webm"
          />

        </video>


        {/* =================================================
            HOJAS
        ================================================= */}

        <video
          ref={hojasRef}
          className="hojas"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={hojas}
            type="video/webm"
          />

        </video>


        {/* =================================================
            CARTEL
        ================================================= */}

        <video
          ref={cartelRef}
          className="cartel"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={cartel}
            type="video/webm"
          />

        </video>


        {/* =================================================
            SOL
        ================================================= */}

        <video
          ref={sol2Ref}
          className="sol2"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={sol2}
            type="video/webm"
          />

        </video>


        {/* =================================================
            TRONCO
        ================================================= */}

        <video
          ref={troncoRef}
          className="tronco"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={tronco}
            type="video/webm"
          />

        </video>


        {/* =================================================
            SOMBRA 3
        ================================================= */}

        <video
          ref={sombra3Ref}
          className="sombra3"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={sombra3}
            type="video/webm"
          />

        </video>


        {/* =================================================
            SOMBRAS
        ================================================= */}

        <video
          ref={sombrasRef}
          className="sombras"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={sombras}
            type="video/webm"
          />

        </video>


      </div>

    );

  }
);