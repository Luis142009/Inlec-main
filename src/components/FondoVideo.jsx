import escena from "../assets/Escena.webm";
import "../stylesheets/fondo.css";

export const FondoVideo = () => {
  return (
    <div className="screen">
      <video className="fondo" autoPlay loop muted playsInline>
        <source src={escena} type="video/webm" />
      </video>
    </div>
  );
};