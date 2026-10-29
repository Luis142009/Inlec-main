import React, { useEffect } from "react";
import { Lottiestiven } from "./components/Lotiestiven";
import InterfazCap from "./pages/InterfazCap";

export const AppMain = () => {
  useEffect(() => {
    document.body.classList.add("sin-scroll");
    return () => document.body.classList.remove("sin-scroll");
  }, []);

  return (
    <>
      <InterfazCap />
    </>
  );
};

export default AppMain;