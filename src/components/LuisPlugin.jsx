import LottieModule from "lottie-react";
import dataStiven from "../assets/ositou.json";
import pengun from "../assets/svg/pinwino.json";
import { useRef } from "react";
import "../stylesheets/Lottistiven.css";

const Lottie = LottieModule.default;

export const LuisPlugin = () => {
  const lottieRef = useRef();
  const lottieRef2 = useRef();

  const reproducir = () => {
    lottieRef.current?.stop();
    lottieRef.current?.play();
  };

  const reproducir2 = () => {
    lottieRef2.current?.stop();
    lottieRef2.current?.play();
  };

  const lanzarHielo = () => {
    lottieRef2.current?.stop();
    lottieRef2.current?.playSegments([0, 20], true);
  };

  const pescado = () => {
    lottieRef2.current?.stop();
    lottieRef2.current?.playSegments([0, 60], true);
  };
  return (
    <>
      <div className="oso" onClick={reproducir}>
        <Lottie
          lottieRef={lottieRef}
          animationData={dataStiven}
          loop={false}
          autoplay={false}
          style={{
            width: 400,
            height: 400,
          }}
        />
      </div>

      <div className="peguns" onClick={reproducir2}>
        <Lottie
          lottieRef={lottieRef2}
          animationData={pengun}
          loop={false}
          autoplay={false}
          style={{
            width: 150,
            height: 150,
          }}
        />
      </div>

      <div className="screen">
        <img className="fondo" src="../src/assets/svg/Fondo.webp" alt="" />
        <img className="nube1" src="../src/assets/svg/Nube 1.webp" alt="" />
        <img className="nube2" src="../src/assets/svg/Nube 2.webp" alt="" />
      </div>

      <div className="mar">
        <img
          className="mar1"
          src="../src/assets/svg/pezEspinas.svg"
          alt=""
          onClick={pescado}
        />
      </div>

      <div className="hielo1">
        <img
          className="hielo2"
          src="../src/assets/svg/cuboHielo.svg"
          alt=""
          onClick={lanzarHielo}
        />
      </div>
    </>
  );
};