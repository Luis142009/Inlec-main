import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import fondo16 from "../assets/fondo16.webm";
import caminando16 from "../assets/caminando16.webm";

import cristal from "../assets/svg/Cristal.svg";
import vela from "../assets/svg/Vela.svg";

import tocar from "../assets/audio/tocar.mp3";

import "../stylesheets/Escena16.css";


// Al terminar la caminata (la familia sale de la cueva) pasa a la escena 20
const AVANZAR_AL_TERMINAR = true;
const ESCENA_SIGUIENTE = 20;

// Teclas que hacen avanzar a la familia (mantenerlas presionadas)
const TECLAS_AVANZAR = ["d", "arrowright"];

// Si el fondo se desfasa más de esto (segundos) del video de la familia,
// se vuelve a sincronizar
const DESFASE_MAXIMO = 0.08;


// =========================================================
// ESCENA 19  (componente Escena16)
// =========================================================
// Los dos videos (fondo y familia caminando) duran 12 s y van
// sincronizados. Mientras se mantiene presionada D (o la flecha →)
// los dos avanzan; al soltar la tecla se detienen.

export const Escena16 = forwardRef(
  (
    {
      cambiarEscena,

      // InterfazCap avisa si ya se recogieron
      onRecoger,
      cristalRecogido,
      velaRecogida
    },
    ref
  ) => {

    // =======================================================
    // REFS Y ESTADO
    // =======================================================

    const fondo16Ref = useRef(null);
    const caminando16Ref = useRef(null);

    // Contenedor que hace zoom al recoger un objeto (la "cámara")
    const camaraRef = useRef(null);

    // OBJETOS RECOGIBLES
    const cristalRef = useRef(null);
    const velaRef = useRef(null);

    // true mientras se anima la recogida (la familia no avanza)
    const recogiendoRef = useRef(false);

    const tocarRef = useRef(null);

    if (!tocarRef.current) {
      tocarRef.current = new Audio(tocar);
    }

    const pausadoRef = useRef(false);
    const terminadaRef = useRef(false);
    const avanzandoRef = useRef(false);
    const rafRef = useRef(null);

    // El aviso desaparece cuando se presiona la tecla por primera vez
    const [avisoVisible, setAvisoVisible] = useState(true);


    // =======================================================
    // MOVER / DETENER LA ANIMACIÓN
    // =======================================================

    const sincronizarFondo = () => {

      const fondo = fondo16Ref.current;
      const caminando = caminando16Ref.current;

      if (!fondo || !caminando) {
        return;
      }

      if (
        Math.abs(fondo.currentTime - caminando.currentTime) >
        DESFASE_MAXIMO
      ) {
        fondo.currentTime = caminando.currentTime;
      }

    };


    const vigilarSincronia = () => {

      sincronizarFondo();

      if (avanzandoRef.current) {
        rafRef.current = requestAnimationFrame(vigilarSincronia);
      }

    };


    const avanzar = () => {

      if (
        avanzandoRef.current ||
        pausadoRef.current ||
        terminadaRef.current ||
        recogiendoRef.current
      ) {
        return;
      }

      avanzandoRef.current = true;

      setAvisoVisible(false);

      [fondo16Ref.current, caminando16Ref.current]
        .filter(Boolean)
        .forEach((video) => {
          video.play().catch(() => {});
        });

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(vigilarSincronia);

    };


    const detener = () => {

      avanzandoRef.current = false;

      cancelAnimationFrame(rafRef.current);

      [fondo16Ref.current, caminando16Ref.current]
        .filter(Boolean)
        .forEach((video) => {
          video.pause();
        });

      sincronizarFondo();

    };


    // =======================================================
    // TECLADO
    // =======================================================

    useEffect(() => {

      const esTeclaAvanzar = (event) =>
        TECLAS_AVANZAR.includes(event.key.toLowerCase());

      const teclaPresionada = (event) => {

        if (!esTeclaAvanzar(event)) {
          return;
        }

        event.preventDefault();

        avanzar();

      };

      const teclaSoltada = (event) => {

        if (!esTeclaAvanzar(event)) {
          return;
        }

        event.preventDefault();

        detener();

      };

      // Si la ventana pierde el foco con la tecla presionada,
      // no se queda avanzando sola
      const perdioFoco = () => detener();

      window.addEventListener("keydown", teclaPresionada);
      window.addEventListener("keyup", teclaSoltada);
      window.addEventListener("blur", perdioFoco);

      return () => {
        window.removeEventListener("keydown", teclaPresionada);
        window.removeEventListener("keyup", teclaSoltada);
        window.removeEventListener("blur", perdioFoco);
        cancelAnimationFrame(rafRef.current);
      };

    }, []);


    // =======================================================
    // CLICK EN UN OBJETO (cristal o vela)
    // brillo + cámara + rebote + vuelo al slot
    // =======================================================

    const recogerObjeto = (e, clave, elementoRef, yaRecogido) => {

      e.stopPropagation();

      if (
        yaRecogido ||
        recogiendoRef.current ||
        terminadaRef.current
      ) {
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


      // La familia se detiene mientras se recoge el objeto.
      // Al terminar, vuelve a caminar si se sigue presionando D / →
      detener();


      // =====================================================
      // ESTADO ACTUAL DE LA CÁMARA
      // =====================================================

      gsap.set(camara, { transformOrigin: "50% 50%" });

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
    // FIN DE LA ESCENA
    // =======================================================

    const alTerminar = () => {

      if (terminadaRef.current) {
        return;
      }

      terminadaRef.current = true;
      avanzandoRef.current = false;

      if (AVANZAR_AL_TERMINAR && cambiarEscena) {
        cambiarEscena(ESCENA_SIGUIENTE);
      }

    };


    // =======================================================
    // PAUSAR / REANUDAR (botón de pausa de la interfaz)
    // =======================================================
    // Mientras está en pausa las teclas no hacen nada. Al reanudar,
    // la animación solo se mueve si se vuelve a presionar la tecla.

    const pausarTodo = () => {

      pausadoRef.current = true;

      detener();

    };


    const reanudarTodo = () => {

      pausadoRef.current = false;

    };


    // =======================================================
    // EXPONER FUNCIONES
    // =======================================================

    useImperativeHandle(ref, () => ({

      pausarTodo,

      reanudarTodo

    }));


    // =======================================================
    // RETURN
    // =======================================================

    return (

      <div className="escena16-wrapper">

        <div
          ref={camaraRef}
          className="escena16"
        >

          {/* FONDO (la cueva) */}

          <video
            ref={fondo16Ref}
            className="fondo16"
            muted
            playsInline
            preload="auto"
          >
            <source src={fondo16} type="video/webm" />
          </video>


          {/* FAMILIA FOX CAMINANDO */}

          <video
            ref={caminando16Ref}
            className="caminando16"
            muted
            playsInline
            preload="auto"
            onEnded={alTerminar}
          >
            <source src={caminando16} type="video/webm" />
          </video>

          {/* CRISTAL (OBJETO RECOGIBLE) */}

          {!cristalRecogido && (

            <img
              ref={cristalRef}
              src={cristal}
              className="cristal16"
              alt="Cristal"
              draggable={false}
              onClick={(e) =>
                recogerObjeto(e, "cristal", cristalRef, cristalRecogido)
              }
              style={{
                cursor: "pointer",
                userSelect: "none"
              }}
            />

          )}


          {/* VELA (OBJETO RECOGIBLE) */}

          {!velaRecogida && (

            <img
              ref={velaRef}
              src={vela}
              className="vela16"
              alt="Vela"
              draggable={false}
              onClick={(e) =>
                recogerObjeto(e, "vela", velaRef, velaRecogida)
              }
              style={{
                cursor: "pointer",
                userSelect: "none"
              }}
            />

          )}

        </div>


        {/* AVISO */}

        {avisoVisible && (

          <div className="noticia-objetos">

            Ayuda a la familia Fox a salir de la cueva
            manteniendo presionada la tecla D o la flecha →

          </div>

        )}

      </div>

    );

  }
);