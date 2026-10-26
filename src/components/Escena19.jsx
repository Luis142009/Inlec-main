import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import fondo20 from "../assets/fondo20.webm";
import multi20 from "../assets/multi20.webm";
import fox20 from "../assets/fox20.webm";

import piedras from "../assets/svg/Piedras.svg";
import hongos from "../assets/svg/Hogos.svg";

import tocar from "../assets/audio/tocar.mp3";

import "../stylesheets/Escena19.css";


// =========================================================
// ESCENA 22 (componente Escena19)
//
// 3 videos webm de 12 s que van sincronizados:
//   fondo20 -> el fondo
//   multi20 -> capa a pantalla completa (varios elementos)
//   fox20   -> el Sr. Fox
//
// Al entrar quedan quietos en el primer cuadro. Al dar click en
// el Sr. Fox arrancan los 3 a la vez y se mueve la cámara.
//
// Objetos recogibles: piedras y hongos.
// =========================================================

// Pasar a la siguiente escena cuando termine el video
const AVANZAR_AL_TERMINAR = true;
const ESCENA_SIGUIENTE = 23;


export const Escena19 = forwardRef(
  (
    {
      cambiarEscena,

      // Reproduce el audio del personaje (lo maneja InterfazCap).
      // Recibe "fox".
      onPersonajeClick,

      // InterfazCap avisa si ya se recogieron
      onRecoger,
      piedrasRecogidas,
      hongosRecogidos
    },
    ref
  ) => {

    // true cuando ya se dio click en el Sr. Fox
    const [iniciado, setIniciado] = useState(false);

    // Contenedor que se mueve (la "cámara")
    const escenaRef = useRef(null);

    const fondoRef = useRef(null);
    const multiRef = useRef(null);
    const foxRef = useRef(null);

    // OBJETOS RECOGIBLES
    const piedrasRef = useRef(null);
    const hongosRef = useRef(null);

    // Evita recoger dos objetos a la vez (cada uno vuela a un slot distinto)
    const recogiendoRef = useRef(false);

    const tocarRef = useRef(null);

    if (!tocarRef.current) {
      tocarRef.current = new Audio(tocar);
    }

    // Timeline de la cámara (para poder pausarla)
    const camaraTlRef = useRef(null);

    // Para saber, sin depender de renders, si ya se hizo click
    const iniciadoRef = useRef(false);


    const obtenerMedios = () => {

      return [
        fondoRef.current,
        multiRef.current,
        foxRef.current
      ].filter(Boolean);

    };


    // =========================================================
    // CÁMARA
    // 1) zoom inicial
    // 2) nos vamos a la derecha
    // 3) regresamos al medio
    // 4) subimos
    //
    // x negativo = la cámara va a la derecha
    // y positivo = la cámara sube
    //
    // Máximo sin ver el borde: (scale - 1) / 2 * ancho (o alto)
    // Ej.: scale 1.3 -> 15 % del ancho y 15 % del alto
    // =========================================================

    const crearCamara = () => {

      const escena = escenaRef.current;

      if (!escena) {
        return null;
      }

      // Posición inicial
      gsap.set(escena, {
        scale: 1,
        x: 0,
        y: 0,
        transformOrigin: "50% 50%"
      });

      const tl = gsap.timeline({ paused: true });

      // 1) Zoom inicial (0 s -> 3 s)
      tl.to(escena, {

        scale: 3.0,
        x: 900,
        y: -680,

        duration: 3,

        ease: "power2.inOut"

      }, 0);

      // 2) Nos vamos a la derecha (3 s -> 6.5 s)
      tl.to(escena, {

        scale: 1.3,
        x: -220,
        y: 0,

        duration: 3.5,

        ease: "power2.inOut"

      }, 3);

      // 3) Regresamos al medio (6.5 s -> 9 s)
      tl.to(escena, {

        scale: 1.3,
        x: 0,
        y: 0,

        duration: 2.5,

        ease: "power2.inOut"

      }, 6.5);

      // 4) Subimos (9 s -> 12 s)
      tl.to(escena, {

        scale: 1.3,
        x: 0,
        y: 120,

        duration: 3,

        ease: "power2.inOut"

      }, 9);

      return tl;

    };


    // Limpieza al salir de la escena
    useEffect(() => {

      return () => {

        camaraTlRef.current?.kill();

        obtenerMedios().forEach((medio) => {

          try {
            medio.pause();
          } catch {}

        });

      };

      // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);


    // Click en el Sr. Fox: arrancan los 3 videos y la cámara juntos
    const iniciarEscena = (personaje) => {

      if (iniciadoRef.current) {
        return;
      }

      iniciadoRef.current = true;
      setIniciado(true);

      obtenerMedios().forEach((medio) => {

        try {

          medio.currentTime = 0;

          medio
            .play()
            .catch(() => {});

        } catch {}

      });

      // Cámara

      camaraTlRef.current?.kill();

      camaraTlRef.current = crearCamara();

      camaraTlRef.current?.play(0);

      if (onPersonajeClick) {

        onPersonajeClick(personaje);

      }

    };


    // Enter / espacio para quien use teclado
    const teclaPersonaje = (personaje) => (e) => {

      if (e.key === "Enter" || e.key === " ") {

        e.preventDefault();

        iniciarEscena(personaje);

      }

    };


    // =========================================================
    // PAUSAR TODO
    // =========================================================

    const pausarTodo = () => {

      obtenerMedios().forEach((medio) => {

        try {
          medio.pause();
        } catch {}

      });

      camaraTlRef.current?.pause();

    };


    // =========================================================
    // REANUDAR TODO
    // (solo si ya se dio click; antes de eso todo está quieto)
    // =========================================================

    const reanudarTodo = () => {

      if (!iniciadoRef.current) {
        return;
      }

      obtenerMedios().forEach((medio) => {

        try {

          medio
            .play()
            .catch(() => {});

        } catch {}

      });

      camaraTlRef.current?.resume();

    };


    // =========================================================
    // CLICK EN UN OBJETO (piedras u hongos)
    // brillo + cámara + rebote + vuelo al slot
    // =========================================================

    const recogerObjeto = (e, clave, elementoRef, yaRecogido) => {

      e.stopPropagation();

      if (yaRecogido || recogiendoRef.current) {
        return;
      }

      const objeto = elementoRef.current;
      const camara = escenaRef.current;

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


      // Si la escena ya arrancó, se congela todo (videos y cámara)
      // mientras se recoge el objeto, y luego sigue igual
      const estabaIniciada = iniciadoRef.current;

      if (estabaIniciada) {
        pausarTodo();
      }


      // ESTADO ACTUAL DE LA CÁMARA

      const escalaActual =
        Number(gsap.getProperty(camara, "scale")) || 1;

      const xActual =
        Number(gsap.getProperty(camara, "x")) || 0;

      const yActual =
        Number(gsap.getProperty(camara, "y")) || 0;


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


    // Cuando termina el video
    const terminarEscena = () => {

      obtenerMedios().forEach((medio) => {

        try {
          medio.pause();
        } catch {}

      });

      camaraTlRef.current?.pause();

      if (AVANZAR_AL_TERMINAR && cambiarEscena) {

        cambiarEscena(ESCENA_SIGUIENTE);

      }

    };


    useImperativeHandle(
      ref,
      () => ({

        pausarTodo,

        reanudarTodo

      }),
      []
    );


    const listo = !iniciado;

    return (

      <div className="escena19-wrapper">

        {/* overflow hidden: al hacer zoom nada se sale de la escena */}
        <div className="escena19" style={{ overflow: "hidden" }}>

          {/* CÁMARA: todo lo que está dentro se mueve junto */}
          <div ref={escenaRef} className="camara19">


            {/* FONDO (al terminar pasa a la siguiente escena) */}

            <video
              ref={fondoRef}
              className="fondo19"

              src={fondo20}

              muted
              playsInline
              preload="auto"

              onEnded={terminarEscena}
            />


            {/* MULTI (capa a pantalla completa) */}

            <video
              ref={multiRef}
              className="multi19"

              src={multi20}

              muted
              playsInline
              preload="auto"
            />


            {/* SR. FOX (click: inicia la escena) */}

            <video
              ref={foxRef}
              className={"srfox19" + (listo ? " srfox19--listo" : "")}

              src={fox20}

              muted
              playsInline
              preload="auto"

              onClick={() => iniciarEscena("fox")}
              onKeyDown={teclaPersonaje("fox")}
              role="button"
              tabIndex={listo ? 0 : -1}
              aria-label="Tocar al señor Fox"
            />


            {/* PIEDRAS (OBJETO RECOGIBLE) */}

            {!piedrasRecogidas && (

              <img
                ref={piedrasRef}
                src={piedras}
                className="piedras19"
                alt="Piedras"
                draggable={false}
                onClick={(e) =>
                  recogerObjeto(
                    e,
                    "piedras",
                    piedrasRef,
                    piedrasRecogidas
                  )
                }
                style={{
                  cursor: "pointer",
                  userSelect: "none"
                }}
              />

            )}


            {/* HONGOS (OBJETO RECOGIBLE) */}

            {!hongosRecogidos && (

              <img
                ref={hongosRef}
                src={hongos}
                className="hongos19"
                alt="Hongos"
                draggable={false}
                onClick={(e) =>
                  recogerObjeto(
                    e,
                    "hongos",
                    hongosRef,
                    hongosRecogidos
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

Escena19.displayName = "Escena19";

export default Escena19;