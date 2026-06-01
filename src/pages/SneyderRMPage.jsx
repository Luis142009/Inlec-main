import React, { useRef, useState } from "react";
import "../stylesheets/Textos.css";
import { motion } from "motion/react";

function BotonWarning() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      layoutDependency={expanded}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: expanded ? "#ffc107" : "#fff3cd",
        border: "1px solid #ffc107",
        borderRadius: 20,
        cursor: "pointer",
        width: expanded ? 300 : 150,
        height: expanded ? 100 : 50,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onClick={() => setExpanded(!expanded)}
    >
      <motion.button
        layout
        layoutDependency={expanded}
        layoutAnchor={{ x: 0.5, y: 0.5 }}
        type="button"
        className="btn btn-warning"
        style={{
          width: expanded ? 200 : 100,
          fontSize: expanded ? 18 : 14,
          pointerEvents: "none",
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          delay: 0.2,
        }}
      >
        Warning
      </motion.button>
    </motion.div>
  );
}

const fadeSlide = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.15 },
  }),
};

function CapituloContenido({ titulo, capitulo, texto }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 text-center">
          <motion.h1
            className="titulo"
            variants={fadeSlide}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            {titulo}
          </motion.h1>
        </div>

        <div className="col-12 mt-5">
          <motion.h3
            className="titulo"
            variants={fadeSlide}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {capitulo}
          </motion.h3>
        </div>

        <div className="col-12 mt-3">
          <motion.p
            variants={fadeSlide}
            initial="hidden"
            animate="visible"
            custom={2}
            dangerouslySetInnerHTML={{ __html: texto }}
          />
        </div>

        <motion.div
          className="col-12 text-center"
          style={{ marginTop: "2rem", marginBottom: "5rem" }}
          variants={fadeSlide}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <BotonWarning />
        </motion.div>
      </div>
    </div>
  );
}

const capitulos = [
  {
    titulo: "EL SUPER ZORRO",
    capitulo: "CAPITULO #1",
    texto:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />Nullam auctor, nisl eget ultricies aliquet.",
  },
  {
    titulo: "EL SUPER PIDAÑA",
    capitulo: "CAPITULO #2",
    texto:
      "El zorro descubrió una cueva misteriosa en lo más profundo del bosque.",
  },
  {
    titulo: "EL SUPER ZORRO",
    capitulo: "CAPITULO #3",
    texto:
      "Una alianza inesperada surgió cuando el águila real se unió al zorro.",
  },
  {
    titulo: "EL SUPER ZORRO",
    capitulo: "CAPITULO #4",
    texto:
      "El gran cazador llegó al bosque con redes y trampas de acero.",
  },
  {
    titulo: "EL SUPER ZORRO",
    capitulo: "CAPITULO #5",
    texto:
      "Al amanecer del último día, el zorro se enfrentó a su destino.",
  },
];

export const SneyderRMPage = () => {
  const videoRef = useRef(null);

  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [detener, setDetener] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // ▶ Play
  const handlePlay = () => {
    setDetener(false);
    setMostrarMensaje(false);
    videoRef.current.play();
    setIsPlaying(true);
  };

  // ⏸ Pause
  const handlePause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  // ⏩ Avanzar a segundo 6
  const handleAvanzar = () => {
    setDetener(false);
    setMostrarMensaje(false);
    videoRef.current.currentTime = 6;
    videoRef.current.play();
    setIsPlaying(true);
  };

  // ▶ Continuar desde donde se pausó en segundo 5
  const handleContinuar = () => {
    setMostrarMensaje(false);
    videoRef.current.play();
    setIsPlaying(true);
  };

  // Detecta cuando llega al segundo 5
  const handleUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime >= 5 && !detener) {
      video.pause();
      setIsPlaying(false);
      setMostrarMensaje(true);
      setDetener(true);
    }
  };

  // Sincroniza isPlaying si el video se pausa/reanuda por otros medios
  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);

  return (
    <>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {/* VIDEO DE FONDO */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onTimeUpdate={handleUpdate}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -2,
          }}
        >
          <source src="/animacion1.mp4" type="video/mp4" />
        </video>

        {/* MENSAJE AL LLEGAR AL SEGUNDO 5 */}
        {mostrarMensaje && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              background: "#ffc107",
              padding: "15px",
              borderRadius: "10px",
              zIndex: 999,
              fontWeight: "bold",
            }}
          >
            🎬 Video detenido en el segundo 5
          </div>
        )}

        {/* BOTONES DEL VIDEO */}
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 999,
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            className="btn btn-success"
            onClick={handlePlay}
            disabled={isPlaying}
          >
            ▶ Play
          </button>

          <button
            className="btn btn-danger"
            onClick={handlePause}
            disabled={!isPlaying}
          >
            ⏸ Pause
          </button>

          <button className="btn btn-primary" onClick={handleAvanzar}>
            ⏩ Avanzar a 6s
          </button>

          <button
            className="btn btn-warning"
            onClick={handleContinuar}
            disabled={isPlaying}
          >
            ▶ Continuar
          </button>
        </div>

        {/* OVERLAY */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        />

        {/* CARRUSEL */}
        <div
          id="carouselCapitulos"
          className="carousel slide"
          data-bs-ride="false"
          style={{
            minHeight: "100vh",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="carousel-indicators" style={{ marginBottom: "1rem" }}>
            {capitulos.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#carouselCapitulos"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-current={i === 0 ? "true" : undefined}
                aria-label={`Capítulo ${i + 1}`}
              />
            ))}
          </div>

          <div className="carousel-inner">
            {capitulos.map((cap, i) => (
              <div
                key={i}
                className={`carousel-item${i === 0 ? " active" : ""}`}
              >
                <CapituloContenido
                  titulo={cap.titulo}
                  capitulo={cap.capitulo}
                  texto={cap.texto}
                />
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselCapitulos"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Anterior</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselCapitulos"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>
    </>
  );
};

