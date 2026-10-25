import { useEffect, useState } from "react";
import LottieModule from "lottie-react";

const Lottie = LottieModule.default ?? LottieModule;

const creadores = [
  {
    nombre: "Matheo",
    rol: "Ilustración y creatividad",
    archivo: "/Matheo.json",
    color: "verde",
    frase: "Las ideas toman forma.",
    posicion: "derecha",
    detalle: "Aporta imaginación, ilustración y nuevas formas de contar ideas.",
  },
  {
    nombre: "Luis",
    rol: "Diseño y desarrollo",
    archivo: "/Luis.json",
    color: "naranja",
    frase: "Crear también es explorar.",
    posicion: "centro",
    detalle: "Transforma las ideas en experiencias visuales y digitales.",
  },
  {
    nombre: "Sneyder",
    rol: "Producción multimedia",
    archivo: "/Sneyder.json",
    color: "azul",
    frase: "Imagina algo diferente.",
    posicion: "izquierda",
    detalle: "Une recursos multimedia para darle vida al proyecto.",
  },
];

export default function Creadores() {
  const [animaciones, setAnimaciones] = useState({});
  const [errores, setErrores] = useState({});
  const [seleccionado, setSeleccionado] = useState(null);

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
    return () => { activo = false; };
  }, []);

  return (
    <section className="creadores-scene" id="creadores">
      <style>{`
        .creadores-scene {
          
          --tinta: #593a2a;
      
          --verde: #7e8b5a;
          --azul: #719ca4;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          width: calc(100% - 32px);
          max-width: 1680px;
          margin: 16px auto;
          padding: clamp(24px, 2.8vw, 38px) clamp(10px, 1.2vw, 18px) 22px;
          border-radius: 18px;
          color: var(--tinta);
        
          font-family: 'Trebuchet MS', Arial, sans-serif;
          box-shadow: none;
        }
        .creadores-scene * { box-sizing: border-box; }
        .cr-heading { position: relative; z-index: 4; text-align: center; margin: 0 auto 10px; }
        .cr-heading h2 { margin: 0; font-size: clamp(30px, 4vw, 44px); font-weight: 900; letter-spacing: -1.5px; }
        .cr-heading p { margin: 10px auto 0; max-width: 520px; color: #8a6b53; line-height: 1.65; font-size: 14px; }
        .cr-scene-art {
          position: relative;
          isolation: isolate;
          width: 100%;
          max-width: 1580px;
          height: clamp(650px, 67vw, 900px);
          margin: 4px auto 0;
          border-radius: 18px;
          background: #f3ded0;
        }
        .cr-blob {
          position: absolute;
          z-index: 0;
          pointer-events: none;
          inset: -2% -1%;
          opacity: 1;
          background: transparent url('/Circulos.svg') center / 100% 100% no-repeat;
        }
        .cr-blob-a, .cr-blob-b, .cr-blob-c { display: none; }
        .cr-background-objects { position: absolute; z-index: 1; left: 50%; top: 1%; height: 96%; width: auto; max-width: 53%; transform: translateX(-50%); object-fit: contain; object-position: center; pointer-events: none; }
        .cr-extra-shelf {
          position: absolute;
          z-index: 1;
          top: 12%;
          width: 24%;
          height: 16%;
          border: 3px solid #603b29;
          background: #c58a50;
          box-shadow: inset 0 0 0 7px #d9a36a;
          pointer-events: none;
        }
        .cr-extra-shelf::before {
          content: '';
          position: absolute;
          left: 4%; right: 4%; bottom: 12%;
          height: 68%;
          border: 2px solid #75472e;
          background:
            linear-gradient(90deg,
              #7c8b69 0 7%, transparent 7% 9%,
              #547a88 9% 18%, transparent 18% 20%,
              #d5a15e 20% 28%, transparent 28% 30%,
              #a6534b 30% 38%, transparent 38% 40%,
              #647c8d 40% 50%, transparent 50% 52%,
              #e1c28d 52% 61%, transparent 61% 63%,
              #8a684c 63% 72%, transparent 72% 74%,
              #6b8191 74% 84%, transparent 84% 86%,
              #b9674b 86% 95%, transparent 95%);
        }
        .cr-extra-shelf-left { left: 3%; }
        .cr-extra-shelf-right { right: 3%; }
        .cr-floor { display: none; }
        .cr-shelf { display: none; }
        
        .cr-bookshelf-books { display: none; }
        .cr-mini-book { flex: 1; border: 1px solid #65432f; border-left-width: 4px; border-radius: 2px 3px 0 0; }
        .cr-mini-book:nth-child(1) { background: #7b8c61; height: 83%; align-self: end; }
        .cr-mini-book:nth-child(2) { background: #bd7446; height: 100%; }
        .cr-mini-book:nth-child(3) { background: #e7c98f; height: 88%; align-self: end; }
        .cr-mini-book:nth-child(4) { background: #5f7e8a; height: 95%; }
        .cr-mini-book:nth-child(5) { background: #d9a15d; height: 82%; align-self: end; }
        .cr-mini-book:nth-child(6) { background: #7b8c61; height: 100%; }
        .cr-mini-book:nth-child(7) { background: #a75d43; height: 88%; align-self: end; }
        .cr-top-books { display: none; }
        .cr-top-books span { display: block; position: absolute; bottom: 0; width: 70px; height: 13px; border: 2px solid #6b432b; background: #c37b48; }
        .cr-top-books span:nth-child(2) { bottom: 12px; left: 10px; width: 57px; background: #e6bd7c; }
        .cr-plant { display: none; }
        .cr-plant .leaf { position: absolute; bottom: 65px; left: 40px; width: 35px; height: 83px; border: 2px solid #5c7045; background: #8a9a65; border-radius: 90% 0 90% 0; transform-origin: bottom center; }
        .cr-plant .leaf:nth-child(1) { transform: rotate(-36deg); left: 16px; bottom: 80px; }
        .cr-plant .leaf:nth-child(2) { transform: rotate(28deg); left: 47px; bottom: 88px; }
        .cr-plant .leaf:nth-child(3) { transform: rotate(-7deg); left: 33px; bottom: 103px; }
        .cr-plant .pot { position: absolute; bottom: 0; left: 15px; width: 68px; height: 75px; border: 2px solid #754335; background: #bd5e5a; clip-path: polygon(8% 0, 92% 0, 78% 100%, 22% 100%); }
        .cr-person { position: absolute; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; }
        .cr-person-left { left: 17%; bottom: 2%; width: 32%; height: 65%; }
        .cr-person-center { left: 34%; bottom: 2%; width: 33%; height: 88%; }
        .cr-person-right { right: 15%; bottom: 2%; width: 32%; height: 64%; }
        .cr-animation { width: 100%; height: 100%; display: flex; align-items: flex-end; justify-content: center; }
        .cr-animation > div { width: 100%; max-width: 100%; }
        .cr-animation svg { max-width: 100%; }
        .cr-fallback { width: 100%; height: 75%; display: flex; align-items: center; justify-content: center; color: #79583d; font-size: 34px; }
        .cr-name-tag { position: absolute; z-index: 5; display: flex; flex-direction: column; align-items: center; min-width: 115px; max-width: 155px; padding: 7px 13px 6px; border: 1.5px solid #d6b58a; border-radius: 25px; background: #fffaf0; box-shadow: 0 3px 0 #b87c4430; color: #4f3527; cursor: pointer; transition: transform .2s ease, box-shadow .2s ease; }
        .cr-name-tag:hover, .cr-name-tag[aria-expanded='true'] { transform: translateY(-3px); box-shadow: 0 6px 0 #b87c4430; }
        .cr-name-tag strong { font-size: 15px; line-height: 1.1; }
        .cr-name-tag small { margin-top: 3px; font-size: 8px; font-weight: 700; white-space: nowrap; }
        .cr-tag-luis { top: 26%; right: 25%; }
        .cr-tag-sneyder { top: 55%; left: 12%; }
        .cr-tag-matheo { top: 55%; right: 11%; }
        .cr-detail-card { position: relative; z-index: 6; width: min(100%, 420px); margin: 5px auto 0; padding: 15px 18px; border: 1px solid #d8b78e; border-radius: 15px; background: #fff8e9; box-shadow: 0 5px 0 #a66f3430; text-align: center; animation: cr-pop .2s ease both; }
        .cr-detail-card strong { display: block; margin-bottom: 5px; }
        .cr-detail-card p { margin: 0; color: #80634b; font-size: 13px; line-height: 1.6; }
        .cr-caption { margin: 8px auto 0; text-align: center; color: #8b6748; font-size: 14px; font-style: italic; }
        .cr-caption span { color: #c17d3c; padding: 0 10px; }
        @keyframes cr-pop { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 700px) {
          .creadores-scene { width: calc(100% - 16px); margin: 8px auto; padding: 24px 5px 18px; border-radius: 14px; background: #f3a65d; }
          .cr-scene-art { height: clamp(540px, 130vw, 720px); width: 100%; background: #f3a65d; }
          .cr-blob { inset: -1% -2%; background-size: 100% 100%; }
          .cr-background-objects { left: 50%; top: 7%; height: 91%; max-width: 67%; transform: translateX(-50%); }
          .cr-extra-shelf { top: 17%; width: 22%; height: 13%; border-width: 2px; }
          .cr-extra-shelf::before { border-width: 1px; }

          .cr-person-left { left: 9%; width: 37%; height: 58%; bottom: 4%; }
          .cr-person-center { left: 30%; width: 40%; height: 79%; bottom: 4%; }
          .cr-person-right { right: 7%; width: 37%; height: 57%; bottom: 4%; }
          .cr-tag-luis { top: 29%; right: 14%; }
          .cr-tag-sneyder { top: 59%; left: 4%; }
          .cr-tag-matheo { top: 59%; right: 3%; }
          .cr-name-tag { min-width: 90px; padding: 6px 9px; }
          .cr-name-tag strong { font-size: 13px; }
          .cr-name-tag small { font-size: 7px; }

        }
        @media (max-width: 390px) {
          .cr-scene-art { height: 500px; }
          .cr-blob { inset: -1% -2%; background-size: 100% 100%; }
          .cr-background-objects { left: 50%; top: 9%; height: 88%; max-width: 72%; transform: translateX(-50%); }
          .cr-extra-shelf { top: 18%; width: 20%; height: 12%; }
          .cr-person-left { left: 7%; width: 39%; }
          .cr-person-center { left: 29%; width: 42%; }
          .cr-person-right { right: 5%; width: 38%; }
          .cr-tag-luis { right: 10%; top: 30%; }
          .cr-tag-sneyder { top: 62%; left: 2%; }
          .cr-tag-matheo { top: 62%; right: 2%; }
          .cr-name-tag { min-width: 80px; }
        }
        @media (prefers-reduced-motion: reduce) { .cr-name-tag, .cr-detail-card { transition: none; animation: none; } }
      `}</style>

      <header className="cr-heading">
        <h2>Nuestros creadores</h2>
        <p>Un equipo de ideas, imaginación y creatividad que le da vida a este proyecto.</p>
      </header>

      <div className="cr-scene-art" aria-label="Ilustración decorativa del equipo de creadores">
        <div className="cr-blob" aria-hidden="true" />
        <div className="cr-extra-shelf cr-extra-shelf-left" aria-hidden="true" />
        <div className="cr-extra-shelf cr-extra-shelf-right" aria-hidden="true" />
        <img className="cr-background-objects" src="/Objetos%20de%20Fondo.svg" alt="" aria-hidden="true" />

        {creadores.map((creador) => {
          const posicionClase = creador.posicion === "izquierda" ? "cr-person-left" : creador.posicion === "centro" ? "cr-person-center" : "cr-person-right";
          return (
            <div className={`cr-person ${posicionClase}`} key={creador.nombre}>
              <div className="cr-animation">
                {animaciones[creador.nombre] ? (
                  <Lottie animationData={animaciones[creador.nombre]} loop autoplay style={{ width: "100%", height: "100%" }} />
                ) : errores[creador.nombre] ? (
                  <div className="cr-fallback" aria-label="No se pudo cargar la animación">✎</div>
                ) : (
                  <div className="cr-fallback" aria-label="Cargando animación">✦</div>
                )}
              </div>
            </div>
          );
        })}

        <button className="cr-name-tag cr-tag-luis" onClick={() => setSeleccionado(seleccionado === "Luis" ? null : "Luis")} aria-expanded={seleccionado === "Luis"}>
          <strong>Luis</strong><small>Diseño y desarrollo</small>
        </button>
        <button className="cr-name-tag cr-tag-sneyder" onClick={() => setSeleccionado(seleccionado === "Sneyder" ? null : "Sneyder")} aria-expanded={seleccionado === "Sneyder"}>
          <strong>Sneyder</strong><small>Producción multimedia</small>
        </button>
        <button className="cr-name-tag cr-tag-matheo" onClick={() => setSeleccionado(seleccionado === "Matheo" ? null : "Matheo")} aria-expanded={seleccionado === "Matheo"}>
          <strong>Matheo</strong><small>Ilustración y creatividad</small>
        </button>
      </div>

      {seleccionado && (
        <div className="cr-detail-card" role="status">
          <strong>{seleccionado} · {creadores.find((c) => c.nombre === seleccionado)?.rol}</strong>
          <p>{creadores.find((c) => c.nombre === seleccionado)?.detalle}</p>
          <p><em>“{creadores.find((c) => c.nombre === seleccionado)?.frase}”</em></p>
        </div>
      )}
      <p className="cr-caption"><span>✦</span> Leer, imaginar, crear y compartir. <span>✦</span></p>
    </section>
  );
}
