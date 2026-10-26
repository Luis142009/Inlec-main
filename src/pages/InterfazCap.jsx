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
import { Escena11 } from "../components/Escena11";
import { Escena12 } from "../components/Escena12";
import { Escena13 } from "../components/Escena13";
import { Escena15 } from "../components/Escena15";
import { Escena16 } from "../components/Escena16";
import { Escena17 } from "../components/Escena17";
import { EscenaVideo } from "../components/EscenaVideo";
import { Escena18 } from "../components/Escena18";
import { Escena19 } from "../components/Escena19";
import { Escena20 } from "../components/Escena20";
import { Escena21 } from "../components/Escena21";
import { Escena22 } from "../components/Escena22";
import { Escena23 } from "../components/Escena23";

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
import audio11 from "../assets/audio/audio11.mp3";
import musica12 from "../assets/audio/musica12.mp3";
import musica13 from "../assets/audio/musica13.mp3";
import musica10 from "../assets/audio/musica10.mp3";
import musica8   from "../assets/audio/musica8.mp3";
import musica16 from "../assets/audio/musica16.MP3";
import musica18   from "../assets/audio/musica18.mp3";
import musica17 from "../assets/audio/musica17.mp3";
import bean from "../assets/audio/bean.mp3"
import nocturno from "../assets/audio/nocturno.mp3"
import curacion from "../assets/audio/curacion.mp3"
import familia from "../assets/audio/familia.mp3"
import aburrido from "../assets/audio/aburrido.mp3"
import cueva from "../assets/audio/cueva.mp3"
import comun from "../assets/audio/comun.mp3"
import discusion from "../assets/audio/discusion.mp3"
import saqueo from "../assets/audio/saqueo.mp3"
import pelea from "../assets/audio/pelea.mp3"

import pintura from "../assets/svg/pintura.svg";
import manzana from "../assets/manzana.svg";
import huella from "../assets/svg/huella.svg";
import tomate from "../assets/svg/tomate.svg";
import bellota from "../assets/svg/Bellota.svg";


// =========================================================
// MUESTRA EN PANTALLA EL ERROR REAL DE UNA ESCENA
// =========================================================

class ErrorEscena extends React.Component {

  constructor(props) {

    super(props);

    this.state = { error: null };

  }

  static getDerivedStateFromError(error) {

    return { error };

  }

  componentDidCatch(error, info) {

    console.error(
      `Error en la escena ${this.props.escena}:`,
      error,
      info?.componentStack
    );

  }

  render() {

    if (this.state.error) {

      return (

        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "30px",
            boxSizing: "border-box",
            textAlign: "center",
            color: "#fff",
            background: "rgba(120, 20, 20, 0.92)",
            fontFamily: "monospace"
          }}
        >

          <strong style={{ fontSize: "22px" }}>
            Error en la escena {this.props.escena}
          </strong>

          <span style={{ fontSize: "16px" }}>
            {String(
              this.state.error?.message ||
              this.state.error
            )}
          </span>

        </div>

      );

    }

    return this.props.children;

  }

}


// =========================================================
// TOTAL DE ESCENAS
// =========================================================

const TOTAL_ESCENAS = 26;


// =========================================================
// CLAVE PARA GUARDAR LA ESCENA ACTUAL (solo para desarrollo)
// =========================================================

const CLAVE_ESCENA_GUARDADA = "escenaActual";


// =========================================================
// SILUETAS DE OBJETOS POR CAPÍTULO
// =========================================================

const siluetasPorCapitulo = {

  1: [
    manzana,
    pintura,
    bellota,
    huella
  ],

  2: [
    tomate
  ],

  // Capítulo 3 y 4: todavía sin objetos
  3: [],

  4: []

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
    escenaFin: 15,
    objetos: 4
  },

  // El capítulo 3 empieza en la escena 16
  {
    numero: 3,
    titulo: "TÍTULO DEL CAPÍTULO 3",
    escenaInicio: 16,
    escenaFin: 19,
    objetos: 4
  },

  // El capítulo 4 empieza en la escena 20 y llega hasta la 26 (última)
  {
    numero: 4,
    titulo: "TÍTULO DEL CAPÍTULO 4",
    escenaInicio: 20,
    escenaFin: 26,
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
  // ESCENA ACTUAL (se recuerda al recargar la página)
  // =========================================================

  const [escena, setEscena] = useState(() => {

    try {

      const guardada = Number(
        localStorage.getItem(CLAVE_ESCENA_GUARDADA)
      );

      if (
        guardada >= 14 &&
        guardada <= TOTAL_ESCENAS
      ) {

        return guardada;

      }

    } catch {}

    return 1;

  });


  // Guardar la escena cada vez que cambie
  useEffect(() => {

    try {

      localStorage.setItem(
        CLAVE_ESCENA_GUARDADA,
        String(escena)
      );

    } catch {}

  }, [escena]);


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
    14:  [
    "Pero ¿cómo lo vamos a agarrar si es más listo que nadie?             Te equivocas, Boggis. Solo hay que ir a cazarlo en la madriguera del gran árbol. ¡Esta guerra no la pienso perder!",
    "Hay que matar a este maldito bicho. En cuanto lo agarre, le retuerzo el pescuezo a ese maldito desgraciado."

    ],
    15: [
      "¡Oigan, atentos! Escucho pasos.  ¡Sí, ahí está! Solo tengo que ponerlo justo en la mira y...  ¡Maldición, ha escapado! Pero no importa... ¡Es su cola!",
      "El viento está a nuestro favor. ¡Lo tenemos!   ¿Estás seguro de que saldrá de ahí?         ¡Cállate, Boggis! No hagas que me distraiga."
    ],

    16: "La señora Fox cuida al señor Fox después de sus heridas. Lo auxilia y lo trata con cariño para que se sienta mejor y se recupere.",
    17: [
      
      "Cansada, la familia Fox intenta volver a conciliar el sueño después de todo lo sucedido con el señor Fox y los granjeros,"
    ],
    18: "pero su descanso se ve interrumpido por el ruido de la maquinaria y las palas de los granjeros",
    19: "La familia Fox camina desorientada y triste",
    20: "Aquí va el texto de la escena 20.",
    21: "La señora y el señor Fox intentan idear un plan para poder robar las granjas mediante túneles y conseguir alimentos.",
    22: "El señor Fox llama a todos los animales presentes para idear un plan y hacer que el robo sea más efectivo..",
    23: "El señor Fox se reconcilia con Ash después de una discusión..",
    24: "Luego, saquearon los almacenes de Bunce, que sufrieron la misma suerte que las gallinas. Finalmente, llegaron a la bodega de Bean..",
    25: "Aquí va el texto de la escena 25.",
    26: "Aquí va el texto de la escena 26."

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
      musica: musica8,
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

      efectos: [{

         src:  bean,
         volumen: 3
      }]
    },

    13: {
      musica: musica10,
      grupoMusica: "escena12",
      grupoEfectos: "escena12",

      efectos: [{
        src: nocturno,
        volumen: 3

    }]
    },

    // ESCENA 14: sin música y sin efectos automáticos.
    // El único audio suena al hacer click en los personajes
    14: {
      musica: null,
      grupoMusica: "sinMusica",
      grupoEfectos: "escena14",

      efectos: []
    },

    // ESCENA 15 (componente Escena12): sin música y sin efectos automáticos.
    15: {
      musica: null,
      grupoMusica: "sinMusica",
      grupoEfectos: "escena15",

      efectos: []
    },

    // ESCENA 16 (componente Escena13)
    16: {
      musica: musica13,
      grupoMusica: "escena16",
      grupoEfectos: "escena16",

      efectos: [{
        src: curacion,
        volumen: 3
      }]
    },

    // ESCENA 17 (componente EscenaVideo): el video trae su propio audio
    17: {
      musica: null,
      grupoMusica: "sinMusica",
      grupoEfectos: "escena17",

      efectos: []
    },

    // ESCENA 18 (componente Escena15)
    18: {
      musica: musica18,
      grupoMusica: "escena18",
      grupoEfectos: "escena18",

      efectos: [{
        src: familia,
        volumen: 3
      }]
    },

    // ESCENA 19 (componente Escena16)
    19: {
      musica: musica16,
      grupoMusica: "escena19",
      grupoEfectos: "escena19",

      efectos: [{
        src: aburrido,
        volumen: 3
      }]
    },

    // ESCENA 20 (componente Escena17): la canción suena al hacer click en el sol
    20: {
      musica: null,
      grupoMusica: "sinMusica",
      grupoEfectos: "escena20",

      efectos: [
      

      ]
    },

    // ESCENA 21 (componente Escena18)
    21: {
      musica: null,
      grupoMusica: "sinMusica",
      grupoEfectos: "escena21",

      efectos: [
         {
         src :cueva,
         volumen : 3
       }
      ]
    },

    // ESCENA 22 (componente Escena19)
    22: {
      musica: null,
      grupoMusica: "sinMusica",
      grupoEfectos: "escena22",

      efectos: [{
        src : comun,
        volumen : 3
      }]
    },

    // ESCENA 23 (componente Escena20)
    23: {
      musica: null,
      grupoMusica: "sinMusica",
      grupoEfectos: "escena23",

      efectos: [{
        src : discusion,
        volumen : 3
      }]
    },

    // ESCENA 24 (componente Escena21)
    24: {
      musica: null,
      grupoMusica: "sinMusica",
      grupoEfectos: "escena24",

      efectos: [{
        src : saqueo,
        volumen : 3
      }]
    },

    // ESCENA 25 (componente Escena22)
    25: {
      musica: null,
      grupoMusica: "sinMusica",
      grupoEfectos: "escena25",

      efectos: [{
        src : pelea,
        volumen : 3
      }]
    },

    // ESCENA 26 (componente Escena23) - ÚLTIMA: sin música ni efectos por ahora.
    // Los videos arrancan al hacer click en el Sr. Fox.
    // Cuando tengas audio, ponlo en audiosPersonajes26 o aquí.
    26: {
      musica: null,
      grupoMusica: "sinMusica",
      grupoEfectos: "escena26",

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


      // Escenas sin música (musica: null):
      // se detiene la que estuviera sonando
      else if (
        musicaRef.current &&
        !config.musica
      ) {

        musicaRef.current.pause();
        musicaRef.current.currentTime = 0;

        grupoMusicaRef.current =
          config.grupoMusica ?? null;

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
  // AUDIO POR CLICK EN PERSONAJE
  // (ESCENAS 14, 15, 16, 18, 20, 21, 22 Y 26)
  // =========================================================

  const audiosPersonajes14 = {
    boggis: { src: audio11, volumen: 3 },
    bunce:  { src: audio11, volumen: 3 },
    bean:   { src: audio11, volumen: 3 }
  };


  // Escena 15 (componente Escena12)
  const audiosPersonajes15 = {
    boggis: { src: musica12, volumen: 1 },
    bunce:  { src: musica12, volumen: 1 },
    bean:   { src: musica12, volumen: 1 }
  };


  // Escena 16 (componente Escena13): todavía sin audio.
  const audiosPersonajes16 = {};


  // Escena 18 (componente Escena15): click en el periódico. Sin audio.
  const audiosPersonajes18 = {};


  // Escena 20 (componente Escena17): click en el sol
  const audiosPersonajes20 = {
    sol: { src: musica17, volumen: 1 }
  };


  // Escena 21 (componente Escena18): "fox" o "sra". Sin audio.
  const audiosPersonajes21 = {};


  // Escena 22 (componente Escena19): "fox". Sin audio.
  const audiosPersonajes22 = {};


  // Escena 26 (componente Escena23): click en el Sr. Fox ("fox").
  // Todavía sin audio. Ejemplo:
  //   fox: { src: miAudio, volumen: 1 }
  const audiosPersonajes26 = {};


  const reproducirAudioPersonaje =
    async (personaje) => {

      const audiosPersonajes =
        escena === 26
          ? audiosPersonajes26
          : escena === 22
          ? audiosPersonajes22
          : escena === 21
          ? audiosPersonajes21
          : escena === 20
          ? audiosPersonajes20
          : escena === 18
          ? audiosPersonajes18
          : escena === 16
          ? audiosPersonajes16
          : escena === 15
            ? audiosPersonajes15
            : audiosPersonajes14;

      const config =
        audiosPersonajes[personaje];

      // Estas escenas no usan efectos automáticos,
      // así que el canal 0 está libre
      const indice = 0;

      const audio =
        efectosRefs.current[indice];

      if (!config || !audio) {
        return;
      }


      // Si ya está sonando, no lo reinicia
      if (
        !audio.paused &&
        !audio.ended &&
        audio.currentTime > 0
      ) {
        return;
      }


      try {

        const ctx =
          obtenerAudioContext();

        if (
          ctx &&
          ctx.state === "suspended"
        ) {

          await ctx.resume();

        }


        audio.pause();

        audio.src =
          config.src;

        audio.loop =
          false;

        audio.currentTime =
          0;


        efectosVolumenBaseRef.current[indice] =
          config.volumen;

        efectosPersistentesRef.current[indice] =
          null;


        const gain =
          configurarGanancia(
            audio,
            "efecto",
            indice
          );

        if (gain) {

          gain.gain.value =
            config.volumen *
            volumenEfectos;

        } else {

          audio.volume =
            Math.min(
              config.volumen *
              volumenEfectos,
              1
            );

        }


        await audio.play();

      } catch (error) {

        console.log(
          "⚠️ Error reproduciendo audio del personaje:",
          error
        );

      }

    };


  // =========================================================
  // PAUSAR / REANUDAR EL AUDIO DEL PERSONAJE (ESCENA 15)
  // =========================================================

  const pausarAudioPersonaje = () => {

    const audio =
      efectosRefs.current[0];

    if (audio) {

      audio.pause();

    }

  };


  const reanudarAudioPersonaje = () => {

    const audio =
      efectosRefs.current[0];

    if (
      audio &&
      audio.currentTime > 0 &&
      !audio.ended
    ) {

      audio
        .play()
        .catch(() => {});

    }

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

  // ESCENA 13
  const escena10Ref =
    useRef(null);

  // ESCENA 14
  const escena11Ref =
    useRef(null);

  // ESCENA 15
  const escena12Ref =
    useRef(null);

  // ESCENA 16
  const escena13Ref =
    useRef(null);

  // ESCENA 18
  const escena15Ref =
    useRef(null);

  // ESCENA 19
  const escena16Ref =
    useRef(null);

  // ESCENA 20
  const escena17Ref =
    useRef(null);

  // ESCENA 17 (video)
  const escenaVideoRef =
    useRef(null);

  // ESCENA 21
  const escena18Ref =
    useRef(null);

  // ESCENA 22
  const escena19Ref =
    useRef(null);

  // ESCENA 23
  const escena20Ref =
    useRef(null);

  // ESCENA 24
  const escena21Ref =
    useRef(null);

  // ESCENA 25
  const escena22Ref =
    useRef(null);

  // ESCENA 26
  const escena23Ref =
    useRef(null);


  // =========================================================
  // OBJETOS
  // =========================================================

  const [
    objetosPorCapitulo,
    setObjetosPorCapitulo
  ] = useState({
    1: [null, null, null, null],
    2: [null, null, null, null],
    3: [null, null, null, null],
    4: [null, null, null, null]
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
        "Una misteriosa pintura encontrada.con un color muy fuere",

      imagen: pintura,

      detalle:
        "Objeto encontrado al lado de la señora Fox"

    },


    bellota: {

      nombre: "Bellota",

      descripcion:
        "Una bellota caída del gran árbol, muy misteriosa",

      imagen: bellota,

      detalle:
        "Objeto encontrado cerca del gran árbol"

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

        // ESCENA 14
        case 14:
          return escena11Ref;

        // ESCENA 15
        case 15:
          return escena12Ref;

        // ESCENA 16
        case 16:
          return escena13Ref;

        // ESCENA 17 (video)
        case 17:
          return escenaVideoRef;

        // ESCENA 18
        case 18:
          return escena15Ref;

        // ESCENA 19
        case 19:
          return escena16Ref;

        // ESCENA 20
        case 20:
          return escena17Ref;

        // ESCENA 21
        case 21:
          return escena18Ref;

        // ESCENA 22
        case 22:
          return escena19Ref;

        // ESCENA 23
        case 23:
          return escena20Ref;

        // ESCENA 24
        case 24:
          return escena21Ref;

        // ESCENA 25
        case 25:
          return escena22Ref;

        // ESCENA 26
        case 26:
          return escena23Ref;

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


        const configActual =
          obtenerAudioEscena(
            escena
          );


        // La música solo se reanuda si esta escena tiene música
        if (
          musicaRef.current &&
          configActual.musica
        ) {

          musicaRef.current
            .play()
            .catch(() => {});

        }


        // Solo se reanudan los efectos que pertenecen a esta escena
        // (o los persistentes), no los de escenas anteriores
        efectosRefs.current.forEach(
          (audio, i) => {

            if (!audio) {
              return;
            }

            // Audio de un personaje que quedó a medias
            const audioPersonajeEnCurso =
              (escena === 14 || escena === 15 || escena === 16 || escena === 18 || escena === 20 || escena === 21 || escena === 22 || escena === 26) &&
              i === 0 &&
              audio.currentTime > 0;

            const perteneceAEscena =
              i < (configActual.efectos?.length ?? 0) ||
              !!efectosPersistentesRef.current[i] ||
              audioPersonajeEnCurso;

            if (
              perteneceAEscena &&
              !audio.ended
            ) {

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


                    {/* ESCENA 1 */}

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


                    {/* ESCENA 2 */}

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


                    {/* ESCENA 3 */}

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


                    {/* ESCENA 4 */}

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


                    {/* ESCENA 5 */}

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


                    {/* ESCENA 6 */}

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


                    {/* ESCENA 7 */}

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


                    {/* ESCENA 8 */}

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


                    {/* ESCENA 9 */}

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

                          onRecoger={
                            recogerObjeto
                          }

                          objetoRecogido={
                            objetos.includes(
                              "bellota"
                            )
                          }

                        />

                      </motion.div>

                    )}


                    {/* ESCENA 10 */}

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


                    {/* ESCENA 11 */}

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


                    {/* ESCENA 12 */}

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


                    {/* ESCENA 13 */}

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


                    {/* ESCENA 14 */}

                    {escena === 14 && (

                      <motion.div
                        key="escena14"
                        {...transicionEscena}
                      >

                        <Escena11

                          ref={escena11Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                          onPersonajeClick={
                            reproducirAudioPersonaje
                          }

                        />

                      </motion.div>

                    )}


                    {/* ESCENA 15 */}

                    {escena === 15 && (

                      <motion.div
                        key="escena15"
                        {...transicionEscena}
                      >

                        <Escena12

                          ref={escena12Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                          onPersonajeClick={
                            reproducirAudioPersonaje
                          }

                          onPausaAudio={
                            pausarAudioPersonaje
                          }

                          onContinuarAudio={
                            reanudarAudioPersonaje
                          }

                        />

                      </motion.div>

                    )}


                    {/* ESCENA 16 */}

                    {escena === 16 && (

                      <motion.div
                        key="escena16"
                        {...transicionEscena}
                      >

                        <Escena13

                          ref={escena13Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                          onPersonajeClick={
                            reproducirAudioPersonaje
                          }

                        />

                      </motion.div>

                    )}


                    {/* ESCENA 17 (VIDEO) */}

                    {escena === 17 && (

                      <motion.div
                        key="escena17video"
                        {...transicionEscena}
                      >

                        <ErrorEscena escena={17}>

                          <EscenaVideo

                            ref={escenaVideoRef}

                            cambiarEscena={
                              cambiarEscena
                            }

                            volumen={
                              volumenEfectos
                            }

                          />

                        </ErrorEscena>

                      </motion.div>

                    )}


                    {/* ESCENA 18 */}

                    {escena === 18 && (

                      <motion.div
                        key="escena18"
                        {...transicionEscena}
                      >

                        <Escena15

                          ref={escena15Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                          onPersonajeClick={
                            reproducirAudioPersonaje
                          }

                        />

                      </motion.div>

                    )}


                    {/* ESCENA 19 */}

                    {escena === 19 && (

                      <motion.div
                        key="escena19"
                        {...transicionEscena}
                      >

                        <Escena16

                          ref={escena16Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                        />

                      </motion.div>

                    )}


                    {/* ESCENA 20 */}

                    {escena === 20 && (

                      <motion.div
                        key="escena20"
                        {...transicionEscena}
                      >

                        <Escena17

                          ref={escena17Ref}

                          cambiarEscena={
                            cambiarEscena
                          }

                          onPersonajeClick={
                            reproducirAudioPersonaje
                          }

                        />

                      </motion.div>

                    )}


                    {/* ESCENA 21 */}

                    {escena === 21 && (

                      <motion.div
                        key="escena21"
                        {...transicionEscena}
                      >

                        <ErrorEscena escena={21}>

                          <Escena18

                            ref={escena18Ref}

                            cambiarEscena={
                              cambiarEscena
                            }

                            onPersonajeClick={
                              reproducirAudioPersonaje
                            }

                          />

                        </ErrorEscena>

                      </motion.div>

                    )}


                    {/* ESCENA 22 */}

                    {escena === 22 && (

                      <motion.div
                        key="escena22"
                        {...transicionEscena}
                      >

                        <ErrorEscena escena={22}>

                          <Escena19

                            ref={escena19Ref}

                            cambiarEscena={
                              cambiarEscena
                            }

                            onPersonajeClick={
                              reproducirAudioPersonaje
                            }

                          />

                        </ErrorEscena>

                      </motion.div>

                    )}


                    {/* ESCENA 23 */}

                    {escena === 23 && (

                      <motion.div
                        key="escena23"
                        {...transicionEscena}
                      >

                        <ErrorEscena escena={23}>

                          <Escena20

                            ref={escena20Ref}

                            cambiarEscena={
                              cambiarEscena
                            }

                          />

                        </ErrorEscena>

                      </motion.div>

                    )}


                    {/* ESCENA 24 */}

                    {escena === 24 && (

                      <motion.div
                        key="escena24"
                        {...transicionEscena}
                      >

                        <ErrorEscena escena={24}>

                          <Escena21

                            ref={escena21Ref}

                            cambiarEscena={
                              cambiarEscena
                            }

                            volumen={
                              volumenEfectos
                            }

                          />

                        </ErrorEscena>

                      </motion.div>

                    )}


                    {/* ESCENA 25 */}

                    {escena === 25 && (

                      <motion.div
                        key="escena25"
                        {...transicionEscena}
                      >

                        <ErrorEscena escena={25}>

                          <Escena22

                            ref={escena22Ref}

                            cambiarEscena={
                              cambiarEscena
                            }

                          />

                        </ErrorEscena>

                      </motion.div>

                    )}


                    {/* ESCENA 26 (ÚLTIMA) */}

                    {escena === 26 && (

                      <motion.div
                        key="escena26"
                        {...transicionEscena}
                      >

                        <ErrorEscena escena={26}>

                          <Escena23

                            ref={escena23Ref}

                            cambiarEscena={
                              cambiarEscena
                            }

                            onPersonajeClick={
                              reproducirAudioPersonaje
                            }

                          />

                        </ErrorEscena>

                      </motion.div>

                    )}


                    {/* ESCENA 27 EN ADELANTE (no debería usarse) */}

                    {escena >= 27 && (

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


                {/* SUBTÍTULOS */}

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


                {/* PAUSA */}

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


                {/* MÚSICA */}

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


                {/* VOLUMEN */}

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


              {/* FLECHAS */}

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


              {/* FULLSCREEN */}

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


            {/* SLOTS */}

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


                        {/* IMAGEN DEL OBJETO */}

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


                        {/* CHECK */}

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