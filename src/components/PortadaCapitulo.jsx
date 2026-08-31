import React from "react";
import { motion, AnimatePresence } from "motion/react";

import "../stylesheets/PortadaCapitulo.css";

export const PortadaCapitulo = ({
  visible,
  numero,
  titulo,
  totalObjetos,
  objetos = [],
  onComenzar,
}) => {

  // =========================================================
  // CANTIDAD DE CASILLAS
  // =========================================================

  // La cantidad de casillas depende de totalObjetos.
  // Los objetos que sí tengan imagen se muestran dentro.
  const cantidadObjetos =
    totalObjetos || objetos.length || 0;

  const casillas = Array.from(
    { length: cantidadObjetos },
    (_, i) => i
  );


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

          onClick={onComenzar}
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

            onClick={onComenzar}
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
                NÚMERO
            ================================================= */}

            <motion.h1
              className="portada-capitulo-numero"

              initial={{
                opacity: 0,
                scale: 2.6,
                rotate: 8,
              }}

              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}

              transition={{
                type: "spring",
                stiffness: 140,
                damping: 11,
                delay: 1.15,
              }}
            >

              {numero}

            </motion.h1>


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

                        /* Casilla sin objeto */
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


export default PortadaCapitulo;