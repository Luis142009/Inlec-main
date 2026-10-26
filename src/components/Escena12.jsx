import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import gsap from "gsap";

import fondo12 from "../assets/fondo12.webm";
import bean12 from "../assets/bean12.webm";
import beansin12 from "../assets/Beansin.webm";
import bunce12 from "../assets/Bunce12.webm";
import boggis12 from "../assets/boggis12.webm";
import escopeta12 from "../assets/escopeta.webm";

import flores from "../assets/svg/flores.svg";

import tocar from "../assets/audio/tocar.mp3";

import "../stylesheets/Escena12.css";


// Pasar a la siguiente escena cuando termine el video de fondo (30 s)
const AVANZAR_AL_TERMINAR = true;
const ESCENA_SIGUIENTE = 16;

// Segundo del video de Bean en el que se pausa TODO y aparece la escopeta
const SEGUNDO_PAUSA_BEAN = 20;

// Los granjeros pasan DETRÁS del fondo desde este segundo del video de Bean...
const SEGUNDO_DETRAS_BEAN = 21;

// ...y vuelven a estar POR ENCIMA del fondo 3 segundos después
const DURACION_DETRAS_S = 3;


// =========================================================
// CÁMARA (GSAP)
// =========================================================
// Misma lógica de siempre: tl.to(camara, { scale, x, y, duration, ease }, inicio)
//   - scale: zoom
//   - x / y: desplazamiento en px
//       x positivo = la cámara mira hacia la IZQUIERDA, x negativo = hacia la DERECHA
//       y positivo = la cámara SUBE,                   y negativo = la cámara BAJA
//   - duration: segundos que dura el movimiento
//   - el último número es el segundo (del video de fondo) en que arranca
//
// La línea de tiempo no corre sola: sigue el tiempo del video de fondo
// (0 a 30 s), así que se pausa y reanuda junto con la escena.
//
// OJO: los valores de x / y son una estimación de dónde está cada granjero.
// Ajústalos hasta que cada plano quede bien enfocado.

const ACTIVAR_CAMARA = true;

const EASE_CAMARA = "power2.inOut";

// Movimiento de cámara que NO se detiene cuando la escena se pausa en el
// segundo 20 (mientras se espera el click en la escopeta): arranca en
// INICIO y dura DURACION segundos. Si la escena se pausa a la mitad, la
// cámara termina el movimiento sola y luego espera.
// Importante: INICIO + DURACION tiene que ser menor que el segundo en que
// arranca el siguiente movimiento (el 6, a los 22 s).
const CAMARA_ROMPE_PAUSA_INICIO = 17.5;
const CAMARA_ROMPE_PAUSA_DURACION = 4;
const CAMARA_ROMPE_PAUSA_FIN =
  CAMARA_ROMPE_PAUSA_INICIO + CAMARA_ROMPE_PAUSA_DURACION;

const construirLineaCamara = (tl, camara) => {

  // Cada movimiento arranca en el mismo segundo de antes, pero ahora dura
  // casi hasta que arranca el siguiente, así la cámara no se queda quieta
  // tanto tiempo (antes había pausas de 3 y 4 s entre movimientos).
  // Si lo quieres más rápido, baja la duración; más lento, súbela.

  // 1) Zoom en los granjeros (los tres juntos)   (0 s -> 4.5 s)
  tl.to(camara, {
    scale: 2.6,
    x: -750,
    y: -450,
    duration: 5.5,
    ease: EASE_CAMARA
  }, 0);

  // 2) Pasa a Boggis                             (5 s -> 8.5 s)
  tl.to(camara, {
    scale: 2.2,
    x: -790,
    y: -350,
    duration: 4.5,
    ease: EASE_CAMARA
  }, 5);

  // 3) Pasa a Bean                               (9 s -> 12 s)
  tl.to(camara, {
    scale: 2.2,
    x: -750,
    y: -350,
    duration: 4,
    ease: EASE_CAMARA
  }, 9);

  // 4) Baja un poco                              (12.5 s -> 17 s)
  tl.to(camara, {
    x: 700,
    y: -300,
    duration: 4.5,
    ease: EASE_CAMARA
  }, 12.5);

  // 5) Pasa a la izquierda                       (17.5 s -> 21.5 s)
  //    ESTE MOVIMIENTO ROMPE LA PAUSA: cuando la escena se detiene en el
  //    segundo 20 esperando la escopeta, la cámara sigue moviéndose sola
  //    hasta terminar (ver actualizarCamara). Debe terminar antes de que
  //    arranque el movimiento 6 (22 s).
  tl.to(camara, {
    scale: 5.2,
    x: -700,
    y: -450,
    duration: CAMARA_ROMPE_PAUSA_DURACION,
    ease: EASE_CAMARA
  }, CAMARA_ROMPE_PAUSA_INICIO);

  // 6) Regresa a Bean                            (22 s -> 24 s)
  tl.to(camara, {
    scale: 2.0,
    x:   600,
    y: -460,
    duration: 2,
    ease: EASE_CAMARA
  }, 22);



   
 

};

// Fases de la escena
const FASE = {
  ESPERANDO: "esperando",         // antes del click en un granjero
  ANIMANDO: "animando",           // animación corriendo
  ESPERA_ESCOPETA: "espera",      // todo pausado, solo se puede clicar la escopeta
  CONTINUA: "continua"            // el resto de la animación sigue
};


// =========================================================
// ESCENA 15  (componente Escena12)
// =========================================================

export const Escena12 = forwardRef(
  (
    {
      cambiarEscena,
      onPersonajeClick,
      onPausaAudio,
      onContinuarAudio,

      // InterfazCap avisa si ya se recogieron
      onRecoger,
      floresRecogidas
    },
    ref
  ) => {

    // =======================================================
    // REFS
    // =======================================================

    const fondo12Ref = useRef(null);
    const bean12Ref = useRef(null);
    const beansin12Ref = useRef(null);
    const bunce12Ref = useRef(null);
    const boggis12Ref = useRef(null);
    const escopeta12Ref = useRef(null);

    // OBJETO RECOGIBLE
    const floresRef = useRef(null);

    // true mientras se anima la recogida (la cámara deja de seguir al video)
    const recogiendoRef = useRef(false);

    const tocarRef = useRef(null);

    if (!tocarRef.current) {
      tocarRef.current = new Audio(tocar);
    }

    const escenaIniciada = useRef(false);

    // Contenedor que se mueve y hace zoom (la "cámara")
    const camaraRef = useRef(null);
    const camaraTlRef = useRef(null);

    // Reloj propio de la cámara (segundos). Normalmente va igual que el
    // video de fondo, pero puede adelantarse mientras la escena está
    // pausada para terminar el movimiento que rompe la pausa.
    const camaraTiempoRef = useRef(0);
    const ultimoTickRef = useRef(null);

    // true cuando la persona pausó con el botón de pausa
    const pausadoManualRef = useRef(false);


    // Crear la línea de tiempo de la cámara al montar la escena
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

    // La fase vive en un ref (para el loop) y en estado (para renderizar)
    const faseRef = useRef(FASE.ESPERANDO);
    const [fase, setFaseState] = useState(FASE.ESPERANDO);

    // true = granjeros detrás del fondo
    const [granjerosDetras, setGranjerosDetras] = useState(false);
    const detrasRef = useRef(false);

    const rafRef = useRef(null);


    const setFase = (nuevaFase) => {
      faseRef.current = nuevaFase;
      setFaseState(nuevaFase);
    };


    const obtenerVideos = () => [
      fondo12Ref.current,
      bean12Ref.current,
      beansin12Ref.current,
      bunce12Ref.current,
      boggis12Ref.current,
      escopeta12Ref.current
    ].filter(Boolean);


    // =======================================================
    // VIGILAR EL TIEMPO DE BEAN
    //   - segundo 20: se pausa todo y aparece la escopeta
    //   - segundo 21 -> 24: granjeros detrás del fondo
    // =======================================================
    // bean12 sigue corriendo (oculto) después de la pausa solo para
    // llevar la cuenta del tiempo.

    const actualizarCamara = () => {

      const tl = camaraTlRef.current;
      const fondo = fondo12Ref.current;

      if (!tl || !fondo) {
        return;
      }

      // Mientras se recoge un objeto, la cámara la maneja esa animación
      if (recogiendoRef.current) {
        return;
      }

      // La cámara va al segundo en el que está el video de fondo
      tl.time(fondo.currentTime);

    };


    const vigilarBean = () => {

      actualizarCamara();

      const bean = bean12Ref.current;

      if (bean) {

        const t = bean.currentTime;

        // --- Pausa en el segundo 20 ---
        if (
          faseRef.current === FASE.ANIMANDO &&
          t >= SEGUNDO_PAUSA_BEAN
        ) {
          pausarEnSegundo20();
        }

        // --- Granjeros detrás del fondo (segundo 21 a 24) ---
        const debeEstarDetras =
          t >= SEGUNDO_DETRAS_BEAN &&
          t < SEGUNDO_DETRAS_BEAN + DURACION_DETRAS_S;

        if (debeEstarDetras !== detrasRef.current) {
          detrasRef.current = debeEstarDetras;
          setGranjerosDetras(debeEstarDetras);
        }

      }

      rafRef.current = requestAnimationFrame(vigilarBean);

    };


    const pausarEnSegundo20 = () => {

      // Pausar todo
      obtenerVideos().forEach((video) => {
        video.pause();
      });

      // Beansin y la escopeta aparecen quietos en su primer cuadro
      [beansin12Ref.current, escopeta12Ref.current]
        .filter(Boolean)
        .forEach((video) => {
          video.currentTime = 0;
        });

      setFase(FASE.ESPERA_ESCOPETA);

      // Pausar también el audio (lo maneja InterfazCap)
      if (onPausaAudio) {
        onPausaAudio();
      }

    };


    // =======================================================
    // INICIAR ESCENA (click en cualquiera de los granjeros)
    // =======================================================

    const iniciarEscena = () => {

      // Evitar múltiples inicios
      if (escenaIniciada.current) {
        return;
      }

      escenaIniciada.current = true;

      setFase(FASE.ANIMANDO);

      // Solo corren los videos de la animación inicial
      [
        fondo12Ref.current,
        bean12Ref.current,
        bunce12Ref.current,
        boggis12Ref.current
      ]
        .filter(Boolean)
        .forEach((video) => {

          video.currentTime = 0;

          video
            .play()
            .catch(() => {});

        });

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(vigilarBean);

    };


    // =======================================================
    // CLICK EN UN GRANJERO: inicia la escena y suena el audio
    // (el audio solo suena con este primer click)
    // =======================================================

    const alClickGranjero = (personaje) => {

      if (escenaIniciada.current) {
        return;
      }

      iniciarEscena();

      if (onPersonajeClick) {
        onPersonajeClick(personaje);
      }

    };


    // =======================================================
    // CLICK EN LA ESCOPETA -> EL RESTO CONTINÚA
    // =======================================================

    const alClickEscopeta = () => {

      if (faseRef.current !== FASE.ESPERA_ESCOPETA) {
        return;
      }

      setFase(FASE.CONTINUA);

      obtenerVideos().forEach((video) => {

        video
          .play()
          .catch(() => {});

      });

      // Reanudar también el audio
      if (onContinuarAudio) {
        onContinuarAudio();
      }

    };


    // =======================================================
    // CLICK EN LAS FLORES
    // brillo + cámara + rebote + vuelo al slot
    // =======================================================

    const recogerFlores = (e) => {

      e.stopPropagation();

      if (floresRecogidas || recogiendoRef.current) {
        return;
      }

      const objeto = floresRef.current;
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

      // ZOOM DE LA CÁMARA SOBRE LAS FLORES
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
            onRecoger("flores");
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

      // 2. CÁMARA HACIA LAS FLORES
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

      // 5. MOVER LAS FLORES AL SLOT
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

    const alTerminarEscena = () => {

      if (AVANZAR_AL_TERMINAR && cambiarEscena) {
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

      // Mientras se espera la escopeta, nada se reanuda
      if (faseRef.current === FASE.ESPERA_ESCOPETA) {
        return;
      }

      obtenerVideos().forEach((video) => {

        video
          .play()
          .catch(() => {});

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
    // ESTADO VISUAL SEGÚN LA FASE
    // =======================================================

    const revelarBeanSin =
      fase === FASE.ESPERA_ESCOPETA ||
      fase === FASE.CONTINUA;

    const esperandoEscopeta = fase === FASE.ESPERA_ESCOPETA;

    // Mientras se espera la escopeta, nada más recibe clicks
    const sinClicks = esperandoEscopeta ? { pointerEvents: "none" } : {};


    // =======================================================
    // CAPAS (z-index)
    // =======================================================
    // Solo se sobreescribe el z-index mientras los granjeros están
    // detrás del fondo; el resto del tiempo manda tu CSS.

    const estiloFondo = {
      ...(granjerosDetras ? { zIndex: 1 } : {}),
      ...sinClicks
    };

    const estiloGranjero = {
      ...(granjerosDetras ? { zIndex: 0 } : {}),
      ...sinClicks
    };


    // =======================================================
    // RETURN
    // =======================================================

    return (

      <div className="escena12-wrapper">

        {/* La cámara es el propio .escena12 (como tl.to(escena, ...)),
            así no se agrega ningún contenedor y el CSS queda igual */}

        <div
          ref={camaraRef}
          className="escena12"
        >

          {/* FONDO (marca el final de la escena) */}

          <video
            ref={fondo12Ref}
            className="fondo12"
            style={estiloFondo}
            muted
            playsInline
            preload="auto"
            onEnded={alTerminarEscena}
          >
            <source src={fondo12} type="video/webm" />
          </video>


          {/* BUNCE (click para iniciar) */}

          <video
            ref={bunce12Ref}
            className="bunce12"
            style={estiloGranjero}
            muted
            playsInline
            preload="auto"
            onClick={() => alClickGranjero("bunce")}
          >
            <source src={bunce12} type="video/webm" />
          </video>


          {/* BOGGIS (click para iniciar) */}

          <video
            ref={boggis12Ref}
            className="boggis12"
            style={estiloGranjero}
            muted
            playsInline
            preload="auto"
            onClick={() => alClickGranjero("boggis")}
          >
            <source src={boggis12} type="video/webm" />
          </video>


          {/* BEAN (con la escopeta incluida; click para iniciar).
              Se oculta cuando aparece beansin12, pero sigue corriendo
              para llevar la cuenta del tiempo. */}

          <video
            ref={bean12Ref}
            className={`bean12 ${revelarBeanSin ? "capa-oculta12" : ""}`}
            style={estiloGranjero}
            muted
            playsInline
            preload="auto"
            onClick={() => alClickGranjero("bean")}
          >
            <source src={bean12} type="video/webm" />
          </video>


          {/* BEAN SIN ESCOPETA + ESCOPETA SUELTA
              (aparecen en el segundo 20 de bean) */}

          <video
            ref={beansin12Ref}
            className={`beansin12 ${revelarBeanSin ? "" : "capa-oculta12"}`}
            style={estiloGranjero}
            muted
            playsInline
            preload="auto"
          >
            <source src={beansin12} type="video/webm" />
          </video>

          <video
            ref={escopeta12Ref}
            className={`escopeta12 ${revelarBeanSin ? "" : "capa-oculta12"}`}
            style={{
              ...(granjerosDetras ? { zIndex: 0 } : {}),
              cursor: esperandoEscopeta ? "pointer" : undefined,
              pointerEvents: esperandoEscopeta ? "auto" : "none"
            }}
            muted
            playsInline
            preload="auto"
            onClick={alClickEscopeta}
          >
            <source src={escopeta12} type="video/webm" />
          </video>

          {/* FLORES (OBJETO RECOGIBLE) */}

          {!floresRecogidas && (

            <img
              ref={floresRef}
              src={flores}
              className="flores12"
              alt="Flores"
              draggable={false}
              onClick={recogerFlores}
              style={{
                cursor: "pointer",
                userSelect: "none",
                ...sinClicks
              }}
            />

          )}

        </div>

      </div>

    );

  }
);