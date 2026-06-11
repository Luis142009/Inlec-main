import LottieModule from "lottie-react";
import pinwino from "../assets/svg/pinwino.json";
import { useRef } from "react";
import { div } from "motion/react-client";
import '../stylesheets/LotMatheo.css'


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
    
    {/* <div onClick={reproducir}>
    <Lottie
      lottieRef={lottieRef}
      animationData={pinwino}
      loop={false}
      autoplay={false}
      style={{ width: 500, height: 500 }}
    />
    </div > */}

<div className="screen">
  <img className="fondo" src="../src/assets/svg/Fondo.webp" alt="" />
</div>

    </>



  );
};