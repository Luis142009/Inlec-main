import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState
} from "react";

import { gsap } from "gsap";

import manzana from "../assets/manzana.svg";

import escenario from "../assets/sr.webm";
import sra from "../assets/lady.webm";
import personaje from "../assets/rial.webm";
import tierrass from "../assets/tierrita.webm";
import arbol from "../assets/arbol.webm";
import sol from "../assets/sol.webm";
import hierba from "../assets/hierboza.webm";
import escena1 from "../assets/audio/escena1.mp3";
import tocar from "../assets/audio/tocar.mp3";

import "../stylesheets/fondo.css";


export const LuisPlugin = forwardRef(({
  cambiarEscena,
  onRecoger,
  manzanaRecogida,
  onMrFoxClick
}, ref) => {


  // =========================================================
  // REF PRINCIPAL
  // =========================================================

  const screenRef = useRef(null);


  // =========================================================
  // REFS DE VIDEOS
  // =========================================================

  const personajeRef = useRef(null);
  const srRef = useRef(null);
  const sraRef = useRef(null);
  const solRef = useRef(null);
  const hierbaRef = useRef(null);
  const tierraRef = useRef(null);
  const arbolRef = useRef(null);


  // =========================================================
  // REFS EXTRA
  // =========================================================

  const tocarRef = useRef(new Audio(tocar));

  const manzanaRef = useRef(null);

  const luzRef = useRef(null);

  const encuentraRef = useRef(null);


  // =========================================================
  // ESTADOS
  // =========================================================

  const [mostrarEncuentra, setMostrarEncuentra] = useState(true);


  // =========================================================
  // CONTROL DE ESCENA
  // =========================================================

  const escenaIniciada = useRef(false);

  const cameraTimelineRef = useRef(null);

  const primeraVez = useRef(true);


  // =========================================================
  // TODOS LOS VIDEOS
  // =========================================================

  const todosLosVideos = () => {

    return [
      personajeRef,
      srRef,
      sraRef,
      solRef,
      hierbaRef,
      tierraRef,
      arbolRef
    ];

  };


  // =========================================================
  // REPRODUCIR TODOS LOS VIDEOS
  // =========================================================

  const reproducirVideos = () => {

    todosLosVideos().forEach((refVideo) => {

      const video = refVideo.current;

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

    todosLosVideos().forEach((refVideo) => {

      const video = refVideo.current;

      if (!video) return;

      video.pause();

    });

  };


  // =========================================================
  // CREAR CINEMÁTICA
  // =========================================================

  const crearCinematica = () => {

    const escena = screenRef.current;

    if (!escena) return null;


    // =======================================================
    // LIMPIAR CÁMARA ANTERIOR
    // =======================================================

    if (cameraTimelineRef.current) {

      cameraTimelineRef.current.kill();

    }

    gsap.killTweensOf(escena);


    // =======================================================
    // POSICIÓN INICIAL
    // =======================================================

    gsap.set(escena, {

      scale: 1.4,

      x: 60,

      y: 40,

      transformOrigin: "center center"

    });


    // =======================================================
    // CREAR TIMELINE PAUSADO
    // =======================================================

    const tl = gsap.timeline({

      paused: true

    });


    cameraTimelineRef.current = tl;


    // =======================================================
    // MOVIMIENTO DE CÁMARA
    // =======================================================

    tl.to(escena, {

      scale: 2,

      x: 100,

      y: -78,

      duration: 3,

      ease: "power2.inOut"

    });


    // =======================================================
    // ESPERA
    // =======================================================

    tl.to({}, {

      duration: 2

    });


    // =======================================================
    // PASAR A ESCENA 2
    // =======================================================

    tl.call(() => {

      cambiarEscena(2);

    });


    return tl;

  };


  // =========================================================
  // INICIAR TODA LA ESCENA
  // =========================================================

  const iniciarTodo = () => {


    // =======================================================
    // SI YA FUE INICIADA
    // =======================================================

    if (escenaIniciada.current) {

      reproducirVideos();


      if (cameraTimelineRef.current) {

        cameraTimelineRef.current.resume();

      }

      return;

    }


    // =======================================================
    // MARCAR COMO INICIADA
    // =======================================================

    escenaIniciada.current = true;


    // =======================================================
    // REINICIAR VIDEOS
    // =======================================================

    todosLosVideos().forEach((refVideo) => {

      const video = refVideo.current;

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
  // PAUSAR TODO
  // =========================================================

  const pausarTodo = () => {


    // =======================================================
    // PAUSAR VIDEOS
    // =======================================================

    pausarVideos();


    // =======================================================
    // PAUSAR CÁMARA
    // =======================================================

    if (cameraTimelineRef.current) {

      cameraTimelineRef.current.pause();

    }

  };


  // =========================================================
  // REANUDAR TODO
  // =========================================================

  const reanudarTodo = () => {


    // =======================================================
    // REPRODUCIR VIDEOS
    // =======================================================

    reproducirVideos();


    // =======================================================
    // SI NO EXISTE CÁMARA
    // =======================================================

    if (!cameraTimelineRef.current) {

      iniciarTodo();

      return;

    }


    // =======================================================
    // REANUDAR CÁMARA
    // =======================================================

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
  // TEXTO "ENCUENTRA LOS OBJETOS"
  // =========================================================

  useEffect(() => {

    if (!encuentraRef.current) return;


    const tl = gsap.timeline({

      onComplete: () => {

        setMostrarEncuentra(false);

      }

    });


    tl.fromTo(

      encuentraRef.current,

      {
        opacity: 0,
        scale: 0.5,
        letterSpacing: "20px"
      },

      {
        opacity: 1,
        scale: 1,
        letterSpacing: "normal",
        duration: 1.2,
        ease: "back.out(1.7)"
      }

    );


    tl.to(encuentraRef.current, {

      scale: 1.05,

      duration: 1,

      repeat: 1,

      yoyo: true,

      ease: "sine.inOut"

    });


    tl.to(encuentraRef.current, {

      opacity: 0,

      scale: 0.8,

      duration: 1,

      ease: "power2.in"

    }, ">-0.1");


  }, []);


  // =========================================================
  // CONFIGURACIÓN INICIAL
  // =========================================================

  useEffect(() => {

    gsap.set(screenRef.current, {

      scale: 1.4,

      x: 60,

      y: 40

    });


    tocarRef.current.volume = 0.5;

  }, []);


  // =========================================================
  // PERSONAJE
  // =========================================================

  const reproducirPersonaje = () => {

    if (!personajeRef.current) return;

    personajeRef.current.play();

  };


  // =========================================================
  // LOOP DEL PERSONAJE
  // =========================================================

  const controlarLoop = () => {

    const video = personajeRef.current;

    if (!video) return;


    if (
      !primeraVez.current &&
      video.duration &&
      video.currentTime >= video.duration - 0.05
    ) {

      video.currentTime = 4;

      video.play();

    }

  };


  // =========================================================
  // CUANDO TERMINA PRIMERA REPRODUCCIÓN
  // =========================================================

  const termino = () => {

    if (primeraVez.current) {

      primeraVez.current = false;

      if (!personajeRef.current) return;

      personajeRef.current.currentTime = 4;

      personajeRef.current.play();

    }

  };


  // =========================================================
  // REPRODUCIR VIDEO INDIVIDUAL
  // =========================================================

  const reproducirVideo = (refVideo) => {

    const video = refVideo.current;

    if (!video) return;

    video.pause();

    video.currentTime = 0;

    video
      .play()
      .catch(() => {});

  };


  // =========================================================
  // CLICK SEÑOR FOX
  // =========================================================

  const clickSR = () => {


    // =======================================================
    // AVISAR A LA INTERFAZ
    // =======================================================

    if (onMrFoxClick) {

      onMrFoxClick();

    }


    // =======================================================
    // INICIAR TODA LA ESCENA
    // =======================================================

    iniciarTodo();

  };


  // =========================================================
  // CLICK MANZANA
  // =========================================================

  const clickManzana = () => {


    // =======================================================
    // SONIDO
    // =======================================================

    tocarRef.current.currentTime = 0;

    tocarRef.current.play();


    const manzana = manzanaRef.current;

    if (!manzana) return;


    // =======================================================
    // POSICIONES
    // =======================================================

    const screenRect =
      screenRef.current.getBoundingClientRect();

    const manzanaRect =
      manzana.getBoundingClientRect();


    const centroX =
      screenRect.width / 2;

    const centroY =
      screenRect.height / 2;


    const manzanaX =
      manzanaRect.left -
      screenRect.left +
      manzanaRect.width / 2;


    const manzanaY =
      manzanaRect.top -
      screenRect.top +
      manzanaRect.height / 2;


    const offsetX =
      centroX - manzanaX;


    const offsetY =
      centroY - manzanaY;


    // =======================================================
    // SLOT
    // =======================================================

    const slots =
      document.querySelectorAll(".slot");

    const slotDestino =
      slots[0];


    if (!slotDestino) return;


    const slotRect =
      slotDestino.getBoundingClientRect();


    const dx =
      slotRect.left +
      slotRect.width / 2 -
      (
        manzanaRect.left +
        manzanaRect.width / 2
      );


    const dy =
      slotRect.top +
      slotRect.height / 2 -
      (
        manzanaRect.top +
        manzanaRect.height / 2
      );


    // =======================================================
    // ANIMACIÓN MANZANA
    // =======================================================

    const tl = gsap.timeline({

      onComplete: () => {

        onRecoger("manzana");

      }

    });


    // =======================================================
    // BRILLO
    // =======================================================

    tl.to(manzana, {

      filter: `
        drop-shadow(0 0 50px #ffffff)
        drop-shadow(0 0 120px #ffe600)
        drop-shadow(0 0 220px #ffd000)
        drop-shadow(0 0 340px #ff9900)
      `,

      scale: 1.35,

      rotation: 360,

      duration: 0.35,

      ease: "back.out(2)"

    });


    // =======================================================
    // CÁMARA HACIA MANZANA
    // =======================================================

    tl.to(

      screenRef.current,

      {

        scale: 2,

        x: 60 + offsetX,

        y: 40 + offsetY,

        duration: 0.45,

        ease: "power2.out"

      },

      "<"

    );


    // =======================================================
    // ESPERA
    // =======================================================

    tl.to({}, {

      duration: 0.15

    });


    // =======================================================
    // REGRESAR CÁMARA
    // =======================================================

    tl.to(screenRef.current, {

      scale: 1.4,

      x: 60,

      y: 40,

      duration: 0.45,

      ease: "power2.inOut"

    });


    // =======================================================
    // MOVER MANZANA
    // =======================================================

    tl.to(

      manzana,

      {

        x: dx,

        y: dy,

        scale: 0.4,

        rotation: 1080,

        duration: 0.8,

        ease: "power3.inOut"

      },

      "<"

    );


    // =======================================================
    // PEQUEÑO REBOTE
    // =======================================================

    tl.to(manzana, {

      scale: 0.5,

      duration: 0.12,

      ease: "back.out(4)"

    });


    // =======================================================
    // DESAPARECER
    // =======================================================

    tl.to(manzana, {

      opacity: 0,

      duration: 0.15

    });


    // =======================================================
    // LIMPIAR FILTRO
    // =======================================================

    tl.set(manzana, {

      clearProps: "filter"

    });

  };


  // =========================================================
  // RETURN
  // =========================================================

  return (

    <div
      ref={screenRef}
      className="screen"
    >


      {/* =================================================
          TEXTO
      ================================================= */}

      {mostrarEncuentra && (

        <h1
          ref={encuentraRef}
          className="encuentra"
        >

          ENCUENTRA LOS OBJETOS

        </h1>

      )}


      {/* =================================================
          PERSONAJE
      ================================================= */}

      <video
        ref={personajeRef}
        className="personaje"

        muted

        playsInline

        preload="auto"

        onClick={reproducirPersonaje}

        onEnded={termino}

        onTimeUpdate={controlarLoop}
      >

        <source
          src={personaje}
          type="video/webm"
        />

      </video>


      {/* =================================================
          SEÑOR FOX
      ================================================= */}

      <video
        ref={srRef}
        className="sr"

        muted

        playsInline

        preload="auto"

        onClick={clickSR}

        style={{
          cursor: "pointer"
        }}
      >

        <source
          src={escenario}
          type="video/webm"
        />

      </video>


      {/* =================================================
          SEÑORA FOX
      ================================================= */}

      <video
        ref={sraRef}
        className="sra"

        muted

        playsInline

        preload="auto"

        onClick={() => reproducirVideo(sraRef)}
      >

        <source
          src={sra}
          type="video/webm"
        />

      </video>


      {/* =================================================
          TIERRA
      ================================================= */}

      <video
        ref={tierraRef}
        className="tierra"

        muted

        playsInline

        preload="auto"

        onClick={() => reproducirVideo(tierraRef)}
      >

        <source
          src={tierrass}
          type="video/webm"
        />

      </video>


      {/* =================================================
          HIERBA
      ================================================= */}

      <video
        ref={hierbaRef}
        className="hierba"

        muted

        playsInline

        preload="auto"

        onClick={() => reproducirVideo(hierbaRef)}
      >

        <source
          src={hierba}
          type="video/webm"
        />

      </video>


      {/* =================================================
          ÁRBOL
      ================================================= */}

      <video
        ref={arbolRef}
        className="arbol"

        muted

        playsInline

        preload="auto"

        onClick={() => reproducirVideo(arbolRef)}
      >

        <source
          src={arbol}
          type="video/webm"
        />

      </video>


      {/* =================================================
          SOL
      ================================================= */}

      <video
        ref={solRef}
        className="sol"

        muted

        playsInline

        preload="auto"

        onClick={() => reproducirVideo(solRef)}
      >

        <source
          src={sol}
          type="video/webm"
        />

      </video>


      {/* =================================================
          MANZANA
      ================================================= */}

      {!manzanaRecogida && (

        <div
          style={{
            position: "relative",
            display: "inline-block"
          }}
        >

          <div
            ref={luzRef}

            onClick={clickManzana}

            style={{
              display: "none",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "800px",
              height: "800px",
              pointerEvents: "none",
              zIndex: 10
            }}
          />

          <img
            ref={manzanaRef}
            src={manzana}
            className="mi-svg"

            alt="manzana"

            onClick={clickManzana}

            style={{
              cursor: "pointer",
              position: "relative",
              zIndex: 16,
              pointerEvents: "auto"
            }}
          />

        </div>

      )}

    </div>

  );

});