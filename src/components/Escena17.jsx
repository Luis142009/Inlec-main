import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import { gsap } from "gsap";

import sol17 from "../assets/sol17.webm";
import personajes17 from "../assets/escenario17.webp";

import "../stylesheets/Escena17.css";


// Pasar a la siguiente escena cuando termine el video del sol
const AVANZAR_AL_TERMINAR = true;
const ESCENA_SIGUIENTE = 21;


// =========================================================
// TIEMPOS DEL VIDEO sol17.webm (segundos)
// El sol empieza a bajar en ~4.8s y el video corta a negro en ~6.0s
// =========================================================

const T_SOL_EMPIEZA_A_BAJAR = 4.6;
const T_CORTE_A_NEGRO = 6.0;
const T_LUNA_ENTRA = 6.0;


// =========================================================
// ZOOM INICIAL AL SOL
// =========================================================

const ZOOM_SOL = 2.4;
const DURACION_ZOOM_SOL = 2.6;


// =========================================================
// ESTRELLAS (posiciones fijas, generadas una sola vez)
// Rendimiento: las estrellas NO se animan una por una.
// Se reparten en 3 grupos y solo se anima la opacidad de cada
// grupo (3 animaciones en vez de 45).
// =========================================================

const CANTIDAD_ESTRELLAS = 36;
const GRUPOS_ESTRELLAS = 3;

const ESTRELLAS = Array.from({ length: CANTIDAD_ESTRELLAS }, (_, i) => {

  const r = (n) => {
    const x = Math.sin(i * 97.13 + n * 31.7) * 10000;
    return x - Math.floor(x);
  };

  return {
    left: r(1) * 100,
    top: r(2) * 55,
    size: 1.5 + r(3) * 2.5
  };

});

const GRUPOS = Array.from(
  { length: GRUPOS_ESTRELLAS },
  (_, g) => ESTRELLAS.filter((_, i) => i % GRUPOS_ESTRELLAS === g)
);


export const Escena17 = forwardRef(
  (
    {
      cambiarEscena,
      onRecoger,
      objetoRecogido,

      // Reproduce la canción de la escena (la maneja InterfazCap,
      // así respeta el volumen y la pausa globales)
      onPersonajeClick
    },
    ref
  ) => {

    // =========================================================
    // ESTADOS
    // =========================================================

    // true cuando el zoom al sol terminó y ya se puede dar click
    const [solListo, setSolListo] = useState(false);

    // true cuando ya se dio click en el sol
    const [iniciado, setIniciado] = useState(false);


    // =========================================================
    // REFS
    // =========================================================

    const escena17Ref = useRef(null);
    const stage17Ref = useRef(null);

    const fondo17Ref = useRef(null);

    const solRef = useRef(null);
    const noche17Ref = useRef(null);
    const estrellas17Ref = useRef(null);
    const luna17Ref = useRef(null);
    const personajes17Ref = useRef(null);
    const nochePersonajes17Ref = useRef(null);

    // Timeline activo (zoom inicial o timeline maestro)
    const camaraRef = useRef(null);

    // Para saber, sin depender de renders, si ya se hizo click
    const iniciadoRef = useRef(false);


    // =========================================================
    // VIDEOS
    // (la canción la reproduce InterfazCap)
    // =========================================================

    const obtenerMedios = () => {

      return [
        fondo17Ref.current
      ].filter(Boolean);

    };


    // =========================================================
    // ZOOM INICIAL AL SOL (al entrar a la escena)
    // =========================================================

    useEffect(() => {

      const escena = escena17Ref.current;
      const sol = solRef.current;

      if (!escena || !sol) {
        return;
      }


      // Posición del sol dentro de la escena (en px locales,
      // sin importar si un contenedor padre está escalado)

      const rEscena = escena.getBoundingClientRect();
      const rSol = sol.getBoundingClientRect();

      const escala = rEscena.width / escena.offsetWidth || 1;

      const solX = (rSol.left + rSol.width / 2 - rEscena.left) / escala;
      const solY = (rSol.top + rSol.height / 2 - rEscena.top) / escala;

      const centroX = escena.offsetWidth / 2;
      const centroY = escena.offsetHeight / 2;


      // El zoom crece desde el sol y lo deja centrado en pantalla

      gsap.set(escena, {

        transformOrigin: `${solX}px ${solY}px`,

        scale: 1,
        x: 0,
        y: 0

      });


      const zoom = gsap.to(escena, {

        scale: ZOOM_SOL,

        x: centroX - solX,
        y: centroY - solY,

        duration: DURACION_ZOOM_SOL,
        delay: 0.4,

        ease: "power2.inOut",

        onComplete: () => setSolListo(true)

      });

      camaraRef.current = zoom;


      // Limpieza al salir de la escena

      return () => {

        zoom.kill();

        if (camaraRef.current) {
          camaraRef.current.kill();
        }

        gsap.killTweensOf([
          noche17Ref.current,
          estrellas17Ref.current,
          luna17Ref.current,
          nochePersonajes17Ref.current
        ]);

        obtenerMedios().forEach((medio) => {
          try {
            medio.pause();
          } catch {}
        });

        gsap.set(escena, { clearProps: "all" });

      };

    }, []);


    // =========================================================
    // CLICK EN EL SOL
    // - la cámara vuelve a la pantalla normal
    // - el sol se va, llega la luna
    // - suena la canción
    // =========================================================

    const iniciarEscena = () => {

      if (iniciadoRef.current || !solListo) {
        return;
      }

      const escena = escena17Ref.current;

      if (!escena) {
        return;
      }

      iniciadoRef.current = true;
      setIniciado(true);


      // =======================================================
      // MATAR CÁMARA ANTERIOR (zoom inicial)
      // =======================================================

      if (camaraRef.current) {
        camaraRef.current.kill();
      }


      // =======================================================
      // INICIAR VIDEO + CANCIÓN JUNTOS
      // =======================================================

      obtenerMedios().forEach((medio) => {

        try {

          medio.currentTime = 0;

          medio
            .play()
            .catch(() => {});

        } catch {}

      });

      // La canción suena desde InterfazCap (audiosPersonajes17)

      if (onPersonajeClick) {

        onPersonajeClick("sol");

      }


      // =======================================================
      // ESTADO INICIAL DE LA NOCHE
      // =======================================================

      gsap.set(noche17Ref.current, { opacity: 0 });
      gsap.set(estrellas17Ref.current, { opacity: 0 });

      // La luna ya está en su posición final (CSS). Se anima solo con
      // transform (x / y), que es barato, en lugar de left / top
      // que obligan al navegador a recalcular el layout en cada cuadro.

      const stage = stage17Ref.current;

      const lunaDx = stage ? stage.offsetWidth * 0.20 : 0;
      const lunaDy = stage ? stage.offsetHeight * 0.44 : 0;

      gsap.set(luna17Ref.current, {
        opacity: 0,
        x: lunaDx,
        y: lunaDy
      });

      gsap.set(nochePersonajes17Ref.current, { opacity: 0 });


      // =======================================================
      // TIMELINE MAESTRO
      // (cámara + noche + luna: un solo objeto para pausar/reanudar)
      // =======================================================

      const tl = gsap.timeline();

      camaraRef.current = tl;


      // -------------------------------------------------------
      // 1. REGRESAR A LA PANTALLA NORMAL
      // -------------------------------------------------------

      tl.to(escena, {

        scale: 1,
        x: 0,
        y: 0,

        duration: 1.8,

        ease: "power2.inOut"

      }, 0);

      // ya en escala 1 se puede cambiar el origen sin que salte
      tl.set(escena, { transformOrigin: "center center" }, 1.8);


      // -------------------------------------------------------
      // 2. ATARDECER: el cielo se oscurece mientras baja el sol
      // -------------------------------------------------------

      tl.to(noche17Ref.current, {

        opacity: 1,

        duration: T_CORTE_A_NEGRO + 0.2 - T_SOL_EMPIEZA_A_BAJAR,

        ease: "sine.inOut"

      }, T_SOL_EMPIEZA_A_BAJAR);


      // Los personajes también se oscurecen. Antes se animaba un CSS filter
      // sobre una imagen enorme (muy pesado); ahora es una capa oscura con la
      // silueta de los personajes cuya opacidad se anima (barato).

      tl.to(nochePersonajes17Ref.current, {

        opacity: 1,

        duration: 2.6,

        ease: "sine.inOut"

      }, T_SOL_EMPIEZA_A_BAJAR);


      // -------------------------------------------------------
      // 3. LLEGAN LAS ESTRELLAS Y LA LUNA
      // -------------------------------------------------------

      tl.to(estrellas17Ref.current, {

        opacity: 1,

        duration: 3,

        ease: "sine.inOut",

        // los destellos solo empiezan cuando las estrellas se ven
        onStart: () => {
          estrellas17Ref.current?.classList.add("estrellas17--on");
        }

      }, T_LUNA_ENTRA);

      tl.to(luna17Ref.current, {

        opacity: 1,

        x: 0,
        y: 0,

        duration: 5,

        ease: "power2.out"

      }, T_LUNA_ENTRA);


      // -------------------------------------------------------
      // 4. ACERCARSE LENTO A LOS PERSONAJES
      // -------------------------------------------------------

      tl.to(escena, {

        scale: 1.3,

        x: 0,
        y: -90,

        duration: 5.5,

        ease: "power1.inOut"

      }, 7);


      // -------------------------------------------------------
      // 5. REGRESAR AL CENTRO ANTES DE TERMINAR
      // -------------------------------------------------------

      tl.to(escena, {

        scale: 1,

        x: 0,
        y: 0,

        duration: 2.2,

        ease: "power2.inOut"

      }, 12.6);

    };


    // =========================================================
    // CUANDO TERMINA EL VIDEO
    // (el video del sol marca el final de la escena)
    // =========================================================

    const terminarEscena = () => {

      obtenerMedios().forEach((medio) => {

        try {
          medio.pause();
        } catch {}

      });


      // PASAR A LA SIGUIENTE ESCENA

      if (AVANZAR_AL_TERMINAR && cambiarEscena) {

        cambiarEscena(ESCENA_SIGUIENTE);

      }

    };


    // =========================================================
    // PAUSAR TODO
    // =========================================================

    const pausarTodo = () => {

      obtenerMedios().forEach((medio) => {

        try {
          medio.pause();
        } catch {}

      });


      // PAUSAR CÁMARA

      if (camaraRef.current) {

        camaraRef.current.pause();

      }

      estrellas17Ref.current?.classList.add("estrellas17--pausa");

    };


    // =========================================================
    // REANUDAR TODO
    // (el video y la canción solo se reanudan si ya se dio click)
    // =========================================================

    const reanudarTodo = () => {

      if (iniciadoRef.current) {

        obtenerMedios().forEach((medio) => {

          try {

            medio
              .play()
              .catch(() => {});

          } catch {}

        });

      }


      // REANUDAR CÁMARA

      if (camaraRef.current) {

        camaraRef.current.resume();

      }

      estrellas17Ref.current?.classList.remove("estrellas17--pausa");

    };


    // =========================================================
    // EXPONER FUNCIONES AL COMPONENTE PADRE
    // =========================================================

    useImperativeHandle(
      ref,
      () => ({

        pausarTodo,

        reanudarTodo

      }),
      []
    );


    // =========================================================
    // RETURN
    // =========================================================

    return (

      <div
        ref={escena17Ref}
        className="escena17"
      >

        {/* Todo vive dentro del "stage" 16:9 para que el sol,
            la luna y los personajes siempre queden alineados */}

        <div
          ref={stage17Ref}
          className="stage17"
        >


          {/* =====================================================
              FONDO: CIELO + SOL (sol17.webm)
              Empieza pausado en el primer cuadro (sol arriba)
          ===================================================== */}

          <video
            ref={fondo17Ref}
            className="fondo17"

            muted
            playsInline
            preload="auto"

            onEnded={terminarEscena}
          >

            <source
              src={sol17}
              type="video/webm"
            />

          </video>


          {/* =====================================================
              NOCHE (cielo oscuro)
          ===================================================== */}

          <div
            ref={noche17Ref}
            className="noche17"
          />


          {/* =====================================================
              ESTRELLAS
          ===================================================== */}

          <div
            ref={estrellas17Ref}
            className="estrellas17"
          >

            {GRUPOS.map((grupo, g) => (

              <div
                key={g}
                className={`estrellas17-grupo estrellas17-grupo--${g}`}
              >

                {grupo.map((estrella, i) => (

                  <span
                    key={i}
                    className="estrella17"
                    style={{
                      left: `${estrella.left}%`,
                      top: `${estrella.top}%`,
                      width: `${estrella.size}px`,
                      height: `${estrella.size}px`
                    }}
                  />

                ))}

              </div>

            ))}

          </div>


          {/* =====================================================
              LUNA
          ===================================================== */}

          <div
            ref={luna17Ref}
            className="luna17"
          />


          {/* =====================================================
              PERSONAJES + TIERRA (con transparencia arriba)
          ===================================================== */}

          <img
            ref={personajes17Ref}
            className="personajes17"
            src={personajes17}
            alt=""
            draggable={false}
          />


          {/* =====================================================
              NOCHE SOBRE LOS PERSONAJES
              (capa oscura con la forma de la imagen; solo cambia
              su opacidad, sin filtros pesados)
          ===================================================== */}

          <div
            ref={nochePersonajes17Ref}
            className="personajes17-noche"
            style={{
              WebkitMaskImage: `url(${personajes17})`,
              maskImage: `url(${personajes17})`
            }}
          />


          {/* =====================================================
              SOL: ÁREA DE CLICK
          ===================================================== */}

          <div
            ref={solRef}
            className={
              "sol17-click" +
              (solListo && !iniciado ? " sol17-click--listo" : "")
            }

            role="button"
            tabIndex={solListo && !iniciado ? 0 : -1}
            aria-label="Tocar el sol"

            onClick={iniciarEscena}

            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                iniciarEscena();
              }
            }}
          />


        </div>

      </div>

    );

  }
);