
import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import sr10 from "../assets/sr10.webm";
import mesa10 from "../assets/mesa10.webm";
import luz from "../assets/luz.webm";
import fondo10 from "../assets/cocina10.webm";

import "../stylesheets/Escena10.css";


export const Escena10 = forwardRef(
  (
    {
      cambiarEscena,
      onRecoger,
      objetoRecogido
    },
    ref
  ) => {

    // =========================================================
    // ESTADOS
    // =========================================================

    const [mostrarMesa1, setMostrarMesa1] = useState(true);


    // =========================================================
    // REFS
    // =========================================================

    const escena10Ref = useRef(null);

    const fondo10Ref = useRef(null);
    const sr10Ref = useRef(null);
    const mesa10Ref = useRef(null);
    const mesa10Ref2 = useRef(null);
    const luzRef = useRef(null);

    const camaraRef = useRef(null);


    // =========================================================
    // OBTENER TODOS LOS VIDEOS
    // =========================================================

    const obtenerVideos = () => {

      return [
        fondo10Ref.current,
        sr10Ref.current,
        mesa10Ref.current,
        mesa10Ref2.current,
        luzRef.current
      ].filter(Boolean);

    };


    // =========================================================
    // CLICK EN FOX
    // INICIAR TODAS LAS ANIMACIONES
    // =========================================================

    const iniciarAnimaciones = () => {

      const escena = escena10Ref.current;

      if (!escena) {
        return;
      }


      // =======================================================
      // MOSTRAR MESA 1
      // =======================================================

      setMostrarMesa1(true);


      // =======================================================
      // REINICIAR VIDEOS
      // =======================================================

      const videos = obtenerVideos();

      videos.forEach((video) => {

        try {

          video.currentTime = 0;

          video
            .play()
            .catch(() => {});

        } catch {}

      });


      // =======================================================
      // MATAR CUALQUIER CÁMARA ANTERIOR
      // =======================================================

      if (camaraRef.current) {

        camaraRef.current.kill();

      }


      // =======================================================
      // REINICIAR CÁMARA
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

      const tl = gsap.timeline();

      camaraRef.current = tl;


      // =======================================================
      // 1. ZOOM HACIA FOX
      // =======================================================

      tl.to(escena, {

        scale: 1.7,

        x: -350,
        y: 0,

        duration: 2.8,

        ease: "power2.inOut"

      });


      // =======================================================
      // 2. DESPLAZAMIENTO HACIA LA IZQUIERDA
      // =======================================================

      tl.to(escena, {

        scale: 1.6,

        x: 250,
        y: 0,

        duration: 1.2,

        ease: "power2.inOut"

      });


      // =======================================================
      // 3. REGRESAR AL CENTRO
      // =======================================================

      tl.to(escena, {

        scale: 1.2,

        x: 0,
        y: 0,

        duration: 3.5,

        ease: "power2.inOut"

      });


      // =======================================================
      // 4. SUBIR Y ACERCARSE
      // =======================================================

      tl.to(escena, {

        scale: 1.7,

        x: 260,
        y: -250,

        duration: 3.5,

        ease: "power2.inOut"

      });


      // =======================================================
      // 5. PAUSA
      // =======================================================

      tl.to({}, {

        duration: 7.5

      });


      // =======================================================
      // 6. REGRESAR AL CENTRO
      // =======================================================

      tl.to(escena, {

        scale: 1.2,

        x: 0,
        y: 0,

        duration: 2.2,

        ease: "power2.inOut"

      });


      // =======================================================
      // 7. PAUSA
      // =======================================================

      tl.to({}, {

        duration: 2.7

      });


      // =======================================================
      // 8. BAJAR CÁMARA
      // =======================================================

      tl.to(escena, {

        scale: 1.2,

        x: 0,
        y: -100,

        duration: 2.2,

        ease: "power2.inOut"

      });

    };


    // =========================================================
    // OCULTAR MESA 1 EN EL SEGUNDO 3
    // =========================================================

    const revisarTiempoFox = () => {

      const video = sr10Ref.current;

      if (!video) {
        return;
      }


      if (
        video.currentTime >= 3 &&
        mostrarMesa1
      ) {

        setMostrarMesa1(false);

      }

    };


    // =========================================================
    // CUANDO TERMINA FOX
    // =========================================================

    const terminarFox = () => {

      const videos = obtenerVideos();

      videos.forEach((video) => {

        try {

          video.pause();

        } catch {}

      });

    };


    // =========================================================
    // PAUSAR TODO
    // =========================================================

    const pausarTodo = () => {

      const videos = obtenerVideos();

      videos.forEach((video) => {

        try {

          video.pause();

        } catch {}

      });


      // PAUSAR CÁMARA

      if (camaraRef.current) {

        camaraRef.current.pause();

      }

    };


    // =========================================================
    // REANUDAR TODO
    // =========================================================

    const reanudarTodo = () => {

      const videos = obtenerVideos();

      videos.forEach((video) => {

        try {

          video
            .play()
            .catch(() => {});

        } catch {}

      });


      // REANUDAR CÁMARA

      if (camaraRef.current) {

        camaraRef.current.resume();

      }

    };


    // =========================================================
    // EXPONER FUNCIONES AL COMPONENTE PADRE
    // =========================================================

    useImperativeHandle(
      ref,
      () => ({

        pausarTodo,

        reanudarTodo

      }),
      []
    );


    // =========================================================
    // RETURN
    // =========================================================

    return (

      <div
        ref={escena10Ref}
        className="escena10"
      >


        {/* =====================================================
            FONDO
        ===================================================== */}

        <video
          ref={fondo10Ref}
          className="fondo10"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={fondo10}
            type="video/webm"
          />

        </video>


        {/* =====================================================
            SR. FOX
        ===================================================== */}

        <video
          ref={sr10Ref}
          className="sr10"

          muted
          playsInline
          preload="auto"

          onClick={iniciarAnimaciones}

          onTimeUpdate={revisarTiempoFox}

          onEnded={terminarFox}

          style={{
            cursor: "pointer"
          }}
        >

          <source
            src={sr10}
            type="video/webm"
          />

        </video>


        {/* =====================================================
            MESA 1
        ===================================================== */}

        {mostrarMesa1 && (

          <video
            ref={mesa10Ref}
            className="mesa10"

            muted
            playsInline
            preload="auto"
          >

            <source
              src={mesa10}
              type="video/webm"
            />

          </video>

        )}


        {/* =====================================================
            MESA 2
        ===================================================== */}

        <video
          ref={mesa10Ref2}
          className="mesa10 mesa10-2"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={mesa10}
            type="video/webm"
          />

        </video>


        {/* =====================================================
            LUZ
        ===================================================== */}

        <video
          ref={luzRef}
          className="luz10"

          muted
          playsInline
          preload="auto"
        >

          <source
            src={luz}
            type="video/webm"
          />

        </video>


      </div>

    );

  }
);


