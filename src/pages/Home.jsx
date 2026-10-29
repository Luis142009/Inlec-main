import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

import Creadores from "../components/Creadores";

import "../stylesheets/Fuentes.css";
import "../stylesheets/Textos.css";
import "../stylesheets/PersonajesCarrusel.css";
import "../stylesheets/LibroPersonajes.css";
import "../stylesheets/Capitulos.css";
import "../stylesheets/Granjeros.css";
import "../stylesheets/ProyectoCarrusel.css";
import "../stylesheets/MasInlec.css";
import "../stylesheets/HojaBotones.css";



const Home = () => {
  const navigate = useNavigate();

  /* ================= PROYECTO (TEXTOS ROTATIVOS) ================= */

  /*
    Los 3 textos de "Nuestro Proyecto". Cambia el contenido a tu gusto.
    Se pasan solos cada TIEMPO_PROYECTO ms y también con los puntitos.
  */

  const textosProyecto = [
    "Inlec es una plataforma digital que transforma la lectura en una experiencia interactiva, creativa y emocionante. Con animaciones y actividades dinámicas, queremos que descubras el gusto de leer a tu manera.",
    "Combinamos tecnología, interactividad y animación para que cada lector explore las historias de una forma más libre y diversa, con total control sobre lo que ve, hace y descubre.",
    "Nuestro propósito es que la lectura deje de sentirse como una carga y se convierta en algo opcional, libre y divertido: del libro al mundo digital.",
  ];

  const TIEMPO_PROYECTO = 5000;

  /* Tamaño de los puntitos en píxeles (se aplica directo en el JSX,
     así ningún CSS externo lo puede pisar). Cámbialo y guarda. */
  const TAMANO_PUNTO = 8;

  /* Colores de los puntitos (café para que se vean sobre el fondo beige) */
  const COLOR_PUNTO = "rgba(139, 69, 19, 0.35)";
  const COLOR_PUNTO_ACTIVO = "#8b4513";

  const [textoProyecto, setTextoProyecto] = useState(0);

  /*
    Avanza solo. Como depende de "textoProyecto", cuando el usuario
    hace clic en un punto el temporizador se reinicia.
  */
  useEffect(() => {
    const id = setTimeout(() => {
      setTextoProyecto((prev) => (prev + 1) % textosProyecto.length);
    }, TIEMPO_PROYECTO);

    return () => clearTimeout(id);
  }, [textoProyecto, textosProyecto.length]);

  /* ================= CAPÍTULOS ================= */

  /*
    Título y descripción fijos sobre el video de fondo.
    El botón lleva directo a la animación (ruta /capitulos/1).
  */

  const tituloCapitulos = "El SuperZorro";

  const descripcionCapitulos =
    "Descubre las aventuras del superzorro y sus animaciones. Cada capítulo te sumerge en un mundo lleno de acción, ingenio y diversión, donde podras interactuar y adentrarte mas con nuestras animaciónes";

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
      etiqueta: "FAMILIA FOX",
      imagen: "/señora.png",
      personalidad: "Inteligente · Cariñosa · Valiente",
      descripcion:
        "Protege a su familia y detecta el peligro antes que nadie.",
      especie: "Zorro",
      edad: "3 años zorrunos",
      rol: "Aliada",
    },
    {
      nombre: "Junior",
      etiqueta: "FAMILIA FOX",
      imagen: "/junior.png",
      personalidad: "Curioso · Buena memoria",
      descripcion:
        "El segundo menor de los zorritos. Recuerda todos los caminos.",
      especie: "Zorro",
      edad: "Joven",
      rol: "Hijo de los Fox",
    },
    {
      nombre: "Kristofferson",
      etiqueta: "FAMILIA FOX",
      imagen: "/Kris.png",
      personalidad: "Disciplinado · Tranquilo · Hábil",
      descripcion:
        "El primo de Ash. Sereno, disciplinado y muy hábil.",
      especie: "Zorro",
      edad: "Joven",
      rol: "Primo de Ash",
    },
    {
      nombre: "Ash",
      etiqueta: "FAMILIA FOX",
      imagen: "/Ashss.png",
      personalidad: "Rebelde · Ingenioso · Determinado",
      descripcion:
        "Inquieto y creativo, quiere demostrar lo que puede hacer por sí mismo.",
      especie: "Zorro",
      edad: "Joven",
      rol: "Hijo de los Fox",
    },
    {
      nombre: "Charles",
      etiqueta: "FAMILIA FOX",
      imagen: "/char.png",
      personalidad: "Curioso · Expresivo · Decidido",
      descripcion:
        "El menor de los zorritos: pequeño, veloz y gran excavador.",
      especie: "Zorro",
      edad: "Joven",
      rol: "Hijo de los Fox",
    },
  ];

  /* ===== SLIDES: PERSONAJES / GRANJEROS ===== */

  /*
    0 = carrusel de personajes, 1 = granjeros.
    Bean va arriba; Bunce y Boggis abajo.
    Cambia las rutas de "imagen" por las de tus archivos.
  */

  /*
    La ventana usa la misma "imagen" (el cuadro) que se ve en la lista.
  */

  const granjeros = {
    bean: {
      nombre: "Bean",
      etiqueta: "LOS GRANJEROS",
      imagen: "/cuadrobean.png",
      personalidad: "Frío · Calculador · Obstinado",
      descripcion:
        "El granjero alto y flaco de los pavos y la sidra. Quiere atrapar al Sr. Fox.",
      especie: "Humano",
      edad: "60 años",
      rol: "Granjero",
    },
    abajo: [
      {
        nombre: "Bunce",
        etiqueta: "LOS GRANJEROS",
        imagen: "/cuadrobunce.png",
        personalidad: "Gruñón · Desconfiado · Persistente",
        descripcion:
          "El granjero bajito e irritable de los patos y los gansos.",
        especie: "Humano",
        edad: "40 años",
        rol: "Granjero",
      },
      {
        nombre: "Boggis",
        etiqueta: "LOS GRANJEROS",
        imagen: "/cuadroboggis.png",
        personalidad: "Codicioso · Terco · Agresivo",
        descripcion:
          "El granjero gordo y glotón de los pollos. No tolera que le roben.",
        especie: "Humano",
        edad: "50 años",
        rol: "Granjero",
      },
    ],
  };

  const [vistaPersonajes, setVistaPersonajes] = useState(0);

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

      {/* =====================================================
          HOJA DE FONDO: desde "Nuestro Proyecto"
          hasta "Más sobre Inlec" (Personajes queda igual)
          ===================================================== */}

      <div className="hoja-fondo">

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

              {/* TEXTOS ROTATIVOS + PUNTOS */}

              <div className="proyecto-carrusel">

                <p
                  key={textoProyecto}
                  className="proyecto-descripcion proyecto-fade"
                  aria-live="polite"
                >
                  {textosProyecto[textoProyecto]}
                </p>

                {/* Puntitos con clases propias (pz-*) para que ningún otro CSS
                    los pueda agrandar. El tamaño se cambia arriba con
                    TAMANO_PUNTO. */}
                <div
                  className="pz-puntos"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: TAMANO_PUNTO,
                    marginTop: 16,
                  }}
                >
                  <style>{`
                    .pz-puntos .pz-punto {
                      display: block !important;
                      box-sizing: border-box !important;
                      width: ${TAMANO_PUNTO}px !important;
                      height: ${TAMANO_PUNTO}px !important;
                      min-width: ${TAMANO_PUNTO}px !important;
                      min-height: ${TAMANO_PUNTO}px !important;
                      max-width: ${TAMANO_PUNTO}px !important;
                      max-height: ${TAMANO_PUNTO}px !important;
                      flex: 0 0 ${TAMANO_PUNTO}px !important;
                      padding: 0 !important;
                      margin: 0 !important;
                      border: 0 !important;
                      border-radius: 50% !important;
                      background-image: none !important;
                      box-shadow: none !important;
                      overflow: hidden !important;
                      cursor: pointer;
                      transition: background-color 0.3s ease, transform 0.3s ease;
                    }
                    .pz-puntos .pz-punto { background-color: ${COLOR_PUNTO} !important; }
                    .pz-puntos .pz-punto.pz-activo {
                      background-color: ${COLOR_PUNTO_ACTIVO} !important;
                      transform: scale(1.25);
                    }
                  `}</style>
                  {textosProyecto.map((_, i) => (
                    <span
                      key={i}
                      role="button"
                      tabIndex={0}
                      className={
                        "pz-punto" + (i === textoProyecto ? " pz-activo" : "")
                      }
                      onClick={() => setTextoProyecto(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setTextoProyecto(i);
                      }}
                      aria-label={`Ver texto ${i + 1}`}
                    />
                  ))}
                </div>

              </div>

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
          className="scroll-section historia-section container-fluid py-4"
          id="sinopsis"
        >

          <div className="row justify-content-center">

            <div className="col-11 col-sm-10 col-md-8 col-lg-7">

              {/* CARTEL DE MADERA */}

              <div className="historia-cartel-wrap">
                <h1 className="historia-titulo">
                  Detras de la historia
                </h1>
              </div>

              {/* TARJETA */}

              <div className="historia-caja">



                <p className="historia-texto">
                  El Superzorro es un cuento infantil publicado en 1970
                  por el escritor británico Roald Dahl. La historia sigue
                  a un astuto zorro que roba comida a tres granjeros que
                  intentaran cazarlo con desesperación.
                </p>

                <div className="historia-acciones">
                  <button
                    type="button"
                    className="historia-btn"
                    onClick={() => navigate("/galeria")}
                  >
                    Conoce mas
                  </button>
                </div>

              </div>

            </div>

          </div>

        </section>

      </div>


      {/* ================= CAPÍTULOS ================= */}

      <section
        id="animacion"
        className="capitulos-section mt-5"
      >

        <div className="capitulos-frame">

          {/* FONDO GENERAL (video) */}

          <video
            className="capitulos-fondo"
            src="/Disparo.mp4"
            poster="/capi.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          <div className="capitulos-overlay">

            {/* TÍTULO + DESCRIPCIÓN (fijos) */}

            <div className="capitulos-texto">

              <h1 className="capitulos-titulo">
                {tituloCapitulos}
              </h1>

              <p className="capitulos-descripcion">
                {descripcionCapitulos}
              </p>

            </div>

            {/* BOTÓN A LA ANIMACIÓN */}

            <div className="capitulos-accion">

              <button
                type="button"
                className="capitulos-boton"
                onClick={() => navigate("/capitulos/1")}
                aria-label="Ver la animación"
              >
                <span className="capitulos-boton-icono" aria-hidden="true">▶</span>
                <span className="capitulos-boton-texto">Ver la animación</span>
                <span className="capitulos-boton-flecha" aria-hidden="true"></span>
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================= MAS SOBRE INLEC ================= */}

      <section id="inlec" className="mi-section">

        {/* Círculos decorativos de fondo */}
        <span className="mi-circulo mi-circulo--1" aria-hidden="true" />
        <span className="mi-circulo mi-circulo--2" aria-hidden="true" />

        <div className="mi-contenedor">

          {/* CARTEL DE MADERA */}

          <div className="mi-cartel-wrap">
            <h2 className="mi-titulo">Más sobre Inlec</h2>
          </div>

          {/* TARJETA */}

          <div className="mi-card">

            <div className="mi-card-grid">

              {/* JUNIOR ANIMADO (capas: cuerpo, cabeza, orejas, cola, manos) */}

              <div className="mi-card-junior">

                <div
                  className="mi-junior"
                  role="img"
                  aria-label="Junior, el zorro de Inlec"
                >
                  <span className="mi-junior-halo" aria-hidden="true" />

                  <div className="mi-junior-figura">

                    <img className="mi-capa mi-cola" src="/junior-tail.png" alt="" draggable="false" />
                    <img className="mi-capa" src="/junior-cuerpo.png" alt="" draggable="false" />
                    <img className="mi-capa mi-mano mi-mano--izq" src="/junior-handL.png" alt="" draggable="false" />
                    <img className="mi-capa mi-mano mi-mano--der" src="/junior-handR.png" alt="" draggable="false" />

                    {/* La cabeza lleva las orejas dentro */}
                    <div className="mi-capa mi-cabeza">
                      <img className="mi-capa mi-oreja mi-oreja--izq" src="/junior-earL.png" alt="" draggable="false" />
                      <img className="mi-capa mi-oreja mi-oreja--der" src="/junior-earR.png" alt="" draggable="false" />
                      <img className="mi-capa" src="/junior-cabeza.png" alt="" draggable="false" />
                    </div>

                  </div>

                  <span className="mi-junior-sombra" aria-hidden="true" />
                </div>

              </div>

              {/* TEXTO */}

              <div className="mi-card-texto">

                <p className="mi-descripcion">
                  Transformar la lectura en una experiencia innovadora es el
                  objetivo principal de Inlec. La tecnología se combina con la
                  interactividad y las animaciones para invitarte a explorar de
                  una manera más libre y diversa.
                </p>

                <p className="mi-descripcion">
                  Queremos crear un espacio digital donde cada usuario se sienta
                  cómodo y con total control sobre lo que ve, hace y desea
                  descubrir, para que la lectura deje de sentirse como una carga
                  y se vuelva algo opcional, algo libre. ggg
                </p>

              </div>

            </div>

          </div>

          {/* BOTONES */}

          <div className="mi-acciones">

            <a href="https://link.com" className="mi-btn">
              Pitchbook
            </a>

            <a href="https://no-encontramos-el-manual.com" className="mi-btn">
              Manual de Marca
            </a>

            <a
              href="https://drive.google.com/file/d/1e5cmCOQF_4gsQkQozgmIcsRdFBAx2dAW/view?usp=sharing"
              className="mi-btn"
            >
              Moodboard
            </a>

          </div>

        </div>

      </section>

      </div>
      {/* ============ FIN HOJA DE FONDO ============ */}


      {/* ================= PERSONAJES (CARRUSEL) ================= */}

      <section className="personajes-section" id="personajes">

        {/* TÍTULO */}
        <div className="personajes-header">
          <h2 className="per-texto">
            {vistaPersonajes === 0 ? "Personajes" : "Los Granjeros"}
          </h2>
        </div>

        {/* SLIDES: personajes -> granjeros */}
        <div className="personajes-slides">

          <div
            className="personajes-pista-slides"
            style={{ transform: `translateX(-${vistaPersonajes * 100}%)` }}
          >

            {/* ---------- SLIDE 1: PERSONAJES ---------- */}

            <div
              className={
                "personajes-slide" +
                (vistaPersonajes !== 0 ? " personajes-slide--oculta" : "")
              }
              aria-hidden={vistaPersonajes !== 0}
            >

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

            </div>

            {/* ---------- SLIDE 2: GRANJEROS ---------- */}

            <div
              className={
                "personajes-slide" +
                (vistaPersonajes !== 1 ? " personajes-slide--oculta" : "")
              }
              aria-hidden={vistaPersonajes !== 1}
            >

              <div className="granjeros">

                {/* BEAN ARRIBA */}
                <div className="granjeros-arriba">
                  <div
                    className="granjero granjero--bean"
                    role="button"
                    tabIndex={vistaPersonajes === 1 ? 0 : -1}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSeleccionado(granjeros.bean)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSeleccionado(granjeros.bean);
                      }
                    }}
                  >
                    <img
                      src={granjeros.bean.imagen}
                      alt={granjeros.bean.nombre}
                      className="granjero-img"
                    />
                  </div>
                </div>

                {/* BUNCE Y BOGGIS ABAJO */}
                <div className="granjeros-abajo">
                  {granjeros.abajo.map((g) => (
                    <div
                      key={g.nombre}
                      className={`granjero granjero--${g.nombre.toLowerCase()}`}
                      role="button"
                      tabIndex={vistaPersonajes === 1 ? 0 : -1}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSeleccionado(g)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSeleccionado(g);
                        }
                      }}
                    >
                      <img
                        src={g.imagen}
                        alt={g.nombre}
                        className="granjero-img"
                      />
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SELECTOR: botón + puntos */}
        <div className="personajes-selector">

          <button
            type="button"
            className="personajes-cambiar"
            onClick={() => setVistaPersonajes((v) => (v === 0 ? 1 : 0))}
          >
            {vistaPersonajes === 0 ? "Conoce a los granjeros ›" : "‹ Volver a los personajes"}
          </button>

          <div className="personajes-puntos">
            {[0, 1].map((i) => (
              <button
                key={i}
                type="button"
                className={
                  "personajes-punto" +
                  (i === vistaPersonajes ? " personajes-punto--activo" : "")
                }
                onClick={() => setVistaPersonajes(i)}
                aria-label={i === 0 ? "Ver personajes" : "Ver granjeros"}
              />
            ))}
          </div>

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
                  src={seleccionado.imagenFicha || seleccionado.imagen}
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
                    <span></span>
                    <div>
                      <b>Objetivo:</b> {seleccionado.objetivo}
                    </div>
                  </div>
                )}

                {seleccionado.detalle && (
                  <div className="personaje-modal-detalle">
                    <span></span>
                    <div>{seleccionado.detalle}</div>
                  </div>
                )}

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* ===== HOJA DE FONDO FINAL: Creadores + Autor + Footer ===== */}

      <div className="hoja-fondo hoja-fondo--final">

      {/* ================= CREADORES ================= */}

      <Creadores />


      {/* ================================================= */}
      {/* ==================== RESEÑAS ==================== */}
      {/* ================================================= */}


      {/* ================= AUTOR ================= */}

      <section className="autor-section" id="autor">

  {/* DECORACIONES */}
  <span className="autor-deco deco-m1"><img src="/manzana.svg" alt="" draggable="false" /></span>
  <span className="autor-deco deco-m2"><img src="/manzana.svg" alt="" draggable="false" /></span>
  <span className="autor-deco deco-m3"><img src="/manzana.svg" alt="" draggable="false" /></span>
  <span className="autor-deco deco-h1"><img src="/huella.svg" alt="" draggable="false" /></span>
  <span className="autor-deco deco-h2"><img src="/huella.svg" alt="" draggable="false" /></span>
  <span className="autor-deco deco-h3"><img src="/huella.svg" alt="" draggable="false" /></span>
  <span className="autor-deco deco-h4"><img src="/huella.svg" alt="" draggable="false" /></span>

  <div className="container">
    <div className="autor-wrap">

      {/* KRISTOFER ASOMÁNDOSE */}
      <img src="/kristofer.png" alt="Kristofer" className="autor-peek" draggable="false" />

      <div className="autor-contenido">

        {/* FOTO TIPO POLAROID */}
        <div className="autor-imagen">
          <div className="autor-foto">
            <span className="autor-cinta cinta-izq" />
            <span className="autor-cinta cinta-der" />

            <div className="autor-marco">
              <img src="/autor.jpg" alt="Roald Dahl" />
            </div>

            <span className="autor-caption">Roald Dahl</span>
          </div>

          <span className="autor-sticker">¡Hola, lector!</span>
        </div>

        {/* TEXTO */}
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
  </div>
</section>


      {/* ================= FOOTER ================= */}
<section className="scroll-section ft-container" id="contacto">

  {/* DECORACIONES */}
  <span className="ft-deco ft-d1"><img src="/manzana.svg" alt="" draggable="false" /></span>
  <span className="ft-deco ft-d2"><img src="/manzana.svg" alt="" draggable="false" /></span>
  <span className="ft-deco ft-d3"><img src="/cubo.svg" alt="" draggable="false" /></span>
  <span className="ft-deco ft-d4"><img src="/cubo.svg" alt="" draggable="false" /></span>
  <span className="ft-deco ft-d5"><img src="/huella.svg" alt="" draggable="false" /></span>
  <span className="ft-deco ft-d6"><img src="/huella.svg" alt="" draggable="false" /></span>

  {/* PERSONAJES LATERALES */}
  <img src="/ash.png" alt="Ash" className="ft-char ft-ash" />
  <img src="/charles.png" alt="Charles" className="ft-char ft-charles" />

  <div className="container-fluid px-3 px-md-5">

    <div className="ft-stage">

      {/* NAVEGACIÓN */}
      <div className="ft-circle ft-nav">
        <h5 className="ft-title">Navegación</h5>

        <div className="ft-links">
          <p
            className="ft-link"
            onClick={() =>
              document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>01</span> Inicio
          </p>

          <p className="ft-link" onClick={() => navigate("/capitulos/1")}>
            <span>02</span> Capítulos
          </p>

          <p
            className="ft-link"
            onClick={() =>
              document.getElementById("personajes")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>03</span> Personajes
          </p>

          <p
            className="ft-link"
            onClick={() =>
              document.getElementById("autor")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>04</span> Autor
          </p>

          <p className="ft-link" onClick={() => navigate("/galeria")}>
            <span>05</span> Ver más
          </p>
        </div>
      </div>

      {/* CONTACTO */}
      <div className="ft-circle ft-contact">
        <h5 className="ft-title">Contacto</h5>
        <p className="ft-subtitle">¿Quieres hablar con nosotros?</p>

        <div className="ft-contact-list">
          <div className="ft-contact-item">
            <span className="ft-contact-symbol">@</span>
            <div>
              <small>Correo</small>
              <p>inlec.co@gmail.com</p>
            </div>
          </div>

          <div className="ft-contact-item">
            <span className="ft-contact-symbol">☎</span>
            <div>
              <small>Teléfono</small>
              <p>3246583815</p>
            </div>
          </div>
        </div>
      </div>

      {/* REDES SOCIALES */}
      <div className="ft-circle ft-social">
        <h5 className="ft-title">Redes Sociales</h5>
        <p className="ft-subtitle">Síguenos y descubre más</p>

        <div className="ft-social-list">
          <a
            href="https://www.tiktok.com/@inlec1?_r=1"
            className="ft-social-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="ft-social-icon">♪</span>
            TikTok
            <span className="ft-social-arrow">→</span>
          </a>

          <a
            href="https://www.instagram.com/inlec.co/"
            className="ft-social-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="ft-social-icon">◎</span>
            Instagram
            <span className="ft-social-arrow">→</span>
          </a>
        </div>
      </div>

      {/* KRISTOFER */}
      <img src="/kristofer.png" alt="Kristofer" className="ft-kristofer" />
    </div>

    {/* MARCA + HUELLAS */}
    <div className="ft-bottom">
      <div className="ft-paw-trail">
        <img src="/huella.svg" alt="" draggable="false" className="ft-paw" />
        <img src="/huella.svg" alt="" draggable="false" className="ft-paw" />
        <img src="/huella.svg" alt="" draggable="false" className="ft-paw" />
        <img src="/huellla.svg" alt="" draggable="false" className="ft-paw" />
        <img src="/huella.svg" alt="" draggable="false" className="ft-paw" />
        <img src="/huella.svg" alt="" draggable="false" className="ft-paw" />
      </div>

      <div className="ft-brand">
        <img src="/loge.png" alt="Inlec" />
        <div>
          <h4 className="ft-slogan">Del libro al mundo digital</h4>
          <p>Explora. Imagina. Lee.</p>
        </div>
      </div>
    </div>

    <div className="ft-copyright">
      <span></span>
      <span>·</span>
      <span></span>
    </div>

  </div>
</section>

      </div>
      {/* ============ FIN HOJA DE FONDO FINAL ============ */}

    </div>
  );
};

export default Home;