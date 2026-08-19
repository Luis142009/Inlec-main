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


export const Parte3dela1 = forwardRef(
    ({ cambiarEscena }, ref) => {

        // =========================================================
        // ESCENA
        // =========================================================

        const screenRef = useRef(null);


        // =========================================================
        // VIDEOS
        // =========================================================

        const fondoRef = useRef(null);
        const sraRef = useRef(null);
        const pasto2Ref = useRef(null);
        const cartelRef = useRef(null);
        const sol2Ref = useRef(null);
        const troncoRef = useRef(null);
        const detalle2Ref = useRef(null);


        // =========================================================
        // CONTROL
        // =========================================================

        const escenaIniciada = useRef(false);

        const cameraTimelineRef = useRef(null);

        const cartelTimelineRef = useRef(null);


        // =========================================================
        // TODOS LOS VIDEOS
        // =========================================================

        const obtenerVideos = () => {

            return [
                fondoRef.current,
                sraRef.current,
                pasto2Ref.current,
                cartelRef.current,
                sol2Ref.current,
                troncoRef.current,
                detalle2Ref.current
            ];

        };


        // =========================================================
        // REPRODUCIR VIDEOS
        // =========================================================

        const reproducirVideos = () => {

            obtenerVideos().forEach((video) => {

                if (!video) return;

                video
                    .play()
                    .catch(() => {});

            });

        };


        // =========================================================
        // PAUSAR VIDEOS
        // =========================================================

        const pausarVideos = () => {

            obtenerVideos().forEach((video) => {

                if (!video) return;

                video.pause();

            });

        };


        // =========================================================
        // CARTEL
        // =========================================================

        const iniciarCartel = () => {

            const video = cartelRef.current;

            if (!video) return;


            if (cartelTimelineRef.current) {

                cartelTimelineRef.current.kill();

            }


            video.pause();

            video.currentTime = 0;

            video.playbackRate = 4;


            video
                .play()
                .catch(() => {});


            cartelTimelineRef.current = gsap.to(
                video,
                {

                    playbackRate: 3,

                    duration: 1.5,

                    delay: 0.3,

                    ease: "power3.out"

                }
            );

        };


        // =========================================================
        // CÁMARA
        // =========================================================

        const iniciarCamara = () => {

            const screen = screenRef.current;

            if (!screen) return;


            // -----------------------------------------------
            // LIMPIAR CÁMARA ANTERIOR
            // -----------------------------------------------

            if (cameraTimelineRef.current) {

                cameraTimelineRef.current.kill();

            }

            gsap.killTweensOf(screen);


            // -----------------------------------------------
            // POSICIÓN INICIAL
            // -----------------------------------------------

            gsap.set(
                screen,
                {

                    scale: 1,

                    x: 0,

                    y: 0,

                    transformOrigin: "center center"

                }
            );


            // -----------------------------------------------
            // TIMELINE
            // -----------------------------------------------

            const tl = gsap.timeline({

                paused: false

            });


            cameraTimelineRef.current = tl;


            // =================================================
            // 1 — ZOOM CARTEL
            // =================================================

            tl.to(
                screen,
                {

                    scale: 2.80,

                    x: -140,

                    y: 20,

                    duration: 2.5,

                    ease: "power3.inOut"

                }
            );


            // =================================================
            // 2 — ESPERA
            // =================================================

            tl.to(
                {},
                {

                    duration: 0.8

                }
            );


            // =================================================
            // 3 — REGRESAR A SEÑORA FOX
            // =================================================

            tl.to(
                screen,
                {

                    scale: 2.25,

                    x: 30,

                    y: 0,

                    duration: 2.3,

                    ease: "power3.inOut"

                }
            );


            // =================================================
            // 4 — BAJAR
            // =================================================

            tl.to(
                screen,
                {

                    scale: 3.2,

                    y: 60,

                    duration: 1.4,

                    ease: "power2.inOut"

                }
            );


            // =================================================
            // 5 — SUBIR
            // =================================================

            tl.to(
                screen,
                {

                    y: -90,

                    duration: 1.6,

                    ease: "power3.inOut"

                }
            );


            // =================================================
            // 6 — ENFOCAR CARA
            // =================================================

            tl.to(
                screen,
                {

                    scale: 2.70,

                    x: 50,

                    y: 0,

                    duration: 2.2,

                    ease: "power3.inOut"

                }
            );


            // =================================================
            // 7 — PAUSA FINAL
            // =================================================

            tl.to(
                {},
                {

                    duration: 1

                }
            );


            // =================================================
            // 8 — SIGUIENTE ESCENA
            // =================================================

            tl.call(() => {

                cambiarEscena(4);

            });

        };


        // =========================================================
        // INICIAR TODO
        // =========================================================

        const iniciarTodo = () => {

            // IMPORTANTE:
            // si ya existe la escena, no crear otra cámara

            if (escenaIniciada.current) {

                return;

            }


            escenaIniciada.current = true;


            // -----------------------------------------------
            // REINICIAR VIDEOS
            // -----------------------------------------------

            obtenerVideos().forEach((video) => {

                if (!video) return;

                video.currentTime = 0;

            });


            // -----------------------------------------------
            // VIDEOS
            // -----------------------------------------------

            reproducirVideos();


            // -----------------------------------------------
            // CARTEL
            // -----------------------------------------------

            iniciarCartel();


            // -----------------------------------------------
            // CÁMARA
            // -----------------------------------------------

            iniciarCamara();

        };


        // =========================================================
        // PAUSAR TODO
        // =========================================================

        const pausarTodo = () => {

            pausarVideos();


            if (cameraTimelineRef.current) {

                cameraTimelineRef.current.pause();

            }


            if (cartelTimelineRef.current) {

                cartelTimelineRef.current.pause();

            }

        };


        // =========================================================
        // REANUDAR TODO
        // =========================================================

        const reanudarTodo = () => {

            // -----------------------------------------------
            // SI TODAVÍA NO HABÍA EMPEZADO
            // -----------------------------------------------

            if (!escenaIniciada.current) {

                iniciarTodo();

                return;

            }


            // -----------------------------------------------
            // VIDEOS
            // -----------------------------------------------

            reproducirVideos();


            // -----------------------------------------------
            // CÁMARA
            // -----------------------------------------------

            if (cameraTimelineRef.current) {

                cameraTimelineRef.current.resume();

            }


            // -----------------------------------------------
            // CARTEL
            // -----------------------------------------------

            if (cartelTimelineRef.current) {

                cartelTimelineRef.current.resume();

            }

        };


        // =========================================================
        // INTERFAZCAP
        // =========================================================

        useImperativeHandle(
            ref,
            () => ({

                iniciarTodo,

                pausarTodo,

                reanudarTodo

            })
        );


        // =========================================================
        // RETURN
        // =========================================================

        return (

            <div
                ref={screenRef}
                className="screen"
            >

                {/* =================================================
                    FONDO
                ================================================= */}

                <video
                    ref={fondoRef}
                    className="scream"

                    muted
                    playsInline
                    preload="auto"
                >

                    <source
                        src={fondo2}
                        type="video/webm"
                    />

                </video>


                {/* =================================================
                    SEÑORA FOX
                ================================================= */}

                <video
                    ref={sraRef}
                    className="sras"

                    muted
                    playsInline
                    preload="auto"

                    onClick={iniciarTodo}

                    style={{
                        cursor: "pointer"
                    }}
                >

                    <source
                        src={sra}
                        type="video/webm"
                    />

                </video>


                {/* =================================================
                    PASTO
                ================================================= */}

                <video
                    ref={pasto2Ref}
                    className="pasto3"

                    muted
                    playsInline
                    preload="auto"
                >

                    <source
                        src={pasto2}
                        type="video/webm"
                    />

                </video>


                {/* =================================================
                    CARTEL
                ================================================= */}

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


                {/* =================================================
                    SOL
                ================================================= */}

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


                {/* =================================================
                    TRONCO
                ================================================= */}

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


                {/* =================================================
                    DETALLE
                ================================================= */}

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

    }
);