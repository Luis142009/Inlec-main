
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import escenario5 from "../assets/escenario5.mp4";
import granjas from "../assets/granjas.webm";
import srca from "../assets/srca.webm";

import "../stylesheets/Escena5.css";


export const Escena5 = forwardRef(
  ({ cambiarEscena }, ref) => {

    // =========================================================
    // ESTADOS
    // =========================================================

    const [corriendo, setCorriendo] = useState(false);
    const [mostrarNota, setMostrarNota] = useState(false);


    // =========================================================
    // REFS
    // =========================================================

    const escena5Ref = useRef(null);

    const escenario5Ref = useRef(null);
    const granjasRef = useRef(null);
    const srcaRef = useRef(null);

    const movimientoIniciado = useRef(false);

    const posicionX = useRef(-370);

    const timelineRef = useRef(null);

    // Evita que el cambio de escena se ejecute varias veces
    const cambioEscenaRealizado = useRef(false);


    // =========================================================
    // INICIAR CÁMARA
    // =========================================================

    const iniciarCamara = () => {

      if (movimientoIniciado.current) {
        return;
      }

      movimientoIniciado.current = true;

      const escena = escena5Ref.current;
      const escenario = escenario5Ref.current;

      if (!escena) {
        return;
      }


      // =======================================================
      // REINICIAR FONDO
      // =======================================================

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
      // TIMELINE DE CÁMARA
      // =======================================================

      const tl = gsap.timeline({

        onComplete: () => {

          if (escenario) {
            escenario.pause();
          }

        }

      });

      timelineRef.current = tl;


      // =======================================================
      // 0 → 3 SEGUNDOS
      // ZOOM HACIA LA IZQUIERDA
      // =======================================================

      tl.to(escena, {

        scale: 2.8,

        x: 890,
        y: 390,

        duration: 3,

        ease: "power2.inOut"

      });


      // =======================================================
      // 3 → 6 SEGUNDOS
      // MOVIMIENTO HACIA LA DERECHA
      // =======================================================

      tl.to(escena, {

        scale: 2.8,

        x: -100,
        y: 390,

        duration: 3,

        ease: "power2.inOut"

      });


      // =======================================================
      // 6 → 8 SEGUNDOS
      // MOVIMIENTO FINAL
      // =======================================================

      tl.to(escena, {

        scale: 2.8,

        x: -1250,
        y: 390,

        duration: 2,

        ease: "power2.inOut",

        onStart: () => {

          setMostrarNota(true);

        }

      });


      // =======================================================
      // 8 → 11 SEGUNDOS
      // REGRESAR CÁMARA
      // =======================================================

      tl.to(escena, {

        scale: 1,

        x: 0,
        y: 0,

        duration: 3,

        ease: "power2.inOut"

      });

    };


    // =========================================================
    // TECLADO
    // D / FLECHA DERECHA
    // =========================================================

    useEffect(() => {

      const teclaPresionada = (event) => {

        if (
          event.key.toLowerCase() === "d" ||
          event.key === "ArrowRight"
        ) {

          event.preventDefault();

          if (!movimientoIniciado.current) {
            return;
          }

          setCorriendo(true);

        }

      };


      const teclaSoltada = (event) => {

        if (
          event.key.toLowerCase() === "d" ||
          event.key === "ArrowRight"
        ) {

          event.preventDefault();

          setCorriendo(false);

        }

      };


      window.addEventListener(
        "keydown",
        teclaPresionada
      );

      window.addEventListener(
        "keyup",
        teclaSoltada
      );


      return () => {

        window.removeEventListener(
          "keydown",
          teclaPresionada
        );

        window.removeEventListener(
          "keyup",
          teclaSoltada
        );

      };

    }, []);


    // =========================================================
    // MOVIMIENTO DE FOX
    // =========================================================

    useEffect(() => {

      const video = srcaRef.current;

      if (!video || !corriendo) {
        return;
      }

      let animacion;

      const distanciaTotal = 1500;

      // Duración completa del movimiento
      const duracion = 5;


      const moverFox = () => {

        const progreso =
          Math.min(
            video.currentTime / duracion,
            1
          );


        posicionX.current =
          -370 +
          (
            distanciaTotal *
            progreso
          );


        video.style.left =
          `${posicionX.current}px`;


        if (
          !video.ended &&
          corriendo
        ) {

          animacion =
            requestAnimationFrame(
              moverFox
            );

        }

      };


      animacion =
        requestAnimationFrame(
          moverFox
        );


      return () => {

        if (animacion) {

          cancelAnimationFrame(
            animacion
          );

        }

      };

    }, [corriendo]);


    // =========================================================
    // CONTROL DEL VIDEO DE FOX
    // =========================================================

    useEffect(() => {

      const video = srcaRef.current;

      if (!video) {
        return;
      }


      if (corriendo) {

        video
          .play()
          .catch(() => {});

      } else {

        video.pause();

      }

    }, [corriendo]);


    // =========================================================
    // CAMBIO AUTOMÁTICO A ESCENA 9
    // =========================================================

    useEffect(() => {

      const video = srcaRef.current;

      if (!video) {
        return;
      }


      // =======================================================
      // TIEMPO EN EL QUE QUIERES CAMBIAR DE ESCENA
      // =======================================================

      const tiempoCambio = 5.5;


      const revisarTiempo = () => {

        // Si Fox llegó al tiempo indicado
        if (
          video.currentTime >= tiempoCambio &&
          !cambioEscenaRealizado.current
        ) {

          cambioEscenaRealizado.current = true;


          // Detener video
          video.pause();


          // Colocar a Fox en su posición final
          posicionX.current =
            -370 + 1500;


          video.style.left =
            `${posicionX.current}px`;


          // Detener movimiento
          setCorriendo(false);


          // Ocultar nota
          setMostrarNota(false);


          // =================================================
          // CAMBIAR A ESCENA 9
          // =================================================

          cambiarEscena(9);

        }

      };


      video.addEventListener(
        "timeupdate",
        revisarTiempo
      );


      return () => {

        video.removeEventListener(
          "timeupdate",
          revisarTiempo
        );

      };

    }, [cambiarEscena]);


    // =========================================================
    // PAUSAR TODA LA ESCENA
    // =========================================================

    const pausarTodo = () => {

      const videos = [

        escenario5Ref.current,
        granjasRef.current,
        srcaRef.current

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

        escenario5Ref.current,
        granjasRef.current,
        srcaRef.current

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
    // EXPONER FUNCIONES AL PADRE
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
        ref={escena5Ref}
        className="escena5"
      >


        {/* =====================================================
            FONDO
        ===================================================== */}

        <video
          ref={escenario5Ref}
          className="escenario5-fondo"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={escenario5}
            type="video/mp4"
          />

        </video>


        {/* =====================================================
            GRANJA
        ===================================================== */}

        <video
          ref={granjasRef}
          className="granja"

          muted
          playsInline
          preload="auto"

          autoPlay
          loop

          onClick={iniciarCamara}

          style={{
            cursor: "pointer"
          }}
        >

          <source
            src={granjas}
            type="video/webm"
          />

        </video>


        {/* =====================================================
            SR. FOX
        ===================================================== */}

        <video
          ref={srcaRef}
          className="srca"

          muted
          playsInline
          preload="auto"

          style={{
            left: `${posicionX.current}px`
          }}
        >

          <source
            src={srca}
            type="video/webm"
          />

        </video>


        {/* =====================================================
            NOTA
        ===================================================== */}

        {mostrarNota && (

          <div className="noticia-objetos">

            Ayuda al señor Fox a ir a robar
            presionando D o dándole a la flecha →

          </div>

        )}

      </div>

    );

  }
)


