import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import gsap from "gsap";

import mesa13 from "../assets/Cocina.webm";
import fondo13 from "../assets/fondoescena13.webm";
import srfox13 from "../assets/srfox13.webm";      // Sr. Fox (sentado en el taburete)
import srafox13 from "../assets/srafox13.webm";      // Sra. Fox (con el papel)
import junior13 from "../assets/junior13.webm";     // Junior

import huevo from "../assets/svg/Huevo.svg";
import pelota from "../assets/svg/Pelota.svg";

import tocar from "../assets/audio/tocar.mp3";

import "../stylesheets/Escena13.css";


// Pasar a la siguiente escena cuando TERMINEN todos los videos
// (fondo, Sr. Fox y Sra. Fox duran 8 s; Junior dura 10 s)
const AVANZAR_AL_TERMINAR = true;
const ESCENA_SIGUIENTE = 17;

// Videos que marcan el final de la escena (fondo, Sra. Fox, Sr. Fox y Junior).
// La mesa se reproduce con ellos pero no cuenta para avanzar.
const VIDEOS_QUE_CUENTAN = 4;


// =========================================================
// CÁMARA (GSAP)  ->  DESACTIVADA POR AHORA (0 movimiento)
// =========================================================
// Cuando quieras moverla, pon ACTIVAR_CAMARA = true y agrega
// movimientos en construirLineaCamara (misma lógica de siempre:
// tl.to(camara, { scale, x, y, duration, ease }, segundoDeInicio)).
// La línea de tiempo sigue el tiempo del video de fondo (0 a 8 s).

const ACTIVAR_CAMARA = false;

const EASE_CAMARA = "power2.inOut";

const construirLineaCamara = (tl, camara) => {

  // Ejemplo (comentado):
  // tl.to(camara, {
  //   scale: 1.5,
  //   x: 0,
  //   y: 0,
  //   duration: 3,
  //   ease: EASE_CAMARA
  // }, 0);

};


// =========================================================
// ESCENA 16  (componente Escena13)
// =========================================================

export const Escena13 = forwardRef(
  (
    {
      cambiarEscena,
      onPersonajeClick,
      onPausaAudio,
      onContinuarAudio,

      // InterfazCap avisa si ya se recogieron
      onRecoger,
      huevoRecogido,
      pelotaRecogida
    },
    ref
  ) => {

    // =======================================================
    // REFS
    // =======================================================

    const fondo13Ref = useRef(null);
    const srfox13Ref = useRef(null);
    const srafox13Ref = useRef(null);
    const junior13Ref = useRef(null);
    const mesa13Ref = useRef(null);

    // OBJETOS RECOGIBLES
    const huevoRef = useRef(null);
    const pelotaRef = useRef(null);

    // Evita recoger dos objetos a la vez (cada uno vuela a un slot distinto)
    const recogiendoRef = useRef(false);

    const tocarRef = useRef(null);

    if (!tocarRef.current) {
      tocarRef.current = new Audio(tocar);
    }

    const escenaIniciada = useRef(false);
    const videosTerminados = useRef(0);

    const camaraRef = useRef(null);
    const camaraTlRef = useRef(null);
    const rafRef = useRef(null);


    const obtenerVideos = () => [
      fondo13Ref.current,
      srfox13Ref.current,
      srafox13Ref.current,
      junior13Ref.current,
      mesa13Ref.current
    ].filter(Boolean);


    // =======================================================
    // CÁMARA: crear la línea de tiempo al montar
    // =======================================================

    useEffect(() => {

      const camara = camaraRef.current;

      if (!ACTIVAR_CAMARA || !camara) {
        return;
      }

      gsap.set(camara, {
        scale: 1,
        x: 0,
        y: 0,
        transformOrigin: "50% 50%"
      });

      const tl = gsap.timeline({ paused: true });

      construirLineaCamara(tl, camara);

      camaraTlRef.current = tl;

      return () => {
        tl.kill();
        camaraTlRef.current = null;
      };

    }, []);


    // La cámara va al segundo en el que está el video de fondo
    const actualizarCamara = () => {

      const tl = camaraTlRef.current;
      const fondo = fondo13Ref.current;

      // Mientras se recoge un objeto, la cámara la maneja esa animación
      if (tl && fondo && !recogiendoRef.current) {
        tl.time(fondo.currentTime);
      }

      rafRef.current = requestAnimationFrame(actualizarCamara);

    };


    // =======================================================
    // INICIAR ESCENA (click en cualquier personaje)
    // =======================================================

    const iniciarEscena = () => {

      if (escenaIniciada.current) {
        return;
      }

      escenaIniciada.current = true;
      videosTerminados.current = 0;

      obtenerVideos().forEach((video) => {

        video.currentTime = 0;

        video
          .play()
          .catch(() => {});

      });

      if (ACTIVAR_CAMARA) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(actualizarCamara);
      }

    };


    const alClickPersonaje = (personaje) => {

      if (escenaIniciada.current) {
        return;
      }

      iniciarEscena();

      if (onPersonajeClick) {
        onPersonajeClick(personaje);
      }

    };


    // =======================================================
    // CLICK EN UN OBJETO (huevo o pelota)
    // brillo + cámara + rebote + vuelo al slot
    // =======================================================

    const recogerObjeto = (e, clave, elementoRef, yaRecogido) => {

      e.stopPropagation();

      if (yaRecogido || recogiendoRef.current) {
        return;
      }

      const objeto = elementoRef.current;
      const camara = camaraRef.current;

      if (!objeto || !camara) {
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


      // Se congelan los videos que estén corriendo (y el audio)
      // mientras se recoge el objeto; luego se reanudan solo esos
      const videosActivos = obtenerVideos().filter(
        (video) => !video.paused && !video.ended
      );

      videosActivos.forEach((video) => video.pause());

      if (videosActivos.length > 0 && onPausaAudio) {
        onPausaAudio();
      }


      // =====================================================
      // ESTADO ACTUAL DE LA CÁMARA
      // =====================================================

      const escalaActual =
        Number(gsap.getProperty(camara, "scale")) || 1;

      const xActual =
        Number(gsap.getProperty(camara, "x")) || 0;

      const yActual =
        Number(gsap.getProperty(camara, "y")) || 0;


      // =====================================================
      // POSICIONES
      // =====================================================

      const camaraRect = camara.getBoundingClientRect();
      const objetoRect = objeto.getBoundingClientRect();
      const slotRect = slotDestino.getBoundingClientRect();

      const camaraCentroX = camaraRect.left + camaraRect.width / 2;
      const camaraCentroY = camaraRect.top + camaraRect.height / 2;

      const objetoCentroX = objetoRect.left + objetoRect.width / 2;
      const objetoCentroY = objetoRect.top + objetoRect.height / 2;

      // ZOOM DE LA CÁMARA SOBRE EL OBJETO
      const ZOOM = 2;

      const offsetX =
        -ZOOM * (objetoCentroX - camaraCentroX) / escalaActual;

      const offsetY =
        -ZOOM * (objetoCentroY - camaraCentroY) / escalaActual;

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

          videosActivos.forEach((video) => {
            video.play().catch(() => {});
          });

          if (videosActivos.length > 0 && onContinuarAudio) {
            onContinuarAudio();
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
        camara,
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
      tl.to(camara, {
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
    // FIN DE LA ESCENA (cuando termina el último video)
    // =======================================================

    const alTerminarVideo = () => {

      videosTerminados.current += 1;

      if (
        videosTerminados.current >= VIDEOS_QUE_CUENTAN &&
        AVANZAR_AL_TERMINAR &&
        cambiarEscena
      ) {
        cambiarEscena(ESCENA_SIGUIENTE);
      }

    };


    // =======================================================
    // PAUSAR / REANUDAR
    // =======================================================

    const pausarTodo = () => {

      obtenerVideos().forEach((video) => {
        video.pause();
      });

    };


    const reanudarTodo = () => {

      obtenerVideos().forEach((video) => {

        if (!video.ended) {
          video
            .play()
            .catch(() => {});
        }

      });

    };


    // =======================================================
    // LIMPIEZA
    // =======================================================

    useEffect(() => {

      return () => {
        cancelAnimationFrame(rafRef.current);
      };

    }, []);


    // =======================================================
    // EXPONER FUNCIONES
    // =======================================================

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

      <div className="escena13-wrapper">

        <div
          ref={camaraRef}
          className="escena13"
        >

          {/* FONDO */}

          <video
            ref={fondo13Ref}
            className="fondo13"
            muted
            playsInline
            preload="auto"
            onEnded={alTerminarVideo}
          >
            <source src={fondo13} type="video/webm" />
          </video>


          {/* SRA. FOX (click para iniciar) */}

          <video
            ref={srafox13Ref}
            className="srafox13"
            muted
            playsInline
            preload="auto"
            onClick={() => alClickPersonaje("sraFox")}
            onEnded={alTerminarVideo}
          >
            <source src={srafox13} type="video/webm" />
          </video>


          {/* SR. FOX (click para iniciar) */}

          <video
            ref={srfox13Ref}
            className="srfox13"
            muted
            playsInline
            preload="auto"
            onClick={() => alClickPersonaje("srFox")}
            onEnded={alTerminarVideo}
          >
            <source src={srfox13} type="video/webm" />
          </video>


          {/* JUNIOR (click para iniciar) */}

          <video
            ref={junior13Ref}
            className="junior13"
            muted
            playsInline
            preload="auto"
            onClick={() => alClickPersonaje("junior")}
            onEnded={alTerminarVideo}
          >
            <source src={junior13} type="video/webm" />
          </video>


          {/* MESA (por encima de los personajes, sin clicks) */}

          <video
            ref={mesa13Ref}
            className="mesa13"
            muted
            playsInline
            preload="auto"
          >
            <source src={mesa13} type="video/webm" />
          </video>


          {/* HUEVO (OBJETO RECOGIBLE) */}

          {!huevoRecogido && (

            <img
              ref={huevoRef}
              src={huevo}
              className="huevo13"
              alt="Huevo"
              draggable={false}
              onClick={(e) =>
                recogerObjeto(e, "huevo", huevoRef, huevoRecogido)
              }
              style={{
                cursor: "pointer",
                userSelect: "none"
              }}
            />

          )}


          {/* PELOTA (OBJETO RECOGIBLE) */}

          {!pelotaRecogida && (

            <img
              ref={pelotaRef}
              src={pelota}
              className="pelota13"
              alt="Pelota"
              draggable={false}
              onClick={(e) =>
                recogerObjeto(e, "pelota", pelotaRef, pelotaRecogida)
              }
              style={{
                cursor: "pointer",
                userSelect: "none"
              }}
            />

          )}

        </div>

      </div>

    );

  }
);