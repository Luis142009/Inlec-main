import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";

import escenario from "../assets/sr.webm";
import sra from "../assets/lady.webm";
import personaje from "../assets/rial.webm";
import tierrass from "../assets/tierrita.webm";
import arbol from "../assets/arbol.webm";
import sol from "../assets/sol.webm";
import hierba from "../assets/hierboza.webm";

import "../stylesheets/fondo.css";

export const LuisPlugin = forwardRef(({ cambiarEscena, onRecoger }, ref) => {

  const screenRef = useRef(null);
  const personajeRef = useRef(null);
  const primeraVez = useRef(true);
  const srRef = useRef(null);
  const sraRef = useRef(null);
  const solRef = useRef(null);
  const hierbaRef = useRef(null);
  const tierraRef = useRef(null);
  const arbolRef = useRef(null);

  const manzanaRef = useRef(null);
  const luzRef = useRef(null);
  const manzanaRecogida = useRef(false);

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
    gsap.set(screenRef.current, { scale: 1.4, x: 60, y: 40 });
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
    reproducirVideo(srRef);
    gsap.to(screenRef.current, {
      scale: 2, x: 100, y: -78, duration: 3, ease: "power2.inOut",
      onComplete: () => {
        gsap.delayedCall(2, () => { cambiarEscena(2); });
      }
    });
  };

  const clickManzana = () => {
    if (manzanaRecogida.current) return;
    manzanaRecogida.current = true;

    const manzana = manzanaRef.current;
    const luz = luzRef.current;

    // Obtener el primer slot vacío en el DOM
    const slots = document.querySelectorAll(".slot");
    const slotDestino = slots[0];
    if (!slotDestino) return;

    const manzanaRect = manzana.getBoundingClientRect();
    const slotRect = slotDestino.getBoundingClientRect();

    const dx = slotRect.left + slotRect.width / 2 - (manzanaRect.left + manzanaRect.width / 2);
    const dy = slotRect.top + slotRect.height / 2 - (manzanaRect.top + manzanaRect.height / 2);

    const tl = gsap.timeline({
      onComplete: () => {
        // Notifica al padre
        onRecoger("manzana");
        // Oculta la manzana de la escena
        gsap.set(manzana, { display: "none" });
        gsap.set(luz, { display: "none" });
      }
    });

    // Destello de luz alrededor de la manzana
    tl.fromTo(luz,
      { opacity: 0, scale: 0.5, display: "block" },
      { opacity: 1, scale: 2.5, duration: 0.3, ease: "power2.out" }
    );

    // La manzana sube un poco y luego vuela al slot
    tl.to(manzana, { y: -20, duration: 0.2, ease: "power1.out" }, "<");

    // Luz se desvanece
    tl.to(luz, { opacity: 0, scale: 3.5, duration: 0.4, ease: "power1.in" });

    // Vuela hacia el slot
    tl.to(manzana, {
      x: dx,
      y: dy,
      scale: 0.4,
      duration: 0.6,
      ease: "power3.inOut"
    });

    // Pequeño pop al llegar
    tl.to(manzana, { scale: 0.5, duration: 0.1, ease: "back.out(3)" });
    tl.to(manzana, { opacity: 0, duration: 0.15 });
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

      {/* MANZANA — con ref para animarla */}
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Luz detrás */}
        <div
          ref={luzRef}
          onClick={clickManzana}
          style={{
            display: "none",
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60px", height: "60px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,220,80,0.9) 0%, rgba(255,180,0,0) 70%)",
            pointerEvents: "none",
            zIndex: 10
          }}
        />
        <img
          ref={manzanaRef}
          src="src/assets/manzana.svg"
          className="mi-svg"
          alt="manzana"
          onClick={clickManzana}
          style={{ cursor: "pointer", position: "relative", zIndex: 11 }}
        />
      </div>

    </div>
  );
});