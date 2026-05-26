import React from "react";
import '../stylesheets/Textos.css';
import { motion } from "motion/react"

const InterfazCap = () => {
  return (
    <>
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

                <div className="btn-ctrl">
                  <motion.img
                    className="iconos"
                    src="./Pausa.png"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                </div>

                <div className="btn-ctrl">
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
                    alt=""
                    whileHover={{ scale: 1.0 }}
                    whileTap={{ scale: 0.85 }}
                  />

                  <div className="page-num">1/5</div>

                  <motion.img
                    className="flechitas"
                    src="./Adelante.png"
                    alt=""
                    whileHover={{ scale: 1.0 }}
                    whileTap={{ scale: 0.85 }}
                  />

                </div>
              </div>

              <div className="col-auto d-flex align-items-center gap-2">
                <div className="btn-return">Return</div>

                <motion.img
                  className="btn-ctrl-full"
                  src="./Full.png"
                  alt=""
                  whileHover={{ scale: 1.0 }}
                  whileTap={{ scale: 0.85 }}
                />

              </div>

            </div>
          </div>

          <div className="found-slots">
            <div className="slot-label">
              Objetos encontrados
            </div>

            <div className="row g-2">
              <div className="col-auto">
                <div className="slot"></div>
              </div>

              <div className="col-auto">
                <div className="slot"></div>
              </div>

              <div className="col-auto">
                <div className="slot"></div>
              </div>

              <div className="col-auto">
                <div className="slot"></div>
              </div>
            </div>
          </div>


          <div>
            <img src="./escenario.png" alt="" />
          </div>

        </div>
      </motion.div>
    </>
  );
};

export default InterfazCap;