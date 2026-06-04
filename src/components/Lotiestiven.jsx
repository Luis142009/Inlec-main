import LottieModule from "lottie-react";
import dataStiven from "../assets/data.json";
import { useRef } from "react";

const Lottie = LottieModule.default;

export const LottieStiven = () => {

  const lottieRef = useRef()

  const reproducir = () => {
    lottieRef.current.stop();
    lottieRef.current.play();

  }
  return (
    <>
      <div onClick={reproducir}>
        <Lottie
          lottieRef={lottieRef}
          animationData={dataStiven}
          loop={false}
          autoplay={false}
          style={{ 
            width: 500, 
            height: 500 

          }}

        />
      </div>
    </>
  );
};