import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import fondo22 from "../assets/fondo22.webm";
import gallina22 from "../assets/gallina22.webm";

import maiz from "../assets/svg/Maiz.svg";
import sidra from "../assets/svg/Sidra.svg";

import tocar from "../assets/audio/tocar.mp3";

import "../stylesheets/Escena21.css";


// =========================================================
// ESCENA 24 del reproductor (componente Escena21)
//
// 2 videos webm de 10 s que van sincronizados:
//   fondo22   -> el gallinero
//   gallina22 -> la gallina (trae su propio audio)
//
// Al entrar quedan quietos en el primer cuadro. Al dar click en
// la gallina arrancan los 2 a la vez y se mueve la cámara:
//   0 -> 3 s     zoom a la gallina
//   3 -> 6.5 s   la cámara va a la derecha
//   6.5 -> 10 s  la cámara va a la izquierda
// La cámara está atada al tiempo del video de la gallina: si se
// pausa, la cámara se queda en el mismo punto.
//
// Objetos recogibles: maíz y sidra (mismo efecto que en la
// escena 22: brillo + zoom de cámara + vuelo al slot).
// =========================================================

// Pasar a la siguiente escena cuando termine el video
const AVANZAR_AL_TERMINAR = false;
const ESCENA_SIGUIENTE = 25;

// Si el fondo se desfasa más de esto (segundos) de la gallina,
// se vuelve a sincronizar
const DESFASE_MAXIMO = 0.08;

// Duración de los videos (segundos)
const DURACION = 10;

// La gallina desaparece este tiempo (segundos) después del click.
// Si se pausa la escena, el conteo también se pausa.
const TIEMPO_DESAPARECER = 5;

// Duración del fundido al desaparecer (segundos). 0 = de golpe
const DURACION_FUNDIDO = 0.5;


export const Escena21 = forwardRef(
  (
    {
      cambiarEscena,

      // Volumen de efectos de la interfaz (0 a 1). Se aplica al
      // audio que trae el video de la gallina.
      volumen = 0.7,

      // Opcional: avisa a InterfazCap que se tocó a la gallina
      onPersonajeClick,

      // InterfazCap avisa si ya se recogieron
      onRecoger,
      maizRecogido,
      sidraRecogida
    },
    ref
  ) => {

    // =========================================================
    // ESTADO Y REFS
    // =========================================================

    // true cuando ya se dio click en la gallina
    const [iniciado, setIniciado] = useState(false);

    const iniciadoRef = useRef(false);
    const terminadaRef = useRef(false);
    const rafRef = useRef(null);

    // Desaparición de la gallina
    const desaparecidaRef = useRef(false);
    const timerRef = useRef(null);
    const restanteRef = useRef(0);
    const inicioTimerRef = useRef(0);
    const fundidoRef = useRef(null);

    // Contenedor que se mueve (la "cámara") y su timeline
    const camaraRef = useRef(null);
    const camaraTlRef = useRef(null);

    const fondoRef = useRef(null);
    const gallinaRef = useRef(null);

    // OBJETOS RECOGIBLES
    const maizRef = useRef(null);
    const sidraRef = useRef(null);

    // Evita recoger dos objetos a la vez (cada uno vuela a un slot distinto)
    const recogiendoRef = useRef(false);

    const tocarRef = useRef(null);

    if (!tocarRef.current) {
      tocarRef.current = new Audio(tocar);
    }


    const obtenerMedios = () =>
      [fondoRef.current, gallinaRef.current].filter(Boolean);


    // =========================================================
    // DESAPARECER LA GALLINA
    // El conteo solo avanza mientras la escena no está en pausa:
    // al pausar se guarda cuánto falta y al reanudar sigue desde ahí.
    // =========================================================

    const desaparecerGallina = () => {

      timerRef.current = null;
      restanteRef.current = 0;
      desaparecidaRef.current = true;

      const gallina = gallinaRef.current;

      if (!gallina) {
        return;
      }

      fundidoRef.current = gsap.to(gallina, {
        opacity: 0,
        duration: DURACION_FUNDIDO,
        ease: "power1.out",
        onComplete: () => {
          gallina.style.visibility = "hidden";
          gallina.style.pointerEvents = "none";
        }
      });

    };


    const programarDesaparicion = () => {

      if (
        desaparecidaRef.current ||
        timerRef.current !== null ||
        restanteRef.current <= 0
      ) {
        return;
      }

      inicioTimerRef.current = performance.now();

      timerRef.current = setTimeout(
        desaparecerGallina,
        restanteRef.current
      );

    };


    const pausarDesaparicion = () => {

      if (timerRef.current === null) {
        return;
      }

      clearTimeout(timerRef.current);
      timerRef.current = null;

      restanteRef.current = Math.max(
        0,
        restanteRef.current -
          (performance.now() - inicioTimerRef.current)
      );

    };


    // =========================================================
    // CÁMARA
    // Tiempos en segundos del video (0 a 10).
    // Se usan xPercent / yPercent (% del tamaño del escenario) para
    // que se vea igual en cualquier tamaño de pantalla.
    // xPercent negativo = la cámara va a la derecha
    // yPercent negativo = la cámara baja
    // Máximo sin ver el borde: (scale - 1) / 2 * 100
    //   (con scale 1.5 -> 25 %)
    // =========================================================

    const crearCamara = () => {

      const camara = camaraRef.current;

      if (!camara) {
        return null;
      }

      gsap.set(camara, {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        transformOrigin: "50% 50%"
      });

      const tl = gsap.timeline({ paused: true });

      // 1) Zoom a la gallina (0 s -> 3 s)
      tl.to(camara, {
        scale: 3.5,
        xPercent: 100,
        yPercent: -122,
        duration: 3,
        ease: "power2.inOut"
      }, 0);

      // 2) Nos vamos a la derecha (3 s -> 6.5 s)
      tl.to(camara, {
        scale: 1.5,
        xPercent: -22,
        yPercent: -22,
        duration: 3.5,
        ease: "power2.inOut"
      }, 3);

      // 3) Nos vamos a la izquierda (6.5 s -> 10 s)
      tl.to(camara, {
        scale: 1.5,
        xPercent: 22,
        yPercent: -22,
        duration: 3.5,
        ease: "power2.inOut"
      }, 6.5);

      return tl;

    };


    // =========================================================
    // SINCRONIZAR (el fondo sigue a la gallina; la cámara sigue
    // el tiempo de la gallina)
    // =========================================================

    const sincronizar = () => {

      const gallina = gallinaRef.current;
      const fondo = fondoRef.current;

      if (!gallina || !fondo) {
        return;
      }

      if (
        Math.abs(fondo.currentTime - gallina.currentTime) >
        DESFASE_MAXIMO
      ) {
        fondo.currentTime = gallina.currentTime;
      }

      camaraTlRef.current?.time(
        Math.min(gallina.currentTime, DURACION)
      );

    };


    const vigilar = () => {

      sincronizar();

      rafRef.current = requestAnimationFrame(vigilar);

    };


    // =========================================================
    // VOLUMEN (el de la interfaz, para el audio de la gallina)
    // =========================================================

    useEffect(() => {

      if (gallinaRef.current) {
        gallinaRef.current.volume = Math.min(1, Math.max(0, volumen));
      }

    }, [volumen]);


    // =========================================================
    // CÁMARA: se crea al entrar y se limpia al salir de la escena
    // =========================================================

    useEffect(() => {

      camaraTlRef.current = crearCamara();

      return () => {

        camaraTlRef.current?.kill();

        clearTimeout(timerRef.current);
        fundidoRef.current?.kill();

        cancelAnimationFrame(rafRef.current);

        obtenerMedios().forEach((medio) => {
          try {
            medio.pause();
          } catch {}
        });

      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // =========================================================
    // CLICK EN LA GALLINA: arrancan los 2 videos juntos
    // =========================================================

    const iniciar = () => {

      if (iniciadoRef.current) {
        return;
      }

      iniciadoRef.current = true;
      setIniciado(true);

      obtenerMedios().forEach((medio) => {

        try {

          medio.currentTime = 0;

          medio.play().catch(() => {});

        } catch {}

      });

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(vigilar);

      // Empieza el conteo para que desaparezca la gallina
      restanteRef.current = TIEMPO_DESAPARECER * 1000;
      programarDesaparicion();

      if (onPersonajeClick) {
        onPersonajeClick("gallina");
      }

    };


    // Enter / espacio para quien use teclado
    const teclaGallina = (e) => {

      if (e.key === "Enter" || e.key === " ") {

        e.preventDefault();

        iniciar();

      }

    };


    // =========================================================
    // CUANDO TERMINA EL VIDEO
    // =========================================================

    const alTerminar = () => {

      if (terminadaRef.current) {
        return;
      }

      terminadaRef.current = true;

      cancelAnimationFrame(rafRef.current);

      obtenerMedios().forEach((medio) => {
        try {
          medio.pause();
        } catch {}
      });

      // La cámara termina exactamente en su último punto
      camaraTlRef.current?.time(DURACION);

      if (AVANZAR_AL_TERMINAR && cambiarEscena) {
        cambiarEscena(ESCENA_SIGUIENTE);
      }

    };


    // =========================================================
    // PAUSAR / REANUDAR (botón de pausa de la interfaz)
    // Antes del click todo está quieto, así que reanudar no hace nada
    // =========================================================

    const pausarTodo = () => {

      pausarDesaparicion();

      fundidoRef.current?.pause();

      cancelAnimationFrame(rafRef.current);

      obtenerMedios().forEach((medio) => {
        try {
          medio.pause();
        } catch {}
      });

      // La cámara se queda en el mismo punto que el video
      sincronizar();

    };


    const reanudarTodo = () => {

      if (!iniciadoRef.current) {
        return;
      }

      // El conteo y el fundido siguen aunque el video ya haya terminado
      programarDesaparicion();

      fundidoRef.current?.resume();

      if (terminadaRef.current) {
        return;
      }

      obtenerMedios().forEach((medio) => {
        try {
          medio.play().catch(() => {});
        } catch {}
      });

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(vigilar);

    };


    // =========================================================
    // CLICK EN UN OBJETO (maíz o sidra)
    // brillo + cámara + rebote + vuelo al slot
    // (misma lógica que la escena 22; la cámara aquí usa
    // xPercent / yPercent, así que el zoom también se hace en %)
    // =========================================================

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


      // Si la escena ya arrancó, se congela todo (videos, cámara y
      // conteo de la gallina) mientras se recoge el objeto, y luego
      // sigue igual
      const estabaIniciada = iniciadoRef.current;

      if (estabaIniciada) {
        pausarTodo();
      }


      // ESTADO ACTUAL DE LA CÁMARA

      const escalaActual =
        Number(gsap.getProperty(camara, "scale")) || 1;

      const xPercentActual =
        Number(gsap.getProperty(camara, "xPercent")) || 0;

      const yPercentActual =
        Number(gsap.getProperty(camara, "yPercent")) || 0;


      // POSICIONES

      const camaraRect = camara.getBoundingClientRect();
      const objetoRect = objeto.getBoundingClientRect();
      const slotRect = slotDestino.getBoundingClientRect();

      const camaraCentroX = camaraRect.left + camaraRect.width / 2;
      const camaraCentroY = camaraRect.top + camaraRect.height / 2;

      const objetoCentroX = objetoRect.left + objetoRect.width / 2;
      const objetoCentroY = objetoRect.top + objetoRect.height / 2;

      // ZOOM DE LA CÁMARA SOBRE EL OBJETO
      const ZOOM = 2;

      // Desplazamiento en px para dejar el objeto en el centro...
      const offsetX =
        -ZOOM * (objetoCentroX - camaraCentroX) / escalaActual;

      const offsetY =
        -ZOOM * (objetoCentroY - camaraCentroY) / escalaActual;

      // ...convertido a % del tamaño de la cámara (xPercent / yPercent)
      const ancho = camara.offsetWidth || 1;
      const alto = camara.offsetHeight || 1;

      const offsetXPercent = (offsetX / ancho) * 100;
      const offsetYPercent = (offsetY / alto) * 100;

      // VUELO AL SLOT (en px locales de la escena)
      const dx =
        (slotRect.left + slotRect.width / 2 - objetoCentroX) /
        escalaActual;

      const dy =
        (slotRect.top + slotRect.height / 2 - objetoCentroY) /
        escalaActual;


      gsap.killTweensOf(objeto);


      // TIMELINE

      const tl = gsap.timeline({

        onComplete: () => {

          recogiendoRef.current = false;

          if (estabaIniciada) {
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
        camara,
        {
          scale: ZOOM,
          xPercent: offsetXPercent,
          yPercent: offsetYPercent,
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
        xPercent: xPercentActual,
        yPercent: yPercentActual,
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

    const listo = !iniciado;

    return (

      <div className="escena21-wrapper">

        <div className="escena21">

          {/* CÁMARA: todo lo que está dentro se mueve junto */}
          <div ref={camaraRef} className="camara21">

            {/* FONDO */}

            <video
              ref={fondoRef}
              className="fondo21"
              muted
              playsInline
              preload="auto"
            >
              <source src={fondo22} type="video/webm" />
            </video>


            {/* GALLINA (click: inicia la escena) */}

            <video
              ref={gallinaRef}
              className={"gallina21" + (listo ? " gallina21--lista" : "")}
              playsInline
              preload="auto"

              onClick={iniciar}
              onKeyDown={teclaGallina}
              onEnded={alTerminar}

              role="button"
              tabIndex={listo ? 0 : -1}
              aria-label="Tocar a la gallina"
            >
              <source src={gallina22} type="video/webm" />
            </video>


            {/* MAÍZ (OBJETO RECOGIBLE) */}

            {!maizRecogido && (

              <img
                ref={maizRef}
                src={maiz}
                className="maiz21"
                alt="Maíz"
                draggable={false}
                onClick={(e) =>
                  recogerObjeto(
                    e,
                    "maiz",
                    maizRef,
                    maizRecogido
                  )
                }
                style={{
                  cursor: "pointer",
                  userSelect: "none"
                }}
              />

            )}


            {/* SIDRA (OBJETO RECOGIBLE) */}

            {!sidraRecogida && (

              <img
                ref={sidraRef}
                src={sidra}
                className="sidra21"
                alt="Sidra"
                draggable={false}
                onClick={(e) =>
                  recogerObjeto(
                    e,
                    "sidra",
                    sidraRef,
                    sidraRecogida
                  )
                }
                style={{
                  cursor: "pointer",
                  userSelect: "none"
                }}
              />

            )}

          </div>

        </div>

      </div>

    );

  }
);

Escena21.displayName = "Escena21";

export default Escena21;