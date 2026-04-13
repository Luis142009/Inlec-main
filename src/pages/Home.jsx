import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../stylesheets/Fuentes.css';
import '../stylesheets/Textos.css';

const Home = () => {
  const navigate = useNavigate();

  const personajes = [
    {
      nombre: "Sr.Fox",
      rol: "Protagonista",
      sinopsis: "El astuto y carismático Señor Fox vive junto a su familia en una tranquila madriguera, aparentemente lejos de los peligros del mundo exterior.",
      personalidad: "Suele ser muy astuto, siempre piensa antes de actuar y rara vez toma decisiones impulsivas. Mantiene la seguridad y la confianza en sí mismo incluso en situaciones complicadas.",
      edad: "El Sr. Fox, con sus ya 4 años zorrunos (48 meses de experiencia y vivencias), ha desarrollado una astucia notable que lo caracteriza en cada una de sus decisiones.",
      atributos: "Habilidoso en cada movimiento que realiza, demuestra un dominio natural de su entorno. Es perspicaz y nota detalles que otros pasan por alto.",
      objetivo: "Proteger, salvar y proveer alimento a su familia.",
      nota: "Tiene una fascinación por el número 4, de pequeño ganó la copa zorruna 4 veces consecutivas.",
      imagen: "/robo.png"
    },
    {
      nombre: "Sra.Fox",
      rol: "Aliada",
      sinopsis: "Una figura inteligente y fuerte que acompaña y apoya cada decisión importante dentro de la familia.",
      personalidad: "Calmada, estratégica y siempre un paso adelante.",
      edad: "3 años zorrunos.",
      atributos: "Analítica, observadora e intuitiva una persona muy perspicaz grandes ojos de color azul.",
      objetivo: "Mantener la estabilidad y seguridad del hogar ser una esposa responsable y proteger a sus hijos.",
      nota: "Siempre detecta el peligro antes que los demás.",
      imagen: "/lady.png"
    }
  ];

  const [index, setIndex] = useState(0);
  const personaje = personajes[index];

  const siguiente = () => setIndex((prev) => (prev + 1) % personajes.length);
  const anterior = () => setIndex((prev) => (prev - 1 + personajes.length) % personajes.length);

  const [activo, setActivo] = useState(null);
  const toggle = (nombre) => setActivo(activo === nombre ? null : nombre);

  return (
    <>

      {/* ================= HOME ================= */}
      <div className="home-wrapper" id="inicio">
        <div className="home-card">

          <img src="/personaje.png" alt="personaje" className="home-personaje" />

          <h1 className="home-titulo">Bienvenidos a Inlec</h1>

          <p className="home-texto">
            En Inlec queremos acercar la lectura a los jóvenes con experiencias
            digitales innovadoras. Nuestro objetivo es recuperar la motivación
            por la lectura de los jóvenes que la han llegado a perder, mediante
            animaciones interactivas e ilustraciones. Como primer proyecto estamos
            trabajando en El Super Zorro, una versión interactiva que permite
            descubrir la historia y sus personajes de una forma moderna, divertida
            y accesible.
          </p>

          <div className="d-flex justify-content-center mt-4">
            <button
              className="home-btn"
              onClick={() => {
                document.getElementById("creadores")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Conoce a los creadores
            </button>
          </div>

        </div>
      </div>


      {/* ================= DETRAS ================= */}
      <div className="detras-container container-fluid py-4" id="sinopsis">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-10 col-md-8 col-lg-7">

            <h1 className="detras-title text-center mb-4 mt-4">
              Detras de la historia
            </h1>

            <div className="detras-box rounded-5 px-3 px-md-4 py-4">
              <div className="row align-items-center g-0">

                <div className="col-2 col-sm-1 d-flex align-items-center justify-content-center">
                  <img src="/sr.png" alt="muñeco izquierda" className="detras-img-left img-fluid" />
                </div>

                <div className="col-8 col-sm-10 px-2 px-sm-3">
                  <p className="detras-text mb-0">
                    El Superzorro es un cuento infantil publicado en 1970 por el escritor británico Roald Dahl.
                    La historia sigue a un astuto zorro que roba comida a tres granjeros que intentaran cazarlo
                    con desesperación.
                  </p>
                </div>

                <div className="col-2 col-sm-1 d-flex align-items-center justify-content-center">
                  <img src="/mr.png" alt="muñeco derecha" className="detras-img-right img-fluid" />
                </div>

              </div>

              <div className="row mt-4">
                <div className="col-12 d-flex justify-content-center">
                  <button
                    className="detras-btn btn px-4 px-md-5 py-2 py-md-3"
                    onClick={() => navigate("/galeria")}
                  >
                    Conoce mas
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>


      {/* ================= PRESENTACION ================= */}
      <div className="presentacion-wrapper" id="capitulos">

        <div className="presentacion-titulo">
          <h1>Super Zorro</h1>
        </div>

        <div className="presentacion-frase">
          <p>Quien solo confía en la fuerza es derrotado por la astucia</p>
        </div>

        <div className="presentacion-capitulo">
          <h2>Capitulo 1</h2>
        </div>

        <div className="presentacion-descripcion">
          <p>El Sr. Fox vive con su familia en una madriguera excavada bajo un árbol, este le roba a 3 grandes granjeros Bogis, Bunce, y Bean</p>
        </div>

        <div className="presentacion-boton">
          <button
            className="presentacion-btn"
            onClick={() => navigate("/capitulos/1")}
          >
            Ver Capítulo 1
          </button>
        </div>

      </div>


      {/* ================= PERSONAJES ================= */}
      <div className="personajes-wrapper" id="personajes">

        <div className="personajes-titulo-row">
          <h2 className="personajes-titulo">Personajes</h2>
        </div>

        <div className="personajes-badge-row">
          <div className="personajes-badge">
            <p>Expediente<br />Criminal</p>
          </div>
        </div>

        <div className="container-fluid px-2 px-sm-3">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-11 col-md-10 col-lg-8">

              {/* Card sin position relative — flechas ya no son absolutas */}
              <div className="personajes-card">

                <div className="personajes-rol-row">
                  <div className="personajes-rol">
                    <p>{personaje.rol}</p>
                  </div>
                </div>

                <div className="row g-3 g-md-4 align-items-start">

                  {/* IZQUIERDA */}
                  <div className="col-12 col-md-5">
                    <div className="personajes-izq">

                      <div className="personajes-foto-card">
                        <div className="personajes-foto-header">
                          <p>ASALTA GALLINAS</p>
                        </div>
                        <div className="personajes-foto-img">
                          <img src={personaje.imagen} alt={personaje.nombre} className="img-fluid" />
                        </div>
                        <div className="personajes-foto-footer">
                          <p>{personaje.nombre}</p>
                        </div>
                      </div>

                      <div className="personajes-sinopsis">
                        <p className="personajes-sinopsis-titulo">Sinopsis de personaje</p>
                        <p className="personajes-sinopsis-texto">{personaje.sinopsis}</p>
                      </div>

                      <div className="personajes-nota">
                        <p className="personajes-nota-titulo">NOTA</p>
                        <p className="personajes-nota-texto">{personaje.nota}</p>
                      </div>

                    </div>
                  </div>

                  {/* BARRA separadora — solo visible en md+ */}
                  <div className="col-auto d-none d-md-flex justify-content-center px-0">
                    <div className="personajes-barra" />
                  </div>

                  {/* Separador horizontal para móvil */}
                  <div className="col-12 d-md-none">
                    <hr style={{ borderColor: "currentColor", opacity: 0.2 }} />
                  </div>

                  {/* DERECHA */}
                  <div className="col-12 col-md d-flex flex-column personajes-der">
                    {[
                      { titulo: 'Personalidad', contenido: personaje.personalidad },
                      { titulo: 'Edad', contenido: personaje.edad },
                      { titulo: 'Atributos', contenido: personaje.atributos },
                      { titulo: 'Objetivo', contenido: personaje.objetivo },
                    ].map((item) => (
                      <div key={item.titulo} className="personajes-atributo">
                        <div className="personajes-atributo-label">
                          <p>{item.titulo}</p>
                        </div>
                        <p className="personajes-atributo-texto">{item.contenido}</p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* ── Flechas debajo de la card ── */}
              <div className="d-flex justify-content-center align-items-center gap-4 personajes-flechas-nav">
                <img
                  src="/flecha.png"
                  onClick={anterior}
                  className="personajes-flecha-nav personajes-flecha-nav--izq"
                  alt="anterior"
                />
                <span className="personajes-nav-indicador">
                  {index + 1} / {personajes.length}
                </span>
                <img
                  src="/flecha.png"
                  onClick={siguiente}
                  className="personajes-flecha-nav personajes-flecha-nav--der"
                  alt="siguiente"
                />
              </div>

            </div>
          </div>
        </div>
      </div>


      {/* ================= CREADORES ================= */}
      <div className="creadores-wrapper" id="creadores">

        <div className="creadores-encabezado">
          <h2>Creadores de Inlec</h2>
        </div>

        {/* Móvil */}
        <div className="container-fluid">
          <div className="row justify-content-center align-items-end g-3 d-md-none">
            <div className="col-4 d-flex flex-column align-items-center">
              {activo === 'sneyder' && <div className="burbuja"><p>Un Prime debe hacer lo que un Prime debe hacer</p></div>}
              <p className="creadores-nombre">Sneyder</p>
              <img src="/er.png" onClick={() => toggle('sneyder')} className="creadores-img img-fluid" />
            </div>
            <div className="col-4 d-flex flex-column align-items-center">
              {activo === 'luis' && <div className="burbuja"><p>Captan las poderosas Señales</p></div>}
              <p className="creadores-nombre">Luis</p>
              <img src="/jefes.png" onClick={() => toggle('luis')} className="creadores-img creadores-img--grande img-fluid" />
            </div>
            <div className="col-4 d-flex flex-column align-items-center">
              {activo === 'matheo' && <div className="burbuja"><p>Entiendes el Concepto</p></div>}
              <p className="creadores-nombre">Matheo</p>
              <img src="/as.png" onClick={() => toggle('matheo')} className="creadores-img img-fluid" />
            </div>
          </div>
        </div>

        {/* md+ */}
        <div className="d-none d-md-block">
          <div className="creadores-persona creadores-persona--izq">
            {activo === 'sneyder' && <div className="burbuja"><p>Un Prime debe hacer lo que un Prime debe hacer</p></div>}
            <p className="creadores-nombre">Sneyder</p>
            <img src="/er.png" onClick={() => toggle('sneyder')} className="creadores-img" />
          </div>
          <div className="creadores-persona creadores-persona--centro">
            {activo === 'luis' && <div className="burbuja"><p>Captan las poderosas Señales</p></div>}
            <p className="creadores-nombre">Luis</p>
            <img src="/jefes.png" onClick={() => toggle('luis')} className="creadores-img creadores-img--grande" />
          </div>
          <div className="creadores-persona creadores-persona--der">
            {activo === 'matheo' && <div className="burbuja"><p>Entiendes el Concepto</p></div>}
            <p className="creadores-nombre">Matheo</p>
            <img src="/as.png" onClick={() => toggle('matheo')} className="creadores-img" />
          </div>
        </div>

      </div>


      {/* ================= FOOTER ================= */}
      <div className="footer-container" id="contacto">
        <div className="container-fluid px-3 px-md-4">
          <div className="row text-center text-md-start g-4">

            <div className="col-12 col-sm-6 col-md-3">
              <h5 className="footer-title">Identidad</h5>
              <img src="/logo.png" alt="logo" className="footer-logo" />
              <p className="footer-text footer-slogan">Del libro al mundo digital</p>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <h5 className="footer-title">Redes Sociales</h5>
              <p className="footer-text footer-spacing">Tik Tok</p>
              <p className="footer-text">Instagram</p>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <h5 className="footer-title">Navegación rápida</h5>
              <p className="footer-text footer-spacing" style={{ cursor: "pointer" }}
                onClick={() => document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" })}>
                Inicio
              </p>
              <p className="footer-text" style={{ cursor: "pointer" }}
                onClick={() => navigate("/capitulos/1")}>
                Capítulos
              </p>
              <p className="footer-text" style={{ cursor: "pointer" }}
                onClick={() => document.getElementById("personajes")?.scrollIntoView({ behavior: "smooth" })}>
                Personajes
              </p>
              <p className="footer-text" style={{ cursor: "pointer" }}
                onClick={() => navigate("/galeria")}>
                Ver Más
              </p>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <h5 className="footer-title">Contacto</h5>
              <p className="footer-text footer-spacing">Inlec5670@gmail.com</p>
              <p className="footer-text">3235868923</p>
            </div>

          </div>

          <div className="footer-zorro">
            <img src="/personaje.png" alt="zorro" />
          </div>

        </div>
      </div>

    </>
  );
};

export default Home;