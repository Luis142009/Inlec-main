import LottieModule from "lottie-react";
import Bomb from "../assets/BolasonicaLuis.json";
import { useRef } from "react";

const Lottie = LottieModule.default

export const LuisPlugin = () => {

  const lottieRef = useRef()

  const reproducir = () => {
  lottieRef.current.stop()
  lottieRef.current.play() 

   }
console.log(Lottie)

  return (
    <>
    <div onClick={reproducir}>
    <Lottie
    lottieRef={lottieRef}
      animationData={Bomb}
      loop={false}
      autoplay={false}
      style={{ width: 500, height: 500 }}
    />
    </div>
    </>
  );
};