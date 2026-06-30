import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import { gsap } from "gsap";

import "../stylesheets/Escena2.css";

import hojas from "../assets/hojass.webm";
import sr2 from "../assets/srfox2.webm";
import pasto2 from "../assets/pasto2.webm";
import fondo2 from "../assets/fondo2.webm";
import cartel from "../assets/cartel.webm";
import sol2 from "../assets/sol2.webm";
import tronco from "../assets/tronco.webm";
import sombra3 from "../assets/sombra3.webm";
import sombras from "../assets/sombras.webm";

export const Parte2dela1 = () => {

   

    const screenRef = useRef(null);

   

    const fondoRef = useRef(null);
    const sr2Ref = useRef(null);
    const pasto2Ref = useRef(null);
    const hojasRef = useRef(null);
    const cartelRef = useRef(null);
    const sol2Ref = useRef(null);
    const troncoRef = useRef(null);
    const sombra3Ref = useRef(null);
    const sombrasRef = useRef(null);

    

    const hojasActivadas = useRef(false);

  

    const reproducirVideo = (ref) => {

        const video = ref.current;

        if (!video) return;

        video.pause();
        video.currentTime = 0;
        video.play();

    };

  

    const iniciarCinematica = () => {

        const tl = gsap.timeline();

        // Zoom al cartel

        tl.to(screenRef.current,{

            scale:2.5,
            x:230,
            y:-100,

            duration:2.5,

            ease:"power3.inOut"

        });

        // Blur mientras viaja

        tl.to(screenRef.current,{

            filter:"blur(5px)",

            duration:.3

        },"<");

        // Recupera el foco

        tl.to(screenRef.current,{

            filter:"blur(0px)",

            duration:.4

        });

        // Espera

        tl.to({},{

            duration:1

        });

        // Viaje hasta Señor Fox

        tl.to(screenRef.current,{

            scale:2.2,

            x:0,

            y:-90,

            duration:2.5,

            ease:"power2.inOut"

        });

        // Recorre desde abajo hasta la cara

        tl.to(screenRef.current,{

            y:-390,

            duration:3,

            ease:"power2.inOut"

        });

  


        // Pausa

tl.to({},{
    duration: .2
});

// Sube un poco más hacia la cara

tl.to(screenRef.current,{

    y: 20,          

    
    duration: 2.1,

    ease: "power2.inOut"

});

// Pequeña pausa contemplativa

tl.to({},{
    duration: .5
});

// Regreso

tl.to(screenRef.current,{

    scale: 1,

    x: 0,

    y: 0,

    duration: 3,

    ease: "power4.inOut"

});

    };

const iniciarTodo = () => {

    if (hojasActivadas.current) return;

    hojasActivadas.current = true;

    reproducirVideo(sr2Ref);
    reproducirVideo(cartelRef);
    reproducirVideo(troncoRef);
    reproducirVideo(sol2Ref);
    reproducirVideo(sombra3Ref);
    reproducirVideo(sombrasRef);
    reproducirVideo(pasto2Ref);
    reproducirVideo(hojasRef);

    iniciarCinematica();

};


        return (

        <div
            ref={screenRef}
            className="screen"
        >

            {/* Fondo */}

            <video
                ref={fondoRef}
                className="scream"
                muted
                playsInline
                preload="auto"
                onClick={() => reproducirVideo(fondoRef)}
            >
                <source src={fondo2} type="video/webm" />
            </video>

            {/* Señor Fox */}

                <video
    ref={sr2Ref}
    className="sr2"
    muted
    playsInline
    preload="auto"
    onClick={() => {

        if (hojasActivadas.current) return;

        hojasActivadas.current = true;

        reproducirVideo(sr2Ref);
        reproducirVideo(cartelRef);
        reproducirVideo(troncoRef);
        reproducirVideo(sol2Ref);
        reproducirVideo(sombra3Ref);
        reproducirVideo(sombrasRef);
        reproducirVideo(pasto2Ref);
        reproducirVideo(hojasRef);
        iniciarCinematica();

    }}
>
    <source src={sr2} type="video/webm" />
</video>

            {/* Pasto */}

            <video
                ref={pasto2Ref}
                className="pasto2"
                muted
                playsInline
                preload="auto"
                onClick={() => reproducirVideo(pasto2Ref)}
            >
                <source src={pasto2} type="video/webm" />
            </video>

            {/* Hojas */}

         <video
    ref={hojasRef}
    className="hojas"
    muted
    playsInline
    preload="auto"
    onClick={() => reproducirVideo(hojasRef)}
>
    <source src={hojas} type="video/webm" />
</video>

            {/* Cartel */}

            <video
                ref={cartelRef}
                className="cartel"
                muted
                playsInline
                preload="auto"
            >
                <source src={cartel} type="video/webm" />
            </video>

            {/* Sol */}

            <video
                ref={sol2Ref}
                className="sol2"
                muted
                playsInline
                preload="auto"
            >
                <source src={sol2} type="video/webm" />
            </video>

            {/* Tronco */}

            <video
                ref={troncoRef}
                className="tronco"
                muted
                playsInline
                preload="auto"
            >
                <source src={tronco} type="video/webm" />
            </video>

            {/* Sombras */}

            <video
                ref={sombra3Ref}
                className="sombra3"
                muted
                playsInline
                preload="auto"
            >
                <source src={sombra3} type="video/webm" />
            </video>

            <video
                ref={sombrasRef}
                className="sombras"
                muted
                playsInline
                preload="auto"
            >
                <source src={sombras} type="video/webm" />
            </video>

        </div>

    );

};  