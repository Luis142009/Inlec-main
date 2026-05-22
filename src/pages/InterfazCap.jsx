import React from "react";
import '../stylesheets/Textos.css';

const InterfazCap = () => {
  return (
    <>
      <div className="interfaz-wrapper">
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
                <div className="btn-ctrl"> <img className="iconos" src="./T.png" alt="" /></div>
                <div className="btn-ctrl t"> <img className="iconos" src="./Volumen.png" alt="" /></div>
                <div className="btn-ctrl"> <img className="iconos" src="./Pausa.png" alt="" /></div>
              </div>

            
              <div className="flechas col d-flex align-items-center justify-content-center gap-2">
                <div className="rows">
                <div className="nav-arrow"> <img className="flechitas" src="./Atras.png" alt="" /> </div>
                <div className="page-num">1/5</div>
                <div className="nav-arrow"> <img className="flechitas" src="./Adelante.png" alt="" /> </div>
                </div>
              </div>

              <div className="col-auto d-flex align-items-center gap-2">
                <div className="btn-return">Return</div>
                <div className="btn-ctrl"> <img className="iconos" src="./Full.png" alt="" /></div>
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

        </div>
      </div>
    </>
  );
};

export default InterfazCap;