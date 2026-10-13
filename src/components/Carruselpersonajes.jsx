import { useRef, useState, useEffect, useCallback } from "react";
import "../stylesheets/PersonajesCarrusel.css";

/*
  Carrusel de personajes.
  - personajes: arreglo con { nombre, imagen, tarjeta?, ... }
  - onSeleccionar(personaje): se llama al hacer clic en una tarjeta
    (abre tu ventana modal existente).
*/

const PersonajesCarrusel = ({ personajes, onSeleccionar }) => {
  const pistaRef = useRef(null);
  const [activo, setActivo] = useState(0);

  /* Detecta qué tarjeta está más cerca del centro de la pista */
  const actualizarActivo = useCallback(() => {
    const pista = pistaRef.current;
    if (!pista) return;

    const centro = pista.scrollLeft + pista.clientWidth / 2;
    let masCercano = 0;
    let menorDistancia = Infinity;

    Array.from(pista.children).forEach((hijo, i) => {
      const centroHijo = hijo.offsetLeft + hijo.offsetWidth / 2;
      const distancia = Math.abs(centroHijo - centro);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        masCercano = i;
      }
    });

    setActivo(masCercano);
  }, []);

  useEffect(() => {
    const pista = pistaRef.current;
    if (!pista) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(actualizarActivo);
    };

    pista.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    actualizarActivo();

    return () => {
      cancelAnimationFrame(raf);
      pista.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [actualizarActivo]);

  const irA = (i) => {
    const pista = pistaRef.current;
    const destino = pista?.children[i];
    if (!destino) return;

    pista.scrollTo({
      left: destino.offsetLeft - (pista.clientWidth - destino.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  const siguiente = () => irA((activo + 1) % personajes.length);
  const anterior = () =>
    irA((activo - 1 + personajes.length) % personajes.length);

  const onKeyDownPista = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      siguiente();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      anterior();
    }
  };

  return (
    <div
      className="pc"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Personajes"
    >
      <button
        type="button"
        className="pc-flecha pc-flecha--izq"
        onClick={anterior}
        aria-label="Personaje anterior"
      >
        ‹
      </button>

      <div
        className="pc-pista"
        ref={pistaRef}
        tabIndex={0}
        onKeyDown={onKeyDownPista}
      >
        {personajes.map((p, i) => (
          <div
            key={p.nombre + i}
            className={`pc-slide ${i === activo ? "pc-slide--activo" : ""}`}
          >
            <button
              type="button"
              className="pc-tarjeta"
              onClick={() => onSeleccionar(p)}
              aria-label={`Ver información de ${p.nombre}`}
            >
              <img
                src={p.tarjeta || p.imagen}
                alt={p.nombre}
                className="pc-img"
                loading="lazy"
                draggable="false"
              />
              <span className="pc-nombre">{p.nombre}</span>
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="pc-flecha pc-flecha--der"
        onClick={siguiente}
        aria-label="Personaje siguiente"
      >
        ›
      </button>

      <div className="pc-puntos" role="tablist" aria-label="Elegir personaje">
        {personajes.map((p, i) => (
          <button
            key={p.nombre + i}
            type="button"
            role="tab"
            aria-selected={i === activo}
            aria-label={p.nombre}
            className={`pc-punto ${i === activo ? "pc-punto--activo" : ""}`}
            onClick={() => irA(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonajesCarrusel;