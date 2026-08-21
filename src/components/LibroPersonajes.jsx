import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import "../stylesheets/LibroPersonajes.css";


// =========================================================
// COMPONENTE
// =========================================================

const LibroPersonajes = () => {


  // =========================================================
  // ESTADOS
  // =========================================================

  const [libroAbierto, setLibroAbierto] = useState(false);

  const [personajeSeleccionado, setPersonajeSeleccionado] =
    useState(null);


  // =========================================================
  // TEXTOS GENERALES
  // EDITA AQUÍ LOS TEXTOS DEL LIBRO
  // =========================================================

  const textos = {

    libro: {

      etiqueta:
        "ARCHIVOS DE LA HISTORIA",

      titulo:
        "Libro de personajes",

      subtitulo:
        "Conoce los que hacen parte del Super Zorro",

      footer:
        "Adentrate en la historia del personaje",

      cerrar:
        "Cerrar libro"

    },


    srFox: {

      ribbon:
        "PRINCIPAL",

      especieCard:
        "ZORRO",

      abrirFicha:
        "Abrir ficha"

    },


    futuro1: {

      icono:
        "+",

      titulo:
        "¿Quién será?",

      texto:
        "Próximamente..."

    },


    futuro2: {

      icono:
        "?",

      titulo:
        "Página vacía",

      texto:
        "La historia continúa..."

    },


    datos: {

      especie:
        "ESPECIE",

      edad:
        "EDAD",

      rol:
        "ROL",

      frase:
        "FRASE",

      detalle:
        "DETALLE"

    }

  };


  // =========================================================
  // PERSONAJES
  // EDITA AQUÍ TODA LA INFORMACIÓN DEL PERSONAJE
  // =========================================================

  const personajes = {

    srFox: {

      nombre:
        "Sr. Fox",

      imagen:
        "./H.png",

      descripcion:
        "Un zorro elegante, atleta, audaz y brillante, con un toque de perspicacia en la mirada.",

      detalle:
        "El protagonista de esta historia.",

      edad:
        ": 4 años",

      especie:
        ": Zorro",

      rol:
        ": Protagonista",

      personalidad:
        "Audaz · Astuto · Elegante",

      frase:
        "Nunca subestimes a un zorro con un buen plan.",

      etiqueta:
        "PERSONAJE PRINCIPAL"

    }

  };


  // =========================================================
  // ABRIR PERSONAJE
  // =========================================================

  const abrirPersonaje = (personaje) => {

    setPersonajeSeleccionado(personaje);

  };


  // =========================================================
  // CERRAR PERSONAJE
  // =========================================================

  const cerrarPersonaje = () => {

    setPersonajeSeleccionado(null);

  };


  // =========================================================
  // ABRIR LIBRO
  // =========================================================

  const abrirLibro = () => {

    setLibroAbierto(true);

  };


  // =========================================================
  // CERRAR LIBRO
  // =========================================================

  const cerrarLibro = () => {

    setPersonajeSeleccionado(null);

    setLibroAbierto(false);

  };


  // =========================================================
  // TECLA ESC
  // =========================================================

  useEffect(() => {

    const manejarTecla = (event) => {

      if (event.key === "Escape") {

        if (personajeSeleccionado) {

          cerrarPersonaje();

        } else if (libroAbierto) {

          cerrarLibro();

        }

      }

    };

    window.addEventListener(
      "keydown",
      manejarTecla
    );

    return () => {

      window.removeEventListener(
        "keydown",
        manejarTecla
      );

    };

  }, [
    libroAbierto,
    personajeSeleccionado
  ]);


  // =========================================================
  // PERSONAJE ACTUAL
  // =========================================================

  const personajeActual =
    personajeSeleccionado
      ? personajes[personajeSeleccionado]
      : null;


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <>


      {/* =====================================================
          BOTÓN DEL LIBRO
      ===================================================== */}

      <motion.button

        className="libro-personajes-boton"

        onClick={abrirLibro}

        whileHover={{
          scale: 1.08,
          rotate: -2,
          y: -3
        }}

        whileTap={{
          scale: 0.92
        }}

        title={textos.libro.titulo}

      >

        <span className="libro-icono">

          <img
            src="/L.png"
            alt="Personajes"
          />

        </span>

        <span className="libro-boton-brillo" />

      </motion.button>


      {/* =====================================================
          LIBRO
      ===================================================== */}

      <AnimatePresence>

        {libroAbierto && (

          <motion.div

            className="libro-overlay"

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            exit={{
              opacity: 0
            }}

            onClick={cerrarLibro}

          >


            {/* DECORACIONES */}

            <div className="libro-particula libro-particula-1">

              ✦

            </div>

            <div className="libro-particula libro-particula-2">

              ✧

            </div>

            <div className="libro-particula libro-particula-3">

              ✦

            </div>


            {/* =================================================
                CONTENEDOR
            ================================================= */}

            <motion.div

              className="libro-contenedor"

              initial={{
                opacity: 0,
                scale: 0.65,
                rotateY: -25,
                rotateZ: -2,
                y: 60
              }}

              animate={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                rotateZ: 0,
                y: 0
              }}

              exit={{
                opacity: 0,
                scale: 0.65,
                rotateY: 20,
                rotateZ: 2,
                y: 60
              }}

              transition={{
                type: "spring",
                stiffness: 240,
                damping: 20
              }}

              onClick={(event) =>
                event.stopPropagation()
              }

            >


              {/* =================================================
                  CERRAR
              ================================================= */}

              <motion.button

                className="libro-cerrar"

                onClick={cerrarLibro}

                whileHover={{
                  rotate: 90,
                  scale: 1.1
                }}

                whileTap={{
                  scale: 0.9
                }}

                aria-label={textos.libro.cerrar}

              >

                ×

              </motion.button>


              {/* =================================================
                  ENCABEZADO
              ================================================= */}

              <div className="libro-header">


                <motion.div

                  className="libro-header-icon"

                  animate={{
                    rotate: [-5, 5, -5],
                    y: [0, -4, 0]
                  }}

                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}

                >

                </motion.div>


                <div>


                  <span className="libro-etiqueta">

                    {textos.libro.etiqueta}

                  </span>


                  <h2>

                    {textos.libro.titulo}

                  </h2>


                  <p>

                    {textos.libro.subtitulo}

                  </p>


                </div>

              </div>


              {/* =================================================
                  SEPARADOR
              ================================================= */}

              <div className="libro-separador">

                <span>
                  ✦
                </span>

                <div />

                <span>
                  ✦
                </span>

              </div>


              {/* =================================================
                  GRID DE PERSONAJES
              ================================================= */}

              <div className="personajes-grid">


                {/* =================================================
                    SR FOX
                ================================================= */}

                <motion.button

                  className="personaje-card personaje-principal"

                  onClick={() =>
                    abrirPersonaje("srFox")
                  }

                  initial={{
                    opacity: 0,
                    y: 35
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  transition={{
                    delay: 0.15,
                    duration: 0.5
                  }}

                  whileHover={{
                    scale: 1.045,
                    y: -7
                  }}

                  whileTap={{
                    scale: 0.96
                  }}

                >


                  {/* ETIQUETA */}

                  <div className="personaje-ribbon">

                    {textos.srFox.ribbon}

                  </div>


                  {/* IMAGEN */}

                  <div className="personaje-imagen-contenedor">

                    <div className="personaje-halo" />

                    <img

                      src={personajes.srFox.imagen}

                      alt={personajes.srFox.nombre}

                      className="personaje-imagen"

                    />

                  </div>


                  {/* INFORMACIÓN */}

                  <div className="personaje-card-info">


                    <div className="personaje-card-especie">

                      {textos.srFox.especieCard}

                    </div>


                    <div className="personaje-nombre">

                      {personajes.srFox.nombre}

                    </div>


                    <div className="personaje-ver">

                      {textos.srFox.abrirFicha}

                      <span>

                        →

                      </span>

                    </div>


                  </div>

                </motion.button>


                {/* =================================================
                    TARJETA FUTURA 1
                ================================================= */}

                <motion.div

                  className="personaje-card personaje-vacio"

                  initial={{
                    opacity: 0,
                    y: 35
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  transition={{
                    delay: 0.25,
                    duration: 0.5
                  }}

                >


                  <div className="vacio-icono">

                    {textos.futuro1.icono}

                  </div>


                  <div className="vacio-titulo">

                    {textos.futuro1.titulo}

                  </div>


                  <small>

                    {textos.futuro1.texto}

                  </small>


                </motion.div>


                {/* =================================================
                    TARJETA FUTURA 2
                ================================================= */}

                <motion.div

                  className="personaje-card personaje-vacio"

                  initial={{
                    opacity: 0,
                    y: 35
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  transition={{
                    delay: 0.35,
                    duration: 0.5
                  }}

                >


                  <div className="vacio-icono">

                    {textos.futuro2.icono}

                  </div>


                  <div className="vacio-titulo">

                    {textos.futuro2.titulo}

                  </div>


                  <small>

                    {textos.futuro2.texto}

                  </small>


                </motion.div>


              </div>


              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="libro-footer">

                <span>
                  ✦
                </span>

                {textos.libro.footer}

                <span>
                  ✦
                </span>

              </div>


            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* =====================================================
          MODAL DEL PERSONAJE
      ===================================================== */}

      <AnimatePresence>

        {personajeActual && (

          <motion.div

            className="personaje-modal-overlay"

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            exit={{
              opacity: 0
            }}

            onClick={cerrarPersonaje}

          >


            <motion.div

              className="personaje-modal"

              initial={{
                opacity: 0,
                scale: 0.75,
                rotateZ: -2,
                y: 40
              }}

              animate={{
                opacity: 1,
                scale: 1,
                rotateZ: 0,
                y: 0
              }}

              exit={{
                opacity: 0,
                scale: 0.75,
                rotateZ: 2,
                y: 40
              }}

              transition={{
                type: "spring",
                stiffness: 260,
                damping: 21
              }}

              onClick={(event) =>
                event.stopPropagation()
              }

            >


              {/* =================================================
                  CERRAR
              ================================================= */}

              <motion.button

                className="personaje-modal-cerrar"

                onClick={cerrarPersonaje}

                whileHover={{
                  rotate: 90,
                  scale: 1.1
                }}

                whileTap={{
                  scale: 0.9
                }}

                aria-label={textos.datos.cerrar}

              >

                ×

              </motion.button>


              {/* =================================================
                  IMAGEN
              ================================================= */}

              <div className="personaje-modal-imagen-contenedor">

                <div className="modal-halo" />

                <img

                  src={personajeActual.imagen}

                  alt={personajeActual.nombre}

                  className="personaje-modal-imagen"

                />

              </div>


              {/* =================================================
                  INFORMACIÓN
              ================================================= */}

              <div className="personaje-modal-info">


                {/* ETIQUETA */}

                <span className="personaje-modal-etiqueta">

                  {personajeActual.etiqueta}

                </span>


                {/* NOMBRE */}

                <h2>

                  {personajeActual.nombre}

                </h2>


                {/* PERSONALIDAD */}

                <div className="personaje-subtitulo">

                  {personajeActual.personalidad}

                </div>


                {/* DESCRIPCIÓN */}

                <p>

                  {personajeActual.descripcion}

                </p>


                {/* =================================================
                    DATOS
                ================================================= */}

                <div className="personaje-datos">


                  {/* ESPECIE */}

                  <div className="dato">

                    <div>

                      <small>

                        {textos.datos.especie}

                      </small>

                      <strong>

                        {personajeActual.especie}

                      </strong>

                    </div>

                  </div>


                  {/* EDAD */}

                  <div className="dato">

                    <div>

                      <small>

                        {textos.datos.edad}

                      </small>

                      <strong>

                        {personajeActual.edad}

                      </strong>

                    </div>

                  </div>


                  {/* ROL */}

                  <div className="dato">

                    <div>

                      <small>

                        {textos.datos.rol}

                      </small>

                      <strong>

                        {personajeActual.rol}

                      </strong>

                    </div>

                  </div>


                </div>


                {/* =================================================
                    FRASE
                ================================================= */}

                <div className="personaje-frase">

                  <span className="frase-comilla">

                    “

                  </span>

                  <p>

                    {personajeActual.frase}

                  </p>

                </div>


                {/* =================================================
                    DETALLE
                ================================================= */}

                <div className="personaje-modal-detalle">

                  <span>

                    ✦

                  </span>

                  {personajeActual.detalle}

                </div>


              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


    </>

  );

};


export default LibroPersonajes;