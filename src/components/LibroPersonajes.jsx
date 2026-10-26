
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "../stylesheets/LibroPersonajes.css";

const personajes = [
  {
    id: "srFox",
    nombre: "Sr. Fox",
    imagen: "/H.png",
    especie: "Zorro",
    edad: "Adulto",
    rol: "Protagonista",
    etiqueta: "PERSONAJE PRINCIPAL",
    personalidad: "Astuto · Audaz · Elegante",
    descripcion:
      "Un zorro brillante, carismático y estratega. Siempre tiene un plan, incluso cuando todo parece salir mal. Su ingenio lo convierte en un adversario difícil de vencer.",
    frase: "Nunca subestimes a un zorro con un buen plan.",
    detalle: "El héroe de una aventura llena de ingenio y peligros.",
    principal: true,
  },
  {
    id: "sraFox",
    nombre: "Sra. Fox",
    imagen: "/personajes/sra-fox.png",
    especie: "Zorra",
    edad: "Adulta",
    rol: "Madre y compañera",
    etiqueta: "FAMILIA FOX",
    personalidad: "Inteligente · Cariñosa · Valiente",
    descripcion:
      "Una zorra de gran carácter que protege a su familia con determinación. Es sensata, afectuosa y capaz de mantener la calma cuando las aventuras de su esposo ponen a todos en peligro.",
    frase: "La familia siempre encuentra la manera de salir adelante.",
    detalle: "El corazón y la fortaleza de la familia Fox.",
  },
  {
    id: "kristofferson",
    nombre: "Kristofferson",
    imagen: "/personajes/kristofferson.png",
    especie: "Zorro",
    edad: "Joven",
    rol: "Primo de Ash",
    etiqueta: "NUEVO PERSONAJE",
    personalidad: "Disciplinado · Tranquilo · Hábil",
    descripcion:
      "El primo de Ash destaca por su serenidad, su disciplina y sus habilidades físicas. Su talento natural despierta admiración y también cierta rivalidad familiar.",
    frase: "La verdadera fuerza también necesita paciencia.",
    detalle: "Un joven habilidoso que llega para cambiar la dinámica familiar.",
  },
  {
    id: "ash",
    nombre: "Ash",
    imagen: "/personajes/ash.png",
    especie: "Zorro",
    edad: "Joven",
    rol: "Hijo de los Fox",
    etiqueta: "FAMILIA FOX",
    personalidad: "Rebelde · Ingenioso · Determinado",
    descripcion:
      "Ash es un zorro inquieto, creativo y de personalidad intensa. Quiere demostrar que puede hacer grandes cosas por sí mismo, aunque a veces su orgullo lo lleve a meterse en problemas.",
    frase: "No necesito ser como los demás para ser extraordinario.",
    detalle: "Un joven que busca su propio lugar dentro de la familia.",
  },
  {
    id: "junior",
    nombre: "Junior",
    imagen: "/personajes/junior.png",
    especie: "Por definir",
    edad: "Por definir",
    rol: "Por descubrir",
    etiqueta: "PERSONAJE EN DESARROLLO",
    personalidad: "Su historia está por descubrirse",
    descripcion:
      "Este espacio está reservado para Junior. Aquí podrás incorporar su apariencia, personalidad, relación con los demás personajes y los acontecimientos que marcarán su historia.",
    frase: "Cada personaje tiene una historia que contar.",
    detalle: "Ficha preparada para completar con su diseño definitivo.",
  },
  {
    id: "bean",
    nombre: "Bean",
    imagen: "/Foto Bean-1024.jpg",
    especie: "Humano",
    edad: "Adulto",
    rol: "Granjero",
    etiqueta: "LOS GRANJEROS",
    personalidad: "Frío · Calculador · Obstinado",
    descripcion:
      "Bean es uno de los tres granjeros que quieren acabar con los planes del Sr. Fox. Astuto a su manera y obsesionado con proteger sus intereses, participa en una persecución que pone en peligro a toda la comunidad animal.",
    frase: "Un zorro nunca deja de causar problemas.",
    detalle: "Uno de los principales adversarios de la familia Fox.",
  },
  {
    id: "boggis",
    nombre: "Boggis",
    imagen: "/Foto Boggis-1024.jpg",
    especie: "Humano",
    edad: "Adulto",
    rol: "Granjero",
    etiqueta: "LOS GRANJEROS",
    personalidad: "Codicioso · Terco · Agresivo",
    descripcion:
      "Boggis es un granjero corpulento y obstinado que no tolera que nadie se aproveche de sus propiedades. Su enfrentamiento con el Sr. Fox lo convierte en una pieza clave de la historia.",
    frase: "¡Esta vez el zorro no se saldrá con la suya!",
    detalle: "Uno de los tres granjeros que persiguen al Sr. Fox.",
  },
  {
    id: "bunce",
    nombre: "Bunce",
    imagen: "/Foto Bunce-1024.jpg",
    especie: "Humano",
    edad: "Adulto",
    rol: "Granjero",
    etiqueta: "LOS GRANJEROS",
    personalidad: "Gruñón · Desconfiado · Persistente",
    descripcion:
      "Bunce es un granjero de carácter severo que se une a Bean y Boggis para perseguir al Sr. Fox. Su determinación y su mal humor alimentan el conflicto entre los granjeros y los animales.",
    frase: "¡No pienso dejar que ese zorro gane!",
    detalle: "El tercer integrante del grupo de granjeros.",
  },
  {
    id: "charles",
    nombre: "Charles",
    imagen: "/Foto Charles-1024.jpg",
    especie: "Zorro",
    edad: "Joven",
    rol: "Por confirmar",
    etiqueta: "RETRATO RECIBIDO",
    personalidad: "Curioso · Expresivo · Decidido",
    descripcion:
      "Este retrato muestra a un joven zorro de camiseta verde y una estrella amarilla. Puedes conservarlo como Charles o cambiar su nombre y ficha si la ilustración corresponde a Ash.",
    frase: "Cada aventura es una oportunidad para crecer.",
    detalle: "Retrato incorporado a partir de la imagen compartida.",
  },
];

const textos = {
  etiqueta: "ARCHIVOS DE LA HISTORIA",
  titulo: "Libro de personajes",
  subtitulo: "Descubre a quienes forman parte de Super Zorro",
  footer: "Adéntrate en la historia de cada personaje",
  cerrar: "Cerrar libro",
  abrirFicha: "Abrir ficha",
};

export default function LibroPersonajes() {
  const [libroAbierto, setLibroAbierto] = useState(false);
  const [personajeSeleccionado, setPersonajeSeleccionado] =
    useState(null);

  const personajeActual =
    personajes.find((p) => p.id === personajeSeleccionado) ?? null;

  const cerrarLibro = () => {
    setPersonajeSeleccionado(null);
    setLibroAbierto(false);
  };

  useEffect(() => {
    const manejarTecla = (event) => {
      if (event.key === "Escape") {
        if (personajeSeleccionado) {
          setPersonajeSeleccionado(null);
        } else {
          setLibroAbierto(false);
        }
      }
    };

    window.addEventListener("keydown", manejarTecla);
    return () => window.removeEventListener("keydown", manejarTecla);
  }, [personajeSeleccionado]);

  useEffect(() => {
    document.body.style.overflow =
      libroAbierto || personajeSeleccionado ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [libroAbierto, personajeSeleccionado]);

  return (
    <>
      <motion.button
        className="libro-personajes-boton"
        onClick={() => setLibroAbierto(true)}
        whileHover={{ scale: 1.08, rotate: -2, y: -3 }}
        whileTap={{ scale: 0.92 }}
        title={textos.titulo}
        aria-label={textos.titulo}
      >
        <span className="libro-icono">
          <img src="/L.png" alt="" />
        </span>
        <span className="libro-boton-brillo" />
      </motion.button>

      <AnimatePresence>
        {libroAbierto && (
          <motion.div
            className="libro-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cerrarLibro}
          >
            <div className="libro-particula libro-particula-1">✦</div>
            <div className="libro-particula libro-particula-2">✧</div>
            <div className="libro-particula libro-particula-3">✦</div>

            <motion.div
              className="libro-contenedor"
              initial={{
                opacity: 0,
                scale: 0.75,
                rotateY: -20,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: 30,
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 22,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="libro-cerrar"
                onClick={cerrarLibro}
                aria-label={textos.cerrar}
              >
                ×
              </button>

              <header className="libro-header">
                <div className="libro-header-icon">✦</div>
                <div>
                  <span className="libro-etiqueta">
                    {textos.etiqueta}
                  </span>
                  <h2>{textos.titulo}</h2>
                  <p>{textos.subtitulo}</p>
                </div>
              </header>

              <div className="libro-separador">
                <span>✦</span>
                <div />
                <span>✦</span>
              </div>

              <div className="personajes-grid">
                {personajes.map((personaje, index) => (
                  <motion.button
                    key={personaje.id}
                    className={`personaje-card ${
                      personaje.principal ? "personaje-principal" : ""
                    }`}
                    onClick={() =>
                      setPersonajeSeleccionado(personaje.id)
                    }
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: Math.min(index * 0.05, 0.35),
                      duration: 0.35,
                    }}
                    whileHover={{ scale: 1.035, y: -5 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="personaje-ribbon">
                      {personaje.etiqueta}
                    </div>

                    <div className="personaje-imagen-contenedor">
                      <div className="personaje-halo" />
                      <img
                        src={personaje.imagen}
                        alt={personaje.nombre}
                        className="personaje-imagen"
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.visibility = "hidden";
                          event.currentTarget.parentElement.classList.add(
                            "personaje-sin-imagen"
                          );
                        }}
                      />
                      <span className="personaje-placeholder">
                        ✦
                      </span>
                    </div>

                    <div className="personaje-card-info">
                      <div className="personaje-card-especie">
                        {personaje.especie}
                      </div>
                      <div className="personaje-nombre">
                        {personaje.nombre}
                      </div>
                      <div className="personaje-ver">
                        {textos.abrirFicha}
                        <span>→</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <footer className="libro-footer">
                <span>✦</span>
                {textos.footer}
                <span>✦</span>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {personajeActual && (
          <motion.div
            className="personaje-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPersonajeSeleccionado(null)}
          >
            <motion.div
              className="personaje-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="personaje-modal-titulo"
              initial={{ opacity: 0, scale: 0.8, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 25 }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 22,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="personaje-modal-cerrar"
                onClick={() => setPersonajeSeleccionado(null)}
                aria-label="Cerrar ficha"
              >
                ×
              </button>

              <div className="personaje-modal-imagen-contenedor">
                <div className="modal-halo" />
                <img
                  src={personajeActual.imagen}
                  alt={personajeActual.nombre}
                  className="personaje-modal-imagen"
                />
              </div>

              <div className="personaje-modal-info">
                <span className="personaje-modal-etiqueta">
                  {personajeActual.etiqueta}
                </span>

                <h2 id="personaje-modal-titulo">
                  {personajeActual.nombre}
                </h2>

                <div className="personaje-subtitulo">
                  {personajeActual.personalidad}
                </div>

                <p>{personajeActual.descripcion}</p>

                <div className="personaje-datos">
                  <div className="dato">
                    <small>ESPECIE</small>
                    <strong>{personajeActual.especie}</strong>
                  </div>
                  <div className="dato">
                    <small>EDAD</small>
                    <strong>{personajeActual.edad}</strong>
                  </div>
                  <div className="dato">
                    <small>ROL</small>
                    <strong>{personajeActual.rol}</strong>
                  </div>
                </div>

                <div className="personaje-frase">
                  <span className="frase-comilla">“</span>
                  <p>{personajeActual.frase}</p>
                </div>

                <div className="personaje-modal-detalle">
                  <span>✦</span>
                  {personajeActual.detalle}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
