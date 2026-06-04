import LottieModule from "lottie-react";
import dataMatheo from "../assets/BolasonicaLuis.json";
import { useRef } from "react";
import { div } from "motion/react-client";



const Lottie = LottieModule.default;

export const LottieMatheo = () => {
    console.log(Lottie)

    const lottieRef = useRef()

    const reproducir = () => {
        lottieRef.current.stop()
        lottieRef.current.play()
    }
    

  return (
    <>
    <div onClick={reproducir}>
    <Lottie
      lottieRef={lottieRef}
      animationData={dataMatheo}
      loop={false}
      autoplay={false}
      style={{ width: 500, height: 500 }}
    />
    </div>
    </>
  );
};