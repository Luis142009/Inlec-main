import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import boggis11 from "../assets/boggis11.webm";
import bunce11 from "../assets/Bunce11.webm";
import bean11 from "../assets/Bean11.webm";
import escenario11 from "../assets/Escenario11.mp4";

import murcielago from "../assets/svg/Lurcienaga.svg";
import hoja from "../assets/svg/Hoja.svg";

import tocar from "../assets/audio/tocar.mp3";

import "../stylesheets/Escena11.css";


const AVANZAR_AL_TERMINAR = true;  // pasar a la escena 15 cuando termine la cámara
const ESCENA_SIGUIENTE = 15;

// Segundos finales del ÚLTIMO movimiento de cámara en los que la pantalla se pone negra
// (el último movimiento es el zoom lento a Bean, que dura 6 s)
const SEGUNDOS_PANTALLA_NEGRA = 4;

// Segundos que espera Bunce antes de empezar a reproducirse
// (Bean y el escenario arrancan en el segundo 0)
const RETRASO_BUNCE = 3;

// Segundos que espera Boggis antes de empezar a reproducirse
// (la cámara va hacia Bunce a los 3 s y Boggis aparece 4 s después)
const RETRASO_BOGGIS = 8;


// =========================================================
// ESCENA 11
// =========================================================

export const Escena11 = forwardRef(
  (
    {
      cambiarEscena,
      onPersonajeClick,

      // InterfazCap avisa si ya se recogieron
      onRecoger,
      murcielagoRecogido,
      hojaRecogida
    },
    ref
  ) => {

    // =======================================================
    // REFS Y ESTADO
    // =======================================================

    const escenaRef = useRef(null);

    // Siempre apunta a la versión más reciente de cambiarEscena
    const cambiarEscenaRef = useRef(cambiarEscena);
    cambiarEscenaRef.current = cambiarEscena;

    const boggis11Ref = useRef(null);
    const bunce11Ref = useRef(null);
    const bean11Ref = useRef(null);
    const escenario11Ref = useRef(null);

    const cameraTimelineRef = useRef(null);

    const escenaIniciada = useRef(false);

    // Temporizador que arranca el video de Bunce con retraso
    const bunceTimerRef = useRef(null);
    const bunceIniciado = useRef(false);

    // Temporizador que arranca el video de Boggis con retraso
    const boggisTimerRef = useRef(null);
    const boggisIniciado = useRef(false);

    // ⬛ PANTALLA NEGRA
    const [pantallaNegra, setPantallaNegra] = useState(false);

    // OBJETOS RECOGIBLES
    const murcielagoRef = useRef(null);
    const hojaRef = useRef(null);

    // Evita recoger dos objetos a la vez (cada uno vuela a un slot distinto)
    const recogiendoRef = useRef(false);

    const tocarRef = useRef(null);

    if (!tocarRef.current) {
      tocarRef.current = new Audio(tocar);
    }


    const obtenerVideos = () => [
      boggis11Ref.current,
      bunce11Ref.current,
      bean11Ref.current,
      escenario11Ref.current
    ];


    // Limpieza al desmontar
    useEffect(() => {

      return () => {

        if (cameraTimelineRef.current) {
          cameraTimelineRef.current.kill();
        }

        if (bunceTimerRef.current) {
          bunceTimerRef.current.kill();
        }

        if (boggisTimerRef.current) {
          boggisTimerRef.current.kill();
        }

      };

    }, []);


    // =======================================================
    // CÁMARA: Bean → Bunce → Boggis → vuelve a Bean
    // Cambia aquí scale, x, y y duration de cada movimiento
    // =======================================================

    const iniciarCamara = () => {

      const escena = escenaRef.current;
      const boggis = boggis11Ref.current;

      if (!escena) return;

      gsap.killTweensOf(escena);

      gsap.set(escena, {
        scale: 1,
        x: 0,
        y: 0,
        transformOrigin: "50% 50%"
      });

      const tl = gsap.timeline();

      cameraTimelineRef.current = tl;


      // -----------------------------------------------------
      // 1. BEAN
      // -----------------------------------------------------

      tl.to(escena, {
        scale: 1.6,
        x: 350,
        y: -70,
        duration: 2,
        ease: "power2.inOut"
      });

      // Se queda mirando a Bean
      tl.to({}, { duration: 1 });


      // -----------------------------------------------------
      // 2. BUNCE (aquí aparece Boggis)
      // -----------------------------------------------------

      tl.addLabel("bunce");

      tl.to(escena, {
        scale: 2.4,
        x: -950,
        y: -250,
        duration: 2,
        ease: "power2.inOut"
      }, "bunce");

      // Boggis aparece MIENTRAS la cámara se mueve a Bunce
      tl.to(boggis, {
        autoAlpha: 1,
        duration: 1.5,
        ease: "power1.out"
      }, "bunce+=4");

      // Se queda mirando a Bunce
      tl.to({}, { duration: 2 }, "bunce+=3");


      // -----------------------------------------------------
      // 3. BOGGIS
      // -----------------------------------------------------

      const BOGGIS_SCALE = 2.3;
      const BOGGIS_X = 0;
      const BOGGIS_Y = 0;

      const BOGGIS_SCALE_ZOOM = 2.8;
      const proporcion = BOGGIS_SCALE_ZOOM / BOGGIS_SCALE;

      // LLEGA A BOGGIS
      tl.to(escena, {
        scale: BOGGIS_SCALE,
        x: BOGGIS_X,
        y: BOGGIS_Y,
        duration: 1,
        ease: "power2.inOut"
      });

      // SE QUEDA ESTÁTICA
      tl.to({}, { duration: 0 });

      // HACE ZOOM HACIA BOGGIS
      tl.to(escena, {
        scale: BOGGIS_SCALE_ZOOM,
        x: BOGGIS_X * proporcion,
        y: BOGGIS_Y * proporcion,
        duration: 1.5,
        ease: "power2.inOut"
      });

      // VUELVE A LA MISMA POSICIÓN
      tl.to(escena, {
        scale: BOGGIS_SCALE,
        x: BOGGIS_X,
        y: BOGGIS_Y,
        duration: 1.5,
        ease: "power2.inOut"
      });


      // -----------------------------------------------------
      // 4. REGRESA A BEAN
      // -----------------------------------------------------

      tl.to(escena, {
        scale: 1.6,
        x: 200,
        y: -70,
        duration: 3,
        ease: "power2.inOut"
      });


      // -----------------------------------------------------
      // 5. ZOOM LENTO A BEAN
      // -----------------------------------------------------

      const BEAN_SCALE = 1.9;
      const BEAN_X = 350;
      const BEAN_Y = 0;

      const BEAN_SCALE_ZOOM = 2.0;
      const proporcionBean = BEAN_SCALE_ZOOM / BEAN_SCALE;

      tl.to(escena, {
        scale: BEAN_SCALE_ZOOM,
        x: BEAN_X * proporcionBean,
        y: BEAN_Y * proporcionBean,
        duration: 9,
        ease: "sine.inOut"
      });


      // -----------------------------------------------------
      // ⬛ PANTALLA NEGRA + FIN DE ESCENA
      // Van colgadas de la timeline de cámara, así que se
      // pausan y reanudan junto con ella.
      // -----------------------------------------------------

      const duracionTotal = tl.duration();

      // La pantalla se pone negra en los últimos segundos del último movimiento
      tl.call(
        () => setPantallaNegra(true),
        null,
        Math.max(0, duracionTotal - SEGUNDOS_PANTALLA_NEGRA)
      );

      // Al terminar el último movimiento, pasa a la siguiente escena
      tl.call(alTerminarEscena, null, duracionTotal);

    };


    // =======================================================
    // INICIAR ESCENA
    // =======================================================

    const iniciarEscena = () => {

      // Evitar múltiples inicios
      if (escenaIniciada.current) {
        return;
      }

      escenaIniciada.current = true;

      setPantallaNegra(false);


      // 1. REPRODUCIR VIDEOS
      obtenerVideos().forEach((video) => {

        if (!video) return;

        video.currentTime = 0;

        // BOGGIS: se "desbloquea" ahora (dentro del click del usuario),
        // se pausa enseguida y arranca de verdad tras RETRASO_BOGGIS.
        // Sin esto el navegador puede bloquear el play() del temporizador.
        if (video === boggis11Ref.current) {

          video
            .play()
            .then(() => {
              video.pause();
              video.currentTime = 0;
            })
            .catch(() => {});

          return;
        }

        // BUNCE: no arranca ahora, espera su retraso
        if (video === bunce11Ref.current) {
          return;
        }

        video
          .play()
          .catch(() => {});

      });


      // Bunce arranca con retraso
      // (gsap.delayedCall se puede pausar y reanudar)
      bunceIniciado.current = false;

      bunceTimerRef.current = gsap.delayedCall(RETRASO_BUNCE, () => {

        bunceIniciado.current = true;

        if (bunce11Ref.current) {

          bunce11Ref.current
            .play()
            .catch((err) => console.warn("Bunce no pudo reproducirse:", err));

        }

      });


      // Boggis arranca con retraso
      boggisIniciado.current = false;

      boggisTimerRef.current = gsap.delayedCall(RETRASO_BOGGIS, () => {

        boggisIniciado.current = true;

        if (boggis11Ref.current) {

          boggis11Ref.current
            .play()
            .catch((err) => console.warn("Boggis no pudo reproducirse:", err));

        }

      });


      // 2. INICIAR CÁMARA
      iniciarCamara();

    };


    // =======================================================
    // CLICK EN PERSONAJE → AUDIO
    // =======================================================

    const clickPersonaje = (personaje) => {

      if (onPersonajeClick) {
        onPersonajeClick(personaje);
      }

    };


    // =======================================================
    // CLICK EN UN OBJETO (murciélago u hoja)
    // brillo + cámara + rebote + vuelo al slot
    // =======================================================

    const recogerObjeto = (e, clave, elementoRef, yaRecogido) => {

      e.stopPropagation();

      if (yaRecogido || recogiendoRef.current) {
        return;
      }

      const objeto = elementoRef.current;
      const escena = escenaRef.current;

      if (!objeto || !escena) {
        return;
      }

      const slotDestino =
        document.querySelector(".slot.slot-vacio") ||
        document.querySelectorAll(".slot")[0];

      if (!slotDestino) {

        console.warn("No se encontró el slot de destino.");

        return;
      }

      recogiendoRef.current = true;


      // SONIDO INMEDIATO
      tocarRef.current.currentTime = 0;

      tocarRef.current
        .play()
        .catch(() => {});


      // Si la escena ya está corriendo, se congela (videos, cámara
      // y temporizadores) mientras se recoge el objeto
      const estabaCorriendo = escenaIniciada.current;

      if (estabaCorriendo) {
        pausarTodo();
      }


      // =====================================================
      // ESTADO ACTUAL DE LA CÁMARA
      // =====================================================

      const escalaActual =
        Number(gsap.getProperty(escena, "scale")) || 1;

      const xActual =
        Number(gsap.getProperty(escena, "x")) || 0;

      const yActual =
        Number(gsap.getProperty(escena, "y")) || 0;


      // =====================================================
      // POSICIONES
      // =====================================================

      const escenaRect = escena.getBoundingClientRect();
      const objetoRect = objeto.getBoundingClientRect();
      const slotRect = slotDestino.getBoundingClientRect();

      const escenaCentroX = escenaRect.left + escenaRect.width / 2;
      const escenaCentroY = escenaRect.top + escenaRect.height / 2;

      const objetoCentroX = objetoRect.left + objetoRect.width / 2;
      const objetoCentroY = objetoRect.top + objetoRect.height / 2;

      // ZOOM DE LA CÁMARA SOBRE EL OBJETO
      const ZOOM = 2;

      const offsetX =
        -ZOOM * (objetoCentroX - escenaCentroX) / escalaActual;

      const offsetY =
        -ZOOM * (objetoCentroY - escenaCentroY) / escalaActual;

      // VUELO AL SLOT (en px locales de la escena)
      const dx =
        (slotRect.left + slotRect.width / 2 - objetoCentroX) /
        escalaActual;

      const dy =
        (slotRect.top + slotRect.height / 2 - objetoCentroY) /
        escalaActual;


      gsap.killTweensOf(objeto);


      // =====================================================
      // TIMELINE
      // =====================================================

      const tl = gsap.timeline({

        onComplete: () => {

          recogiendoRef.current = false;

          if (estabaCorriendo) {
            reanudarTodo();
          }

          if (onRecoger) {
            onRecoger(clave);
          }

        }

      });

      // 1. BRILLO + GIRO
      tl.to(objeto, {

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

      // 2. CÁMARA HACIA EL OBJETO
      tl.to(
        escena,
        {
          scale: ZOOM,
          x: offsetX,
          y: offsetY,
          duration: 0.45,
          ease: "power2.out"
        },
        "<"
      );

      // 3. ESPERA
      tl.to({}, { duration: 0.15 });

      // 4. REGRESAR CÁMARA A DONDE ESTABA
      tl.to(escena, {
        scale: escalaActual,
        x: xActual,
        y: yActual,
        duration: 0.45,
        ease: "power2.inOut"
      });

      // 5. MOVER EL OBJETO AL SLOT
      tl.to(
        objeto,
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

      // 6. REBOTE
      tl.to(objeto, {
        scale: 0.5,
        duration: 0.12,
        ease: "back.out(4)"
      });

      // 7. DESAPARECER
      tl.to(objeto, {
        opacity: 0,
        duration: 0.15
      });

      // 8. LIMPIAR FILTRO
      tl.set(objeto, { clearProps: "filter" });

    };


    // =======================================================
    // FIN DE LA ESCENA
    // (se dispara cuando termina el último movimiento de cámara)
    // =======================================================

    const alTerminarEscena = () => {

      if (AVANZAR_AL_TERMINAR && cambiarEscenaRef.current) {
        cambiarEscenaRef.current(ESCENA_SIGUIENTE);
      }

    };


    // =======================================================
    // PAUSAR TODA LA ESCENA
    // =======================================================

    const pausarTodo = () => {

      obtenerVideos().forEach((video) => {

        if (video) {
          video.pause();
        }

      });

      if (cameraTimelineRef.current) {
        cameraTimelineRef.current.pause();
      }

      if (bunceTimerRef.current) {
        bunceTimerRef.current.pause();
      }

      if (boggisTimerRef.current) {
        boggisTimerRef.current.pause();
      }

    };


    // =======================================================
    // REANUDAR TODA LA ESCENA
    // =======================================================

    const reanudarTodo = () => {

      obtenerVideos().forEach((video) => {

        if (video) {

          // Bunce solo se reanuda si ya había empezado
          if (video === bunce11Ref.current && !bunceIniciado.current) {
            return;
          }

          // Boggis solo se reanuda si ya había empezado
          if (video === boggis11Ref.current && !boggisIniciado.current) {
            return;
          }

          video
            .play()
            .catch(() => {});

        }

      });

      if (cameraTimelineRef.current) {
        cameraTimelineRef.current.resume();
      }

      if (bunceTimerRef.current) {
        bunceTimerRef.current.resume();
      }

      if (boggisTimerRef.current) {
        boggisTimerRef.current.resume();
      }

    };


    // =======================================================
    // EXPONER FUNCIONES
    // =======================================================

    // iniciarTodo y estaIniciada los usa el botón de play/pausa de la interfaz:
    // si la escena todavía no empezó, el botón la inicia igual que un click.
    useImperativeHandle(ref, () => ({

      iniciarTodo: iniciarEscena,

      estaIniciada: () => escenaIniciada.current,

      pausarTodo,

      reanudarTodo

    }));


    // =======================================================
    // RETURN
    // =======================================================

    return (

      <div className="escena11-wrapper">

        {/* =================================================
            ESCENA (esta es la que la cámara escala y mueve)
        ================================================= */}

        <div
          ref={escenaRef}
          className="escena11"
          onClick={iniciarEscena}
        >

          {/* BOGGIS (oculto hasta el movimiento de cámara a Bunce,
              y su video arranca después de RETRASO_BOGGIS) */}

          <video
            ref={boggis11Ref}
            className="boggis11"
            onClick={() => clickPersonaje("boggis")}

            muted
            playsInline
            preload="auto"

            style={{
              opacity: 0,
              visibility: "hidden"
            }}
          >

            <source
              src={boggis11}
              type="video/webm"
            />

          </video>


          {/* BUNCE */}

          <video
            ref={bunce11Ref}
            className="bunce11"
            onClick={() => clickPersonaje("bunce")}

            muted
            playsInline
            preload="auto"
          >

            <source
              src={bunce11}
              type="video/webm"
            />

          </video>


          {/* BEAN */}

          <video
            ref={bean11Ref}
            className="bean11"
            onClick={() => clickPersonaje("bean")}

            muted
            playsInline
            preload="auto"
          >

            <source
              src={bean11}
              type="video/webm"
            />

          </video>


          {/* ESCENARIO */}

          <video
            ref={escenario11Ref}
            className="escenario11"

            muted
            playsInline
            preload="auto"
          >

            <source
              src={escenario11}
              type="video/mp4"
            />

          </video>

          {/* MURCIÉLAGO (OBJETO RECOGIBLE) */}

          {!murcielagoRecogido && (

            <img
              ref={murcielagoRef}
              src={murcielago}
              className="murcielago11"
              alt="Murciélago"
              draggable={false}
              onClick={(e) =>
                recogerObjeto(
                  e,
                  "murcielago",
                  murcielagoRef,
                  murcielagoRecogido
                )
              }
              style={{
                cursor: "pointer",
                userSelect: "none"
              }}
            />

          )}


          {/* HOJA (OBJETO RECOGIBLE) */}

          {!hojaRecogida && (

            <img
              ref={hojaRef}
              src={hoja}
              className="hoja11"
              alt="Hoja"
              draggable={false}
              onClick={(e) =>
                recogerObjeto(
                  e,
                  "hoja",
                  hojaRef,
                  hojaRecogida
                )
              }
              style={{
                cursor: "pointer",
                userSelect: "none"
              }}
            />

          )}

        </div>


        {/* =================================================
            ⬛ PANTALLA NEGRA
            (fuera del div animado para que no se escale)
        ================================================= */}

        <div
          className={`pantalla-negra11 ${
            pantallaNegra ? "activa" : ""
          }`}
        />

      </div>

    );

  }
);