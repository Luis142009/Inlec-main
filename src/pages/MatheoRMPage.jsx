import React from 'react'
import { useEffect, useState } from "react"

export const MatheoRMPage = () => {
     const [Characters, setCharacters] = useState([])

    const getCharacters = async () => {
    const res = await fetch('https://rickandmortyapi.com/api/character')
    const data = await res.json()
    setCharacters(data.results)
    console.log(data)

    }  

useEffect(() => {
  getCharacters()
}, [])


     const [pokemons, setPokemons] = useState([])

    const getPokemons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const data = await res.json()
    setPokemons(data.results)
    console.log(data)

    }  

    
useEffect(() => {
  getPokemons()
}, [])


    return (
    <>
    <h1>Personajes de Rick & Morty</h1>

        {Characters.map( (char, index) => (
<div className="card" style={{width: "10rem"}}>
  <img src={char.image} className="card-img-top" alt="..."></img>
  <div className="card-body">
    <h5 className="card-title">{char.name}</h5>
    <p className="card-text"> Status: {char.status}</p>
    <p className="card-text"> Species: {char.species}</p>
  </div>
</div>
        ) )}




    </>

  )

  
}
