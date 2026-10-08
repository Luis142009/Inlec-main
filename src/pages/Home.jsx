import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../stylesheets/Fuentes.css";
import "../stylesheets/Textos.css";

const Home = () => {
  const navigate = useNavigate();

  /* ================= PERSONAJES ================= */

  const personajes = [
    {
      nombre: "Sr.Fox",
      rol: "Protagonista",
      sinopsis:
        "El astuto y carismático Señor Fox vive junto a su familia en una tranquila madriguera, aparentemente lejos de los peligros del mundo exterior.",
      personalidad:
        "Suele ser muy astuto, siempre piensa antes de actuar y rara vez toma decisiones impulsivas. Mantiene la seguridad y la confianza en sí mismo incluso en situaciones complicadas.",
      edad:
        "El Sr. Fox, con sus ya 4 años zorrunos (48 meses de experiencia y vivencias), ha desarrollado una astucia notable que lo caracteriza en cada una de sus decisiones.",
      atributos:
        "Habilidoso en cada movimiento que realiza, demuestra un dominio natural de su entorno. Es perspicaz y nota detalles que otros pasan por alto.",
      objetivo: "Proteger, salvar y proveer alimento a su familia.",
      nota:
        "Tiene una fascinación por el número 4, de pequeño ganó la copa zorruna 4 veces consecutivas.",
      imagen: "/robo.png",
    },

    {
      nombre: "Sra.Fox",
      rol: "Aliada",
      sinopsis:
        "Una figura inteligente y fuerte que acompaña y apoya cada decisión importante dentro de la familia.",
      personalidad: "Calmada, estratégica y siempre un paso adelante.",
      edad: "3 años zorrunos.",
      atributos:
        "Analítica, observadora e intuitiva una persona muy perspicaz grandes ojos de color azul.",
      objetivo:
        "Mantener la estabilidad y seguridad del hogar ser una esposa responsable y proteger a sus hijos.",
      nota: "Siempre detecta el peligro antes que los demás.",
      imagen: "/lady.png",
    },
  ];

  const [index, setIndex] = useState(0);

  const personaje = personajes[index];

  const siguiente = () =>
    setIndex((prev) => (prev + 1) % personajes.length);

  const anterior = () =>
    setIndex((prev) => (prev - 1 + personajes.length) % personajes.length);

  /* ================= CREADORES ================= */

  const [activo, setActivo] = useState(null);

  const toggle = (nombre) => {
    setActivo(activo === nombre ? null : nombre);
  };

  /* ================= RESEÑAS ================= */

  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [resenas, setResenas] = useState([]);

  const agregarResena = () => {
    if (
      nombre.trim() === "" ||
      comentario.trim() === "" ||
      calificacion === 0
    ) {
      alert("Completa tu nombre, comentario y calificación.");
      return;
    }

    const nuevaResena = {
      id: Date.now(),
      nombre: nombre.trim(),
      comentario: comentario.trim(),
      calificacion: calificacion,
    };

    setResenas((prev) => [nuevaResena, ...prev]);

    setNombre("");
    setComentario("");
    setCalificacion(0);
  };

  return (
    <div className="scroll-container">

      {/* ================= PROYECTO + DETRAS ================= */}

      <div className="proyecto-detras-wrapper">

        {/* ================= PROYECTO ================= */}

        <section
          className="scroll-section proyecto-wrapper"
          id="proyecto"
        >

          <div className="mt-2 video-pro" id="inicio">
            <video
              className="header"
              src="/bene.webm"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          <div className="mt-5 container proyecto-container">

            {/* VIDEO IZQUIERDO */}

            <video
              src="/ani2.webm"
              autoPlay
              muted
              loop
              playsInline
              className="fox-lateral fox-lateral-izq"
            />

            {/* TEXTO CENTRAL */}

            <div className="proyecto-texto">

              <h1 className="proyecto-titulo">
                Nuestro Proyecto
              </h1>

              <p className="proyecto-descripcion">
                Inlec es una plataforma digital que transforma la lectura
                en una experiencia interactiva, creativa y emocionante.
                Aquí no se trata de leer por obligación, sino de conectar
                con historias que realmente disfrutas. Con animaciones y
                actividades dinámicas, queremos que descubras el placer
                de leer a tu manera.
              </p>

            </div>

            {/* VIDEO DERECHO */}

            <video
              src="/ani1.webm"
              autoPlay
              muted
              loop
              playsInline
              className="fox-lateral fox-lateral-der"
            />

          </div>

        </section>

        {/* ================= DETRAS DE LA HISTORIA ================= */}

        <section
          className="scroll-section detras-container container-fluid py-4"
          id="sinopsis"
        >

          <div className="row justify-content-center">

            <div className="col-11 col-sm-10 col-md-8 col-lg-7">

              <h1 className="detras-title text-center mb-4 mt-4">
                Detras de la historia
              </h1>

              <div className="detras-box rounded-5 px-3 px-md-4 py-4">

                <div className="row align-items-center g-0">

                  <div className="col-2 col-sm-1 d-flex align-items-center justify-content-center">

                    <img
                      src="/per1.png"
                      alt="muñeco izquierda"
                      className="detras-img-left img-fluid"
                    />

                  </div>

                  <div className="col-8 col-sm-10 px-2 px-sm-3">

                    <p className="detras-text mb-0">
                      El Superzorro es un cuento infantil publicado en 1970
                      por el escritor británico Roald Dahl. La historia sigue
                      a un astuto zorro que roba comida a tres granjeros que
                      intentaran cazarlo con desesperación.
                    </p>

                  </div>

                  <div className="col-2 col-sm-1 d-flex align-items-center justify-content-center">

                    <img
                      src="/per2.png"
                      alt="muñeco derecha"
                      className="detras-img-right img-fluid"
                    />

                  </div>

                </div>

                <div className="row mt-2">

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

        </section>

      </div>


      {/* ================= PRESENTACION ================= */}

      <section
        id="animacion"
        className="superzorro-section mt-5"
      >

        <div className="superzorro-frame">

          <img
            className="superzorro-img"
            src="./capi.jpg"
            alt=""
          />

          <div className="superzorro-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center px-2">

            <h1 className="superzorro-titulo text-center">
              El SuperZorro
            </h1>

            <div className="fondo-capitulos w-100 px-3 py-3">

              <div className="text-center">

                <a
                  href="#personajes"
                  className="rounded-4 superzorro-btn px-3 py-2"
                >
                  Empezar Historia
                </a>

              </div>

              <p className="s-cap mt-3 text-center">
                Selecciona un capitulo:
              </p>

              <div className="container-fluid">

                <div className="row justify-content-center g-2 mt-1">

                  {[1, 2, 3, 4, 5].map((num) => (

                    <div
                      key={num}
                      className="col-4 col-sm-2 text-center"
                    >

                      <button
                        type="button"
                        className="btn-numero w-100"
                      >
                        {num}
                      </button>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

          <div className="d-flex justify-content-between align-items-center px-3 pb-2 position-absolute bottom-0 start-0 w-100">

            <div
              className="btn-group botones rounded-4"
              role="group"
            >

              <button type="button" className="btn">

                <img
                  src="./T.png"
                  alt=""
                  height="35px"
                />

              </button>

              <button type="button" className="btn">

                <img
                  src="./Volumen.png"
                  alt=""
                  height="35px"
                />

              </button>

              <button type="button" className="btn">

                <img
                  src="./Pausa.png"
                  alt=""
                  height="35px"
                />

              </button>

            </div>

            <div
              className="btn-group botones rounded-4"
              role="group"
            >

              <button type="button" className="btn">

                <img
                  src="./Full.png"
                  alt=""
                  height="35px"
                />

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================= MAS SOBRE INLEC ================= */}

      <section
        id="inlec"
        className="masinlec-section mt-5"
      >

        <h1 className="personajes-titulo text-center">
          Mas sobre Inlec
        </h1>

        <div className="container">

          <div className="row align-items-center g-4 py-4">

            <div className="col-12 col-md-5 text-center">

              <img
                className="img-fluid rounded-3"
                src="./per2.png"
                alt=""
                style={{ maxHeight: "300px" }}
              />

            </div>

            <div className="col-12 col-md-7">

              <p className="masinlec-descripcion">
                Transformar la lectura en una experiencia innovadora es
                el objetivo principal de Inlec, la tecnología se combina
                con la interactividad y las animaciones para invitarte a
                explorar de una manera más libre y diversa. Nuestro
                objetivo es crear un espacio digital en el que cada
                usuario se sienta cómodo y con total control sobre lo que
                ve, hace y desea descubrir que la lectura deje de sentirse
                como una carga y ahora se transforme en algo opcional algo
                libre.
              </p>

            </div>

          </div>

        </div>

        <div className="container">

          <div className="row justify-content-center g-2 pb-4">

            <div className="col-12 col-sm-auto">

              <a
                href="https://link.com"
                className="btn rounded-pill masinlec-btn w-100"
              >
                Pitchbook
              </a>

            </div>

            <div className="col-12 col-sm-auto">

              <a
                href="https://no-encontramos-el-manual.com"
                className="btn rounded-pill masinlec-btn w-100"
              >
                Manual de Marca
              </a>

            </div>

            <div className="col-12 col-sm-auto">

              <a
                href="https://drive.google.com/file/d/1e5cmCOQF_4gsQkQozgmIcsRdFBAx2dAW/view?usp=sharing"
                className="btn rounded-pill masinlec-btn w-100"
              >
                Moodboard
              </a>

            </div>

          </div>

        </div>

      </section>

      
      <section className="personajes-section" id="personajes">

        {/* TÍTULO */}
        <div className="personajes-header">
          <h2 className="per-texto">Personajes</h2>
        </div>

        {/* CONTENEDOR DE PERSONAJES */}
        <div className="personajes-container">

          {/* PADRE 1 */}
          <div className="personaje">
            <img
              src="/fox.png"
              alt="Personaje 1"
              className="personaje-img"
            />
          </div>

          {/* PADRE 2 */}
          <div className="personaje">
            <img
              src="/señora.png"
              alt="Personaje 2"
              className="personaje-img"
            />
          </div>

          {/* PERSONAJE 3 */}
          <div className="personaje">
            <img
              src="/junior.png"
              alt="Personaje 3"
              className="personaje-img"
            />
          </div>

          {/* PERSONAJE 4 */}
          <div className="personaje">
            <img
              src="/Kris.png"
              alt="Personaje 4"
              className="personaje-img"
            />
          </div>

          {/* PERSONAJE 5 */}
          <div className="personaje">
            <img
              src="/Ash.png"
              alt="Personaje 5"
              className="personaje-img"
            />
          </div>

          {/* PERSONAJE 6 */}
          <div className="personaje">
            <img
              src="/char.png"
              alt="Personaje 6"
              className="personaje-img"
            />
          </div>

        </div>

        {/* PARTE INFERIOR */}
        <div className="personajes-footer">
          <h2>Más sobre INLEC</h2>
        </div>

      </section>
      ```



      {/* ================= PERSONAJES ================= */}


      {/* ================= CREADORES ================= */}




      <section
        className="scroll-section creadores-wrapper"
        id="creadores"
      >

        <div className="creadores-encabezado">

          <h2>
            Creadores de Inlec
          </h2>

        </div>


        {/* MOVIL */}

        <div className="container-fluid">

          <div className="row justify-content-center align-items-end g-3 d-md-none">

            <div className="col-4 d-flex flex-column align-items-center">

              {activo === "sneyder" && (

                <div className="burbuja">

                  <p>
                    Un Prime debe hacer lo que un Prime debe hacer
                  </p>

                </div>

              )}

              <p className="creadores-nombre">
                Sneyder
              </p>

              <img
                src="/se.png"
                onClick={() => toggle("sneyder")}
                className="creadores-img img-fluid"
                alt="Sneyder"
              />

            </div>


            <div className="col-4 d-flex flex-column align-items-center">

              {activo === "luis" && (

                <div className="burbuja">

                  <p>
                    Captan las poderosas Señales
                  </p>

                </div>

              )}

              <p className="creadores-nombre">
                Luis
              </p>

              <img
                src="/jefes.png"
                onClick={() => toggle("luis")}
                className="creadores-img creadores-img--grande img-fluid"
                alt="Luis"
              />

            </div>


            <div className="col-4 d-flex flex-column align-items-center">

              {activo === "matheo" && (

                <div className="burbuja">

                  <p>
                    Entiendes el Concepto
                  </p>

                </div>

              )}

              <p className="creadores-nombre">
                Matheo
              </p>

              <img
                src="/as.png"
                onClick={() => toggle("matheo")}
                className="creadores-img img-fluid"
                alt="Matheo"
              />

            </div>

          </div>

        </div>


        {/* DESKTOP */}

        <div className="d-none d-md-block">

          <div className="creadores-persona creadores-persona--izq">

            {activo === "sneyder" && (

              <div className="burbuja">

                <p>
                  Un Prime debe hacer lo que un Prime debe hacer
                </p>

              </div>

            )}

            <p className="creadores-nombre">
              Sneyder
            </p>

            <img
              src="/er.png"
              onClick={() => toggle("sneyder")}
              className="creadores-img"
              alt="Sneyder"
            />

          </div>


          <div className="creadores-persona creadores-persona--centro">

            {activo === "luis" && (

              <div className="burbuja">

                <p>
                  Captan las poderosas Señales
                </p>

              </div>

            )}

            <p className="creadores-nombre">
              Luis
            </p>

            <img
              src="/jefes.png"
              onClick={() => toggle("luis")}
              className="creadores-img creadores-img--grande"
              alt="Luis"
            />

          </div>


          <div className="creadores-persona creadores-persona--der">

            {activo === "matheo" && (

              <div className="burbuja">

                <p>
                  Entiendes el Concepto
                </p>

              </div>

            )}

            <p className="creadores-nombre">
              Matheo
            </p>

            <img
              src="/as.png"
              onClick={() => toggle("matheo")}
              className="creadores-img"
              alt="Matheo"
            />

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* ==================== RESEÑAS ==================== */}
      {/* ================================================= */}


      {/* ================= FOOTER ================= */}

      <section className="autor-section" id="autor">

        <div className="container">

          <div className="autor-contenido">

            <div className="autor-imagen">

              <img
                src="/autor.jpg"
                alt="Autor"
              />

            </div>

            <div className="autor-texto">

              <h2>
                Roald Dahl
              </h2>

              <h3>
                Autor
              </h3>

              <p>
                Roald Dahl fue un reconocido escritor británico de literatura
                infantil y juvenil. Sus historias se caracterizan por tener
                personajes únicos, situaciones divertidas y mundos llenos de
                imaginación.
              </p>

              <p>
                Entre sus obras más conocidas se encuentran Charlie y la fábrica
                de chocolate, Matilda, Las brujas y El Superzorro.
              </p>

              <p>
                Su forma de contar historias ha inspirado a generaciones de
                lectores y continúa siendo reconocida por su creatividad y
                particular sentido del humor.
              </p>

            </div>

          </div>

        </div>

      </section>


<section
  className="scroll-section footer-container"
  id="contacto"
>
  <div className="container-fluid px-3 px-md-5">

    {/* DECORACIÓN SUPERIOR */}
    <div className="footer-top-decoration">
      <span></span>
      <img src="/logo.png" alt="Inlec" />
      <span></span>
    </div>

    <div className="row footer-content">

      {/* IDENTIDAD */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="footer-box footer-identidad">

          <h5 className="footer-title">
            Identidad
          </h5>

          <div className="footer-logo-container">
            <img
              src="/logo.png"
              alt="logo"
              className="footer-logo"
            />
          </div>

          <p className="footer-text footer-slogan">
            Del libro al mundo digital
          </p>

          <div className="footer-line"></div>

          <p className="footer-small-text">
            Una nueva forma de descubrir,
            imaginar y disfrutar la lectura.
          </p>

        </div>
      </div>


      {/* REDES SOCIALES */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="footer-box">

          <h5 className="footer-title">
            Redes Sociales
          </h5>

          <p className="footer-subtitle">
            Síguenos y descubre más
          </p>

          <div className="footer-social">

            <a
              href="#"
              className="social-button"
            >
              <span className="social-icon">♪</span>
              Tik Tok
              <span className="social-arrow">→</span>
            </a>

            <a
              href="#"
              className="social-button"
            >
              <span className="social-icon">◎</span>
              Instagram
              <span className="social-arrow">→</span>
            </a>

          </div>

        </div>
      </div>


      {/* NAVEGACIÓN */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="footer-box">

          <h5 className="footer-title">
            Navegación rápida
          </h5>

          <div className="footer-navigation">

            <p
              className="footer-link"
              onClick={() =>
                document
                  .getElementById("inicio")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              <span>01</span>
              Inicio
            </p>

            <p
              className="footer-link"
              onClick={() =>
                navigate("/capitulos/1")
              }
            >
              <span>02</span>
              Capítulos
            </p>

            <p
              className="footer-link"
              onClick={() =>
                document
                  .getElementById("personajes")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              <span>03</span>
              Personajes
            </p>

            <p
              className="footer-link"
              onClick={() =>
                document
                  .getElementById("resenas")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              <span>04</span>
              Reseñas
            </p>

            <p
              className="footer-link"
              onClick={() =>
                navigate("/galeria")
              }
            >
              <span>05</span>
              Ver más
            </p>

          </div>

        </div>
      </div>


      {/* CONTACTO */}
      <div className="col-12 col-sm-6 col-lg-3">
        <div className="footer-box">

          <h5 className="footer-title">
            Contacto
          </h5>

          <p className="footer-subtitle">
            ¿Quieres hablar con nosotros?
          </p>

          <div className="footer-contact">

            <div className="contact-item">
              <span className="contact-symbol">@</span>

              <div>
                <small>Correo</small>
                <p>Inlec5670@gmail.com</p>
              </div>
            </div>


            <div className="contact-item">
              <span className="contact-symbol">☎</span>

              <div>
                <small>Teléfono</small>
                <p>3235868923</p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>


    {/* ZORRO + FRASE */}
    <div className="footer-bottom">

      <div className="footer-track">

        <span className="paw">•</span>
        <span className="paw">•</span>
        <span className="paw">•</span>
        <span className="paw">•</span>

      </div>


      <div className="footer-character">

        <div className="character-glow"></div>

        <img
          src="/per4.png"
          alt="Personaje de Inlec"
        />

      </div>


      <div className="footer-final-text">

        <h4 className="abo-texto">
          Del libro al mundo digital
        </h4>

        <p>
          Explora. Imagina. Lee.
        </p>

      </div>

    </div>


    {/* COPYRIGHT */}
    <div className="footer-copyright">
      <span>INLEC</span>
      <span>•</span>
      <span>Un mundo de historias por descubrir</span>
    </div>

  </div>
</section>
    </div>
  );
};

export default Home;