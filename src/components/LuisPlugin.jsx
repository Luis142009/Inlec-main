import escena from "../assets/Escena.webm";
import personaje from "../assets/sra3.webm";
import "../stylesheets/fondo.css";

export const LuisPlugin = () => {
  return (
    <div className="screen">
      
      <video className="fondo"  loop muted playsInline>
        <source src={escena} type="video/webm" />
      </video>

    
      <video className="personaje"  loop muted playsInline>
        <source src={personaje} type="video/webm" />
      </video>
    </div>
  );
};