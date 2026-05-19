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

import React, { useState, useEffect } from 'react'
import '../stylesheets/Textos.css';




const BG_COLOR = "#000000"
const ANIM_SRC = "/assets/granjeros.gif"
const LOGO_SRC = "/public/logo.png"


export const LuisRMPage = () => {


  useEffect(() => {


  }, [])


  return (
    <div className="go-wrap" style={{ background: BG_COLOR }}>


      <div className="go-title-wrap">
        <h1 className="go-title">GAME</h1>
        <h1 className="go-title go-title--over">OVER</h1>
      </div>


      <div className="go-anim">
        <img src={ANIM_SRC} alt="animacion de los granjeros enojados" className="go-anim-img" />
      </div>


      <div className="go-footer">
        <button className="go-btn">Regresar</button>
        <img src={LOGO_SRC} alt="logo" className="go-logo" />
      </div>
    </div>
  )
}

