import React from 'react'
import { useEffect, useState } from 'react'

export const SneyderRMPage = () => {
  const [Characters, setCharacters] = useState([])

  const getCharacters = async () => {

    const res = await fetch('https://rickandmortyapi.com/api/character')
    const data = await res.json()
    setCharacters(data.results)


    




    

    console.log(data)

  }

    const [Pokemons, setPokemons] = useState([])

   const getPokemnos = async () => {

    const res = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const data = await res.json()
    setPokemons(data.results)


    console.log(data)

  }

  useEffect(() => {
    getCharacters()
    getPokemnos()
  }, [])

  return (
    <>

      <h1>Personajes de Rick and Morty</h1>


      {Characters.map((char, index) => (
        <div Key={index} className="card mb-3" style={{ width: "540px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={char.image} className="img-fluid rounded-start" alt="" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{char.name}</h5>
                <p className="card-text">Status: {char.status}</p>
                <p className="card-text">Especie: {char.species}</p>
                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>
      ))}


    </>

  )
}