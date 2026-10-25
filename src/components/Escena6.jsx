import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import fondo6 from "../assets/fondo6.webm";
import arbol6 from "../assets/arbol6.webm";

import bellota from "../assets/svg/Bellota.svg";
import tocar from "../assets/audio/tocar.mp3";

import "../stylesheets/Escena6.css";


// Nivel de zoom de la cámara al recoger la bellota
const ZOOM = 2;


export const Escena6 = forwardRef(
  ({ cambiarEscena, onRecoger, objetoRecogido }, ref) => {


    // =========================================================
    // REFS
    // =========================================================

    const escenaRef = useRef(null);

    const fondo6Ref = useRef(null);
    const arbol6Ref = useRef(null);

    const bellotaRef = useRef(null);
    const tocarRef = useRef(null);
    const recogiendoBellota = useRef(false);
    const timelineRef = useRef(null);

    const escenaIniciada = useRef(false);

    const fondoTermino = useRef(false);
    const arbolTermino = useRef(false);


    // =========================================================
    // COMPROBAR SI TERMINÓ TODA LA ESCENA
    // =========================================================

    const comprobarFin = () => {

      if (
        fondoTermino.current &&
        arbolTermino.current
      ) {

        cambiarEscena(10);

      }

    };


    const fondoTerminado = () => {

      fondoTermino.current = true;

      comprobarFin();

    };


    const arbolTerminado = () => {

      arbolTermino.current = true;

      comprobarFin();

    };


    // =========================================================
    // INICIAR ESCENA
    // =========================================================

    const iniciarEscena = () => {

      // Evitar que se reproduzca varias veces
      if (escenaIniciada.current) {
        return;
      }

      escenaIniciada.current = true;

      // Reiniciar estados
      fondoTermino.current = false;
      arbolTermino.current = false;

      if (fondo6Ref.current) {

        fondo6Ref.current.currentTime = 0;

        fondo6Ref.current
          .play()
          .catch(() => {});

      }

      if (arbol6Ref.current) {

        arbol6Ref.current.currentTime = 0;

        arbol6Ref.current
          .play()
          .catch(() => {});

      }

    };


    // =========================================================
    // PAUSAR / REANUDAR TODA LA ESCENA
    // =========================================================

    const pausarTodo = () => {

      [
        fondo6Ref.current,
        arbol6Ref.current
      ].forEach((video) => {

        if (video) {
          video.pause();
        }

      });

      if (timelineRef.current) {
        timelineRef.current.pause();
      }

    };


    const reanudarTodo = () => {

      [
        fondo6Ref.current,
        arbol6Ref.current
      ].forEach((video) => {

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
    // SONIDO AL TOCAR OBJETOS (el mismo de la escena 1)
    // =========================================================

    useEffect(() => {

      tocarRef.current = new Audio(tocar);

      tocarRef.current.volume = 0.5;

      // Limpieza al desmontar
      return () => {

        if (timelineRef.current) {
          timelineRef.current.kill();
        }

      };

    }, []);


    // =========================================================
    // CLICK BELLOTA
    // =========================================================

    const clickBellota = (e) => {

      // Evita que el click llegue a otros elementos
      e.stopPropagation();

      // Evita recoger dos veces
      if (recogiendoBellota.current) {
        return;
      }

      const escena = escenaRef.current;
      const objeto = bellotaRef.current;

      if (!escena || !objeto) return;

      recogiendoBellota.current = true;


      // =====================================================
      // SLOT DESTINO (el primer espacio vacío)
      // =====================================================

      const slotDestino =
        document.querySelector(".slot.slot-vacio") ||
        document.querySelector(".slot");

      if (!slotDestino) {

        recogiendoBellota.current = false;

        return;

      }


      // =====================================================
      // SONIDO
      // =====================================================

      if (tocarRef.current) {

        tocarRef.current.currentTime = 0;

        tocarRef.current
          .play()
          .catch(() => {});

      }


      // =====================================================
      // POSICIONES (todo medido en pantalla, antes de animar)
      // =====================================================

      // La cámara escala desde el centro de la escena
      gsap.set(escena, { transformOrigin: "50% 50%" });

      const escenaRect = escena.getBoundingClientRect();
      const objetoRect = objeto.getBoundingClientRect();
      const slotRect = slotDestino.getBoundingClientRect();

      // Área visible (el contenedor donde se ve la escena)
      const padre = escena.parentElement;

      const vista = padre
        ? padre.getBoundingClientRect()
        : {
            left: 0,
            top: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
            width: window.innerWidth,
            height: window.innerHeight
          };

      // Punto de la pantalla donde queremos ver la bellota con zoom
      const destinoX = vista.left + vista.width / 2;
      const destinoY = vista.top + vista.height / 2;

      // Centro actual de la escena en pantalla
      const escenaCentroX = escenaRect.left + escenaRect.width / 2;
      const escenaCentroY = escenaRect.top + escenaRect.height / 2;

      // Centro actual de la bellota en pantalla
      const objetoCentroX = objetoRect.left + objetoRect.width / 2;
      const objetoCentroY = objetoRect.top + objetoRect.height / 2;

      // Cámara actual (a donde vuelve al final)
      const baseScale = gsap.getProperty(escena, "scale");
      const baseX = gsap.getProperty(escena, "x");
      const baseY = gsap.getProperty(escena, "y");

      // Distancia de la bellota al centro de la escena, sin zoom
      const dEscenaX = (objetoCentroX - escenaCentroX) / baseScale;
      const dEscenaY = (objetoCentroY - escenaCentroY) / baseScale;

      // Posición de cámara que deja la bellota en el destino con ZOOM
      let zoomX = baseX + (destinoX - escenaCentroX) - ZOOM * dEscenaX;
      let zoomY = baseY + (destinoY - escenaCentroY) - ZOOM * dEscenaY;

      // -----------------------------------------------------
      // LÍMITES: que el zoom nunca muestre fuera de la escena
      // -----------------------------------------------------

      // Tamaño de la escena sin zoom
      const anchoEscena = escenaRect.width / baseScale;
      const altoEscena = escenaRect.height / baseScale;

      // Mitad del tamaño de la escena ya con ZOOM
      const mitadAncho = (anchoEscena * ZOOM) / 2;
      const mitadAlto = (altoEscena * ZOOM) / 2;

      // Centro de la escena cuando x = 0 e y = 0
      const origenX = escenaCentroX - baseX;
      const origenY = escenaCentroY - baseY;

      // Rango de x/y donde la escena sigue cubriendo toda el área visible
      const minX = vista.right - mitadAncho - origenX;
      const maxX = vista.left + mitadAncho - origenX;

      const minY = vista.bottom - mitadAlto - origenY;
      const maxY = vista.top + mitadAlto - origenY;

      // Si la escena es más pequeña que el área visible no hay rango
      // válido y se deja sin limitar.
      if (minX <= maxX) {
        zoomX = Math.min(Math.max(zoomX, minX), maxX);
      }

      if (minY <= maxY) {
        zoomY = Math.min(Math.max(zoomY, minY), maxY);
      }

      // Desplazamiento de la bellota hasta el slot.
      // Se divide entre baseScale porque la bellota vive dentro de la
      // escena escalada (al terminar la cámara vuelve a baseScale).
      const dx =
        (slotRect.left + slotRect.width / 2 - objetoCentroX) / baseScale;

      const dy =
        (slotRect.top + slotRect.height / 2 - objetoCentroY) / baseScale;


      // =====================================================
      // ANIMACIÓN
      // =====================================================

      const tl = gsap.timeline({

        onComplete: () => {

          if (onRecoger) {

            onRecoger("bellota");

          }

        }

      });

      timelineRef.current = tl;


      // BRILLO
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


      // CÁMARA HACIA LA BELLOTA (donde está ahora)
      tl.to(escena, {

        scale: ZOOM,

        x: zoomX,

        y: zoomY,

        duration: 0.45,

        ease: "power2.out"

      }, "<");


      // ESPERA
      tl.to({}, {

        duration: 0.15

      });


      // REGRESAR CÁMARA
      tl.to(escena, {

        scale: baseScale,

        x: baseX,

        y: baseY,

        duration: 0.45,

        ease: "power2.inOut"

      });


      // MOVER BELLOTA AL SLOT
      tl.to(objeto, {

        x: dx,

        y: dy,

        scale: 0.4,

        rotation: 1080,

        duration: 0.8,

        ease: "power3.inOut"

      }, "<");


      // PEQUEÑO REBOTE
      tl.to(objeto, {

        scale: 0.5,

        duration: 0.12,

        ease: "back.out(4)"

      });


      // DESAPARECER
      tl.to(objeto, {

        opacity: 0,

        duration: 0.15

      });


      // LIMPIAR FILTRO
      tl.set(objeto, {

        clearProps: "filter"

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

      <div
        ref={escenaRef}
        className="escena6"
      >

        {/* FONDO */}
        <video
          ref={fondo6Ref}
          className="fondo6"

          muted
          playsInline
          preload="auto"

          onEnded={fondoTerminado}
        >

          <source
            src={fondo6}
            type="video/webm"
          />

        </video>


        {/* ÁRBOL */}
        <video
          ref={arbol6Ref}
          className="arbol6"

          muted
          playsInline
          preload="auto"

          onClick={iniciarEscena}

          onEnded={arbolTerminado}

          style={{
            cursor: "pointer"
          }}
        >

          <source
            src={arbol6}
            type="video/webm"
          />

        </video>


        {/* BELLOTA */}
        {!objetoRecogido && (

          <img
            ref={bellotaRef}

            src={bellota}

            className="bellota6"

            alt="bellota"

            onClick={clickBellota}

            draggable={false}
          />

        )}

      </div>

    );

  }
);