/*
import React, {useEffect, useState } from "react"

export const LuisRMPage = () => {

const [character, setCharacter] = useState([0])

const getCharacter = async () => {

const res = await fetch("https://rickandmortyapi.com/api/character")
const data = await res.json()
setCharacter(data.results)
console.log(data)
}

const [Pokemon, setPokemon] = useState([0])

const getPokemon = async () => {

const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
const data = await res.json()

const detallesPokemon = await Promise.all(
  data.results.map(async (pokemon) => {
    const res = await fetch(pokemon.url)
    const detalles = await res.json()

    return {
      id: detalles.id,
      name: detalles.name,
      image: detalles.sprites.other["official-artwork"].front_default,
      type: detalles.types[0].type.name
    
    }
    
  })
)

setPokemon(detallesPokemon)
console.log(data)  

}

useEffect(() => {
  getCharacter()
  getPokemon()

}, [])


  return (
   <>
    <h1> Personajes de rick and Morty</h1>
   
      {character.map( (char, index) => (
     <div key={index} className="card mb-3" style={{ maxWidth: "640px" }}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={char.image} className="img-fluid rounded-start" alt="..."></img>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{char.name}</h5>
        <p className="card-text">{char.species}</p>
        <p className="card-text"><small className="text-body-secondary">{char.status} </small></p>
        
      </div>
    </div>
  </div>
</div>

      ))}
    
    <h1> Tarjetas Pokemon </h1>

<div clasName="container  ">
  <div className="row gap-5 text-center">
    {Pokemon.map( (char, index) => (
     <div key={index} className="card mb-3" style={{ maxWidth: "640px" }}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={char.image} className="img-fluid rounded-start" alt="..."></img>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{char.name}</h5>
        <p className="card-text">{char.type}</p>
        <p className="card-text"><small className="text-body-secondary">{char.id} </small></p>
        
        
      </div>
    </div>
  </div>
</div>

      ))}
       </div>
        </div>
    
   

   
   </>
  )


}
  */
import React, { useEffect, useRef, useState } from "react";
import "../stylesheets/Textos.css";

const BG_COLOR = "#000000";
const ANIM_SRC = "/assets/granjeros.gif";
const LOGO_SRC = "/logo.png";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

function scrambleText(text, progress) {
  return text
    .split("")
    .map((char, index) => {
      if (char === " ") return " ";

      if (index < progress) {
        return char;
      }

      return chars[Math.floor(Math.random() * chars.length)];
    })
    .join("");
}

export default function LuisRMPage() {
  const finalText1 = "GAME";
  const finalText2 = "OVER";

  const [displayText1, setDisplayText1] = useState("");
  const [displayText2, setDisplayText2] = useState("");

  const cursorRef = useRef(null);

  // SCRAMBLE EFFECT
  useEffect(() => {
    let frame1 = 0;

    const interval1 = setInterval(() => {
      frame1 += 0.4;

      setDisplayText1(scrambleText(finalText1, frame1));

      if (frame1 >= finalText1.length) {
        clearInterval(interval1);
        setDisplayText1(finalText1);
      }
    }, 45);

    const timeout = setTimeout(() => {
      let frame2 = 0;

      const interval2 = setInterval(() => {
        frame2 += 0.4;

        setDisplayText2(scrambleText(finalText2, frame2));

        if (frame2 >= finalText2.length) {
          clearInterval(interval2);
          setDisplayText2(finalText2);
        }
      }, 45);
    }, 350);

    return () => {
      clearInterval(interval1);
      clearTimeout(timeout);
    };
  }, []);

  // CURSOR FOLLOW
  useEffect(() => {
    const cursor = cursorRef.current;

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", moveCursor);

    const animate = () => {
      currentX += (mouseX - currentX) * 0.14;
      currentY += (mouseY - currentY) * 0.14;

      if (cursor) {
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  // MAGNIFY TEXT
  const activateMagnify = (e) => {
    const cursor = cursorRef.current;

    cursor.style.width = "160px";
    cursor.style.height = "160px";

    cursor.style.border = "2px solid white";
    cursor.style.background = "rgba(255,255,255,0.08)";

    cursor.style.boxShadow =
      "0 0 40px rgba(255,255,255,0.25)";

    // AUMENTA EL TEXTO
    e.target.style.transform = "scale(1.12)";
    e.target.style.letterSpacing = "0.25em";

    e.target.style.transition =
      "transform 0.35s ease, letter-spacing 0.35s ease";
  };

  const deactivateMagnify = (e) => {
    const cursor = cursorRef.current;

    cursor.style.width = "18px";
    cursor.style.height = "18px";

    cursor.style.background = "transparent";
    cursor.style.border = "2px solid white";

    cursor.style.boxShadow = "0 0 0px transparent";

    e.target.style.transform = "scale(1)";
    e.target.style.letterSpacing = "0.2em";
  };

  return (
    <div className="go-wrap" style={{ background: BG_COLOR }}>
      
      {/* CUSTOM CURSOR */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: "18px",
          height: "18px",
          border: "2px solid white",
          borderRadius: "999px",
          pointerEvents: "none",
          zIndex: 9999,
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%)",
          transition:
            "width 0.35s ease, height 0.35s ease, background 0.35s ease, box-shadow 0.35s ease",
        }}
      />

      <div className="go-title-wrap">
        
        <h1
          className="go-title"
          onMouseEnter={activateMagnify}
          onMouseLeave={deactivateMagnify}
        >
          {displayText1}
        </h1>

        <h1
          className="go-title go-title--over"
          onMouseEnter={activateMagnify}
          onMouseLeave={deactivateMagnify}
        >
          {displayText2}
        </h1>

      </div>

      <div className="go-anim">
        <img
          src={ANIM_SRC}
          alt="animacion de los granjeros enojados"
          className="go-anim-img"
        />
      </div>

      <div className="go-footer">
        <button className="go-btn">Regresars</button>

        <img
          src={LOGO_SRC}
          alt="logo"
          className="go-logo"
        />
      </div>
    </div>
  );
}