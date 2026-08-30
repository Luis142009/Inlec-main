
import {
    useRef,
    forwardRef,
    useImperativeHandle
} from "react";

import { gsap } from "gsap";

import "../stylesheets/Escena2.css";
import "../stylesheets/Escena1.3.css";

import sra from "../assets/1.3sra.webm";
import pasto2 from "../assets/pasto1.3.webm";
import fondo2 from "../assets/fondo2.webm";
import cartel from "../assets/cartelsra.webm";
import sol2 from "../assets/sol2.webm";
import tronco from "../assets/arbol3.webm";
import detalle from "../assets/hierboza.webm";

import objeto from "../assets/svg/pintura.svg";

import tocar from "../assets/audio/tocar.mp3";


export const Parte3dela1 = forwardRef(
    ({
        cambiarEscena,
        onRecoger,
        objetoRecogido
    }, ref) => {


        // =========================================================
        // ID DEL OBJETO
        // =========================================================

        const ID_OBJETO = "pintura";


        // =========================================================
        // REF PRINCIPAL
        // =========================================================

        const screenRef = useRef(null);


        // =========================================================
        // REFS DE VIDEOS
        // =========================================================

        const fondoRef = useRef(null);
        const sraRef = useRef(null);
        const pasto2Ref = useRef(null);
        const cartelRef = useRef(null);
        const sol2Ref = useRef(null);
        const troncoRef = useRef(null);
        const detalle2Ref = useRef(null);


        // =========================================================
        // REF DEL OBJETO
        // =========================================================

        const objetoRef = useRef(null);


        // =========================================================
        // AUDIO
        // =========================================================

        const tocarRef = useRef(
            new Audio(tocar)
        );

        tocarRef.current.volume = 0.5;


        // =========================================================
        // CONTROL DE ESCENA
        // =========================================================

        const escenaIniciada = useRef(false);

        const objetoAnimando = useRef(false);

        const cameraTimelineRef = useRef(null);

        const cartelTimelineRef = useRef(null);

        const objetoTimelineRef = useRef(null);


        // =========================================================
        // OBTENER TODOS LOS VIDEOS
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
        // REPRODUCIR TODOS LOS VIDEOS
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
        // PAUSAR TODOS LOS VIDEOS
        // =========================================================

        const pausarVideos = () => {

            obtenerVideos().forEach((video) => {

                if (!video) return;

                video.pause();

            });

        };


        // =========================================================
        // INICIAR CARTEL
        // =========================================================

        const iniciarCartel = () => {

            const video = cartelRef.current;

            if (!video) return;


            // -----------------------------------------------------
            // LIMPIAR ANIMACIÓN ANTERIOR
            // -----------------------------------------------------

            if (cartelTimelineRef.current) {

                cartelTimelineRef.current.kill();

            }


            // -----------------------------------------------------
            // REINICIAR
            // -----------------------------------------------------

            video.pause();

            video.currentTime = 0;

            video.playbackRate = 4;


            // -----------------------------------------------------
            // REPRODUCIR
            // -----------------------------------------------------

            video
                .play()
                .catch(() => {});


            // -----------------------------------------------------
            // CAMBIAR VELOCIDAD
            // -----------------------------------------------------

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
        // CÁMARA DE LA ESCENA
        // =========================================================

        const iniciarCamara = () => {

            const screen = screenRef.current;

            if (!screen) return;


            // -----------------------------------------------------
            // LIMPIAR CÁMARA ANTERIOR
            // -----------------------------------------------------

            if (cameraTimelineRef.current) {

                cameraTimelineRef.current.kill();

            }

            gsap.killTweensOf(screen);


            // -----------------------------------------------------
            // POSICIÓN INICIAL
            // -----------------------------------------------------

            gsap.set(
                screen,
                {

                    scale: 1,

                    x: 0,

                    y: 0,

                    transformOrigin: "center center"

                }
            );


            // -----------------------------------------------------
            // CREAR TIMELINE
            // -----------------------------------------------------

            const tl = gsap.timeline({

                paused: false

            });


            cameraTimelineRef.current = tl;


            // =====================================================
            // 1 — ZOOM AL CARTEL
            // =====================================================

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


            // =====================================================
            // 2 — ESPERA
            // =====================================================

            tl.to(
                {},
                {

                    duration: 0.8

                }
            );


            // =====================================================
            // 3 — REGRESAR A SEÑORA FOX
            // =====================================================

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


            // =====================================================
            // 4 — BAJAR
            // =====================================================

            tl.to(
                screen,
                {

                    scale: 3.2,

                    y: 60,

                    duration: 1.4,

                    ease: "power2.inOut"

                }
            );


            // =====================================================
            // 5 — SUBIR
            // =====================================================

            tl.to(
                screen,
                {

                    y: -90,

                    duration: 1.6,

                    ease: "power3.inOut"

                }
            );


            // =====================================================
            // 6 — ENFOCAR CARA
            // =====================================================

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


            // =====================================================
            // 7 — PAUSA FINAL
            // =====================================================

            tl.to(
                {},
                {

                    duration: 1

                }
            );


            // =====================================================
            // 8 — CAMBIAR A ESCENA 4
            // =====================================================

            tl.call(() => {

                if (cambiarEscena) {

                    cambiarEscena(4);

                }

            });

        };


        // =========================================================
        // INICIAR TODA LA ESCENA
        // =========================================================

        const iniciarTodo = () => {


            // -----------------------------------------------------
            // SI YA ESTÁ INICIADA
            // -----------------------------------------------------

            if (escenaIniciada.current) {

                reproducirVideos();

                if (cameraTimelineRef.current) {

                    cameraTimelineRef.current.resume();

                }

                return;

            }


            // -----------------------------------------------------
            // MARCAR COMO INICIADA
            // -----------------------------------------------------

            escenaIniciada.current = true;


            // -----------------------------------------------------
            // REINICIAR VIDEOS
            // -----------------------------------------------------

            obtenerVideos().forEach((video) => {

                if (!video) return;

                video.currentTime = 0;

            });


            // -----------------------------------------------------
            // REPRODUCIR VIDEOS
            // -----------------------------------------------------

            reproducirVideos();


            // -----------------------------------------------------
            // INICIAR CARTEL
            // -----------------------------------------------------

            iniciarCartel();


            // -----------------------------------------------------
            // INICIAR CÁMARA
            // -----------------------------------------------------

            iniciarCamara();

        };


        // =========================================================
        // CLICK EN PINTURA
        // =========================================================

        const clickObjeto = (e) => {


            // -----------------------------------------------------
            // EVITAR PROPAGACIÓN
            // -----------------------------------------------------

            if (e) {

                e.stopPropagation();

            }


            // -----------------------------------------------------
            // EVITAR DOBLE CLICK
            // -----------------------------------------------------

            if (objetoAnimando.current) return;

            if (objetoRecogido) return;


            // -----------------------------------------------------
            // REFERENCIAS
            // -----------------------------------------------------

            const objetoActual =
                objetoRef.current;

            const screen =
                screenRef.current;


            if (!objetoActual || !screen) return;


            // -----------------------------------------------------
            // BLOQUEAR OBJETO
            // -----------------------------------------------------

            objetoAnimando.current = true;


            // =====================================================
            // SONIDO
            // =====================================================

            tocarRef.current.currentTime = 0;

            tocarRef.current
                .play()
                .catch(() => {});


            // =====================================================
            // LIMPIAR ANIMACIÓN ANTERIOR
            // =====================================================

            if (objetoTimelineRef.current) {

                objetoTimelineRef.current.kill();

            }


            // =====================================================
            // BUSCAR SLOT
            // =====================================================

            const slotDestino =
                document.querySelector(".slot");


            if (!slotDestino) {

                objetoAnimando.current = false;

                return;

            }


            // =====================================================
            // POSICIONES
            // =====================================================

            const objetoRect =
                objetoActual.getBoundingClientRect();


            const screenRect =
                screen.getBoundingClientRect();


            // =====================================================
            // CENTRO DE LA PANTALLA
            // =====================================================

            const centroX =
                screenRect.width / 2;

            const centroY =
                screenRect.height / 2;


            // =====================================================
            // CENTRO DE LA PINTURA
            // =====================================================

            const objetoX =
                objetoRect.left -
                screenRect.left +
                objetoRect.width / 2;


            const objetoY =
                objetoRect.top -
                screenRect.top +
                objetoRect.height / 2;


            // =====================================================
            // DISTANCIA HACIA EL CENTRO
            // =====================================================

            const offsetX =
                centroX - objetoX;


            const offsetY =
                centroY - objetoY;


            // =====================================================
            // POSICIÓN DEL SLOT
            // =====================================================

            const slotRect =
                slotDestino.getBoundingClientRect();


            const diferenciaX =
                slotRect.left +
                slotRect.width / 2 -
                (
                    objetoRect.left +
                    objetoRect.width / 2
                );


            const diferenciaY =
                slotRect.top +
                slotRect.height / 2 -
                (
                    objetoRect.top +
                    objetoRect.height / 2
                );


            // =====================================================
            // CREAR TIMELINE
            // =====================================================

            const tl = gsap.timeline({

                onComplete: () => {

                    // ---------------------------------------------
                    // AVISAR AL PADRE
                    // ---------------------------------------------

                    if (onRecoger) {

                        onRecoger(ID_OBJETO);

                    }


                    // ---------------------------------------------
                    // DESBLOQUEAR
                    // ---------------------------------------------

                    objetoAnimando.current = false;

                }

            });


            objetoTimelineRef.current = tl;


            // =====================================================
            // 1 — BRILLO + CRECER + GIRAR
            // =====================================================

            tl.to(
                objetoActual,
                {

                    filter: `
                        drop-shadow(0 0 50px #ffffff)
                        drop-shadow(0 0 120px #ffe600)
                        drop-shadow(0 0 220px #ffd000)
                        drop-shadow(0 0 340px #ff9900)
                    `,

                    scale: 1.35,
                    
                    rotation: 360,

                    duration: 0.35,

                    ease: "back.out(2)"

                }
            );


            // =====================================================
            // 2 — CÁMARA HACIA LA PINTURA
            // =====================================================

            tl.to(
                screen,
                {

                    scale: 2,

                    x: offsetX,

                    y: -340,

                    duration: 0.7,

                    ease: "power3.inOut"

                },

                "<"
            );


            // =====================================================
            // 3 — PEQUEÑA ESPERA
            // =====================================================

            tl.to(
                {},
                {

                    duration: 0.25

                }
            );


            // =====================================================
            // 4 — REGRESAR CÁMARA
            // =====================================================

            tl.to(
                screen,
                {

                    scale: 1,

                    x: 0,

                    y: 0,

                    duration: 0.7,

                    ease: "power3.inOut"

                }
            );


            // =====================================================
            // 5 — MOVER PINTURA AL SLOT
            // =====================================================

            tl.to(
                objetoActual,
                {

                    x: `+=${diferenciaX}`,

                    y: `+=${diferenciaY}`,

                    scale: 0.4,

                    rotation: 1080,

                    duration: 0.8,

                    ease: "power3.inOut"

                },

                "<"
            );


            // =====================================================
            // 6 — PEQUEÑO REBOTE
            // =====================================================

            tl.to(
                objetoActual,
                {

                    scale: 0.5,

                    duration: 0.12,

                    ease: "back.out(4)"

                }
            );


            // =====================================================
            // 7 — DESAPARECER
            // =====================================================

            tl.to(
                objetoActual,
                {

                    opacity: 0,

                    duration: 0.15

                }
            );


            // =====================================================
            // 8 — LIMPIAR FILTRO
            // =====================================================

            tl.set(
                objetoActual,
                {

                    clearProps: "filter"

                }
            );

        };


        // =========================================================
        // PAUSAR TODO
        // =========================================================

        const pausarTodo = () => {


            // -----------------------------------------------------
            // VIDEOS
            // -----------------------------------------------------

            pausarVideos();


            // -----------------------------------------------------
            // CÁMARA
            // -----------------------------------------------------

            if (cameraTimelineRef.current) {

                cameraTimelineRef.current.pause();

            }


            // -----------------------------------------------------
            // CARTEL
            // -----------------------------------------------------

            if (cartelTimelineRef.current) {

                cartelTimelineRef.current.pause();

            }


            // -----------------------------------------------------
            // OBJETO
            // -----------------------------------------------------

            if (objetoTimelineRef.current) {

                objetoTimelineRef.current.pause();

            }

        };


        // =========================================================
        // REANUDAR TODO
        // =========================================================

        const reanudarTodo = () => {


            // -----------------------------------------------------
            // SI TODAVÍA NO EMPEZÓ
            // -----------------------------------------------------

            if (!escenaIniciada.current) {

                iniciarTodo();

                return;

            }


            // -----------------------------------------------------
            // VIDEOS
            // -----------------------------------------------------

            reproducirVideos();


            // -----------------------------------------------------
            // CÁMARA
            // -----------------------------------------------------

            if (cameraTimelineRef.current) {

                cameraTimelineRef.current.resume();

            }


            // -----------------------------------------------------
            // CARTEL
            // -----------------------------------------------------

            if (cartelTimelineRef.current) {

                cartelTimelineRef.current.resume();

            }


            // -----------------------------------------------------
            // OBJETO
            // -----------------------------------------------------

            if (objetoTimelineRef.current) {

                objetoTimelineRef.current.resume();

            }

        };


        // =========================================================
        // EXPONER FUNCIONES
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


                {/* =================================================
                    PINTURA
                ================================================= */}

                {!objetoRecogido && (

                    <div
                        style={{
                            position: "relative",
                            display: "inline-block",
                            zIndex: 16,
                            pointerEvents: "auto"
                        }}
                    >

                        <img
                            ref={objetoRef}

                            src={objeto}

                            className="pin"

                            alt="objeto oculto"

                            onClick={clickObjeto}

                            draggable={false}

                            style={{
                                cursor: "pointer",
                                position: "relative",
                                zIndex: 16,
                                pointerEvents: "auto",
                                userSelect: "none"
                            }}
                        />

                    </div>

                )}

            </div>

        );

    }
);


export default Parte3dela1;

