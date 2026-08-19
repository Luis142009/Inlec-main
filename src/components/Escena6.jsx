import React, {
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";

import fondo6 from "../assets/fondo6.webm";
import arbol6 from "../assets/arbol6.webm";

import "../stylesheets/Escena6.css";


export const Escena6 = forwardRef(
  ({ cambiarEscena }, ref) => {


    // =========================================================
    // REFS
    // =========================================================

    const fondo6Ref = useRef(null);
    const arbol6Ref = useRef(null);

    const escenaIniciada = useRef(false);


    // =========================================================
    // INICIAR ESCENA
    // =========================================================

    const iniciarEscena = () => {

      // Evitar que se reproduzca varias veces
      if (escenaIniciada.current) {
        return;
      }

      escenaIniciada.current = true;


      // =====================================================
      // REPRODUCIR FONDO
      // =====================================================

      if (fondo6Ref.current) {

        fondo6Ref.current.currentTime = 0;

        fondo6Ref.current
          .play()
          .catch(() => {});

      }


      // =====================================================
      // REPRODUCIR ÁRBOL
      // =====================================================

      if (arbol6Ref.current) {

        arbol6Ref.current.currentTime = 0;

        arbol6Ref.current
          .play()
          .catch(() => {});

      }

    };


    // =========================================================
    // PAUSAR TODA LA ESCENA
    // =========================================================

    const pausarTodo = () => {

      const videos = [
        fondo6Ref.current,
        arbol6Ref.current
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
        fondo6Ref.current,
        arbol6Ref.current
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

      <div className="escena6">


        {/* =================================================
            FONDO
        ================================================= */}

        <video
          ref={fondo6Ref}
          className="fondo6"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={fondo6}
            type="video/webm"
          />

        </video>


        {/* =================================================
            ÁRBOL
        ================================================= */}

        <video
          ref={arbol6Ref}
          className="arbol6"

          muted
          playsInline
          preload="auto"

          onClick={iniciarEscena}
        >

          <source
            src={arbol6}
            type="video/webm"
          />

        </video>


      </div>

    );

  }
);