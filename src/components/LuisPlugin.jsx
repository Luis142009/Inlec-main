import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import manzana from "../assets/manzana.svg";
import escenario from "../assets/sr.webm";
import sra from "../assets/lady.webm";
import personaje from "../assets/rial.webm";
import tierrass from "../assets/tierrita.webm";
import arbol from "../assets/arbol.webm";
import sol from "../assets/sol.webm";
import hierba from "../assets/hierboza.webm";
import tocar from "../assets/audio/tocar.mp3";
import "../stylesheets/fondo.css";

export const LuisPlugin = forwardRef(({
  cambiarEscena,
  onRecoger,
  manzanaRecogida,
  onMrFoxClick
}, ref) => {

  const screenRef = useRef(null);
  const personajeRef = useRef(null);
  const primeraVez = useRef(true);
  const srRef = useRef(null);
  const sraRef = useRef(null);
  const solRef = useRef(null);
  const hierbaRef = useRef(null);
  const tierraRef = useRef(null);
  const arbolRef = useRef(null);
const tocarRef = useRef(new Audio(tocar));
  const manzanaRef = useRef(null);
  const luzRef = useRef(null);

  const todosLosVideos = () => [
    personajeRef, srRef, sraRef, solRef, hierbaRef, tierraRef, arbolRef
  ];

  useImperativeHandle(ref, () => ({
    pausarTodo: () => {
      todosLosVideos().forEach(r => r.current?.pause());
    },
    reanudarTodo: () => {
      todosLosVideos().forEach(r => {
        if (r.current && r.current.readyState >= 2) r.current.play();
      });
    }
  }));

useEffect(() => {
  gsap.set(screenRef.current, {
    scale: 1.4,
    x: 60,
    y: 40
  });

  tocarRef.current.volume = 0.5;
}, []);

  const reproducirPersonaje = () => personajeRef.current.play();

  const controlarLoop = () => {
    const video = personajeRef.current;
    if (!primeraVez.current && video.currentTime >= video.duration - 0.05) {
      video.currentTime = 4;
      video.play();
    }
  };

  const termino = () => {
    if (primeraVez.current) {
      primeraVez.current = false;
      personajeRef.current.currentTime = 4;
      personajeRef.current.play();
    }
  };

  const reproducirVideo = (ref) => {
    const video = ref.current;
    video.pause();
    video.currentTime = 0;
    video.play();
  };

const clickSR = () => {


  if (onMrFoxClick) onMrFoxClick();

  [
    srRef,
    sraRef,
    solRef,
    hierbaRef,
    tierraRef,
    arbolRef
  ].forEach(reproducirVideo);

  gsap.to(screenRef.current, {
    scale: 2,
    x: 100,
    y: -78,
    duration: 3,
    ease: "power2.inOut",
    onComplete: () => {
      gsap.delayedCall(2, () => cambiarEscena(2));
    }
  });

};

const clickManzana = () => {

  tocarRef.current.currentTime = 0;
  tocarRef.current.play();

  const manzana = manzanaRef.current;

  if (!manzana) return;



  const screenRect = screenRef.current.getBoundingClientRect();
  const manzanaRect = manzana.getBoundingClientRect();

  const centroX = screenRect.width / 2;
  const centroY = screenRect.height / 2;

  const manzanaX =
    manzanaRect.left -
    screenRect.left +
    manzanaRect.width / 2;

  const manzanaY =
    manzanaRect.top -
    screenRect.top +
    manzanaRect.height / 2;

  const offsetX = centroX - manzanaX;
  const offsetY = centroY - manzanaY;



  const slots = document.querySelectorAll(".slot");
  const slotDestino = slots[0];

  if (!slotDestino) return;

  const slotRect = slotDestino.getBoundingClientRect();

  const dx =
    slotRect.left +
    slotRect.width / 2 -
    (manzanaRect.left + manzanaRect.width / 2);

  const dy =
    slotRect.top +
    slotRect.height / 2 -
    (manzanaRect.top + manzanaRect.height / 2);

 

  const tl = gsap.timeline({
    onComplete: () => {
      onRecoger("manzana");
    }
  });

 
  tl.to(manzana, {
    filter: `
      drop-shadow(0 0 50px #ffffff)
      drop-shadow(0 0 120px #ffe600)
      drop-shadow(0 0 220px #ffd000)
      drop-shadow(0 0 340px #ff9900)
    `,
    scale: 1.35,
    rotation: 360,
    duration: .35,
    ease: "back.out(2)"
  });


  tl.to(
    screenRef.current,
    {
      scale: 2,
      x: 60 + offsetX,
      y: 40 + offsetY,
      duration: .45,
      ease: "power2.out"
    },
    "<"
  );

 
  tl.to({}, { duration: .15 });


  tl.to(screenRef.current,{
    scale:1.4,
    x:60,
    y:40,
    duration:.45,
    ease:"power2.inOut"
  });

 
  tl.to(
    manzana,
    {
      x:dx,
      y:dy,
      scale:.4,
      rotation:1080,
      duration:.8,
      ease:"power3.inOut"
    },
    "<"
  );

  tl.to(manzana,{
    scale:.5,
    duration:.12,
    ease:"back.out(4)"
  });

 
  tl.to(manzana,{
    opacity:0,
    duration:.15
  });


  tl.set(manzana,{
    clearProps:"filter"
  });

};

  return (
    
    
    <div ref={screenRef} className="screen">
      

      <video ref={personajeRef} className="personaje" muted autoPlay playsInline preload="auto"
        onClick={reproducirPersonaje} onEnded={termino} onTimeUpdate={controlarLoop}>
        <source src={personaje} type="video/webm" />
      </video>

      <video ref={srRef} className="sr" muted playsInline preload="auto" onClick={clickSR}>
        <source src={escenario} type="video/webm" />
      </video>

      <video ref={sraRef} className="sra" muted playsInline preload="auto"
        onClick={() => reproducirVideo(sraRef)}>
        <source src={sra} type="video/webm" />
      </video>

      <video ref={tierraRef} className="tierra" muted playsInline preload="auto"
        onClick={() => reproducirVideo(tierraRef)}>
        <source src={tierrass} type="video/webm" />
      </video>

      <video ref={hierbaRef} className="hierba" muted playsInline preload="auto"
        onClick={() => reproducirVideo(hierbaRef)}>
        <source src={hierba} type="video/webm" />
      </video>

      <video ref={arbolRef} className="arbol" muted playsInline preload="auto"
        onClick={() => reproducirVideo(arbolRef)}>
        <source src={arbol} type="video/webm" />
      </video>

      <video ref={solRef} className="sol" muted playsInline preload="auto"
        onClick={() => reproducirVideo(solRef)}>
        <source src={sol} type="video/webm" />
      </video>

   {!manzanaRecogida && (
  <div style={{ position: "relative", display: "inline-block" }}>
    <div
      ref={luzRef}
      onClick={clickManzana}
      style={{
        display: "none",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px",
        height: "800px",
      
        pointerEvents: "none",
        zIndex: 10
      }}
    />
    <img
      ref={manzanaRef}
          src={manzana}
      className="mi-svg"
      alt="manzana"
      onClick={clickManzana}
      style={{
        cursor: "pointer",
        position: "relative",
        zIndex: 16,
        pointerEvents: "auto"
      }}
    />
  </div>
)}

    </div>
  );
});