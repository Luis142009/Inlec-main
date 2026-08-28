import '../stylesheets/Fuentes.css';

const Galeria = () => {
  return (
    <div className="galeria-wrapper">
      <div className="container">
        <div className="row">

          <div className="col-md-6 d-flex flex-column gap-4">

            <div className="galeria-item">
              <div className="marco">
                <div className="marco-inner">
                  <div className="marco-img" style={{ backgroundImage: "url('/12.png')", width: "300px", height: "200px" }}></div>
                </div>
              </div>
              <p className="galeria-texto">El Super Zorro fue escrito por Roald Dahl en 1970.</p>
            </div>

            <div className="galeria-item galeria-item--offset">
              <div className="marco">
                <div className="marco-inner">
                  <div className="marco-img" style={{ backgroundImage: "url('/13.png')", width: "300px", height: "200px" }}></div>
                </div>
              </div>
              <p className="galeria-texto galeria-texto--offset">El personaje del Sr. Fox destaca por su inteligencia sobre la fuerza.</p>
            </div>


 <div className="galeria-item galeria-item--offset">
              <div className="marco">
                <div className="marco-inner">
                  <div className="marco-img" style={{ backgroundImage: "url('/14.png')", width: "300px", height: "200px" }}></div>
                </div>
              </div>
              <p className="galeria-texto galeria-texto--offset">Es super zorro es un libro infantil donde se relata de la historia de un zorro quedara todo para salvar</p>
            </div>
          </div>

          <div className="col-md-6 d-flex flex-column gap-4">

            <div className="galeria-item">
              <div className="marco">
                <div className="marco-inner">
                  <div className="marco-img" style={{ backgroundImage: "url('/cara1.png')", width: "300px", height: "270px" }}></div>
                </div>
              </div>
              <p className="galeria-texto">Los tres granjeros representan distintos tipos de villanos.</p>
            </div>

            <div className="galeria-item galeria-item--offset">
              <div className="marco">
                <div className="marco-inner">
                  <div className="marco-img" style={{ backgroundImage: "url('/cara2.png')", width: "300px", height: "270px" }}></div>
                </div>
              </div>
              <p className="galeria-texto">La historia resalta el valor de la familia y el trabajo en equipo.</p>
            </div>

            <div className="galeria-item galeria-item--offset">
              <div className="marco">
                <div className="marco-inner text-center">
                  <div className="marco-img" style={{ backgroundImage: "url('/cara3.png')", width: "300px", height: "270px" }}></div>
                </div>
              </div>
              <p className="galeria-texto">El libro tiene una adaptación animada muy famosa.</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Galeria;