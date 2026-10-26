import { useCallback, useEffect, useRef, useState } from "react";
import LottieModule from "lottie-react";

const Lottie = LottieModule.default ?? LottieModule;

/* =========================================================
   DATOS
   ========================================================= */

const creadores = [
  {
    nombre: "Matheo",
    rol: "Ilustración y creatividad",
    archivo: "/Matheo.json",
    frase: "Las ideas toman forma.",
    posicion: "derecha",
    detalle: "Aporta imaginación, ilustración y nuevas formas de contar ideas.",
  },
  {
    nombre: "Luis",
    rol: "Diseño y desarrollo",
    archivo: "/Luis.json",
    frase: "Crear también es explorar.",
    posicion: "centro",
    detalle: "Transforma las ideas en experiencias visuales y digitales.",
  },
  {
    nombre: "Sneyder",
    rol: "Producción multimedia",
    archivo: "/Sneyder.json",
    frase: "Imagina algo diferente.",
    posicion: "izquierda",
    detalle: "Une recursos multimedia para darle vida al proyecto.",
  },
];

const porNombre = Object.fromEntries(creadores.map((c) => [c.nombre, c]));

/* orden en la escena: izquierda → derecha */
const ORDEN = ["Sneyder", "Luis", "Matheo"];

const CLASE_POSICION = { izquierda: "izq", centro: "centro", derecha: "der" };

/* =========================================================
   AYUDAS
   ========================================================= */

function barajar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function nuevoJuego() {
  return {
    orden: barajar(creadores.map((c) => c.nombre)),
    ronda: 0,
    puntos: 0,
    respuesta: null,
    fin: false,
  };
}

/* libros de los estantes (valores fijos, siempre salen igual) */
const PALETA = ["#e89255", "#934e24", "#ebbb59", "#7e8b5a", "#719ca4", "#c8922a", "#a52a24", "#fdf6e3"];

function fabricarLibros(semilla, cantidad) {
  let s = semilla;
  const azar = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: cantidad }, (_, id) => ({
    id,
    color: PALETA[Math.floor(azar() * PALETA.length)],
    w: +(1.3 + azar() * 1.2).toFixed(2),
    h: +(5.6 + azar() * 2.4).toFixed(2),
    inc: +((azar() - 0.5) * (id % 6 === 0 ? 12 : 2)).toFixed(2),
  }));
}

const ESTANTES = [fabricarLibros(7, 36), fabricarLibros(23, 36)];

/* =========================================================
   COMPONENTE
   ========================================================= */

export default function Creadores() {
  const [animaciones, setAnimaciones] = useState({});
  const [errores, setErrores] = useState({});
  const [seleccionado, setSeleccionado] = useState(null);
  const [hover, setHover] = useState(null);
  const [salta, setSalta] = useState(null);
  const [destacado, setDestacado] = useState(null);
  const [chispas, setChispas] = useState([]);
  const [librosFuera, setLibrosFuera] = useState({});
  const [juego, setJuego] = useState(nuevoJuego);

  const escenarioRef = useRef(null);
  const figuraRefs = useRef({});
  const lottieRefs = useRef({});
  const idChispa = useRef(0);
  const montado = useRef(true);

  const refLottie = (nombre) => {
    if (!lottieRefs.current[nombre]) lottieRefs.current[nombre] = { current: null };
    return lottieRefs.current[nombre];
  };

  /* ---------- cargar animaciones ---------- */
  useEffect(() => {
    let activo = true;
    creadores.forEach(async (creador) => {
      try {
        const respuesta = await fetch(creador.archivo);
        if (!respuesta.ok) throw new Error(`No se encontró ${creador.archivo}`);
        const datos = await respuesta.json();
        if (activo) setAnimaciones((prev) => ({ ...prev, [creador.nombre]: datos }));
      } catch (error) {
        if (activo) setErrores((prev) => ({ ...prev, [creador.nombre]: true }));
        console.error(`Error cargando ${creador.nombre}:`, error);
      }
    });
    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    montado.current = true;
    return () => {
      montado.current = false;
    };
  }, []);

  /* ---------- el personaje se anima más rápido cuando le prestas atención ---------- */
  useEffect(() => {
    ORDEN.forEach((nombre) => {
      const anim = lottieRefs.current[nombre]?.current;
      try {
        anim?.setSpeed(hover === nombre || seleccionado === nombre || destacado === nombre ? 1.8 : 1);
      } catch {
        /* la animación aún no está lista */
      }
    });
  }, [hover, seleccionado, destacado, animaciones]);

  /* ---------- chispas ---------- */
  const lanzarChispas = useCallback((nombre) => {
    const escenario = escenarioRef.current;
    const figura = figuraRefs.current[nombre];
    if (!escenario || !figura) return;

    const e = escenario.getBoundingClientRect();
    const f = figura.getBoundingClientRect();
    const x = f.left - e.left + f.width / 2;
    const y = f.top - e.top + f.height * 0.35;

    const simbolos = ["✦", "★", "✿", "✦"];
    const colores = ["#ebbb59", "#e89255", "#fdf6e3", "#a52a24", "#7e8b5a"];

    const nuevas = Array.from({ length: 12 }, (_, i) => {
      const angulo = (Math.PI * 2 * i) / 12 + Math.random() * 0.4;
      const distancia = 70 + Math.random() * 80;
      return {
        id: ++idChispa.current,
        x,
        y,
        dx: Math.cos(angulo) * distancia,
        dy: Math.sin(angulo) * distancia - 30,
        rot: (Math.random() - 0.5) * 360,
        s: 14 + Math.random() * 16,
        c: colores[i % colores.length],
        t: simbolos[i % simbolos.length],
      };
    });

    setChispas((prev) => [...prev, ...nuevas]);
    setTimeout(() => {
      if (montado.current) setChispas((prev) => prev.filter((p) => !nuevas.some((n) => n.id === p.id)));
    }, 1100);
  }, []);

  /* ---------- seleccionar creadores ---------- */
  const elegir = (nombre) => {
    setSeleccionado(nombre);
    setSalta(nombre);
    lanzarChispas(nombre);
    setTimeout(() => {
      if (montado.current) setSalta((s) => (s === nombre ? null : s));
    }, 700);
  };

  const alternar = (nombre) => (seleccionado === nombre ? setSeleccionado(null) : elegir(nombre));

  const mover = (paso) => {
    const i = ORDEN.indexOf(seleccionado);
    const siguiente = ORDEN[(i + paso + ORDEN.length) % ORDEN.length];
    elegir(siguiente);
  };

  /* ---------- teclado ---------- */
  const alTeclado = (e) => {
    if (e.key === "Escape") setSeleccionado(null);
    if (seleccionado && e.key === "ArrowRight") mover(1);
    if (seleccionado && e.key === "ArrowLeft") mover(-1);
  };

  /* ---------- parallax con el mouse (pared de libros) ---------- */
  const alMover = (e) => {
    const el = escenarioRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    el.style.setProperty("--my", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  };

  const alSalir = () => {
    const el = escenarioRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  };

  /* ---------- juego: ¿quién lo dijo? ---------- */
  const autorRonda = juego.orden[juego.ronda];
  const fraseRonda = porNombre[autorRonda]?.frase;

  const responder = (nombre) => {
    if (juego.respuesta || juego.fin) return;
    const ok = nombre === autorRonda;
    setJuego((j) => ({ ...j, respuesta: { nombre, ok }, puntos: j.puntos + (ok ? 1 : 0) }));
    setDestacado(autorRonda);
    if (ok) lanzarChispas(autorRonda);
    setTimeout(() => {
      if (montado.current) setDestacado(null);
    }, 1800);
  };

  const siguienteRonda = () =>
    setJuego((j) =>
      j.ronda + 1 >= j.orden.length ? { ...j, fin: true, respuesta: null } : { ...j, ronda: j.ronda + 1, respuesta: null }
    );

  const mensajeFinal =
    juego.puntos === juego.orden.length
      ? "¡Perfecto! Los conoces muy bien."
      : juego.puntos >= 2
      ? "¡Muy bien! Casi un experto."
      : "¡Sigue conociéndolos!";

  const actual = seleccionado ? porNombre[seleccionado] : null;

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <section className="cx-seccion" id="creadores" onKeyDown={alTeclado}>
      <style>{`
        .cx-seccion {
          --mx: 0;
          --my: 0;
          --cafe: #934e24;
          --cafe-os: #6b3a16;
          --curita: #f7a04e;
          --crema: #fdf6e3;
          --curita-img:
            radial-gradient(circle, rgba(222, 120, 40, 0.7) 0.18em, transparent 0.22em),
            radial-gradient(circle, rgba(222, 120, 40, 0.7) 0.18em, transparent 0.22em);

          position: relative;
          isolation: isolate;
          overflow: hidden;
          width: 100%;
          /* sin fondo propio: se ve la hoja cuadriculada de atrás */
          background: transparent;
          color: var(--cafe);
          font-family: 'redonda', sans-serif;
        }
        .cx-seccion * { box-sizing: border-box; }
        .cx-seccion h2,
        .cx-seccion h3 { margin: 0; }

        /* ===== estilo de títulos (igual que "Nuestro proyecto") ===== */
        .cx-seccion h2,
        .cx-seccion h3,
        .cx-cartel,
        .cx-btn {
          font-family: 'pepe', sans-serif;
          font-weight: 700;
          color: #eee9e6;
          -webkit-text-stroke: 0.25em #934e24;
          paint-order: stroke fill;
          text-shadow: none;
        }

        /* =====================================================
           ESCENARIO
           ===================================================== */
        .cx-escenario {
          position: relative;
          height: clamp(560px, 60vw, 820px);
          overflow: hidden;
        }

        /* ----- estantes (sin pared: la hoja queda a la vista) ----- */
        .cx-pared {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.6vw, 42px);
          padding-top: clamp(130px, 16vw, 210px);
          background: transparent;
          translate: calc(var(--mx) * -10px) 0;
          transition: translate 0.3s ease-out;
        }
        .cx-libros {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          font-size: clamp(9px, 1.05vw, 16px);
          height: 8.3em;
        }
        .cx-libro {
          position: relative;
          flex: none;
          width: calc(var(--w) * 1em);
          height: calc(var(--h) * 1em);
          background: var(--c);
          border-radius: 2px 2px 0 0;
          cursor: pointer;
          transform-origin: 50% 100%;
          transform: rotate(var(--inc));
          transition: transform 0.25s cubic-bezier(0.3, 1.5, 0.5, 1);
          box-shadow: inset -0.2em 0 0 rgba(0, 0, 0, 0.14), inset 0.12em 0 0 rgba(255, 255, 255, 0.22);
        }
        .cx-libro i {
          position: absolute;
          left: 0; right: 0; top: 16%;
          height: 0.3em;
          background: rgba(255, 255, 255, 0.5);
        }
        .cx-libro::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: 16%;
          height: 0.2em;
          background: rgba(0, 0, 0, 0.2);
        }
        .cx-libro:hover { transform: translateY(-0.9em) rotate(var(--inc)); }
        .cx-libro.cx-fuera { transform: translateY(-1.8em) rotate(var(--inc)); }
        .cx-tabla {
          position: relative;
          z-index: 1;
          height: clamp(9px, 1.2vw, 16px);
          background-color: #934e24;
          background-image: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.09) 0 2px, transparent 2px 38px);
          border-top: 3px solid #b0652c;
          box-shadow: 0 6px 0 rgba(43, 26, 14, 0.18);
        }

        /* ----- letrero colgante ----- */
        .cx-letrero-wrap {
          --cad: clamp(34px, 5vw, 64px);
          position: absolute;
          top: 0;
          left: 50%;
          translate: -50% 0;
          z-index: 6;
          transform-origin: 50% 0;
          animation: cx-columpio 5s ease-in-out infinite alternate;
        }
        .cx-letrero-wrap:hover { animation-duration: 1.6s; }
        .cx-seccion .cx-letrero {
          position: relative;
          margin-top: var(--cad);
          padding: 0.1em clamp(18px, 3vw, 44px) 0.18em;
          font-size: clamp(1.7rem, 4.6vw, 3.4rem);
          text-align: center;
          white-space: nowrap;
          background-color: var(--curita);
          background-image:
            radial-gradient(circle, rgba(222, 120, 40, 0.7) 3.5px, transparent 4.2px),
            radial-gradient(circle, rgba(222, 120, 40, 0.7) 3.5px, transparent 4.2px);
          background-size: 30px 30px, 30px 30px;
          background-position: 0 0, 15px 15px;
          border-radius: 14px;
          box-shadow: 0 6px 0 rgba(165, 42, 36, 0.35);
        }
        .cx-letrero::before,
        .cx-letrero::after {
          content: "";
          position: absolute;
          top: calc(-1 * var(--cad) - 4px);
          width: 5px;
          height: var(--cad);
          background: repeating-linear-gradient(180deg, #4a2410 0 8px, #7a3f17 8px 12px);
        }
        .cx-letrero::before { left: 16%; }
        .cx-letrero::after { right: 16%; }
        @keyframes cx-columpio { from { rotate: -1.4deg; } to { rotate: 1.4deg; } }

        /* ----- personajes ----- */
        .cx-escena {
          position: absolute;
          left: 0; right: 0;
          bottom: clamp(16px, 2.5vw, 36px);
          z-index: 4;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          padding: 0 12px;
          pointer-events: none;
        }
        .cx-figura {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: auto;
          cursor: pointer;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          transition: transform 0.35s cubic-bezier(0.3, 1.6, 0.5, 1), filter 0.3s ease, opacity 0.3s ease;
        }
        .cx-figura + .cx-figura { margin-left: clamp(-90px, -5vw, -10px); }
        .cx-figura:hover,
        .cx-figura:focus-visible,
        .cx-figura.cx-activa { transform: translateY(-10px) scale(1.04); z-index: 7; }
        .cx-escena.cx-hay-seleccion .cx-figura:not(.cx-activa) { opacity: 0.8; filter: saturate(0.75); }
        .cx-figura.cx-salta { animation: cx-salto 0.7s cubic-bezier(0.3, 1.6, 0.5, 1); }
        .cx-figura.cx-destacada { transform: translateY(-14px) scale(1.07); z-index: 7; }
        @keyframes cx-salto {
          0% { translate: 0 0; }
          35% { translate: 0 -34px; }
          60% { translate: 0 0; }
          78% { translate: 0 -12px; }
          100% { translate: 0 0; }
        }

        .cx-lienzo {
          position: relative;
          width: clamp(105px, 22vw, 340px);
          aspect-ratio: 4 / 5;
        }
        .cx-figura--centro .cx-lienzo { width: clamp(120px, 26vw, 420px); }
        .cx-lottie { position: relative; z-index: 1; width: 100%; height: 100%; }
        .cx-sombra {
          position: absolute;
          left: 20%; right: 20%; bottom: 1%;
          height: 4%;
          border-radius: 50%;
          background: rgba(43, 26, 14, 0.3);
          filter: blur(5px);
        }
        .cx-fallback {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 34px;
          color: var(--cafe);
        }

        /* burbuja de la frase */
        .cx-burbuja {
          position: absolute;
          left: 50%;
          top: 8%;
          z-index: 8;
          translate: -50% -100%;
          scale: 0.6;
          opacity: 0;
          transform-origin: 50% 100%;
          pointer-events: none;
          transition: scale 0.3s cubic-bezier(0.3, 1.8, 0.5, 1), opacity 0.2s ease;
        }
        .cx-burbuja div {
          position: relative;
          width: max-content;
          max-width: clamp(120px, 16vw, 210px);
          padding: 8px 14px;
          background: #fff;
          border: 3px solid var(--cafe);
          border-radius: 16px;
          box-shadow: 0 4px 0 var(--cafe-os);
          text-align: center;
          font-size: clamp(0.78rem, 1.5vw, 1.2rem);
          line-height: 1.25;
          color: #2b1a0e;
        }
        .cx-burbuja div::after {
          content: "";
          position: absolute;
          left: 50%; bottom: -14px;
          translate: -50% 0;
          border-left: 9px solid transparent;
          border-right: 9px solid transparent;
          border-top: 12px solid var(--cafe);
        }
        .cx-burbuja div::before {
          content: "";
          position: absolute;
          left: 50%; bottom: -9px;
          translate: -50% 0;
          z-index: 1;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 10px solid #fff;
        }
        .cx-figura:hover .cx-burbuja,
        .cx-figura:focus-visible .cx-burbuja,
        .cx-figura.cx-activa .cx-burbuja,
        .cx-figura.cx-destacada .cx-burbuja { scale: 1; opacity: 1; }

        /* cartel con el nombre */
        .cx-cartel {
          position: relative;
          z-index: 2;
          margin-top: clamp(-26px, -2vw, -10px);
          padding: 0.1em 0.9em 0.2em;
          font-size: clamp(0.95rem, 2.2vw, 1.7rem);
          background-color: var(--curita);
          background-image:
            radial-gradient(circle, rgba(222, 120, 40, 0.7) 2px, transparent 2.6px),
            radial-gradient(circle, rgba(222, 120, 40, 0.7) 2px, transparent 2.6px);
          background-size: 18px 18px, 18px 18px;
          background-position: 0 0, 9px 9px;
          border-radius: 12px;
          box-shadow: 0 4px 0 rgba(165, 42, 36, 0.35);
          transition: rotate 0.25s ease;
        }
        .cx-figura--izq .cx-cartel { rotate: -2deg; }
        .cx-figura--centro .cx-cartel { rotate: 1deg; }
        .cx-figura--der .cx-cartel { rotate: 2deg; }
        .cx-figura:hover .cx-cartel,
        .cx-figura.cx-activa .cx-cartel { rotate: 0deg; }
        .cx-figura:focus-visible .cx-cartel { outline: 3px dashed #ebbb59; outline-offset: 4px; }

        /* chispas */
        .cx-chispa {
          position: absolute;
          z-index: 9;
          left: calc(var(--x) * 1px);
          top: calc(var(--y) * 1px);
          font-size: calc(var(--s) * 1px);
          line-height: 1;
          color: var(--c);
          pointer-events: none;
          animation: cx-chispa 1s ease-out forwards;
        }
        @keyframes cx-chispa {
          from { opacity: 1; transform: translate(-50%, -50%) scale(0.4) rotate(0deg); }
          to { opacity: 0; transform: translate(calc(-50% + var(--dx) * 1px), calc(-50% + var(--dy) * 1px)) scale(1.2) rotate(var(--rot)); }
        }

        /* =====================================================
           PANEL (ficha + juego)
           ===================================================== */
        .cx-panel {
          position: relative;
          z-index: 5;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: clamp(16px, 2.4vw, 32px);
          padding: clamp(24px, 4vw, 48px) clamp(14px, 5vw, 64px) clamp(36px, 5vw, 64px);
          background: #f3ded0;
        }
        .cx-intro {
          grid-column: 1 / -1;
          margin: 0 auto;
          max-width: 640px;
          text-align: center;
          font-size: clamp(1.05rem, 2vw, 1.45rem);
          line-height: 1.6;
          color: var(--cafe);
        }
        .cx-card {
          position: relative;
          min-height: 280px;
          padding: clamp(20px, 3vw, 34px);
          background: #fff;
          border: 4px solid var(--cafe);
          border-radius: 28px;
          box-shadow: 0 8px 0 var(--cafe), 0 18px 34px rgba(0, 0, 0, 0.12);
          animation: cx-entra 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) both;
        }
        @keyframes cx-entra { from { opacity: 0; transform: translateY(24px) scale(0.96); } to { opacity: 1; transform: none; } }

        .cx-ficha-cab { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 16px; margin-bottom: 14px; }
        .cx-ficha h3 { font-size: clamp(2rem, 4vw, 3rem); }
        .cx-pildora {
          display: inline-block;
          padding: 4px 16px;
          font-size: clamp(0.9rem, 1.6vw, 1.1rem);
          font-weight: bold;
          color: var(--cafe);
          background: #ebbb59;
          border: 3px solid var(--cafe);
          border-radius: 999px;
        }
        .cx-detalle { margin: 0 0 16px; font-size: clamp(1.05rem, 1.9vw, 1.3rem); line-height: 1.7; color: var(--cafe); }
        .cx-cita {
          position: relative;
          margin: 0 0 20px;
          padding: 12px 18px;
          font-size: clamp(1.05rem, 1.9vw, 1.35rem);
          font-style: italic;
          color: var(--cafe);
          background: rgba(243, 222, 208, 0.7);
          border-left: 5px solid #e89255;
          border-radius: 0 16px 16px 0;
        }
        .cx-ficha-pie { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; }
        .cx-puntos { display: flex; gap: 8px; }
        .cx-punto {
          width: 14px; height: 14px;
          padding: 0;
          border: 2px solid var(--cafe);
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .cx-punto:hover { transform: scale(1.25); }
        .cx-punto.cx-on { background: var(--cafe); }

        .cx-vacio { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; height: 100%; min-height: 220px; text-align: center; }
        .cx-vacio h3 { font-size: clamp(1.8rem, 3.4vw, 2.6rem); }
        .cx-vacio p { margin: 0; max-width: 360px; font-size: clamp(1.05rem, 1.8vw, 1.25rem); line-height: 1.6; }
        .cx-flecha { font-size: 2rem; line-height: 1; animation: cx-rebota 1.2s ease-in-out infinite alternate; }
        @keyframes cx-rebota { from { translate: 0 0; } to { translate: 0 -12px; } }

        /* juego */
        .cx-juego h3 { font-size: clamp(1.6rem, 3vw, 2.2rem); margin-bottom: 10px; }
        .cx-marcador { display: flex; gap: 8px; margin-bottom: 14px; }
        .cx-marca {
          width: 26px; height: 26px;
          border: 3px solid var(--cafe);
          border-radius: 50%;
          background: transparent;
          transition: background 0.3s ease, scale 0.3s ease;
        }
        .cx-marca.cx-ok { background: #7e8b5a; scale: 1.1; }
        .cx-marca.cx-mal { background: #a52a24; }
        .cx-marca.cx-ahora { background: #ebbb59; }
        .cx-pregunta { margin: 0 0 16px; font-size: clamp(1.1rem, 2vw, 1.4rem); line-height: 1.5; }
        .cx-pregunta strong { display: block; margin-top: 6px; font-size: clamp(1.25rem, 2.3vw, 1.7rem); color: #2b1a0e; }
        .cx-opciones { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
        .cx-resultado { margin: 0 0 14px; min-height: 1.6em; font-size: clamp(1.05rem, 1.8vw, 1.3rem); font-weight: bold; }
        .cx-resultado.cx-bien { color: #5d6b3a; }
        .cx-resultado.cx-fallo { color: #a52a24; }

        /* botones tipo curita (título de botón = estilo de títulos) */
        .cx-btn {
          padding: 0.3em 0.9em 0.4em;
          font-size: clamp(1.05rem, 2vw, 1.4rem);
          letter-spacing: 1px;
          border: none;
          border-radius: 0.5em;
          background-color: var(--curita);
          background-image: var(--curita-img);
          background-size: 1.6em 1.6em, 1.6em 1.6em;
          background-position: 0 0, 0.8em 0.8em;
          box-shadow: 0 0.2em 0 rgba(165, 42, 36, 0.35);
          cursor: pointer;
          transition: transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease;
        }
        .cx-btn:hover:not(:disabled) { filter: brightness(1.06); transform: translateY(-2px); box-shadow: 0 6px 0 rgba(165, 42, 36, 0.35); }
        .cx-btn:active:not(:disabled) { transform: translateY(2px) scale(0.98); box-shadow: 0 1px 0 rgba(165, 42, 36, 0.35); }
        .cx-btn:disabled { opacity: 0.45; cursor: default; }
        .cx-btn:focus-visible,
        .cx-punto:focus-visible { outline: 3px dashed #ebbb59; outline-offset: 4px; }

        /* =====================================================
           RESPONSIVE
           ===================================================== */
        @media (max-width: 860px) {
          .cx-panel { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .cx-escenario { height: 520px; }
          .cx-estante:nth-child(2) { display: none; }
          .cx-lienzo,
          .cx-figura--centro .cx-lienzo { width: 31vw; }
          .cx-seccion .cx-letrero { -webkit-text-stroke-width: 0.2em; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cx-letrero-wrap,
          .cx-figura.cx-salta,
          .cx-chispa,
          .cx-flecha,
          .cx-card { animation: none !important; }
          .cx-figura,
          .cx-burbuja { transition: none; }
        }
      `}</style>

      {/* ===================== ESCENARIO ===================== */}
      <div className="cx-escenario" ref={escenarioRef} onMouseMove={alMover} onMouseLeave={alSalir}>
        {/* estantes con libros que se sacan al tocarlos */}
        <div className="cx-pared" aria-hidden="true">
          {ESTANTES.map((libros, e) => (
            <div className="cx-estante" key={e}>
              <div className="cx-libros">
                {libros.map((l) => {
                  const clave = `${e}-${l.id}`;
                  return (
                    <span
                      key={clave}
                      className={`cx-libro${librosFuera[clave] ? " cx-fuera" : ""}`}
                      style={{ "--c": l.color, "--w": l.w, "--h": l.h, "--inc": `${l.inc}deg` }}
                      onClick={() => setLibrosFuera((prev) => ({ ...prev, [clave]: !prev[clave] }))}
                    >
                      <i />
                    </span>
                  );
                })}
              </div>
              <div className="cx-tabla" />
            </div>
          ))}
        </div>

        {/* letrero colgante */}
        <div className="cx-letrero-wrap">
          <h2 className="cx-letrero">Nuestros creadores</h2>
        </div>

        {/* personajes */}
        <div className={`cx-escena${seleccionado ? " cx-hay-seleccion" : ""}`}>
          {ORDEN.map((nombre) => {
            const c = porNombre[nombre];
            const activa = seleccionado === nombre;
            const clases = [
              "cx-figura",
              `cx-figura--${CLASE_POSICION[c.posicion]}`,
              activa ? "cx-activa" : "",
              salta === nombre ? "cx-salta" : "",
              destacado === nombre ? "cx-destacada" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={nombre}
                ref={(el) => {
                  figuraRefs.current[nombre] = el;
                }}
                className={clases}
                role="button"
                tabIndex={0}
                aria-pressed={activa}
                aria-label={`${c.nombre}, ${c.rol}. Toca para conocerlo`}
                onClick={() => alternar(nombre)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    alternar(nombre);
                  }
                }}
                onMouseEnter={() => setHover(nombre)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(nombre)}
                onBlur={() => setHover(null)}
              >
                <div className="cx-burbuja" aria-hidden="true">
                  <div>{c.frase}</div>
                </div>

                <div className="cx-lienzo">
                  {animaciones[nombre] ? (
                    <Lottie
                      className="cx-lottie"
                      animationData={animaciones[nombre]}
                      lottieRef={refLottie(nombre)}
                      loop
                      autoplay
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <div className="cx-fallback" aria-label={errores[nombre] ? "No se pudo cargar la animación" : "Cargando animación"}>
                      {errores[nombre] ? "✎" : "✦"}
                    </div>
                  )}
                  <div className="cx-sombra" />
                </div>

                <span className="cx-cartel">{c.nombre}</span>
              </div>
            );
          })}
        </div>

        {/* chispas */}
        {chispas.map((p) => (
          <span
            key={p.id}
            className="cx-chispa"
            aria-hidden="true"
            style={{ "--x": p.x, "--y": p.y, "--dx": p.dx, "--dy": p.dy, "--rot": `${p.rot}deg`, "--s": p.s, "--c": p.c }}
          >
            {p.t}
          </span>
        ))}
      </div>

      {/* ===================== PANEL ===================== */}

    </section>
  );
}