import React, { useState, useRef } from "react";
import { LuisPlugin } from "../components/LuisPlugin";
import { Parte2dela1 } from "../components/Parte2dela1";
import "../stylesheets/Textos.css";
import { motion } from "motion/react";
import song1 from "../assets/audio/song1.mp3";

const InterfazCap = () => {

  const [escena, setEscena] = useState(1);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pausado, setPausado] = useState(false);

  const luisRef = useRef(null);
  const parte2Ref = useRef(null);

  // Array de objetos encontrados, null = vacío
  const [objetos, setObjetos] = useState([null, null, null, null]);

  const recogerObjeto = (objeto) => {
    setObjetos(prev => {
      const nuevo = [...prev];
      const i = nuevo.indexOf(null);
      if (i !== -1) nuevo[i] = objeto;
      return nuevo;
    });
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
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
              <div className="game-area">
                <div className="anim-label">

                  {escena === 1 && (
                    <LuisPlugin
                      ref={luisRef}
                      cambiarEscena={setEscena}
                      onRecoger={recogerObjeto}
                    />
                  )}

                  {escena === 2 && (
                    <Parte2dela1 ref={parte2Ref} cambiarEscena={setEscena} />
                  )}

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
                  <div className="page-num">{escena}/5</div>
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

              <div className="col-auto d-flex align-items-center gap-2">
                <div className="btn-return">Return</div>
                <motion.img
                  className="btn-ctrl-full"
                  src="./Full.png"
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.85 }}
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
                    style={obj ? { backgroundColor: "#6b3a2a" } : {}}
                  >
                    {obj === "manzana" && (
                      <img
                        src="src/assets/manzana.svg"
                        alt="manzana"
                        style={{ width: "70%", height: "70%", objectFit: "contain" }}
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