/*import React, { useEffect, useState } from "react"

export const SneyderRMPage = () => {

  const [character, setCharacter] = useState([])

  const getCharacter = async () => {

    const res = await fetch("https://rickandmortyapi.com/api/character")
    const data = await res.json()
    setCharacter(data.results)
    console.log(data)
  }

  const [Pokemon, setPokemon] = useState([])

  const getPokemon = async () => {

    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
    const data = await res.json()

    const detallesPokemon = await Promise.all(

      data.results.map(async (Pokemon) => {
        const res = await fetch(Pokemon.url)
        const detalles = await res.json()

        return {
          id: detalles.id,
          name: detalles.name,
          image: detalles.sprites.other["official-artwork"].front_default,
          types: detalles.types[0].type.name
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

      <h1>Personajes de Rick and Morty</h1>


      {character.map((char, index) => (
        <div key={index} className="card mb-3" style={{ width: "540px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={char.image} className="img-fluid rounded-start" alt="" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{char.name}</h5>
                <p className="card-text">Status: {char.status}</p>
                <p className="card-text">Especie: {char.species}</p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

  

      <div className="container">
        <div class="row gap-3 text-center">
          <h1>tarjetas de pokemon</h1>
          <div></div>
          {Pokemon.map((char, index) => (
            <div key={index} className="card mb-3" style={{ width: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={char.image} className="img-fluid rounded-start" alt="" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{char.name}</h5>
                    <p className="card-text">Status: {char.types}</p>
                    <p className="card-text">Nivel: {char.id}</p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        Last updated 3 mins ago
                      </small>
                    </p>
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



