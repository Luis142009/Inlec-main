import React, { 
  useState, 
  useRef, 
  useEffect 
} from "react"; 

import { LuisPlugin } from "../components/LuisPlugin"; 
import { Parte2dela1 } from "../components/Parte2dela1"; 
import { Parte3dela1 } from "../components/Parte3dela1"; 
import { Escena2alfa } from "../components/Escena2alfa"; 
import { Escena2beta } from "../components/Escena2beta"; 
import { Escena3 } from "../components/Escena3"; 
import { Escena4 } from "../components/Escena4"; 
import { Escena5 } from "../components/Escena5"; 
import { Escena6 } from "../components/Escena6"; 
import { Escena7 } from "../components/Escena7"; 
import { Escena8 } from "../components/Escena8"; 
import { Escena9 } from "../components/Escena9"; 
import { Escena10 } from "../components/Escena10"; 

import LibroPersonajes from "../components/LibroPersonajes"; 
import { PortadaCapitulo } from "../components/PortadaCapitulo"; 

import "../stylesheets/Textos.css"; 
import "../stylesheets/ObjetosModal.css"; 
import "../stylesheets/noticia-objetos.css"; 

import { 
  motion, 
  AnimatePresence 
} from "motion/react"; 

import song1 from "../assets/audio/song1.mp3"; 
import gallina from "../assets/audio/gallina.mp3"; 
import grillos from "../assets/audio/grillos.mp3"; 
import escena1 from "../assets/audio/escena1.mp3"; 
import escena1sra from "../assets/audio/escena1sra.mp3"; 
import ash from "../assets/audio/escena2ash.mp3"; 
import kristo from "../assets/audio/escena2kristo.mp3"; 
import wawas from "../assets/audio/wawas.mp3"; 
import es3 from "../assets/audio/escena3.mp3"; 
import sonido3 from "../assets/audio/sonido3.mp3"; 
import audio4s from "../assets/audio/audio4s.mp3"; 
import audio6 from "../assets/audio/audio6.mp3"; 
import robo from "../assets/audio/robo.mp3"; 
import Escenas7 from "../assets/audio/Escenas7.mp3"; 
import audio7 from "../assets/audio/audio7.mp3"; 
import fondo8 from "../assets/audio/fondo8.mp3"; 
import audio8 from "../assets/audio/audio8.mp3"; 
import audio9 from "../assets/audio/audio9.mp3"; 

import pintura from "../assets/svg/pintura.svg"; 
import manzana from "../assets/manzana.svg"; 
import huella from "../assets/svg/huella.svg"; 
import tomate from "../assets/svg/tomate.svg"; 


// =========================================================
// TOTAL DE ESCENAS
// =========================================================

const TOTAL_ESCENAS = 24;


// =========================================================
// SILUETAS DE OBJETOS POR CAPÍTULO
// =========================================================

const siluetasPorCapitulo = {

  1: [
    manzana,
    pintura,
    huella
  ],

  2: [
    tomate
  ]

};


// =========================================================
// CAPÍTULOS
// =========================================================

const capitulos = [

  {
    numero: 1,
    titulo: "LA FAMILIA FOX",
    escenaInicio: 1,
    escenaFin: 12,
    objetos: 4
  },

  {
    numero: 2,
    titulo: "EL PLAN DE LOS GRANJEROS",
    escenaInicio: 13,
    escenaFin: 24,
    objetos: 4
  }

];


const obtenerCapituloPorEscena = (numeroEscena) =>
  capitulos.find(
    (cap) =>
      numeroEscena >= cap.escenaInicio &&
      numeroEscena <= cap.escenaFin
  ) || null;


// =========================================================
// COMPONENTE
// =========================================================

const InterfazCap = () => {


  // =========================================================
  // ESCENA ACTUAL
  // =========================================================

  const [escena, setEscena] = useState(1);


  // =========================================================
  // SELECTOR DE ESCENAS
  // =========================================================

  const [
    selectorEscenasAbierto,
    setSelectorEscenasAbierto
  ] = useState(false);


  // =========================================================
  // PORTADA DE CAPÍTULO
  // =========================================================

  const [
    portadaVisible,
    setPortadaVisible
  ] = useState(false);

  const [
    numeroCapituloAnterior,
    setNumeroCapituloAnterior
  ] = useState(null);

  const capituloAnteriorRef = useRef(null);


  useEffect(() => {

    const capitulo =
      obtenerCapituloPorEscena(escena);

    if (
      capitulo &&
      escena === capitulo.escenaInicio
    ) {

      setNumeroCapituloAnterior(
        capituloAnteriorRef.current
      );

      capituloAnteriorRef.current =
        capitulo.numero;

      setPortadaVisible(true);

      if (capitulo.numero > 1) {

        setObjetoSeleccionado(null);

      }

    }

  }, [escena]);


  const cerrarPortadaCapitulo = () => {

    setPortadaVisible(false);

  };


  // =========================================================
  // SUBTÍTULOS
  // =========================================================

  const [
    subtitulosActivos,
    setSubtitulosActivos
  ] = useState(false);


  const subtitulos = {

    1: "En Inglaterra, desde lo lejos, en un campo, vive el Sr. Fox.",

    2: "Un zorro elegante, atleta, audaz y brillante con un toque de perspicacia en la mirada. Tiene 4 años.",

    3: "Comparte su vida con la Sra. Fox, una zorra elegante con sentido artístico y un gran sentido de la responsabilidad.",

    4: [
      "Ash, nacido 8 segundos después, que se siente diferente a los demás por no tener las mismas capacidades, pero con un fuerte carácter.",
      "Ambos tienen cuatro zorros Kristofferson, el mayor por 4 segundos, que se percibe como un atleta, el mejor en todo, con grandes habilidades generales."
    ],

    5: [
      "Junior, nacido 12 segundos después, curioso y con buena memoria para rutas y caminos.",
      "Charles, el menor, nacido 16 segundos después, pequeño, veloz y con gran talento para excavar."
    ],

    6: "Todos viven en una madriguera excavada bajo un gran árbol, en lo alto de una colina.",

    7: "La señora Fox, con voz dulce pero decidida, le pidió al señor Fox que trajera unos pollos, unos patos o quizá un par de pavos. Quería tenerlos listos para cocinarlos y así preparar un festín delicioso.",

    8: "Aquí va el texto de la escena 8.",

    9: "Conoce cada atajo, cada sombra y cada rincón de las tres granjas que lo rodean.",

    10: "Boggis, un hombre gordo y glotón de 50 años, con chaqueta y pantalones enormes, manchados de grasa por su dieta de pollo, huele a pollo podrido, roba aves gordas y jugosas.",

    11: "Bunce, un granjero bajito e irritable de 40 años, sucio y con un abrigo demasiado largo para su tamaño, huele a hígado de ganso, se lleva patos y gansos. Además, siempre comparan a Bunce con un duende y su abrigo le queda tan grande que lo arrastra como una túnica.",

    12: "Bean, un hombre alto, huesudo y flaco, tan flaco como un lápiz enfermizo de 60 años, vestido de forma austera con ropa que le cuelga por lo esquelético que es huele a sidra de manzana, consigue pavos y barriles de sidra.",

    13: "Siempre regresa antes del amanecer cargado de comida para que la Sra. Fox prepare el banquete familiar, y lo hace con tal astucia que los granjeros nunca logran atraparlo.",
    14: "Aquí va el texto de la escena 14.",
    15: "Aquí va el texto de la escena 15.",
    16: "Aquí va el texto de la escena 16.",
    17: "Aquí va el texto de la escena 17.",
    18: "Aquí va el texto de la escena 18.",
    19: "Aquí va el texto de la escena 19.",
    20: "Aquí va el texto de la escena 20.",
    21: "Aquí va el texto de la escena 21.",
    22: "Aquí va el texto de la escena 22.",
    23: "Aquí va el texto de la escena 23.",
    24: "Aquí va el texto de la escena 24."

  };


  // =========================================================
  // AUDIO POR ESCENA
  // =========================================================

  const audiosPorEscena = {

    1: {
      musica: song1,
      grupoMusica: "inicio",
      grupoEfectos: "escena1",

      efectos: [
        {
          src: gallina,
          volumen: 0.30,
          loop: false,
          persistente: false
        },

        {
          src: grillos,
          volumen: 0.22,
          loop: true,
          persistente: false
        },

        {
          src: escena1,
          volumen: 3,
          loop: false,
          persistente: true,
          hastaEscena: 2
        }
      ]
    },

    2: {
      musica: song1,
      grupoMusica: "inicio",
      grupoEfectos: "escena2",
      efectos: []
    },

    3: {
      musica: song1,
      grupoMusica: "inicio",
      grupoEfectos: "escena3",

      efectos: [
        {
          src: escena1sra,
          volumen: 3,
          loop: false,
          persistente: false
        }
      ]
    },

    4: {
      musica: song1,
      grupoMusica: "inicio",
      grupoEfectos: "escena4",

      efectos: [
        {
          src: kristo,
          volumen: 3,
          persistente: false,
          secuencia: "kristo"
        },

        {
          src: ash,
          volumen: 3,
          persistente: false,
          secuencia: "ash"
        }
      ]
    },

    5: {
      musica: song1,
      grupoMusica: "inicio",
      grupoEfectos: "escena5",

      efectos: [
        {
          src: wawas,
          volumen: 3,
          persistente: false
        }
      ]
    },

    6: {
      musica: sonido3,
      grupoMusica: "escena6",
      grupoEfectos: "escena6",

      efectos: [
        {
          src: es3,
          volumen: 3,
          persistente: false
        }
      ]
    },

    7: {
      musica: audio4s,
      grupoMusica: "escena7",
      grupoEfectos: "escena7",
      efectos: []
    },

    8: {
      musica: audio4s,
      grupoMusica: "escena7",
      grupoEfectos: "escena8",
      efectos: []
    },

    9: {
      musica: robo,
      grupoMusica: "escena9",
      grupoEfectos: "escena9",

      efectos: [
        {
          src: audio6,
          volumen: 3,
          persistente: false
        }
      ]
    },

    10: {
      musica: Escenas7,
      grupoMusica: "escena10",
      grupoEfectos: "escena10",

      efectos: [
        {
          src: audio7,
          volumen: 3
        }
      ]
    },

    11: {
      musica: fondo8,
      grupoMusica: "escena11",
      grupoEfectos: "escena11",

      efectos: [
        {
          src: audio8,
          volumen: 3
        }
      ]
    },

    12: {
      musica: audio9,
      grupoMusica: "escena12",
      grupoEfectos: "escena12",

      efectos: []
    }

  };


  // =========================================================
  // AUDIO FALLBACK
  // =========================================================

  const audioFallback = {
    musica: song1,
    grupoMusica: "fallback",
    grupoEfectos: "fallback",
    efectos: []
  };


  const obtenerAudioEscena = (numeroEscena) => {

    return (
      audiosPorEscena[numeroEscena] ||
      audioFallback
    );

  };


  // =========================================================
  // CANTIDAD DE EFECTOS
  // =========================================================

  const maxEfectosSimultaneos =
    Object.values(audiosPorEscena)
      .reduce((max, config) => {

        const cantidad =
          config.efectos
            ? config.efectos.length
            : 0;

        return Math.max(
          max,
          cantidad
        );

      }, 0);


  // =========================================================
  // REFS AUDIO
  // =========================================================

  const musicaRef = useRef(null);
  const efectosRefs = useRef([]);


  // =========================================================
  // ESTADO AUDIO
  // =========================================================

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [volumenMusica, setVolumenMusica] =
    useState(0.7);

  const [volumenEfectos, setVolumenEfectos] =
    useState(0.7);

  const grupoMusicaRef = useRef(null);
  const grupoEfectosRef = useRef(null);


  // =========================================================
  // WEB AUDIO
  // =========================================================

  const audioContextRef = useRef(null);
  const musicaGainRef = useRef(null);
  const efectosGainRef = useRef([]);
  const efectosVolumenBaseRef = useRef([]);
  const efectosPersistentesRef = useRef([]);

  const secuenciaEscena4Activa =
    useRef(false);


  // =========================================================
  // AUDIO CONTEXT
  // =========================================================

  const obtenerAudioContext = () => {

    if (!audioContextRef.current) {

      const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

      if (!AudioContext) {

        console.warn(
          "Web Audio API no disponible"
        );

        return null;

      }

      audioContextRef.current =
        new AudioContext();

    }

    return audioContextRef.current;

  };


  // =========================================================
  // CONFIGURAR GANANCIA
  // =========================================================

  const configurarGanancia =
    (audio, tipo, indice = 0) => {

      const ctx =
        obtenerAudioContext();

      if (!ctx || !audio) {
        return null;
      }


      if (tipo === "musica") {

        if (!musicaGainRef.current) {

          const source =
            ctx.createMediaElementSource(audio);

          const gain =
            ctx.createGain();

          source.connect(gain);
          gain.connect(ctx.destination);

          musicaGainRef.current =
            gain;

        }

        return musicaGainRef.current;

      }


      if (!efectosGainRef.current[indice]) {

        const source =
          ctx.createMediaElementSource(audio);

        const gain =
          ctx.createGain();

        source.connect(gain);
        gain.connect(ctx.destination);

        efectosGainRef.current[indice] =
          gain;

      }

      return efectosGainRef.current[indice];

    };


  // =========================================================
  // ACTUALIZAR VOLUMEN
  // =========================================================

  useEffect(() => {

    if (musicaGainRef.current) {

      musicaGainRef.current.gain.value =
        volumenMusica;

    }

    efectosGainRef.current.forEach(
      (gain, indice) => {

        if (!gain) {
          return;
        }

        const volumenBase =
          efectosVolumenBaseRef.current[indice] ??
          1;

        gain.gain.value =
          volumenBase *
          volumenEfectos;

      }
    );

  }, [
    volumenMusica,
    volumenEfectos
  ]);


  // =========================================================
  // PAUSA
  // =========================================================

  const [pausado, setPausado] =
    useState(false);


  // =========================================================
  // DETENER EFECTOS
  // =========================================================

  const detenerTodosLosEfectos =
    (
      numeroEscena = null,
      forzar = false
    ) => {

      secuenciaEscena4Activa.current =
        false;

      efectosRefs.current.forEach(
        (audio, indice) => {

          if (!audio) {
            return;
          }

          const persistente =
            efectosPersistentesRef.current[indice];

          const puedeContinuar =
            persistente &&
            numeroEscena !== null &&
            numeroEscena <=
            persistente.hastaEscena;

          if (
            !forzar &&
            puedeContinuar
          ) {
            return;
          }

          try {

            audio.pause();
            audio.currentTime = 0;

            efectosPersistentesRef.current[indice] =
              null;

            efectosVolumenBaseRef.current[indice] =
              1;

          } catch (error) {

            console.log(
              "Error limpiando efecto:",
              error
            );

          }

        }
      );

    };


  // =========================================================
  // DETENER TODO AUDIO
  // =========================================================

  const detenerTodoElAudio = () => {

    if (musicaRef.current) {

      musicaRef.current.pause();
      musicaRef.current.currentTime = 0;

    }

    detenerTodosLosEfectos(
      null,
      true
    );

    grupoMusicaRef.current =
      null;

    grupoEfectosRef.current =
      null;

  };


  // =========================================================
  // REPRODUCIR EFECTO
  // =========================================================

  const reproducirEfecto =
    (
      efecto,
      indice,
      numeroEscena
    ) => {

      const audio =
        efectosRefs.current[indice];

      if (!audio || !efecto) {
        return;
      }

      try {

        audio.pause();

        audio.src =
          efecto.src;

        audio.loop =
          !!efecto.loop;

        audio.currentTime =
          0;

        const volumenBase =
          efecto.volumen ?? 0.5;

        efectosVolumenBaseRef.current[indice] =
          volumenBase;


        if (
          efecto.persistente &&
          efecto.hastaEscena
        ) {

          efectosPersistentesRef.current[indice] = {
            hastaEscena:
              efecto.hastaEscena
          };

        } else {

          efectosPersistentesRef.current[indice] =
            null;

        }


        const gain =
          configurarGanancia(
            audio,
            "efecto",
            indice
          );


        if (gain) {

          gain.gain.value =
            volumenBase *
            volumenEfectos;

        } else {

          audio.volume =
            Math.min(
              volumenBase *
              volumenEfectos,
              1
            );

        }


        audio
          .play()
          .catch(() => {});

      } catch (error) {

        console.log(
          "⚠️ Error reproduciendo efecto:",
          error
        );

      }

    };


  // =========================================================
  // SECUENCIA ESCENA 4
  // =========================================================

  const reproducirSecuenciaEscena4 =
    () => {

      const kristoAudio =
        efectosRefs.current[0];

      const ashAudio =
        efectosRefs.current[1];

      if (!kristoAudio || !ashAudio) {
        return;
      }


      secuenciaEscena4Activa.current =
        true;


      const kristoConfig =
        audiosPorEscena[4]
          .efectos[0];


      kristoAudio.pause();

      kristoAudio.src =
        kristoConfig.src;

      kristoAudio.loop =
        false;

      kristoAudio.currentTime =
        0;


      efectosVolumenBaseRef.current[0] =
        kristoConfig.volumen;


      const kristoGain =
        configurarGanancia(
          kristoAudio,
          "efecto",
          0
        );


      if (kristoGain) {

        kristoGain.gain.value =
          kristoConfig.volumen *
          volumenEfectos;

      }


      kristoAudio.onended =
        () => {

          if (
            !secuenciaEscena4Activa.current
          ) {
            return;
          }


          const ashConfig =
            audiosPorEscena[4]
              .efectos[1];


          ashAudio.pause();

          ashAudio.src =
            ashConfig.src;

          ashAudio.loop =
            false;

          ashAudio.currentTime =
            0;


          efectosVolumenBaseRef.current[1] =
            ashConfig.volumen;


          const ashGain =
            configurarGanancia(
              ashAudio,
              "efecto",
              1
            );


          if (ashGain) {

            ashGain.gain.value =
              ashConfig.volumen *
              volumenEfectos;

          }


          ashAudio
            .play()
            .catch(() => {});

        };


      kristoAudio
        .play()
        .catch(() => {});

    };


  // =========================================================
  // REPRODUCIR AUDIO ESCENA
  // =========================================================

  const reproducirAudioDeEscena =
    async (
      numeroEscena,
      forzarReinicio = false
    ) => {

      const config =
        obtenerAudioEscena(
          numeroEscena
        );


      // =======================================================
      // MÚSICA
      // =======================================================

      if (
        musicaRef.current &&
        config.musica
      ) {

        const musica =
          musicaRef.current;

        const mismaMusica =
          grupoMusicaRef.current ===
          config.grupoMusica;


        if (
          mismaMusica &&
          !forzarReinicio
        ) {

          if (musica.paused) {

            try {

              const ctx =
                obtenerAudioContext();

              if (
                ctx &&
                ctx.state ===
                "suspended"
              ) {

                await ctx.resume();

              }

              await musica.play();

            } catch {}

          }

        } else {

          try {

            musica.pause();

            musica.src =
              config.musica;

            musica.loop =
              true;

            musica.currentTime =
              0;


            const gain =
              configurarGanancia(
                musica,
                "musica"
              );


            if (gain) {

              gain.gain.value =
                volumenMusica;

            }


            grupoMusicaRef.current =
              config.grupoMusica;


            await musica.play();

          } catch {}

        }

      }


      // =======================================================
      // EFECTOS
      // =======================================================

      const nuevoGrupoEfectos =
        grupoEfectosRef.current !==
        config.grupoEfectos;


      if (nuevoGrupoEfectos) {

        detenerTodosLosEfectos(
          numeroEscena
        );

        grupoEfectosRef.current =
          config.grupoEfectos;

      }


      if (
        numeroEscena === 4 &&
        config.efectos.length > 0
      ) {

        reproducirSecuenciaEscena4();

        return;

      }


      const efectos =
        config.efectos || [];


      efectos.forEach(
        (efecto, i) => {

          reproducirEfecto(
            efecto,
            i,
            numeroEscena
          );

        }
      );

    };


  // =========================================================
  // CAMBIAR AUDIO AL CAMBIAR ESCENA
  // =========================================================

  useEffect(() => {

    const cambiarAudio =
      async () => {

        if (!isPlaying) {
          return;
        }


        const config =
          obtenerAudioEscena(
            escena
          );


        const mismaMusica =
          grupoMusicaRef.current ===
          config.grupoMusica;


        if (!mismaMusica) {

          await reproducirAudioDeEscena(
            escena
          );

        } else {

          const nuevoGrupoEfectos =
            grupoEfectosRef.current !==
            config.grupoEfectos;


          if (nuevoGrupoEfectos) {

            await reproducirAudioDeEscena(
              escena
            );

          }

        }

      };


    cambiarAudio();

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [escena]);


  // =========================================================
  // PAUSAR AUDIO
  // =========================================================

  const pausarAudioActual = () => {

    if (musicaRef.current) {

      musicaRef.current.pause();

    }

    efectosRefs.current.forEach(
      audio => {

        if (audio) {

          audio.pause();

        }

      }
    );

  };


  // =========================================================
  // ACTIVAR / DESACTIVAR AUDIO
  // =========================================================

  const toggleMusic = async () => {

    if (isPlaying) {

      pausarAudioActual();

      setIsPlaying(false);

      return;

    }


    const ctx =
      obtenerAudioContext();


    if (
      ctx &&
      ctx.state === "suspended"
    ) {

      await ctx.resume();

    }


    await reproducirAudioDeEscena(
      escena
    );


    setIsPlaying(true);

  };


  // =========================================================
  // FULLSCREEN
  // =========================================================

  const gameAreaRef =
    useRef(null);


  const toggleFullscreen =
    async () => {

      try {

        if (!document.fullscreenElement) {

          await gameAreaRef.current
            ?.requestFullscreen();

        } else {

          await document.exitFullscreen();

        }

      } catch {}

    };


  // =========================================================
  // REFERENCIAS ESCENAS
  // =========================================================

  const luisRef =
    useRef(null);

  const parte2Ref =
    useRef(null);

  const parte3Ref =
    useRef(null);

  const escena2AlfaRef =
    useRef(null);

  const escena2BetaRef =
    useRef(null);

  const escena3Ref =
    useRef(null);

  const escena4Ref =
    useRef(null);

  const escena5Ref =
    useRef(null);

  const escena6Ref =
    useRef(null);

  const escena7Ref =
    useRef(null);

  const escena8Ref =
    useRef(null);

  const escena9Ref =
    useRef(null);

  // NUEVA ESCENA 13
  const escena10Ref =
    useRef(null);


  // =========================================================
  // OBJETOS
  // =========================================================

  const [
    objetosPorCapitulo,
    setObjetosPorCapitulo
  ] = useState({
    1: [null, null, null, null],
    2: [null, null, null, null]
  });


  const capituloActual =
    obtenerCapituloPorEscena(escena);


  const objetos =
    objetosPorCapitulo[
      capituloActual?.numero
    ] ||
    [null, null, null, null];


  const manzanaRecogida =
    objetosPorCapitulo[1]?.includes("manzana") ??
    false;


  // =========================================================
  // OBJETO SELECCIONADO
  // =========================================================

  const [
    objetoSeleccionado,
    setObjetoSeleccionado
  ] = useState(null);


  // =========================================================
  // INFORMACIÓN OBJETOS
  // =========================================================

  const informacionObjetos = {

    manzana: {

      nombre: "Manzana",

      descripcion:
        "Una manzana roja, fresca y jugosa. Fue encontrada bajo el gran árbol. Parece tener estrellas?",

      imagen: manzana,

      detalle:
        "Objeto encontrado bajo el gran árbol"

    },


    pintura: {

      nombre: "Pintura",

      descripcion:
        "Una misteriosa pintura encontrada. Su intenso color parece ocultar algo?",

      imagen: pintura,

      detalle:
        "Objeto encontrado al lado de la señora Fox"

    },


    huella: {

      nombre: "Huella",

      descripcion:
        "Una misteriosa huella encontrada en la granja. Todo apunta a que pertenece a un zorro astuto y sigiloso... pero el Sr. Fox insiste en que seguramente fue otro zorro",

      imagen: huella,

      detalle:
        "Huella encontrada en las paredes de la granja de bean"

    },


    tomate: {

      nombre: "Tomate",

      descripcion:
        "Un tomate maduro y jugoso, robado directamente del huerto de una de las granjas.",

      imagen: tomate,

      detalle:
        "Objeto encontrado en el capítulo 2"

    }

  };


  // =========================================================
  // ABRIR DESCRIPCIÓN OBJETO
  // =========================================================

  const abrirDescripcionObjeto =
    (objeto) => {

      if (!objeto) {
        return;
      }


      if (!informacionObjetos[objeto]) {

        console.warn(
          `El objeto "${objeto}" no existe en informacionObjetos.`
        );

        return;

      }


      setObjetoSeleccionado(
        objeto
      );

    };


  // =========================================================
  // CERRAR DESCRIPCIÓN
  // =========================================================

  const cerrarDescripcionObjeto =
    () => {

      setObjetoSeleccionado(null);

    };


  // =========================================================
  // ESCAPE
  // =========================================================

  useEffect(() => {

    const manejarEscape =
      (event) => {

        if (event.key === "Escape") {

          cerrarDescripcionObjeto();

          setSelectorEscenasAbierto(
            false
          );

        }

      };


    window.addEventListener(
      "keydown",
      manejarEscape
    );


    return () =>
      window.removeEventListener(
        "keydown",
        manejarEscape
      );

  }, []);


  // =========================================================
  // RECOGER OBJETO
  // =========================================================

  const recogerObjeto =
    (objeto) => {

      console.log(
        "🟢 OBJETO RECIBIDO:",
        objeto
      );


      if (!objeto) {

        console.warn(
          "Se intentó recoger un objeto vacío."
        );

        return;

      }


      if (!informacionObjetos[objeto]) {

        console.warn(
          `El objeto "${objeto}" NO existe en informacionObjetos.`
        );

        return;

      }


      const capitulo =
        obtenerCapituloPorEscena(escena);

      const numeroCapitulo =
        capitulo?.numero || 1;


      setObjetosPorCapitulo((prev) => {

        const inventarioActual =
          prev[numeroCapitulo] ||
          [null, null, null, null];


        if (inventarioActual.includes(objeto)) {

          console.log(
            "⚠️ El objeto ya estaba en el inventario:",
            objeto
          );

          return prev;

        }


        const indiceVacio =
          inventarioActual.findIndex(
            (slot) => slot === null
          );


        if (indiceVacio === -1) {

          console.warn(
            "⚠️ El inventario está lleno."
          );

          return prev;

        }


        const nuevoInventario =
          [...inventarioActual];


        nuevoInventario[indiceVacio] =
          objeto;


        console.log(
          `✅ INVENTARIO ACTUALIZADO (capítulo ${numeroCapitulo}):`,
          nuevoInventario
        );


        return {
          ...prev,
          [numeroCapitulo]:
            nuevoInventario
        };

      });

    };


  // =========================================================
  // SUBTÍTULOS
  // =========================================================

  const toggleSubtitulos =
    () => {

      setSubtitulosActivos(
        prev => !prev
      );

    };


  const textosEscenaActual =
    subtitulos[escena]
      ? (
        Array.isArray(
          subtitulos[escena]
        )
          ? subtitulos[escena]
          : [subtitulos[escena]]
      )
      : [];


  // =========================================================
  // REFERENCIA ESCENA
  // =========================================================

  const obtenerRefEscena =
    () => {

      switch (escena) {

        case 1:
          return luisRef;

        case 2:
          return parte2Ref;

        case 3:
          return parte3Ref;

        case 4:
          return escena2AlfaRef;

        case 5:
          return escena2BetaRef;

        case 6:
          return escena3Ref;

        case 7:
          return escena4Ref;

        case 8:
          return escena5Ref;

        case 9:
          return escena6Ref;

        case 10:
          return escena7Ref;

        case 11:
          return escena8Ref;

        case 12:
          return escena9Ref;

        // ESCENA 13
        case 13:
          return escena10Ref;

        default:
          return null;

      }

    };


  // =========================================================
  // INICIAR ESCENA
  // =========================================================

  const iniciarEscena =
    () => {

      const refActual =
        obtenerRefEscena();


      if (!refActual?.current) {
        return;
      }


      if (
        refActual.current.iniciarTodo
      ) {

        refActual.current.iniciarTodo();

        setPausado(false);

        return;

      }


      if (
        refActual.current.iniciarCamara
      ) {

        refActual.current.iniciarCamara();

        setPausado(false);

        return;

      }


      if (
        refActual.current.reanudarTodo
      ) {

        refActual.current.reanudarTodo();

        setPausado(false);

      }

    };


  // =========================================================
  // PAUSAR / REANUDAR
  // =========================================================

  const togglePausa =
    () => {

      const refActual =
        obtenerRefEscena();


      if (!refActual?.current) {
        return;
      }


      // REANUDAR

      if (pausado) {

        if (
          refActual.current.reanudarTodo
        ) {

          refActual.current.reanudarTodo();

        }


        if (musicaRef.current) {

          musicaRef.current
            .play()
            .catch(() => {});

        }


        efectosRefs.current.forEach(
          audio => {

            if (audio) {

              audio
                .play()
                .catch(() => {});

            }

          }
        );


        setPausado(false);

        return;

      }


      // SI NUNCA HA EMPEZADO

      if (
        refActual.current.estaIniciada
      ) {

        const iniciada =
          refActual.current
            .estaIniciada();


        if (!iniciada) {

          if (
            refActual.current.iniciarTodo
          ) {

            refActual.current
              .iniciarTodo();

          }


          if (
            refActual.current.iniciarCamara
          ) {

            refActual.current
              .iniciarCamara();

          }


          setPausado(false);

          return;

        }

      }


      // PAUSAR

      if (
        refActual.current.pausarTodo
      ) {

        refActual.current.pausarTodo();

      }


      pausarAudioActual();

      setPausado(true);

    };


  // =========================================================
  // CAMBIAR ESCENA
  // =========================================================

  const cambiarEscena =
    (nuevaEscena) => {

      setEscena(
        nuevaEscena
      );

      setPausado(false);

      setSelectorEscenasAbierto(
        false
      );

    };


  const seleccionarEscena =
    (numeroEscena) => {

      cambiarEscena(
        numeroEscena
      );

      setSelectorEscenasAbierto(
        false
      );

    };


  // =========================================================
  // ATRÁS / ADELANTE
  // =========================================================

  const retroceder =
    () => {

      setEscena(
        prev =>
          Math.max(
            1,
            prev - 1
          )
      );

      setPausado(false);

    };


  const avanzar =
    () => {

      setEscena(
        prev =>
          Math.min(
            TOTAL_ESCENAS,
            prev + 1
          )
      );

      setPausado(false);

    };


  // =========================================================
  // TRANSICIÓN
  // =========================================================

  const transicionEscena = {

    initial: {
      opacity: 0,
      y: 15,
      filter:
        "blur(8px) brightness(1.15)"
    },

    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter:
        "blur(0px) brightness(1)"
    },

    exit: {
      opacity: 0,
      y: -15,
      filter:
        "blur(8px) brightness(1.1)"
    },

    transition: {
      duration: 0.45,
      ease: [
        0.25,
        0.1,
        0.25,
        1
      ]
    },

    style: {
      width: "100%",
      height: "100%"
    }

  };


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <>

      {/* =====================================================
          AUDIOS
      ===================================================== */}

      <audio
        ref={musicaRef}
        preload="auto"
      />


      {Array.from({
        length:
          maxEfectosSimultaneos
      }).map((_, i) => (

        <audio
          key={`efecto-${i}`}
          preload="auto"
          ref={(el) => {
            efectosRefs.current[i] =
              el;
          }}
        />

      ))}


      {/* =====================================================
          INTERFAZ
      ===================================================== */}

      <motion.div
        className="interfaz-wrapper"

        initial={{
          opacity: 0,
          scale: 0
        }}

        animate={{
          opacity: 1,
          scale: 1
        }}

        transition={{
          duration: 0.4,

          scale: {
            type: "spring",
            visualDuration: 0.4,
            bounce: 0.5
          }
        }}
      >


        {/* ===================================================
            PORTADA
        =================================================== */}

        <PortadaCapitulo

          visible={
            portadaVisible
          }

          numero={
            obtenerCapituloPorEscena(escena)?.numero
          }

          numeroAnterior={
            numeroCapituloAnterior
          }

          titulo={
            obtenerCapituloPorEscena(escena)?.titulo
          }

          totalObjetos={
            obtenerCapituloPorEscena(escena)?.objetos
          }

          objetos={
            siluetasPorCapitulo[
              obtenerCapituloPorEscena(escena)?.numero
            ] || []
          }

          onComenzar={
            cerrarPortadaCapitulo
          }

        />


        <div className="interfaz-cap">

          <div className="row g-0">

            <div className="col-12">

              <div
                className="game-area"
                ref={gameAreaRef}
              >


                {/* =================================================
                    SUBTÍTULOS
                ================================================= */}

                <AnimatePresence mode="wait">

                  {subtitulosActivos &&
                    textosEscenaActual.length >
                    0 && (

                      <React.Fragment
                        key={`subtitulo-wrap-${escena}`}
                      >

                        <motion.div
                          className="subtitulos-backdrop activo"

                          initial={{
                            opacity: 0
                          }}

                          animate={{
                            opacity: 1
                          }}

                          exit={{
                            opacity: 0
                          }}

                          transition={{
                            duration: 0.3
                          }}
                        />


                        {textosEscenaActual.map(
                          (texto, i) => (

                            <motion.div

                              key={`sub-${escena}-${i}`}

                              className={`subtitulos subtitulos-${i}`}

                              initial={{
                                opacity: 0,
                                y: 20
                              }}

                              animate={{
                                opacity: 1,
                                y: 0
                              }}

                              exit={{
                                opacity: 0,
                                y: 20
                              }}

                              transition={{
                                duration: 0.25,
                                delay:
                                  i * 0.12
                              }}
                            >

                              {texto}

                            </motion.div>

                          )
                        )}

                      </React.Fragment>

                    )}

                </AnimatePresence>


                <div className="anim-label">

                  <AnimatePresence mode="wait">


                    {/* =================================================
                        ESCENA 1
                    ================================================= */}

                    {escena === 1 && (

                      <motion.div
                        key="escena1"
                        {...transicionEscena}
                      >

                        <LuisPlugin

                          ref={luisRef}

                          cambiarEscena={
                            cambiarEscena
                          }

                          onRecoger={
                            recogerObjeto
                          }

                          manzanaRecogida={
                            manzanaRecogida
                          }

                          onMrFoxClick={
                            toggleMusic
                          }

                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 2
                    ================================================= */}

                    {escena === 2 && (

                      <motion.div
                        key="escena2"
                        {...transicionEscena}
                      >

                        <Parte2dela1
                          ref={parte2Ref}
                          cambiarEscena={
                            cambiarEscena
                          }
                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 3
                    ================================================= */}

                    {escena === 3 && (

                      <motion.div
                        key="escena3"
                        {...transicionEscena}
                      >

                        <Parte3dela1

                          ref={parte3Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                          onRecoger={
                            recogerObjeto
                          }

                          objetoRecogido={
                            objetos.includes(
                              "pintura"
                            )
                          }

                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 4
                    ================================================= */}

                    {escena === 4 && (

                      <motion.div
                        key="escena4"
                        {...transicionEscena}
                      >

                        <Escena2alfa

                          ref={escena2AlfaRef}

                          cambiarEscena={
                            cambiarEscena
                          }

                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 5
                    ================================================= */}

                    {escena === 5 && (

                      <motion.div
                        key="escena5"
                        {...transicionEscena}
                      >

                        <Escena2beta

                          ref={escena2BetaRef}

                          cambiarEscena={
                            cambiarEscena
                          }

                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 6
                    ================================================= */}

                    {escena === 6 && (

                      <motion.div
                        key="escena6"
                        {...transicionEscena}
                      >

                        <Escena3

                          ref={escena3Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 7
                    ================================================= */}

                    {escena === 7 && (

                      <motion.div
                        key="escena7"
                        {...transicionEscena}
                      >

                        <Escena4

                          ref={escena4Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 8
                    ================================================= */}

                    {escena === 8 && (

                      <motion.div
                        key="escena8"
                        {...transicionEscena}
                      >

                        <Escena5

                          ref={escena5Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 9
                    ================================================= */}

                    {escena === 9 && (

                      <motion.div
                        key="escena9"
                        {...transicionEscena}
                      >

                        <Escena6

                          ref={escena6Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 10
                    ================================================= */}

                    {escena === 10 && (

                      <motion.div
                        key="escena10"
                        {...transicionEscena}
                      >

                        <Escena7

                          ref={escena7Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 11
                    ================================================= */}

                    {escena === 11 && (

                      <motion.div
                        key="escena11"
                        {...transicionEscena}
                      >

                        <Escena8

                          ref={escena8Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 12
                    ================================================= */}

                    {escena === 12 && (

                      <motion.div
                        key="escena12"
                        {...transicionEscena}
                      >

                        <Escena9

                          ref={escena9Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                          onRecoger={
                            recogerObjeto
                          }

                          objetoRecogido={
                            objetos.includes(
                              "huella"
                            )
                          }

                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENA 13
                    ================================================= */}

                    {escena === 13 && (

                      <motion.div
                        key="escena13"
                        {...transicionEscena}
                      >

                        <Escena10

                          ref={escena10Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                          onRecoger={
                            recogerObjeto
                          }

                          objetoRecogido={
                            objetos.includes(
                              "tomate"
                            )
                          }

                        />

                      </motion.div>

                    )}


                    {/* =================================================
                        ESCENAS 14 - 24
                    ================================================= */}

                    {escena >= 14 && (

                      <motion.div

                        key={`escena-${escena}`}

                        {...transicionEscena}

                        style={{
                          ...transicionEscena.style,
                          display: "flex",
                          alignItems: "center",
                          justifyContent:
                            "center"
                        }}

                      >

                        <div
                          style={{
                            color: "white",
                            textAlign:
                              "center",
                            fontSize:
                              "24px",
                            padding:
                              "30px"
                          }}
                        >

                          Escena {escena}

                        </div>

                      </motion.div>

                    )}

                  </AnimatePresence>

                </div>

              </div>

            </div>

          </div>


          {/* =====================================================
              CONTROLES
          ===================================================== */}

          <div className="controls-bar">

            <div className="row align-items-center g-0">

              <div className="col-auto d-flex gap-2">


                {/* =================================================
                    SUBTÍTULOS
                ================================================= */}

                <div

                  className="btn-ctrl"

                  onClick={
                    toggleSubtitulos
                  }

                  style={{
                    cursor:
                      "pointer"
                  }}

                >

                  <motion.img

                    className="iconos"

                    src="./T.png"

                    whileHover={{
                      scale: 1.2
                    }}

                    whileTap={{
                      scale: 0.8
                    }}

                  />

                </div>


                {/* =================================================
                    PAUSA
                ================================================= */}

                <div

                  className="btn-ctrl"

                  onClick={
                    togglePausa
                  }

                  style={{
                    cursor:
                      "pointer"
                  }}

                >

                  <motion.img

                    className="iconos"

                    src={
                      pausado
                        ? "./play.png"
                        : "./Pausa.png"
                    }

                    whileHover={{
                      scale: 1.2
                    }}

                    whileTap={{
                      scale: 0.8
                    }}

                  />

                </div>


                {/* =================================================
                    MÚSICA
                ================================================= */}

                <div

                  className="btn-ctrl"

                  onClick={
                    toggleMusic
                  }

                  style={{
                    cursor:
                      "pointer"
                  }}

                >

                  <motion.img

                    className="iconos"

                    src="./Volumen.png"

                    whileHover={{
                      scale: 1.2
                    }}

                    whileTap={{
                      scale: 0.8
                    }}

                  />

                </div>


                {/* =================================================
                    VOLUMEN
                ================================================= */}

                <div className="audio-controls">

                  <div className="volume-control">

                    <span className="volume-icon">
                      🍂
                    </span>

                    <input

                      className="volume-slider"

                      type="range"

                      min="0"

                      max="1"

                      step="0.01"

                      value={
                        volumenMusica
                      }

                      onChange={(e) =>
                        setVolumenMusica(
                          Number(
                            e.target.value
                          )
                        )
                      }

                    />

                    <span className="volume-number">

                      {Math.round(
                        volumenMusica *
                        100
                      )}

                      %

                    </span>

                  </div>


                  <div className="volume-control">

                    <span className="volume-icon">
                      🔊
                    </span>

                    <input

                      className="volume-slider"

                      type="range"

                      min="0"

                      max="1"

                      step="0.01"

                      value={
                        volumenEfectos
                      }

                      onChange={(e) =>
                        setVolumenEfectos(
                          Number(
                            e.target.value
                          )
                        )
                      }

                    />

                    <span className="volume-number">

                      {Math.round(
                        volumenEfectos *
                        100
                      )}

                      %

                    </span>

                  </div>

                </div>

              </div>


              {/* =================================================
                  FLECHAS
              ================================================= */}

              <div className="flechas col d-flex align-items-center justify-content-center gap-3">

                <div className="rows">

                  <motion.img

                    className="flechitas"

                    src="./Atras.png"

                    onClick={
                      retroceder
                    }

                    style={{
                      cursor:
                        "pointer"
                    }}

                    whileTap={{
                      scale: 0.85
                    }}

                  />


                  {/* SELECTOR */}

                  <div

                    className="page-num-selector"

                    onClick={() =>
                      setSelectorEscenasAbierto(
                        prev =>
                          !prev
                      )
                    }

                  >

                    <div className="page-num">

                      <span>

                        {escena}/
                        {TOTAL_ESCENAS}

                      </span>

                      <motion.span

                        className="page-num-flecha"

                        animate={{
                          rotate:
                            selectorEscenasAbierto
                              ? 180
                              : 0
                        }}

                        transition={{
                          duration:
                            0.2
                        }}

                      >

                        ▼

                      </motion.span>

                    </div>


                    <AnimatePresence>

                      {selectorEscenasAbierto && (

                        <motion.div

                          className="selector-escenas"

                          initial={{
                            opacity: 0,
                            y: 10,
                            scale: 0.92
                          }}

                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                          }}

                          exit={{
                            opacity: 0,
                            y: 10,
                            scale: 0.92
                          }}

                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}

                          onClick={(event) =>
                            event.stopPropagation()
                          }

                        >

                          <div className="selector-escenas-titulo">

                            SELECCIONAR ESCENA

                          </div>


                          <div className="selector-escenas-grid">

                            {Array.from(
                              {
                                length:
                                  TOTAL_ESCENAS
                              },
                              (_, i) =>
                                i + 1
                            ).map(
                              numero => (

                                <motion.button

                                  key={numero}

                                  className={`selector-escena ${
                                    escena ===
                                    numero
                                      ? "escena-actual"
                                      : ""
                                  }`}

                                  onClick={() =>
                                    seleccionarEscena(
                                      numero
                                    )
                                  }

                                  whileHover={{
                                    scale:
                                      1.08,
                                    y: -2
                                  }}

                                  whileTap={{
                                    scale:
                                      0.9
                                  }}

                                >

                                  <span>

                                    {numero}

                                  </span>


                                  {escena ===
                                    numero && (

                                      <motion.span

                                        className="escena-check"

                                        initial={{
                                          scale:
                                            0
                                        }}

                                        animate={{
                                          scale:
                                            1
                                        }}

                                      >

                                        ✓

                                      </motion.span>

                                    )}

                                </motion.button>

                              )
                            )}

                          </div>

                        </motion.div>

                      )}

                    </AnimatePresence>

                  </div>


                  <motion.img

                    className="flechitas"

                    src="./Adelante.png"

                    onClick={
                      avanzar
                    }

                    style={{
                      cursor:
                        "pointer"
                    }}

                    whileTap={{
                      scale: 0.85
                    }}

                  />

                </div>


                <LibroPersonajes />

              </div>


              {/* =================================================
                  FULLSCREEN
              ================================================= */}

              <div

                className="col-auto d-flex align-items-center gap-2"

                onClick={
                  toggleFullscreen
                }

                style={{
                  cursor:
                    "pointer"
                }}

              />

            </div>

          </div>


          {/* =====================================================
              OBJETOS ENCONTRADOS
          ===================================================== */}

          <div className="found-slots">


            {/* AVISO */}

            <AnimatePresence>

              {escena === 1 && (

                <motion.div

                  key="noticia-objetos"

                  className="noticia-objetos"

                  initial={{
                    opacity: 0,
                    y: 10
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  exit={{
                    opacity: 0,
                    y: 10
                  }}

                  transition={{
                    duration: 0.4,
                    delay: 0.8
                  }}

                >

                  Puedes darle click a los objetos para saber más sobre estos.

                </motion.div>

              )}

            </AnimatePresence>


            {/* TÍTULO */}

            <div className="slot-label">

              Objetos encontrados

            </div>


            {/* =================================================
                SLOTS
            ================================================= */}

            <div className="row g-2">

              {objetos.map(
                (obj, i) => {

                  const informacion =
                    obj
                      ? informacionObjetos[obj]
                      : null;


                  return (

                    <div

                      className="col-auto"

                      key={`slot-${i}`}

                    >

                      <motion.div

                        className={`slot ${
                          obj
                            ? "slot-con-objeto"
                            : "slot-vacio"
                        } ${
                          objetoSeleccionado ===
                          obj
                            ? "slot-seleccionado"
                            : ""
                        }`}

                        onClick={() =>
                          abrirDescripcionObjeto(
                            obj
                          )
                        }

                        whileHover={
                          obj
                            ? {
                                scale:
                                  1.08,
                                y: -3
                              }
                            : {}
                        }

                        whileTap={
                          obj
                            ? {
                                scale:
                                  0.92
                              }
                            : {}
                        }

                        style={{

                          marginLeft:
                            "10px",

                          cursor:
                            obj
                              ? "pointer"
                              : "default",

                          position:
                            "relative"

                        }}

                        title={
                          informacion
                            ? `Ver ${informacion.nombre}`
                            : "Espacio vacío"
                        }

                      >


                        {/* =====================================
                            IMAGEN DEL OBJETO
                        ===================================== */}

                        {obj &&
                          informacion && (

                            <img

                              src={
                                informacion.imagen
                              }

                              alt={
                                informacion.nombre
                              }

                              className="slot-objeto-imagen"

                            />

                          )}


                        {/* =====================================
                            CHECK
                        ===================================== */}

                        {obj && (

                          <motion.div

                            initial={{
                              scale: 0,
                              opacity: 0,
                              rotate: -20
                            }}

                            animate={{
                              scale: 1,
                              opacity: 1,
                              rotate: 0
                            }}

                            transition={{
                              type:
                                "spring",
                              stiffness:
                                450,
                              damping:
                                18
                            }}

                            style={{

                              position:
                                "absolute",

                              right:
                                "-6px",

                              top:
                                "-6px",

                              width:
                                "24px",

                              height:
                                "24px",

                              borderRadius:
                                "50%",

                              background:
                                "#4CAF50",

                              color:
                                "white",

                              display:
                                "flex",

                              alignItems:
                                "center",

                              justifyContent:
                                "center",

                              fontSize:
                                "16px",

                              fontWeight:
                                "900",

                              lineHeight:
                                1,

                              zIndex:
                                20,

                              border:
                                "2px solid white",

                              boxShadow:
                                "0 2px 6px rgba(0,0,0,0.35)",

                              pointerEvents:
                                "none"

                            }}

                          >

                            ✓

                          </motion.div>

                        )}

                      </motion.div>

                    </div>

                  );

                }

              )}

            </div>

          </div>


          {/* =====================================================
              MODAL OBJETO
          ===================================================== */}

          <AnimatePresence>

            {objetoSeleccionado &&
              informacionObjetos[
                objetoSeleccionado
              ] && (

                <motion.div

                  className="objeto-modal-overlay"

                  initial={{
                    opacity: 0
                  }}

                  animate={{
                    opacity: 1
                  }}

                  exit={{
                    opacity: 0
                  }}

                  onClick={
                    cerrarDescripcionObjeto
                  }

                >


                  <motion.div

                    className="objeto-modal"

                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      y: 25
                    }}

                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0
                    }}

                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      y: 25
                    }}

                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 22
                    }}

                    onClick={(event) =>
                      event.stopPropagation()
                    }

                  >


                    {/* CERRAR */}

                    <button

                      className="objeto-modal-cerrar"

                      onClick={
                        cerrarDescripcionObjeto
                      }

                      aria-label="Cerrar descripción"

                    >

                      ×

                    </button>


                    {/* IMAGEN */}

                    <div className="objeto-modal-imagen-contenedor">

                      <img

                        src={
                          informacionObjetos[
                            objetoSeleccionado
                          ].imagen
                        }

                        alt={
                          informacionObjetos[
                            objetoSeleccionado
                          ].nombre
                        }

                        className="objeto-modal-imagen"

                      />

                    </div>


                    {/* TEXTO */}

                    <div className="objeto-modal-texto">

                      <span className="objeto-modal-etiqueta">

                        OBJETO ENCONTRADO

                      </span>


                      <h2>

                        {
                          informacionObjetos[
                            objetoSeleccionado
                          ].nombre
                        }

                      </h2>


                      <p>

                        {
                          informacionObjetos[
                            objetoSeleccionado
                          ].descripcion
                        }

                      </p>


                      <div className="objeto-modal-detalle">

                        <span>✦</span>

                        {
                          informacionObjetos[
                            objetoSeleccionado
                          ].detalle
                        }

                      </div>

                    </div>

                  </motion.div>

                </motion.div>

              )}

          </AnimatePresence>

        </div>

      </motion.div>

    </>

  );

};


export default InterfazCap;