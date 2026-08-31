import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import "../stylesheets/PortadaCapitulo.css";

import audio9 from "../assets/audio/cap2.mp3";
import cap1 from "../assets/audio/Cap1.mp3";

export const PortadaCapitulo = ({
  visible,
  numero,
  numeroAnterior,
  titulo,
  totalObjetos,
  objetos = [],
  onComenzar,
}) => {

  // =========================================================
  // AUDIO
  // =========================================================

  const audioRef = useRef(null);


  // =========================================================
  // NÚMERO MOSTRADO (permite animar 1 -> 2 aunque el
  // componente se remonte al cambiar de capítulo)
  // =========================================================

  const [numeroMostrado, setNumeroMostrado] = useState(
    () => (numeroAnterior != null ? numeroAnterior : numero)
  );

  // Controla el momento en que el número "aterriza", para
  // disparar el aro de impacto y el rebote de aplastamiento
  // justo cuando termina de caer/subir.

  const [numeroAterrizo, setNumeroAterrizo] = useState(false);

  useEffect(() => {

    setNumeroAterrizo(false);

  }, [numeroMostrado]);


  useEffect(() => {

    if (!visible) {
      return;
    }


    // Si venimos de un capítulo distinto, primero mostramos el
    // número anterior (quieto) y luego, tras un pequeño retraso
    // -para que ya se vea la caja/sello en pantalla-, lo hacemos
    // caer mientras sube el número nuevo.

    if (
      numeroAnterior != null &&
      numeroAnterior !== numero
    ) {

      setNumeroMostrado(numeroAnterior);

      const timer = setTimeout(() => {

        setNumeroMostrado(numero);

      }, 1400);

      return () => clearTimeout(timer);

    }


    // Primer capítulo / sin anterior: se muestra directo.

    setNumeroMostrado(numero);

  }, [visible, numero, numeroAnterior]);


  // =========================================================
  // AUDIO AUTOMÁTICO
  // =========================================================

  useEffect(() => {

    if (!visible) {
      return;
    }


    // =========================================================
    // SELECCIONAR AUDIO
    // =========================================================

    let audioSource = null;

    if (numero === 1) {
      audioSource = cap1;
    }

    if (numero === 2) {
      audioSource = audio9;
    }


    if (!audioSource) {
      return;
    }


    // =========================================================
    // CREAR AUDIO
    // =========================================================

    const audio = new Audio();

    audio.src = audioSource;

    audio.loop = true;

    audio.preload = "auto";

    // =========================================================
    // VOLUMEN
    // =========================================================

    if (numero === 1) {

      // CAPÍTULO 1
      audio.volume = 1.0;

    } else {

      // CAPÍTULO 2
      audio.volume = 0.8;

    }


    // =========================================================
    // GUARDAR REFERENCIA
    // =========================================================

    audioRef.current = audio;


    // =========================================================
    // CARGAR AUDIO
    // =========================================================

    audio.load();


    // =========================================================
    // INTENTAR REPRODUCCIÓN AUTOMÁTICA
    // =========================================================

    const iniciarAudio = async () => {

      try {

        await audio.play();

        console.log(
          `🎵 Capítulo ${numero}: música iniciada automáticamente`
        );

      } catch (error) {

        console.warn(
          `⚠️ El navegador bloqueó el autoplay del capítulo ${numero}.`,
          error
        );

      }

    };


    // =========================================================
    // ESPERAR A QUE EL AUDIO ESTÉ LISTO
    // =========================================================

    if (audio.readyState >= 3) {

      iniciarAudio();

    } else {

      audio.addEventListener(
        "canplay",
        iniciarAudio,
        { once: true }
      );

    }


    // =========================================================
    // LIMPIEZA
    // =========================================================

    return () => {

      audio.removeEventListener(
        "canplay",
        iniciarAudio
      );

      audio.pause();

      audio.currentTime = 0;

      audio.src = "";

      if (audioRef.current === audio) {
        audioRef.current = null;
      }

    };

  }, [visible, numero]);


  // =========================================================
  // COMENZAR CAPÍTULO
  // =========================================================

  const manejarComenzar = () => {

    if (onComenzar) {
      onComenzar();
    }

  };


  // =========================================================
  // CANTIDAD DE OBJETOS
  // =========================================================

  const cantidadObjetos =
    totalObjetos || objetos.length || 0;

  const casillas = Array.from(
    { length: cantidadObjetos },
    (_, i) => i
  );


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <AnimatePresence>

      {visible && (

        <motion.div
          className="portada-capitulo-overlay"

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          exit={{
            opacity: 0,
          }}

          transition={{
            duration: 0.4,
          }}

          onClick={manejarComenzar}
        >

          {/* =====================================================
              VIÑETA
          ===================================================== */}

          <div className="portada-capitulo-vineta" />


          {/* =====================================================
              TELÓN IZQUIERDO
          ===================================================== */}

          <motion.div
            className="
              portada-capitulo-cortina
              portada-capitulo-cortina-izq
            "

            initial={{
              x: "0%",
            }}

            animate={{
              x: "-100%",
            }}

            transition={{
              duration: 0.9,
              delay: 0.25,
              ease: [0.76, 0, 0.24, 1],
            }}
          />


          {/* =====================================================
              TELÓN DERECHO
          ===================================================== */}

          <motion.div
            className="
              portada-capitulo-cortina
              portada-capitulo-cortina-der
            "

            initial={{
              x: "0%",
            }}

            animate={{
              x: "100%",
            }}

            transition={{
              duration: 0.9,
              delay: 0.25,
              ease: [0.76, 0, 0.24, 1],
            }}
          />


          {/* =====================================================
              TARJETA PRINCIPAL
          ===================================================== */}

          <motion.div
            className="portada-capitulo-contenido"

            initial={{
              opacity: 0,
              scale: 0.55,
              rotate: -4,
            }}

            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}

            exit={{
              opacity: 0,
              scale: 0.7,
            }}

            transition={{
              duration: 0.8,
              delay: 0.55,
              ease: [0.17, 0.89, 0.32, 1.25],
            }}
          >

            {/* =================================================
                ESQUINEROS
            ================================================= */}

            <span
              className="
                portada-capitulo-esquina
                portada-capitulo-esquina-tl
              "
            />

            <span
              className="
                portada-capitulo-esquina
                portada-capitulo-esquina-tr
              "
            />

            <span
              className="
                portada-capitulo-esquina
                portada-capitulo-esquina-bl
              "
            />

            <span
              className="
                portada-capitulo-esquina
                portada-capitulo-esquina-br
              "
            />

            <div className="portada-capitulo-borde" />


            {/* =================================================
                SELLO
            ================================================= */}

            <motion.div
              className="portada-capitulo-sello-envoltura"

              initial={{
                scale: 0,
                rotate: -20,
                opacity: 0,
              }}

              animate={{
                scale: 1,
                rotate: 0,
                opacity: 1,
              }}

              transition={{
                type: "spring",
                stiffness: 260,
                damping: 12,
                delay: 1.05,
              }}
            >

              <div className="portada-capitulo-sello">

                <span className="portada-capitulo-sello-texto">
                  CAPÍTULO
                </span>

              </div>

            </motion.div>


            {/* =================================================
                NÚMERO (cae/sube al cambiar de capítulo, con
                aro de impacto y rebote al aterrizar)
            ================================================= */}

            <div
              className="portada-capitulo-numero-envoltura"
              style={{ perspective: 800 }}
            >

              {/* ARO DE IMPACTO */}

              <motion.div

                key={`impacto-${numeroMostrado}`}

                className="portada-capitulo-numero-impacto"

                initial={{
                  scale: 0.3,
                  opacity: 0,
                }}

                animate={
                  numeroAterrizo
                    ? {
                        scale: 1.7,
                        opacity: [0, 0.55, 0],
                      }
                    : {
                        scale: 0.3,
                        opacity: 0,
                      }
                }

                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                }}
              />


              {/* ENVOLTURA DE REBOTE (squash & stretch al
                  aterrizar) — envuelve al número, no lo duplica */}

              <motion.div

                key={`rebote-${numeroMostrado}`}

                className="portada-capitulo-numero-rebote"

                animate={
                  numeroAterrizo
                    ? {
                        scaleX: [1, 1.14, 0.94, 1.03, 1],
                        scaleY: [1, 0.86, 1.06, 0.98, 1],
                      }
                    : {
                        scaleX: 1,
                        scaleY: 1,
                      }
                }

                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}

                style={{
                  transformOrigin: "bottom center",
                }}
              >

                <AnimatePresence mode="popLayout">

                  <motion.h1
                    key={numeroMostrado}
                    className="portada-capitulo-numero"

                    style={{ transformStyle: "preserve-3d" }}

                    initial={{
                      opacity: 0,
                      y: 160,
                      rotateX: 65,
                      scale: 0.6,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      scale: 1,
                    }}

                    exit={{
                      opacity: 0,
                      y: 170,
                      rotateX: -50,
                      scale: 0.75,
                    }}

                    transition={{
                      type: "spring",
                      stiffness: 170,
                      damping: 11,
                      mass: 0.9,
                    }}

                    onAnimationComplete={() => {

                      setNumeroAterrizo(true);

                    }}
                  >

                    {numeroMostrado}

                  </motion.h1>

                </AnimatePresence>

              </motion.div>

            </div>


            {/* =================================================
                NOMBRE DEL CAPÍTULO
            ================================================= */}

            <div className="portada-capitulo-etiqueta-contenedor">

              <motion.span
                className="portada-capitulo-etiqueta"

                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.9,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}

                transition={{
                  duration: 0.5,
                  delay: 1.35,
                }}
              >

                {titulo || "LA FAMILIA FOX"}

              </motion.span>

            </div>


            {/* =================================================
                SEPARADOR
            ================================================= */}

            <motion.div
              className="portada-capitulo-separador"

              initial={{
                opacity: 0,
                scaleX: 0,
              }}

              animate={{
                opacity: 1,
                scaleX: 1,
              }}

              transition={{
                duration: 0.5,
                delay: 1.55,
                ease: "easeOut",
              }}
            >

              <span className="portada-capitulo-separador-linea" />

              <span className="portada-capitulo-separador-hoja">
                🍂
              </span>

              <span className="portada-capitulo-separador-linea" />

            </motion.div>


            {/* =================================================
                TEXTO
            ================================================= */}

            <motion.p
              className="portada-capitulo-texto"

              initial={{
                opacity: 0,
                y: 14,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.55,
                delay: 1.65,
              }}
            >

              Durante este capítulo tendrás que encontrar{" "}

              <strong>
                {cantidadObjetos}{" "}
                {cantidadObjetos === 1
                  ? "objeto oculto"
                  : "objetos ocultos"}
              </strong>

              {" "}escondidos a lo largo del camino.

            </motion.p>


            {/* =================================================
                MARCOS CON OBJETOS
            ================================================= */}

            <div className="portada-capitulo-cuerda">

              {casillas.map((i) => {

                const objetoActual = objetos[i];

                return (

                  <motion.div
                    key={i}

                    className="portada-capitulo-marco-envoltura"

                    initial={{
                      opacity: 0,
                      y: -26,
                      rotate: -8,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                      rotate: 0,
                    }}

                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 10,
                      delay: 1.85 + i * 0.14,
                    }}
                  >

                    {/* =================================================
                        CLIP
                    ================================================= */}

                    <span className="portada-capitulo-clip" />


                    {/* =================================================
                        MARCO
                    ================================================= */}

                    <motion.div
                      className="portada-capitulo-marco"

                      animate={{
                        rotate: [-3, 3, -3],
                      }}

                      transition={{
                        duration: 3.4 + i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2.4 + i * 0.14,
                      }}

                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >

                      {objetoActual ? (

                        <img
                          src={objetoActual}

                          className="portada-capitulo-objeto"

                          alt={`Silueta del objeto ${i + 1}`}

                          draggable={false}

                          style={{
                            width: "70%",
                            height: "70%",
                            objectFit: "contain",
                            display: "block",
                            pointerEvents: "none",
                            userSelect: "none",
                          }}
                        />

                      ) : (

                        <div
                          style={{
                            width: "70%",
                            height: "70%",
                          }}
                        />

                      )}

                    </motion.div>

                  </motion.div>

                );

              })}

            </div>


            {/* =================================================
                CTA
            ================================================= */}

            <motion.span
              className="portada-capitulo-cta"

              initial={{
                opacity: 0,
                y: 10,
              }}

              animate={{
                opacity: [0, 1, 0.55, 1],
                y: 0,
              }}

              transition={{

                opacity: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay:
                    2.7 +
                    casillas.length * 0.14,
                },

                y: {
                  duration: 0.5,
                  delay:
                    2.7 +
                    casillas.length * 0.14,
                },

              }}
            >

              Toca para comenzar

            </motion.span>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

};