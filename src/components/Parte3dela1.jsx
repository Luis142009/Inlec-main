import {
    useRef,
    forwardRef,
    useImperativeHandle
} from "react";

import { gsap } from "gsap";

import "../stylesheets/Escena2.css";

import sra from "../assets/1.3sra.webm";
import pasto2 from "../assets/pasto1.3.webm";
import fondo2 from "../assets/fondo2.webm";
import cartel from "../assets/cartelsra.webm";
import sol2 from "../assets/sol2.webm";
import tronco from "../assets/arbol3.webm";
import detalle from "../assets/hierboza.webm";

import "../stylesheets/Escena1.3.css";


export const Parte3dela1 = forwardRef(({ cambiarEscena }, ref) => {

    // =========================================================
    // REFS
    // =========================================================

    const screenRef = useRef(null);

    const fondoRef = useRef(null);
    const sraRef = useRef(null);
    const pasto2Ref = useRef(null);
    const cartelRef = useRef(null);
    const sol2Ref = useRef(null);
    const troncoRef = useRef(null);
    const detalle2Ref = useRef(null);

    // Timeline de cámara
    const cameraTimelineRef = useRef(null);

    // Timeline de velocidad del cartel
    const cartelTimelineRef = useRef(null);

    const hojasActivadas = useRef(false);


    // =========================================================
    // REPRODUCIR VIDEO NORMAL
    // =========================================================

    const reproducirVideo = (ref) => {

        const video = ref.current;

        if (!video) return;

        video.pause();
        video.currentTime = 0;
        video.playbackRate = 1;

        video.play().catch((error) => {

            console.log(
                "No se pudo reproducir el video:",
                error
            );

        });

    };


    // =========================================================
    // REPRODUCIR CARTEL
    // =========================================================

    const reproducirCartel = () => {

        const video = cartelRef.current;

        if (!video) return;

        // Detener animación anterior de velocidad
        if (cartelTimelineRef.current) {

            cartelTimelineRef.current.kill();

        }

        video.pause();
        video.currentTime = 0;

        // Empieza rápido
        video.playbackRate = 4;

        video.play().catch((error) => {

            console.log(
                "No se pudo reproducir el cartel:",
                error
            );

        });

        // Reducir velocidad progresivamente
        cartelTimelineRef.current = gsap.to(video, {

            playbackRate: 3,

            duration: 1.5,

            delay: 0.3,

            ease: "power3.out"

        });

    };


    // =========================================================
    // CÁMARA
    // =========================================================

    const iniciarCamara = () => {

        const screen = screenRef.current;

        if (!screen) return;


        // Detener cámara anterior
        gsap.killTweensOf(screen);


        // Posición inicial
        gsap.set(screen, {

            scale: 1,
            x: 0,
            y: 0,

            transformOrigin: "50% 50%"

        });


        // Crear timeline
        const tl = gsap.timeline();

        cameraTimelineRef.current = tl;


        // =====================================================
        // 1. ACERCARSE AL CARTEL
        // =====================================================

        tl.to(screen, {

            scale: 2.80,

            x: -140,
            y: 20,

            duration: 2.5,

            ease: "power3.inOut"

        });


        // =====================================================
        // 2. ESPERAR EN EL CARTEL
        // =====================================================

        tl.to({}, {

            duration: 0.8

        });


        // =====================================================
        // 3. REGRESAR HACIA SEÑORA FOX
        // =====================================================

        tl.to(screen, {

            scale: 2.25,

            x: 30,
            y: 0,

            duration: 2.3,

            ease: "power3.inOut"

        });


        // =====================================================
        // 4. BAJAR
        // =====================================================

        tl.to(screen, {

            scale: 3.2,

            y: 60,

            duration: 1.4,

            ease: "power2.inOut"

        });


        // =====================================================
        // 5. SUBIR
        // =====================================================

        tl.to(screen, {

            y: -90,

            duration: 1.6,

            ease: "power3.inOut"

        });


        // =====================================================
        // 6. ENFOCAR LA CARA
        // =====================================================

        tl.to(screen, {

            scale: 2.70,

            x: 50,
            y: 0,

            duration: 2.2,

            ease: "power3.inOut"

        });


        // =====================================================
        // 7. PAUSA FINAL
        // =====================================================

        tl.to({}, {

            duration: 1,

            onComplete: () => {

                // =================================================
                // TERMINÓ COMPLETAMENTE LA ESCENA
                // PASAMOS A ESCENA 4
                // =================================================

                cambiarEscena(4);

            }

        });

    };


    // =========================================================
    // PAUSAR TODA LA ESCENA
    // =========================================================

    const pausarTodo = () => {

        const videos = [

            fondoRef.current,
            sraRef.current,
            pasto2Ref.current,
            cartelRef.current,
            sol2Ref.current,
            troncoRef.current,
            detalle2Ref.current

        ];


        // Pausar videos
        videos.forEach((video) => {

            if (video) {

                video.pause();

            }

        });


        // Pausar cámara
        if (cameraTimelineRef.current) {

            cameraTimelineRef.current.pause();

        }


        // Pausar animación de velocidad del cartel
        if (cartelTimelineRef.current) {

            cartelTimelineRef.current.pause();

        }

    };


    // =========================================================
    // REANUDAR TODA LA ESCENA
    // =========================================================

    const reanudarTodo = () => {

        const videos = [

            fondoRef.current,
            sraRef.current,
            pasto2Ref.current,
            cartelRef.current,
            sol2Ref.current,
            troncoRef.current,
            detalle2Ref.current

        ];


        // Reanudar videos
        videos.forEach((video) => {

            if (video) {

                video.play().catch((error) => {

                    console.log(
                        "No se pudo reanudar el video:",
                        error
                    );

                });

            }

        });


        // Reanudar cámara
        if (cameraTimelineRef.current) {

            cameraTimelineRef.current.resume();

        }


        // Reanudar cambio de velocidad del cartel
        if (cartelTimelineRef.current) {

            cartelTimelineRef.current.resume();

        }

    };


    // =========================================================
    // EXPONER FUNCIONES A INTERFAZCAP
    // =========================================================

    useImperativeHandle(ref, () => ({

        pausarTodo,
        reanudarTodo

    }));


    // =========================================================
    // ACTIVAR ESCENA
    // =========================================================

    const activarEscena = () => {

        if (hojasActivadas.current) return;

        hojasActivadas.current = true;


        // Señora Fox
        reproducirVideo(sraRef);


        // Cartel
        reproducirCartel();


        // Resto de elementos
        reproducirVideo(troncoRef);
        reproducirVideo(sol2Ref);
        reproducirVideo(pasto2Ref);
        reproducirVideo(detalle2Ref);


        // Cámara
        iniciarCamara();

    };


    // =========================================================
    // RETURN
    // =========================================================

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

                <source
                    src={fondo2}
                    type="video/webm"
                />

            </video>


            {/* Señora Fox */}

            <video
                ref={sraRef}
                className="sras"
                muted
                playsInline
                preload="auto"
                onClick={activarEscena}
            >

                <source
                    src={sra}
                    type="video/webm"
                />

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

                <source
                    src={pasto2}
                    type="video/webm"
                />

            </video>


            {/* Cartel */}

            <video
                ref={cartelRef}
                className="cartel2"
                muted
                playsInline
                preload="auto"
            >

                <source
                    src={cartel}
                    type="video/webm"
                />

            </video>


            {/* Sol */}

            <video
                ref={sol2Ref}
                className="sol3"
                muted
                playsInline
                preload="auto"
            >

                <source
                    src={sol2}
                    type="video/webm"
                />

            </video>


            {/* Tronco */}

            <video
                ref={troncoRef}
                className="troncos"
                muted
                playsInline
                preload="auto"
            >

                <source
                    src={tronco}
                    type="video/webm"
                />

            </video>


            {/* Detalle / Hierba */}

            <video
                ref={detalle2Ref}
                className="pastos4"
                muted
                playsInline
                preload="auto"
            >

                <source
                    src={detalle}
                    type="video/webm"
                />

            </video>

        </div>

    );

});