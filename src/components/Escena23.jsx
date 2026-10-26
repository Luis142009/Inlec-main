
import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import fondo23 from "../assets/fondo23.webm";
import banquete23 from "../assets/banquete23.webm";
import fox23 from "../assets/fox58.webm";

import leche from "../assets/svg/Leche.svg";
import escoba from "../assets/svg/Escoba.svg";

import tocar from "../assets/audio/tocar.mp3";

import "../stylesheets/Escena23.css";

const AVANZAR_AL_TERMINAR = false;
const ESCENA_SIGUIENTE = 27;

export const Escena23 = forwardRef(
  (
    {
      cambiarEscena,
      onPersonajeClick,
      onRecoger,
      lecheRecogida = false,
      escobaRecogida = false
    },
    ref
  ) => {
    const [iniciado, setIniciado] = useState(false);

    const escenaRef = useRef(null);

    const fondoRef = useRef(null);
    const banqueteRef = useRef(null);
    const foxRef = useRef(null);

    // Referencias de los objetos recogibles
    const lecheRef = useRef(null);
    const escobaRef = useRef(null);

    // Evita recoger dos objetos simultáneamente
    const recogiendoRef = useRef(false);

    const tocarRef = useRef(null);

    if (!tocarRef.current) {
      tocarRef.current = new Audio(tocar);
    }

    const camaraTlRef = useRef(null);
    const iniciadoRef = useRef(false);

    const obtenerMedios = () => {
      return [
        fondoRef.current,
        banqueteRef.current,
        foxRef.current
      ].filter(Boolean);
    };

    // =========================================================
    // CÁMARA
    // =========================================================

    const crearCamara = () => {
      const escena = escenaRef.current;

      if (!escena) {
        return null;
      }

      gsap.set(escena, {
        scale: 1,
        x: 0,
        y: 0,
        transformOrigin: "50% 50%"
      });

      const tl = gsap.timeline({ paused: true });

      tl.to(
        escena,
        {
          scale: 1.12,
          x: 0,
          y: -20,
          duration: 10,
          ease: "power1.inOut"
        },
        0
      );

      return tl;
    };

    // =========================================================
    // LIMPIEZA
    // =========================================================

    useEffect(() => {
      return () => {
        camaraTlRef.current?.kill();

        obtenerMedios().forEach((medio) => {
          try {
            medio.pause();
          } catch {}
        });

        tocarRef.current?.pause();

        gsap.killTweensOf([
          lecheRef.current,
          escobaRef.current,
          escenaRef.current
        ]);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // =========================================================
    // MOSTRAR PRIMER CUADRO DE LOS VIDEOS
    // =========================================================

    const mostrarPrimerCuadro = (e) => {
      if (iniciadoRef.current) {
        return;
      }

      try {
        e.currentTarget.currentTime = 0.01;
      } catch {}
    };

    const avisarError = (nombre) => (e) => {
      const err = e.currentTarget.error;

      console.error(
        `Escena 26: no cargó el video "${nombre}"`,
        err?.code,
        err?.message,
        e.currentTarget.currentSrc
      );
    };

    // =========================================================
    // INICIAR ESCENA
    // =========================================================

    const iniciarEscena = (personaje) => {
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

      camaraTlRef.current?.kill();

      camaraTlRef.current = crearCamara();

      camaraTlRef.current?.play(0);

      if (onPersonajeClick) {
        onPersonajeClick(personaje);
      }
    };

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
    // =========================================================

    const reanudarTodo = () => {
      if (!iniciadoRef.current) {
        return;
      }

      obtenerMedios().forEach((medio) => {
        try {
          medio.play().catch(() => {});
        } catch {}
      });

      camaraTlRef.current?.resume();
    };

    // =========================================================
    // RECOGER OBJETOS
    // Leche y escoba
    // =========================================================

    const recogerObjeto = (
      e,
      clave,
      elementoRef,
      yaRecogido
    ) => {
      e.stopPropagation();
      e.preventDefault();

      if (yaRecogido || recogiendoRef.current) {
        return;
      }

      const objeto = elementoRef.current;
      const camara = escenaRef.current;

      if (!objeto || !camara) {
        return;
      }

      // Buscar el primer espacio vacío del inventario
      const slots = Array.from(
        document.querySelectorAll(".slot")
      );

      const slotDestino =
        slots.find((slot) =>
          slot.classList.contains("slot-vacio")
        ) ||
        slots.find((slot) =>
          !slot.querySelector("img")
        );

      if (!slotDestino) {
        console.warn(
          "No se encontró un slot vacío para guardar el objeto."
        );
        return;
      }

      recogiendoRef.current = true;

      // Reproducir sonido
      if (tocarRef.current) {
        tocarRef.current.currentTime = 0;

        tocarRef.current.play().catch(() => {});
      }

      // Guardar si la escena estaba reproduciéndose
      const estabaIniciada = iniciadoRef.current;

      if (estabaIniciada) {
        pausarTodo();
      }

      // Guardar el estado actual de la cámara
      const escalaActual =
        Number(gsap.getProperty(camara, "scale")) || 1;

      const xActual =
        Number(gsap.getProperty(camara, "x")) || 0;

      const yActual =
        Number(gsap.getProperty(camara, "y")) || 0;

      // Obtener posiciones en pantalla
      const camaraRect = camara.getBoundingClientRect();
      const objetoRect = objeto.getBoundingClientRect();
      const slotRect = slotDestino.getBoundingClientRect();

      const camaraCentroX =
        camaraRect.left + camaraRect.width / 2;

      const camaraCentroY =
        camaraRect.top + camaraRect.height / 2;

      const objetoCentroX =
        objetoRect.left + objetoRect.width / 2;

      const objetoCentroY =
        objetoRect.top + objetoRect.height / 2;

      // Acercar la cámara al objeto
      const ZOOM = 2;

      const offsetX =
        (-ZOOM * (objetoCentroX - camaraCentroX)) /
        escalaActual;

      const offsetY =
        (-ZOOM * (objetoCentroY - camaraCentroY)) /
        escalaActual;

      // Calcular el desplazamiento hacia el inventario
      const dx =
        (
          slotRect.left +
          slotRect.width / 2 -
          objetoCentroX
        ) / escalaActual;

      const dy =
        (
          slotRect.top +
          slotRect.height / 2 -
          objetoCentroY
        ) / escalaActual;

      gsap.killTweensOf(objeto);

      // Animación completa de recogida
      gsap.timeline({
        onComplete: () => {
          recogiendoRef.current = false;

          // Notificar a InterfazCap para guardar el objeto
          if (onRecoger) {
            onRecoger(clave);
          }

          // Continuar la escena si estaba reproduciéndose
          if (estabaIniciada) {
            reanudarTodo();
          }
        }
      })

        // 1. Brillo, aumento y giro
        .to(objeto, {
          filter: `
            drop-shadow(0 0 25px #ffffff)
            drop-shadow(0 0 60px #ffe600)
            drop-shadow(0 0 120px #ff9900)
          `,
          scale: 1.35,
          rotation: 360,
          duration: 0.35,
          ease: "back.out(2)"
        })

        // 2. Acercar la cámara al objeto
        .to(
          camara,
          {
            scale: ZOOM,
            x: offsetX,
            y: offsetY,
            duration: 0.45,
            ease: "power2.out"
          },
          "<"
        )

        // 3. Breve pausa visual
        .to({}, { duration: 0.15 })

        // 4. Devolver la cámara a su posición
        .to(camara, {
          scale: escalaActual,
          x: xActual,
          y: yActual,
          duration: 0.45,
          ease: "power2.inOut"
        })

        // 5. Hacer volar el objeto hasta el inventario
        .to(
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
        )

        // 6. Rebote
        .to(objeto, {
          scale: 0.5,
          duration: 0.12,
          ease: "back.out(4)"
        })

        // 7. Desaparecer
        .to(objeto, {
          opacity: 0,
          duration: 0.15
        })

        // 8. Limpiar el filtro
        .set(objeto, {
          clearProps: "filter"
        });
    };

    // =========================================================
    // FINAL DE LA ESCENA
    // =========================================================

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

    // =========================================================
    // MÉTODOS EXPUESTOS A INTERFAZCAP
    // =========================================================

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
      <div className="escena23-wrapper">
        <div
          className="escena23"
          style={{ overflow: "hidden" }}
        >
          <div
            ref={escenaRef}
            className="camara23"
          >
            {/* FONDO */}
            <video
              ref={fondoRef}
              className="fondo23"
              src={fondo23}
              muted
              playsInline
              preload="auto"
              onLoadedData={mostrarPrimerCuadro}
              onError={avisarError("fondo23")}
            />

            {/* BANQUETE */}
            <video
              ref={banqueteRef}
              className="banquete23"
              src={banquete23}
              muted
              playsInline
              preload="auto"
              onLoadedData={mostrarPrimerCuadro}
              onError={avisarError("banquete23")}
              onEnded={terminarEscena}
            />

            {/* SR. FOX */}
            <video
              ref={foxRef}
              className="srfox23"
              src={fox23}
              muted
              playsInline
              preload="auto"
              onLoadedData={mostrarPrimerCuadro}
              onError={avisarError("fox23")}
            />

            {/* LECHE: OBJETO RECOGIBLE */}
            {!lecheRecogida && (
              <img
                ref={lecheRef}
                src={leche}
                className="leche23 objeto-recogible23"
                alt="Leche"
                draggable={false}
                onClick={(e) =>
                  recogerObjeto(
                    e,
                    "leche",
                    lecheRef,
                    lecheRecogida
                  )
                }
                style={{
                  cursor: "pointer",
                  userSelect: "none"
                }}
              />
            )}

            {/* ESCOBA: OBJETO RECOGIBLE */}
            {!escobaRecogida && (
              <img
                ref={escobaRef}
                src={escoba}
                className="escoba23 objeto-recogible23"
                alt="Escoba"
                draggable={false}
                onClick={(e) =>
                  recogerObjeto(
                    e,
                    "escoba",
                    escobaRef,
                    escobaRecogida
                  )
                }
                style={{
                  cursor: "pointer",
                  userSelect: "none"
                }}
              />
            )}

            {/* CAPA PARA INICIAR LA ESCENA */}
            {listo && (
              <div
                className="inicio23"
                onClick={() => iniciarEscena("fox")}
                onKeyDown={teclaPersonaje("fox")}
                role="button"
                tabIndex={0}
                aria-label="Tocar para comenzar la escena"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

Escena23.displayName = "Escena23";

export default Escena23;
