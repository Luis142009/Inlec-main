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
import React, { useRef, useEffect } from "react";
import "../stylesheets/Textos.css";

const BG_COLOR = "#000000";

const ANIM_SRC = "/Derrota.mp4";
const LOGO_SRC = "/logo.png";

export default function LuisRMPage() {
  const cursorRef = useRef(null);
  const videoRef = useRef(null);

  // =========================
  // ACTIVA SONIDO EN PRIMERA INTERACCIÓN
  // =========================

  useEffect(() => {
    const enableSound = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play();
      }

      window.removeEventListener("click", enableSound);
      window.removeEventListener("keydown", enableSound);
    };

    window.addEventListener("click", enableSound);
    window.addEventListener("keydown", enableSound);

    return () => {
      window.removeEventListener("click", enableSound);
      window.removeEventListener("keydown", enableSound);
    };
  }, []);

  // =========================
  // CURSOR FOLLOW
  // =========================

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

  return (
    <div
      className="go-wrap"
      style={{ background: BG_COLOR }}
    >
      {/* CURSOR */}

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
            "width 0.35s ease, height 0.35s ease",
        }}
      />

      {/* VIDEO */}

      <div className="go-anim">
        <video
          ref={videoRef}
          className="go-anim-img"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src={ANIM_SRC}
            type="video/mp4"
          />
        </video>
      </div>

      {/* FOOTER */}

      <div className="go-footer">
        <button className="go-btn">
          Regresar
        </button>

        <img
          src={LOGO_SRC}
          alt="logo"
          className="go-logo"
        />
      </div>
    </div>
  );
}