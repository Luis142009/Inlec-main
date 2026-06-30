import React, { useState, useRef } from "react";
import { LuisPlugin } from "../components/LuisPlugin";
import { Parte2dela1 } from "../components/Parte2dela1";
import "../stylesheets/Textos.css";
import { motion, AnimatePresence } from "motion/react";
import song1 from "../assets/audio/song1.mp3";
import gallina from "../assets/audio/gallina.mp3";
import grillos from "../assets/audio/grillos.mp3";

const InterfazCap = () => {

  const [escena, setEscena] = useState(1);
  const audioRef = useRef(null);
  const gallinaRef = useRef(null);
const grillosRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pausado, setPausado] = useState(false);
const gameAreaRef = useRef(null);
  const luisRef = useRef(null);
  const parte2Ref = useRef(null);
  
  

  const [objetos, setObjetos] = useState([null, null, null, null]);

  // Persiste si la manzana ya fue recogida, sobrevive a remounts de LuisPlugin
  const [manzanaRecogida, setManzanaRecogida] = useState(false);

  const recogerObjeto = (objeto) => {
    setObjetos(prev => {
      const nuevo = [...prev];
      const i = nuevo.indexOf(null);
      if (i !== -1) nuevo[i] = objeto;
      return nuevo;
    });

    if (objeto === "manzana") setManzanaRecogida(true);
  };

 const toggleMusic = () => {

  if (isPlaying) {

    audioRef.current.pause();
    grillosRef.current.pause();
    gallinaRef.current.pause();

    setIsPlaying(false);

  } else {

   
    audioRef.current.volume = 1;
    grillosRef.current.volume = 0.12;
    gallinaRef.current.volume = 0.25;

    audioRef.current.play();

    if (escena === 1) {

    
      gallinaRef.current.currentTime = 0;
      gallinaRef.current.play();


      grillosRef.current.play();
      
    }

    setIsPlaying(true);

  }

};

const toggleFullscreen = async () => {

  if (!document.fullscreenElement) {

    await gameAreaRef.current.requestFullscreen();

    gsap.to(screenRef.current,{
      scale:2.2,
      x:120,
      y:-80,
      duration:1,
      ease:"power3.inOut"
    });

  } else {

    gsap.to(screenRef.current,{
      scale:1.4,
      x:60,
      y:40,
      duration:0.8,
      ease:"power3.inOut"
    });

    await document.exitFullscreen();

  }

};

  const togglePausa = () => {
    const nuevoPausado = !pausado;
    setPausado(nuevoPausado);
    if (escena === 1 && luisRef.current) {
      nuevoPausado ? luisRef.current.pausarTodo() : luisRef.current.reanudarTodo();
    }
    if (escena === 2 && parte2Ref.current) {
      nuevoPausado ? parte2Ref.current.pausarTodo() : parte2Ref.current.reanudarTodo();
    }
  };

  const retroceder = () => setEscena(prev => Math.max(1, prev - 1));
  const avanzar = () => setEscena(prev => Math.min(5, prev + 1));

  return (
    <>
      <audio ref={audioRef} src={song1} loop />
<audio ref={gallinaRef} src={gallina} />
<audio ref={grillosRef} src={grillos}  />

      <motion.div
        className="interfaz-wrapper"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
      >
        <div className="interfaz-cap">

          <div className="row g-0">
            <div className="col-12">
              <div className="game-area"
                ref={gameAreaRef}>
                
                <div className="anim-label">

<AnimatePresence mode="wait">

  {escena === 1 && (
    <motion.div
      key="escena1"
      initial={{
        opacity: 0,
        scale: 1.05,
        y: 15,
        filter: "blur(8px) brightness(1.15)"
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px) brightness(1)"
      }}
      exit={{
        opacity: 0,
        scale: 0.97,
        y: -15,
        filter: "blur(8px) brightness(1.1)"
      }}
      transition={{
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ width: "100%", height: "100%" }}
    >
    <LuisPlugin
  ref={luisRef}
  cambiarEscena={setEscena}
  onRecoger={recogerObjeto}
  manzanaRecogida={manzanaRecogida}
  onMrFoxClick={toggleMusic}
/>
    </motion.div>
  )}

  {escena === 2 && (
    <motion.div
      key="escena2"
      initial={{
        opacity: 0,
        scale: 1.05,
        y: 15,
        filter: "blur(8px) brightness(1.15)"
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px) brightness(1)"
      }}
      exit={{
        opacity: 0,
        scale: 0.97,
        y: -15,
        filter: "blur(8px) brightness(1.1)"
      }}
      transition={{
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <Parte2dela1
        ref={parte2Ref}
        cambiarEscena={setEscena}
      />
    </motion.div>
  )}

</AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <div className="controls-bar">
            <div className="row align-items-center g-0">

              <div className="col-auto d-flex gap-2">

                <div className="btn-ctrl">
                  <motion.img
                    className="iconos"
                    src="./T.png"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                </div>

                <div className="btn-ctrl" onClick={togglePausa} style={{ cursor: "pointer" }}>
                  <motion.img
                    className="iconos"
                    src={pausado ? "./Play.png" : "./Pausa.png"}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                </div>

                <div className="btn-ctrl" onClick={toggleMusic} style={{ cursor: "pointer" }}>
                  <motion.img
                    className="iconos"
                    src="./Volumen.png"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                </div>

              </div>

              <div className="flechas col d-flex align-items-center justify-content-center gap-2">
                <div className="rows">
                  <motion.img
                    className="flechitas"
                    src="./Atras.png"
                    onClick={retroceder}
                    style={{ cursor: "pointer" }}
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.85 }}
                  />
                  <div className="page-num">{escena}/23</div>
                  <motion.img
                    className="flechitas"
                    src="./Adelante.png"
                    onClick={avanzar}
                    style={{ cursor: "pointer" }}
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.85 }}
                  />
                </div>
              </div>

              <div
  className="col-auto d-flex align-items-center gap-2"
  onClick={toggleFullscreen}
  style={{ cursor: "pointer" }}
>

  <div className="btn-return">
    Pantalla completa
  </div>

  <motion.img
    className="btn-ctrl-full"
    src="./Full.png"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  />

</div>

            </div>
          </div>

          {/* OBJETOS */}
          <div className="found-slots">
            <div className="slot-label">Objetos encontrados</div>
            <div className="row g-2">
              {objetos.map((obj, i) => (
                <div className="col-auto" key={i}>
                  <div
                    className="slot"
                    style={{ marginLeft: 16 === 0 ? "0px" : "10px" }}
                  >
                    {obj === "manzana" && (
                      <img
                        src="src/assets/manzana.svg"
                        alt="manzana"
                        style={{ width: "90%", height: "90%", objectFit: "contain", left: "2px", position: "relative", marginTop: "2px" }}
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