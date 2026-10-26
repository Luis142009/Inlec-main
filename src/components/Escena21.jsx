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
      onPersonajeClick
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

          </div>

        </div>

      </div>

    );

  }
);

Escena21.displayName = "Escena21";

export default Escena21;