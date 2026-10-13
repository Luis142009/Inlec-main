import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

import "../stylesheets/Fuentes.css";
import "../stylesheets/Textos.css";
import "../stylesheets/PersonajesCarrusel.css";
import "../stylesheets/LibroPersonajes.css";

const Home = () => {
  const navigate = useNavigate();

  /* ================= PERSONAJES ================= */

  /*
    Los campos que no existan (o estén vacíos) no se muestran
    en la ventana. Completa la info de Junior, Kris, Ash, etc.
    cuando la tengas.
  */

  const textosModal = {
    especie: "ESPECIE",
    edad: "EDAD",
    rol: "ROL",
    sinInfo: "Próximamente más información sobre este personaje.",
  };

  const personajes = [
    {
      nombre: "Sr. Fox",
      etiqueta: "PERSONAJE PRINCIPAL",
      imagen: "/fox.png",
      personalidad: "Audaz · Astuto · Elegante",
      descripcion:
        "Un zorro elegante, atleta, audaz y brillante, con un toque de perspicacia en la mirada.",
      especie: "Zorro",
      edad: "4 años",
      rol: "Protagonista",
      frase: "Nunca subestimes a un zorro con un buen plan.",
      detalle: "El protagonista de esta historia.",
    },
    {
      nombre: "Sra. Fox",
      etiqueta: "ALIADA",
      imagen: "/señora.png",
      personalidad: "Calmada, estratégica y siempre un paso adelante.",
      descripcion:
        "Una figura inteligente y fuerte que acompaña y apoya cada decisión importante dentro de la familia. Analítica, observadora e intuitiva, una persona muy perspicaz con grandes ojos de color azul.",
      especie: "Zorro",
      edad: "3 años zorrunos",
      rol: "Aliada",
      objetivo:
        "Mantener la estabilidad y seguridad del hogar, ser una esposa responsable y proteger a sus hijos.",
      detalle: "Siempre detecta el peligro antes que los demás.",
    },
    {
      nombre: "Junior",
      imagen: "/junior.png",
    },
    {
      nombre: "Kris",
      imagen: "/Kris.png",
    },
    {
      nombre: "Ash",
      imagen: "/Ash.png",
    },
    {
      nombre: "Personaje 6",
      imagen: "/char.png",
    },
  ];

  /* ===== VENTANA DEL PERSONAJE ===== */

  const [seleccionado, setSeleccionado] = useState(null);

  const cerrarPersonaje = () => setSeleccionado(null);

  useEffect(() => {
    if (!seleccionado) return;

    const onKey = (e) => {
      if (e.key === "Escape") setSeleccionado(null);
    };

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", onKey);
    };
  }, [seleccionado]);

  /* ===== BOTONES AVANZAR / RETROCEDER ===== */

  const pistaRef = useRef(null);
  const [puedeAnterior, setPuedeAnterior] = useState(false);
  const [puedeSiguiente, setPuedeSiguiente] = useState(false);

  const actualizarBotones = useCallback(() => {
    const el = pistaRef.current;
    if (!el) return;
    setPuedeAnterior(el.scrollLeft > 4);
    setPuedeSiguiente(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = pistaRef.current;
    if (!el) return;

    actualizarBotones();
    el.addEventListener("scroll", actualizarBotones, { passive: true });
    window.addEventListener("resize", actualizarBotones);

    let observer;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(actualizarBotones);
      observer.observe(el);
    }

    return () => {
      el.removeEventListener("scroll", actualizarBotones);
      window.removeEventListener("resize", actualizarBotones);
      if (observer) observer.disconnect();
    };
  }, [actualizarBotones]);

  const moverPersonajes = (direccion) => {
    const el = pistaRef.current;
    if (!el) return;

    const tarjeta = el.querySelector(".personaje");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const paso = tarjeta
      ? tarjeta.getBoundingClientRect().width + gap
      : el.clientWidth * 0.8;

    el.scrollBy({ left: direccion * paso, behavior: "smooth" });
  };

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


      {/* ================= PERSONAJES (CARRUSEL) ================= */}

      <section className="personajes-section" id="personajes">

        {/* TÍTULO */}
        <div className="personajes-header">
          <h2 className="per-texto">Personajes</h2>
        </div>

        {/* CARRUSEL: botones + contenedor de personajes */}
        <div className="personajes-carrusel">

          <button
            type="button"
            className="personajes-flecha personajes-flecha--izq"
            onClick={() => moverPersonajes(-1)}
            disabled={!puedeAnterior}
            aria-label="Personaje anterior"
          >
            ‹
          </button>

          {/* CONTENEDOR DE PERSONAJES */}
          <div className="personajes-container" ref={pistaRef}>

            {personajes.map((p) => (
              <div
                key={p.nombre}
                className="personaje"
                role="button"
                tabIndex={0}
                onClick={() => setSeleccionado(p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSeleccionado(p);
                  }
                }}
              >
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="personaje-img"
                />
              </div>
            ))}

          </div>

          <button
            type="button"
            className="personajes-flecha personajes-flecha--der"
            onClick={() => moverPersonajes(1)}
            disabled={!puedeSiguiente}
            aria-label="Personaje siguiente"
          >
            ›
          </button>

        </div>

        {/* PARTE INFERIOR */}
        <div className="personajes-footer">
          <h2>Más sobre INLEC</h2>
        </div>

      </section>


      {/* ================= VENTANA DEL PERSONAJE ================= */}

      <AnimatePresence>

        {seleccionado && (

          <motion.div
            className="personaje-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cerrarPersonaje}
          >

            <motion.div
              className="personaje-modal"
              role="dialog"
              aria-modal="true"
              aria-label={seleccionado.nombre}
              initial={{ opacity: 0, scale: 0.75, rotateZ: -2, y: 40 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.75, rotateZ: 2, y: 40 }}
              transition={{ type: "spring", stiffness: 260, damping: 21 }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* CERRAR */}

              <motion.button
                type="button"
                className="personaje-modal-cerrar"
                onClick={cerrarPersonaje}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Cerrar"
              >
                ×
              </motion.button>

              {/* IMAGEN */}

              <div className="personaje-modal-imagen-contenedor">

                <div className="modal-halo" />

                <img
                  src={seleccionado.imagen}
                  alt={seleccionado.nombre}
                  className="personaje-modal-imagen"
                />

              </div>

              {/* INFORMACIÓN */}

              <div className="personaje-modal-info">

                {seleccionado.etiqueta && (
                  <span className="personaje-modal-etiqueta">
                    {seleccionado.etiqueta}
                  </span>
                )}

                <h2>{seleccionado.nombre}</h2>

                {seleccionado.personalidad && (
                  <div className="personaje-subtitulo">
                    {seleccionado.personalidad}
                  </div>
                )}

                <p>{seleccionado.descripcion || textosModal.sinInfo}</p>

                {(seleccionado.especie ||
                  seleccionado.edad ||
                  seleccionado.rol) && (

                  <div className="personaje-datos">

                    {seleccionado.especie && (
                      <div className="dato">
                        <small>{textosModal.especie}</small>
                        <strong>{seleccionado.especie}</strong>
                      </div>
                    )}

                    {seleccionado.edad && (
                      <div className="dato">
                        <small>{textosModal.edad}</small>
                        <strong>{seleccionado.edad}</strong>
                      </div>
                    )}

                    {seleccionado.rol && (
                      <div className="dato">
                        <small>{textosModal.rol}</small>
                        <strong>{seleccionado.rol}</strong>
                      </div>
                    )}

                  </div>

                )}

                {seleccionado.frase && (
                  <div className="personaje-frase">
                    <span className="frase-comilla">“</span>
                    <p>{seleccionado.frase}</p>
                  </div>
                )}

                {seleccionado.objetivo && (
                  <div className="personaje-modal-detalle">
                    <span>✦</span>
                    <div>
                      <b>Objetivo:</b> {seleccionado.objetivo}
                    </div>
                  </div>
                )}

                {seleccionado.detalle && (
                  <div className="personaje-modal-detalle">
                    <span>✦</span>
                    <div>{seleccionado.detalle}</div>
                  </div>
                )}

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


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


      {/* ================= AUTOR ================= */}

      <section className="autor-section" id="autor">
        {/* Círculos decorativos de fondo */}
        <span className="autor-circulo-fondo circulo-1" aria-hidden="true" />
        <span className="autor-circulo-fondo circulo-2" aria-hidden="true" />

        <div className="container">
          <div className="autor-contenido">

            <div className="autor-imagen">
              <div className="autor-blob" aria-hidden="true" />
              <div className="autor-anillo" aria-hidden="true" />

              <div className="autor-orbita" aria-hidden="true">
                <img src="/manzana.svg" alt="" className="autor-orbita-manzana" />
              </div>

              <div className="autor-foto">
                <img src="/autor.jpg" alt="Roald Dahl" />
              </div>
            </div>

            <div className="autor-texto">
              <h2>Roald Dahl</h2>

              <h3>Autor</h3>

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


      {/* ================= FOOTER ================= */}

      <section
        className="scroll-section footer-container"
        id="contacto"
      >
        <div className="container-fluid px-3 px-md-5">

          {/* DECORACIÓN SUPERIOR */}
          <div className="footer-top-decoration">
            <span></span>
            <img src="/loge.png" alt="Inlec" />
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
                    src="/loge.png"
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
                    href="https://www.tiktok.com/@inlec1?_r=1"
                    className="social-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="social-icon">♪</span>
                    TikTok
                    <span className="social-arrow">→</span>
                  </a>

                  <a
                    href="https://www.instagram.com/inlec.co/"
                    className="social-button"
                    target="_blank"
                    rel="noopener noreferrer"
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
                    Autor
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