import LottieModule from "lottie-react";
import ositou from "../assets/ositou.json";
import { useRef } from "react";



const Lottie = LottieModule.default;

export const LotMatheo = () => {
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
      animationData={ositou}
      loop={false}
      autoplay={false}
      style={{ width: 500, height: 500 }}
    />
    </div>
    </>
  );
};