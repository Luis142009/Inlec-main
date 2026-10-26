import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect
} from "react";

import "../stylesheets/EscenaVideo.css";

// Video de la escena 17.
// Ubicación: src/assets/escena17.mp4
import videoEscena17 from "../assets/escena17.mp4";


// Escena a la que se pasa cuando el video termina.
// Pon null si NO quieres que avance sola.
const ESCENA_SIGUIENTE = 18;

// Milisegundos de espera antes de avanzar al terminar el video.
const ESPERA_AL_TERMINAR = 600;


export const EscenaVideo = forwardRef(
  (
    {
      cambiarEscena,
      volumen = 0.7,
      src = videoEscena17,
      escenaSiguiente = ESCENA_SIGUIENTE
    },
    ref
  ) => {

    const videoRef = useRef(null);
    const iniciadaRef = useRef(false);
    const temporizadorRef = useRef(null);

    // Si el navegador bloquea el autoplay con sonido,
    // se muestra un botón para dar play manualmente.
    const [necesitaClick, setNecesitaClick] =
      useState(false);

    // Error real de carga del video (se muestra en pantalla)
    const [errorVideo, setErrorVideo] =
      useState(null);


    // =========================================================
    // CONTROL DEL VIDEO
    // =========================================================

    const reproducir = async () => {

      const video = videoRef.current;

      if (!video) {
        return;
      }

      try {

        await video.play();

        iniciadaRef.current = true;

        setNecesitaClick(false);

      } catch (error) {

        // AbortError = play() interrumpido por un pause()
        // (pasa en React StrictMode o al cambiar de escena): se ignora.
        // Solo NotAllowedError significa "autoplay bloqueado".
        if (error?.name === "NotAllowedError") {

          setNecesitaClick(true);

        } else if (error?.name !== "AbortError") {

          console.error(
            "EscenaVideo: no se pudo reproducir",
            error
          );

        }

      }

    };


    const pausar = () => {

      videoRef.current?.pause();

    };


    const reiniciar = () => {

      const video = videoRef.current;

      if (!video) {
        return;
      }

      video.currentTime = 0;

      reproducir();

    };


    // =========================================================
    // API QUE USA InterfazCap (pausa / play / iniciar)
    // =========================================================

    useImperativeHandle(ref, () => ({

      iniciarTodo: reproducir,

      reanudarTodo: reproducir,

      pausarTodo: pausar,

      reiniciarTodo: reiniciar,

      estaIniciada: () => iniciadaRef.current

    }));


    // =========================================================
    // AUTOPLAY AL ENTRAR A LA ESCENA
    // =========================================================

    useEffect(() => {

      reproducir();

      return () => {

        clearTimeout(temporizadorRef.current);

        videoRef.current?.pause();

      };

      // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);


    // =========================================================
    // VOLUMEN (controlado por el slider de efectos)
    // =========================================================

    useEffect(() => {

      if (videoRef.current) {

        videoRef.current.volume =
          Math.min(Math.max(volumen, 0), 1);

      }

    }, [volumen]);


    // =========================================================
    // AL TERMINAR EL VIDEO
    // =========================================================

    const alFallar = () => {

      const e = videoRef.current?.error;

      const motivos = {
        1: "Carga abortada",
        2: "Error de red",
        3: "Error al decodificar",
        4: "Formato o ruta no válidos (¿existe el archivo?)"
      };

      console.error(
        "EscenaVideo: error del video",
        e,
        "src =",
        src
      );

      setErrorVideo(
        motivos[e?.code] ||
        "No se pudo cargar el video"
      );

    };


    const alTerminar = () => {

      if (!escenaSiguiente || !cambiarEscena) {
        return;
      }

      temporizadorRef.current = setTimeout(
        () => cambiarEscena(escenaSiguiente),
        ESPERA_AL_TERMINAR
      );

    };


    return (

      <div className="escena-video">

        <video

          ref={videoRef}

          className="escena-video-player"

          src={src}

          playsInline

          preload="auto"

          onEnded={alTerminar}

          onError={alFallar}

        />


        {errorVideo && (

          <div className="escena-video-error">

            ⚠️ {errorVideo}

          </div>

        )}


        {necesitaClick && !errorVideo && (

          <button

            type="button"

            className="escena-video-play"

            onClick={reproducir}

            aria-label="Reproducir escena"

          >

            ▶

          </button>

        )}

      </div>

    );

  }
);

EscenaVideo.displayName = "EscenaVideo";

// Export por defecto: sirve tanto `import EscenaVideo from ...`
// como `import { EscenaVideo } from ...`
export default EscenaVideo;