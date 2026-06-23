import escena from "../assets/Escena.webm";
import personaje from "../assets/experimentofox.webm";
import "../stylesheets/fondo.css";

export const LuisPlugin = () => {
  return (
    <div className="screen">
      {/* 🌌 FONDO */}
      <video className="fondo" autoPlay loop muted playsInline>
        <source src={escena} type="video/webm" />
      </video>

      {/* 🧍 PERSONAJE ENCIMA */}
      <video className="personaje" autoPlay loop muted playsInline>
        <source src={personaje} type="video/webm" />
      </video>
    </div>
  );
};