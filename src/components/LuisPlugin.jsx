import Lottie from "lottie-react";
import animationData from "../assets/BolasonicaLuis.json";

export const LuisPlugin = () => {
  return (
    <Lottie
      animationData={animationData}
      loop
      style={{ width: 500, height: 500 }}
    />
  );
};