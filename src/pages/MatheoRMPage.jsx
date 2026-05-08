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
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
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
    setPokemons(detallesPokemon)
    console.log(data)
  }


  useEffect(() => {
    getPokemons()
  }, [])


  return (
    <>
      <h1>Personajes de Rick & Morty</h1>

      {Characters.map((char, index) => (
        <div key={index} className="card" style={{ width: "10rem" }}>
          <img src={char.image} className="card-img-top" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">{char.name}</h5>
            <p className="card-text"> Status: {char.status}</p>
            <p className="card-text"> Species: {char.species}</p>
          </div>
        </div>
      ))}


      <h1>Tarjetas Pokemon (Matheo)</h1>
      {pokemons.map((poke, index) => (
        <div key={index} className="card" style={{ width: "10rem" }}>
          <img src={poke.image} className="card-img-top" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">{poke.name}</h5>
            <p className="card-text"> Status: {poke.type}</p>
            <p className="card-text"> Species: {poke.id}</p>
          </div>
        </div>
      ))}





    </>

  )


}
