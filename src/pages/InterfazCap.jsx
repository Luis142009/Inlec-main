import React, { useState, useRef } from "react";

import { LuisPlugin } from "../components/LuisPlugin";
import { Parte2dela1 } from "../components/Parte2dela1";
import { Parte3dela1 } from "../components/Parte3dela1";
import { Escena2alfa } from "../components/Escena2alfa";
import { Escena2beta } from "../components/Escena2beta";
import { Escena4 } from "../components/Escena4";

import "../stylesheets/Textos.css";

import { motion, AnimatePresence } from "motion/react";

import song1 from "../assets/audio/song1.mp3";
import gallina from "../assets/audio/gallina.mp3";
import grillos from "../assets/audio/grillos.mp3";
import manzana from "../assets/manzana.svg";


const InterfazCap = () => {

  // =========================================================
  // ESCENA ACTUAL
  // =========================================================

  const [escena, setEscena] = useState(1);


  // =========================================================
  // AUDIO
  // =========================================================

  const audioRef = useRef(null);
  const gallinaRef = useRef(null);
  const grillosRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);


  // =========================================================
  // PAUSA
  // =========================================================

  const [pausado, setPausado] = useState(false);


  // =========================================================
  // REFERENCIAS DE ESCENAS
  // =========================================================

  const gameAreaRef = useRef(null);

  const luisRef = useRef(null);
  const parte2Ref = useRef(null);
  const parte3Ref = useRef(null);

  const escena2AlfaRef = useRef(null);
  const escena2BetaRef = useRef(null);

  // ⭐ NUEVO: referencia para Escena4
  const escena4Ref = useRef(null);


  // =========================================================
  // OBJETOS
  // =========================================================

  const [objetos, setObjetos] = useState([
    null,
    null,
    null,
    null
  ]);

  const [manzanaRecogida, setManzanaRecogida] = useState(false);


  // =========================================================
  // RECOGER OBJETO
  // =========================================================

  const recogerObjeto = (objeto) => {

    setObjetos(prev => {

      const nuevo = [...prev];

      const i = nuevo.indexOf(null);

      if (i !== -1) {
        nuevo[i] = objeto;
      }

      return nuevo;

    });


    if (objeto === "manzana") {
      setManzanaRecogida(true);
    }

  };


  // =========================================================
  // MÚSICA
  // =========================================================

  const toggleMusic = () => {

    if (isPlaying) {

      audioRef.current?.pause();
      grillosRef.current?.pause();
      gallinaRef.current?.pause();

      setIsPlaying(false);

    } else {

      if (audioRef.current) {

        audioRef.current.volume = 1;

        audioRef.current
          .play()
          .catch(() => {});

      }


      if (grillosRef.current) {
        grillosRef.current.volume = 0.12;
      }


      if (gallinaRef.current) {
        gallinaRef.current.volume = 0.25;
      }


      // Sonidos de la escena 1

      if (escena === 1) {

        if (gallinaRef.current) {

          gallinaRef.current.currentTime = 0;

          gallinaRef.current
            .play()
            .catch(() => {});

        }


        if (grillosRef.current) {

          grillosRef.current
            .play()
            .catch(() => {});

        }

      }


      setIsPlaying(true);

    }

  };


  // =========================================================
  // FULLSCREEN
  // =========================================================

  const toggleFullscreen = async () => {

    try {

      if (!document.fullscreenElement) {

        await gameAreaRef.current?.requestFullscreen();

      } else {

        await document.exitFullscreen();

      }

    } catch (error) {

      console.log(
        "No se pudo cambiar el modo fullscreen:",
        error
      );

    }

  };


  // =========================================================
  // PAUSA / REANUDAR
  // =========================================================

  const togglePausa = () => {

    const nuevoPausado = !pausado;

    setPausado(nuevoPausado);


    // =====================================================
    // ESCENA 1
    // =====================================================

    if (
      escena === 1 &&
      luisRef.current
    ) {

      if (nuevoPausado) {

        luisRef.current.pausarTodo();

      } else {

        luisRef.current.reanudarTodo();

      }

    }


    // =====================================================
    // ESCENA 2
    // =====================================================

    if (
      escena === 2 &&
      parte2Ref.current
    ) {

      if (nuevoPausado) {

        parte2Ref.current.pausarTodo();

      } else {

        parte2Ref.current.reanudarTodo();

      }

    }


    // =====================================================
    // ESCENA 3
    // =====================================================

    if (
      escena === 3 &&
      parte3Ref.current
    ) {

      if (nuevoPausado) {

        parte3Ref.current.pausarTodo();

      } else {

        parte3Ref.current.reanudarTodo();

      }

    }


    // =====================================================
    // ESCENA 4 - ESCENA 2 ALFA
    // =====================================================

    if (
      escena === 4 &&
      escena2AlfaRef.current
    ) {

      if (nuevoPausado) {

        escena2AlfaRef.current.pausarTodo();

      } else {

        escena2AlfaRef.current.reanudarTodo();

      }

    }


    // =====================================================
    // ESCENA 5 - ESCENA 2 BETA
    // =====================================================

    if (
      escena === 5 &&
      escena2BetaRef.current
    ) {

      if (nuevoPausado) {

        escena2BetaRef.current.pausarTodo();

      } else {

        escena2BetaRef.current.reanudarTodo();

      }

    }


    // =====================================================
    // ESCENA 6 - ESCENA 4
    // =====================================================

    if (
      escena === 6 &&
      escena4Ref.current
    ) {

      if (nuevoPausado) {

        escena4Ref.current.pausarTodo();

      } else {

        escena4Ref.current.reanudarTodo();

      }

    }

  };


  // =========================================================
  // CAMBIAR ESCENA
  // =========================================================

  const retroceder = () => {

    setEscena(prev =>
      Math.max(1, prev - 1)
    );

  };


  const avanzar = () => {

    setEscena(prev =>
      Math.min(6, prev + 1)
    );

  };


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <>

      {/* =====================================================
          AUDIOS
      ===================================================== */}

      <audio
        ref={audioRef}
        src={song1}
        loop
      />

      <audio
        ref={gallinaRef}
        src={gallina}
      />

      <audio
        ref={grillosRef}
        src={grillos}
      />


      {/* =====================================================
          INTERFAZ
      ===================================================== */}

      <motion.div
        className="interfaz-wrapper"

        initial={{
          opacity: 0,
          scale: 0
        }}

        animate={{
          opacity: 1,
          scale: 1
        }}

        transition={{
          duration: 0.4,

          scale: {
            type: "spring",
            visualDuration: 0.4,
            bounce: 0.5
          }

        }}
      >

        <div className="interfaz-cap">


          {/* =================================================
              ÁREA DEL JUEGO
          ================================================= */}

          <div className="row g-0">

            <div className="col-12">

              <div
                className="game-area"
                ref={gameAreaRef}
              >

                <div className="anim-label">

                  <AnimatePresence mode="wait">


                    {/* =================================================
                        ESCENA 1
                    ================================================= */}

                    {escena === 1 && (

                      <motion.div
                        key="escena1"

                        initial={{
                          opacity: 0,
                         
                          y: 15,
                          filter:
                            "blur(8px) brightness(1.15)"
                        }}

                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          filter:
                            "blur(0px) brightness(1)"
                        }}

                        exit={{
                          opacity: 0,
                          
                          y: -15,
                          filter:
                            "blur(8px) brightness(1.1)"
                        }}

                        transition={{
                          duration: 0.45,
                          ease: [
                            0.25,
                            0.1,
                            0.25,
                            1
                          ]
                        }}

                        style={{
                          width: "100%",
                          height: "100%"
                        }}
                      >

                        <LuisPlugin
                          ref={luisRef}
                          cambiarEscena={setEscena}
                          onRecoger={recogerObjeto}
                          manzanaRecogida={
                            manzanaRecogida
                          }
                          onMrFoxClick={
                            toggleMusic
                          }
                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 2
                    ================================================= */}

                    {escena === 2 && (

                      <motion.div
                        key="escena2"

                        initial={{
                          opacity: 0,
                         
                          y: 15,
                          filter:
                            "blur(8px) brightness(1.15)"
                        }}

                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          filter:
                            "blur(0px) brightness(1)"
                        }}

                        exit={{
                          opacity: 0,
                        
                          y: -15,
                          filter:
                            "blur(8px) brightness(1.1)"
                        }}

                        transition={{
                          duration: 0.45,
                          ease: [
                            0.25,
                            0.1,
                            0.25,
                            1
                          ]
                        }}

                        style={{
                          width: "100%",
                          height: "100%"
                        }}
                      >

                        <Parte2dela1
                          ref={parte2Ref}
                          cambiarEscena={setEscena}
                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 3
                    ================================================= */}

                    {escena === 3 && (

                      <motion.div
                        key="escena3"

                        initial={{
                          opacity: 0,
                         
                          y: 15,
                          filter:
                            "blur(8px) brightness(1.15)"
                        }}

                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          filter:
                            "blur(0px) brightness(1)"
                        }}

                        exit={{
                          opacity: 0,
                         
                          y: -15,
                          filter:
                            "blur(8px) brightness(1.1)"
                        }}

                        transition={{
                          duration: 0.45,
                          ease: [
                            0.25,
                            0.1,
                            0.25,
                            1
                          ]
                        }}

                        style={{
                          width: "100%",
                          height: "100%"
                        }}
                      >

                        <Parte3dela1
                          ref={parte3Ref}
                          cambiarEscena={setEscena}
                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 4 - ESCENA 2 ALFA
                    ================================================= */}

                    {escena === 4 && (

                      <motion.div
                        key="escena4"

                        initial={{
                          opacity: 0,
                         
                          y: 15,
                          filter:
                            "blur(8px) brightness(1.15)"
                        }}

                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          filter:
                            "blur(0px) brightness(1)"
                        }}

                        exit={{
                          opacity: 0,
                        
                          y: -15,
                          filter:
                            "blur(8px) brightness(1.1)"
                        }}

                        transition={{
                          duration: 0.45,
                          ease: [
                            0.25,
                            0.1,
                            0.25,
                            1
                          ]
                        }}

                        style={{
                          width: "100%",
                          height: "100%"
                        }}
                      >

                        <Escena2alfa
                          ref={escena2AlfaRef}
                          cambiarEscena={setEscena}
                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 5 - ESCENA 2 BETA
                    ================================================= */}

                    {escena === 5 && (

                      <motion.div
                        key="escena5"

                        initial={{
                          opacity: 0,
                          
                          y: 15,
                          filter:
                            "blur(8px) brightness(1.15)"
                        }}

                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          filter:
                            "blur(0px) brightness(1)"
                        }}

                        exit={{
                          opacity: 0,
                         
                          y: -15,
                          filter:
                            "blur(8px) brightness(1.1)"
                        }}

                        transition={{
                          duration: 0.45,
                          ease: [
                            0.25,
                            0.1,
                            0.25,
                            1
                          ]
                        }}

                        style={{
                          width: "100%",
                          height: "100%"
                        }}
                      >

                        <Escena2beta
                          ref={escena2BetaRef}
                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 6 - ESCENA 4
                    ================================================= */}

                    {escena === 6 && (

                      <motion.div
                        key="escena6"

                        initial={{
                          opacity: 0,
                         
                          y: 15,
                          filter:
                            "blur(8px) brightness(1.15)"
                        }}

                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          filter:
                            "blur(0px) brightness(1)"
                        }}

                        exit={{
                          opacity: 0,
                         
                          y: -15,
                          filter:
                            "blur(8px) brightness(1.1)"
                        }}

                        transition={{
                          duration: 0.45,
                          ease: [
                            0.25,
                            0.1,
                            0.25,
                            1
                          ]
                        }}

                        style={{
                          width: "100%",
                          height: "100%"
                        }}
                      >

                        <Escena4
                          ref={escena4Ref}
                        />

                      </motion.div>

                    )}


                  </AnimatePresence>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              BARRA DE CONTROLES
          ================================================= */}

          <div className="controls-bar">

            <div className="row align-items-center g-0">


              {/* =================================================
                  BOTONES IZQUIERDOS
              ================================================= */}

              <div className="col-auto d-flex gap-2">


                {/* Botón T */}

                <div className="btn-ctrl">

                  <motion.img
                    className="iconos"
                    src="./T.png"

                    whileHover={{
                      scale: 1.2
                    }}

                    whileTap={{
                      scale: 0.8
                    }}
                  />

                </div>


                {/* =================================================
                    PAUSA
                ================================================= */}

                <div
                  className="btn-ctrl"
                  onClick={togglePausa}

                  style={{
                    cursor: "pointer"
                  }}
                >

                  <motion.img
                    className="iconos"

                    src={
                      pausado
                        ? "./play.png"
                        : "./Pausa.png"
                    }

                    whileHover={{
                      scale: 1.2
                    }}

                    whileTap={{
                      scale: 0.8
                    }}
                  />

                </div>


                {/* =================================================
                    MÚSICA
                ================================================= */}

                <div
                  className="btn-ctrl"
                  onClick={toggleMusic}

                  style={{
                    cursor: "pointer"
                  }}
                >

                  <motion.img
                    className="iconos"
                    src="./Volumen.png"

                    whileHover={{
                      scale: 1.2
                    }}

                    whileTap={{
                      scale: 0.8
                    }}
                  />

                </div>

              </div>


              {/* =================================================
                  FLECHAS
              ================================================= */}

              <div className="flechas col d-flex align-items-center justify-content-center gap-2">

                <div className="rows">


                  {/* ATRÁS */}

                  <motion.img
                    className="flechitas"
                    src="./Atras.png"

                    onClick={retroceder}

                    style={{
                      cursor: "pointer"
                    }}

                    whileHover={{
                      scale: 1
                    }}

                    whileTap={{
                      scale: 0.85
                    }}
                  />


                  {/* NÚMERO */}

                  <div className="page-num">
                    {escena}/23
                  </div>


                  {/* ADELANTE */}

                  <motion.img
                    className="flechitas"
                    src="./Adelante.png"

                    onClick={avanzar}

                    style={{
                      cursor: "pointer"
                    }}

                    whileHover={{
                      scale: 1
                    }}

                    whileTap={{
                      scale: 0.85
                    }}
                  />

                </div>

              </div>


              {/* =================================================
                  FULLSCREEN
              ================================================= */}

              <div
                className="col-auto d-flex align-items-center gap-2"

                onClick={toggleFullscreen}

                style={{
                  cursor: "pointer"
                }}
              >

              </div>


            </div>

          </div>


          {/* =================================================
              OBJETOS ENCONTRADOS
          ================================================= */}

          <div className="found-slots">

            <div className="slot-label">
              Objetos encontrados
            </div>


            <div className="row g-2">

              {objetos.map((obj, i) => (

                <div
                  className="col-auto"
                  key={i}
                >

                  <div
                    className="slot"
                    style={{
                      marginLeft: "10px"
                    }}
                  >

                    {obj === "manzana" && (

                      <img
                        src={manzana}
                        alt="manzana"

                        style={{
                          width: "90%",
                          height: "90%",
                          objectFit: "contain",
                          left: "2px",
                          position: "relative",
                          marginTop: "2px"
                        }}
                      />

                    )}

                  </div>

                </div>

              ))}

            </div>

          </div>


        </div>

      </motion.div>

    </>

  );

};


export default InterfazCap;