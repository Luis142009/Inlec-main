import React, { useState, useRef, useEffect } from "react";

import { LuisPlugin } from "../components/LuisPlugin";
import { Parte2dela1 } from "../components/Parte2dela1";
import { Parte3dela1 } from "../components/Parte3dela1";
import { Escena2alfa } from "../components/Escena2alfa";
import { Escena2beta } from "../components/Escena2beta";
import { Escena3 } from "../components/Escena3";
import { Escena4 } from "../components/Escena4";
import { Escena6 } from "../components/Escena6";
import { Escena7 } from "../components/Escena7";
import { Escena8 } from "../components/Escena8";

import "../stylesheets/Textos.css";

import {
  motion,
  AnimatePresence
} from "motion/react";

import song1 from "../assets/audio/song1.mp3";
import gallina from "../assets/audio/gallina.mp3";
import grillos from "../assets/audio/grillos.mp3";
import manzana from "../assets/manzana.svg";


const InterfazCap = () => {

  // =========================================================
  // ESCENA ACTUAL
  // =========================================================

  const [escena, setEscena] = useState(2);


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
  // REFERENCIAS
  // =========================================================

  const gameAreaRef = useRef(null);

  const luisRef = useRef(null);
  const parte2Ref = useRef(null);
  const parte3Ref = useRef(null);

  const escena2AlfaRef = useRef(null);
  const escena2BetaRef = useRef(null);

  const escena3Ref = useRef(null);
  const escena4Ref = useRef(null);
  const escena6Ref = useRef(null);
  const escena7Ref = useRef(null);
  const escena8Ref = useRef(null);


  // =========================================================
  // OBJETOS
  // =========================================================

  const [objetos, setObjetos] = useState([
    null,
    null,
    null,
    null
  ]);

  const [manzanaRecogida, setManzanaRecogida] =
    useState(false);


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

      return;

    }


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


    // =======================================================
    // SONIDOS ESCENA 1
    // =======================================================

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
  // OBTENER REFERENCIA DE ESCENA ACTUAL
  // =========================================================

  const obtenerRefEscena = () => {

    switch (escena) {

      case 1:
        return luisRef;

      case 2:
        return parte2Ref;

      case 3:
        return parte3Ref;

      case 4:
        return escena2AlfaRef;

      case 5:
        return escena2BetaRef;

      case 6:
        return escena3Ref;

      case 7:
        return escena4Ref;

      case 8:
        return escena6Ref;

      case 9:
        return escena7Ref;

      case 10:
        return escena8Ref;

      default:
        return null;

    }

  };


  // =========================================================
  // INICIAR ESCENA
  // =========================================================

  const iniciarEscena = () => {

    const refActual = obtenerRefEscena();

    if (!refActual?.current) {
      return;
    }


    // -------------------------------------------------------
    // Si la escena tiene iniciarTodo
    // -------------------------------------------------------

    if (refActual.current.iniciarTodo) {

      refActual.current.iniciarTodo();

      setPausado(false);

      return;

    }


    // -------------------------------------------------------
    // Compatibilidad con escenas antiguas
    // -------------------------------------------------------

    if (refActual.current.reanudarTodo) {

      refActual.current.reanudarTodo();

      setPausado(false);

    }

  };


  // =========================================================
  // PAUSAR / REANUDAR
  // =========================================================

  const togglePausa = () => {

    const refActual = obtenerRefEscena();

    if (!refActual?.current) {
      return;
    }


    // =======================================================
    // SI ESTÁ PAUSADO → REANUDAR
    // =======================================================

    if (pausado) {

      if (refActual.current.reanudarTodo) {

        refActual.current.reanudarTodo();

      }

      setPausado(false);

      return;

    }


    // =======================================================
    // SI NUNCA HA EMPEZADO → INICIAR
    // =======================================================

    if (refActual.current.estaIniciada) {

      const iniciada =
        refActual.current.estaIniciada();


      if (!iniciada) {

        if (refActual.current.iniciarTodo) {

          refActual.current.iniciarTodo();

        }

        setPausado(false);

        return;

      }

    }


    // =======================================================
    // SI YA ESTÁ REPRODUCIENDO → PAUSAR
    // =======================================================

    if (refActual.current.pausarTodo) {

      refActual.current.pausarTodo();

    }

    setPausado(true);

  };


  // =========================================================
  // CAMBIAR ESCENA
  // =========================================================

  const cambiarEscena = (nuevaEscena) => {

    setEscena(nuevaEscena);

    setPausado(false);

  };


  // =========================================================
  // ATRÁS
  // =========================================================

  const retroceder = () => {

    setEscena(prev => {

      return Math.max(1, prev - 1);

    });

    setPausado(false);

  };


  // =========================================================
  // ADELANTE
  // =========================================================

  const avanzar = () => {

    setEscena(prev => {

      return Math.min(10, prev + 1);

    });

    setPausado(false);

  };


  // =========================================================
  // CUANDO CAMBIA LA ESCENA
  // =========================================================

  useEffect(() => {

    setPausado(false);

  }, [escena]);


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
        loop
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
                          cambiarEscena={cambiarEscena}
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
                          cambiarEscena={cambiarEscena}
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
                          cambiarEscena={cambiarEscena}
                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 4
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
                          cambiarEscena={cambiarEscena}
                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 5
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
                          cambiarEscena={cambiarEscena}
                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 6
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

                        <Escena3
                          ref={escena3Ref}
                          cambiarEscena={cambiarEscena}
                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 7
                    ================================================= */}

                    {escena === 7 && (

                      <motion.div
                        key="escena7"

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
                          cambiarEscena={cambiarEscena}
                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 8
                    ================================================= */}

                    {escena === 8 && (

                      <motion.div
                        key="escena8"

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

                        <Escena6
                          ref={escena6Ref}
                          cambiarEscena={cambiarEscena}
                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 9
                    ================================================= */}

                    {escena === 9 && (

                      <motion.div
                        key="escena9"

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

                        <Escena7
                          ref={escena7Ref}
                          cambiarEscena={cambiarEscena}
                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 10
                    ================================================= */}

                    {escena === 10 && (

                      <motion.div
                        key="escena10"

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

                        <Escena8
                          ref={escena8Ref}
                          cambiarEscena={cambiarEscena}
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
                  BOTONES
              ================================================= */}

              <div className="col-auto d-flex gap-2">


                {/* T */}

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
                    PLAY / PAUSA
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
              OBJETOS
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