import LottieModule from "lottie-react";
import oso from "../assets/ositou.json";
import pinguino from "../assets/svg/pinwino.json";
import { useRef } from "react";
import { div } from "motion/react-client";
import '../stylesheets/LotMatheo.css'



const Lottie = LottieModule.default;

export const LotMatheo = () => {
    console.log(Lottie)

    const lottieRef = useRef()
    const lottieRef2 = useRef()

    const reproducir = () => {
        lottieRef.current.stop()
        lottieRef.current.play()
    }
    
    const reproducir2 = () => {
        lottieRef2.current.stop()
        lottieRef2.current.play()
    }

  return (
    <>

   <div className="pinguino" onClick={reproducir2}>
    <Lottie
      lottieRef={lottieRef2}
      animationData={pinguino}
      loop={false}
      autoplay={false}
      style={{ width: 150, height: 500 }}
    />
    </div >

    
    
   <div className="oso" onClick={reproducir}>
    <Lottie
      lottieRef={lottieRef}
      animationData={oso}
      loop={false}
      autoplay={false}
      style={{ width: 350, height: 500 }}
    />
    </div >

<div className="screen">
  <img className="fondo" src="../src/assets/svg/Fondo.webp" alt="" />
  <img className="nube1" src="../src/assets/svg/Nube 1.webp" alt="" />
  <img className="nube2" src="../src/assets/svg/Nube 2.webp" alt="" />
  <img className="pez" src="../src/assets/svg/pezEspinas.svg" alt="" />
</div>

    </>



  );
};