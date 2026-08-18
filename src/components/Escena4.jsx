import React, {
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";

import "../stylesheets/Escena4.css";

import fondo4 from "../assets/fondo4.webm";
import señorafox4 from "../assets/señorafox4.webm";
import mesa from "../assets/mesa.webm";
import señorfox4 from "../assets/señorfox4.webm";
import nubes from "../assets/nubes.webm";


export const Escena4 = forwardRef(
  ({ cambiarEscena }, ref) => {

    // =========================================================
    // REFS
    // =========================================================

    const escenaRef = useRef(null);

    const fondoRef = useRef(null);
    const señoraFoxRef = useRef(null);
    const mesaRef = useRef(null);
    const señorFoxRef = useRef(null);
    const nubesRef = useRef(null);


    // =========================================================
    // EVITAR MÚLTIPLES INICIOS
    // =========================================================

    const escenaIniciada = useRef(false);


    // =========================================================
    // INICIAR ESCENA
    // =========================================================

    const iniciarEscena = () => {

      // Si ya inició, no hacemos absolutamente nada
      if (escenaIniciada.current) {
        return;
      }

      // Marcar escena como iniciada
      escenaIniciada.current = true;


      // =====================================================
      // REPRODUCIR TODOS LOS VIDEOS
      // =====================================================

      const videos = [

        fondoRef.current,
        señoraFoxRef.current,
        mesaRef.current,
        señorFoxRef.current,
        nubesRef.current

      ];


      videos.forEach((video) => {

        if (video) {

          video.currentTime = 0;

          video
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
        señoraFoxRef.current,
        mesaRef.current,
        señorFoxRef.current,
        nubesRef.current

      ];


      videos.forEach((video) => {

        if (video) {
          video.pause();
        }

      });

    };


    // =========================================================
    // REANUDAR TODA LA ESCENA
    // =========================================================

    const reanudarTodo = () => {

      const videos = [

        fondoRef.current,
        señoraFoxRef.current,
        mesaRef.current,
        señorFoxRef.current,
        nubesRef.current

      ];


      videos.forEach((video) => {

        if (video) {

          video
            .play()
            .catch(() => {});

        }

      });

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
        className="escena4"
      >


        {/* =================================================
            SEÑORA FOX
        ================================================= */}

        <video
          ref={señoraFoxRef}
          className="sra4"

          muted
          playsInline
          preload="auto"

          onClick={iniciarEscena}
        >

          <source
            src={señorafox4}
            type="video/webm"
          />

        </video>


        {/* =================================================
            MESA
        ================================================= */}

        <video
          ref={mesaRef}
          className="mesa"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={mesa}
            type="video/webm"
          />

        </video>


        {/* =================================================
            SEÑOR FOX
        ================================================= */}

        <video
          ref={señorFoxRef}
          className="sr4"

          muted
          playsInline
          preload="auto"

          onClick={iniciarEscena}
        >

          <source
            src={señorfox4}
            type="video/webm"
          />

        </video>


        {/* =================================================
            NUBES
        ================================================= */}

        <video
          ref={nubesRef}
          className="nubes"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={nubes}
            type="video/webm"
          />

        </video>


        {/* =================================================
            FONDO
        ================================================= */}

        <video
          ref={fondoRef}
          className="fondo4"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={fondo4}
            type="video/webm"
          />

        </video>


      </div>

    );

  }
);