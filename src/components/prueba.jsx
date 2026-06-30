import React from 'react'
import sr2 from "../assets/srfox2.webm";
import "../stylesheets/Escena2.css";
import { gsap } from "gsap";
export const prueba = () => {
  return (
    <video
                    ref={sr2Ref}
                    className="sr2"
                    muted
                    playsInline
                    preload="auto"
                    onClick={() => reproducirVideo(sr2Ref)}
                >
                    <source src={sr2} type="video/webm" />
                </video>
  )
}
