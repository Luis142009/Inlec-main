
import { useRef } from "react";
import "../stylesheets/Escena2.css";

import sra from "../assets/1.3sra.webm";
import pasto2 from "../assets/pasto1.3.webm";
import fondo2 from "../assets/fondo2.webm";
import cartel from "../assets/cartelsra.webm";
import sol2 from "../assets/sol2.webm";
import tronco from "../assets/arbol3.webm";
import detalle from "../assets/hierboza.webm";

import "../stylesheets/Escena1.3.css";

export const Parte3dela1 = () => {
    const screenRef = useRef(null);

    const fondoRef = useRef(null);
    const sraRef = useRef(null);
    const pasto2Ref = useRef(null);
    const cartelRef = useRef(null);
    const sol2Ref = useRef(null);
    const troncoRef = useRef(null);

    const hojasActivadas = useRef(false);

    const reproducirVideo = (ref) => {
        const video = ref.current;

        if (!video) return;

        video.pause();
        video.currentTime = 0;

        video.play().catch((error) => {
            console.log("No se pudo reproducir el video:", error);
        });
    };

    const activarEscena = () => {
        // Evita que la animación se vuelva a ejecutar
        if (hojasActivadas.current) return;

        hojasActivadas.current = true;

        // Reproducir todos los elementos de la escena
        reproducirVideo(sraRef);
        reproducirVideo(cartelRef);
        reproducirVideo(troncoRef);
        reproducirVideo(sol2Ref);
        reproducirVideo(pasto2Ref);
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
                ref={sraRef}
                className="sras"
                muted
                playsInline
                preload="auto"
                onClick={activarEscena}
            >
                <source src={sra} type="video/webm" />
            </video>


            {/* Pasto */}

            <video
                ref={pasto2Ref}
                className="pasto3"
                muted
                playsInline
                preload="auto"
                onClick={() => reproducirVideo(pasto2Ref)}
            >
                <source src={pasto2} type="video/webm" />
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
                className="troncos"
                muted
                playsInline
                preload="auto"
            >
                <source src={tronco} type="video/webm" />
            </video>
<video
                ref={detalle2Ref}
                className="pasto2"
                muted
                playsInline
                preload="auto"
                onClick={() => reproducirVideo(detalle2Ref)}
            >
                <source src={detalle} type="video/webm" />
            </video>

            

        </div>
    );
};

