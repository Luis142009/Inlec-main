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


/*export const SneyderRMPage = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-12 mt-5 text-center'>
            <h1 className='titulo'>EL SUPER ZORRO</h1>
          </div>
          <div className='col-12 mt-5'>
            <h3 className='titulo'>CAPITULO #1</h3>
          </div>
          <div className='col-12 mt-3'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.   <br />Nullam auctor, nisl eget ultricies aliquet, nunc nisl <br /> aliquam nisl, eget ultricies nisl nunc eget nisl. Nullam auctor, <br /> nisl eget ultricies aliquet, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl.</p>
          </div>
          <div className='col-12 mt-5 text-center'>
            <button type="button" class="btn btn-warning">VER CAPITULO</button>
          </div>
          {/* <div className='col-12 mt-5 text-center d-flex justify-content-center align-items-end vh-100'>
            <button type="button" class="btn btn-warning">Warning</button>
          </div> 
        </div>
      </div>

    </>
  )
}*/



export const SneyderRMPage = () => {
  return (
    <>
      <div
        id="carouselCapitulos"
        className="carousel slide"
        data-bs-ride="false"
      >
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselCapitulos" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Capítulo 1"></button>
          <button type="button" data-bs-target="#carouselCapitulos" data-bs-slide-to="1" aria-label="Capítulo 2"></button>
          <button type="button" data-bs-target="#carouselCapitulos" data-bs-slide-to="2" aria-label="Capítulo 3"></button>
          <button type="button" data-bs-target="#carouselCapitulos" data-bs-slide-to="3" aria-label="Capítulo 4"></button>
          <button type="button" data-bs-target="#carouselCapitulos" data-bs-slide-to="4" aria-label="Capítulo 5"></button>
        </div>

        <div className="carousel-inner">

      
          <div className="carousel-item active">
            <div className='container'>
              <div className='row'>
                <div className='col-12 mt-5 text-center'>
                  <h1 className='titulo'>EL SUPER ZORRO</h1>
                </div>
                <div className='col-12 mt-5'>
                  <h3 className='titulo'>CAPITULO #1</h3>
                </div>
                <div className='col-12 mt-3'>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.   <br />Nullam auctor, nisl eget ultricies aliquet, nunc nisl <br /> aliquam nisl, eget ultricies nisl nunc eget nisl. Nullam auctor, <br /> nisl eget ultricies aliquet, nunc nisl aliquam nisl, eget ultricies nisl nunc eget nisl.</p>
                </div>
                <div className='col-12 mt-5 text-center'>
                  <button type="button" className="btn btn-warning">Warning</button>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className='container'>
              <div className='row'>
                <div className='col-12 mt-5 text-center'>
                  <h1 className='titulo'>EL SUPER pidaña</h1>
                </div>
                <div className='col-12 mt-5'>
                  <h3 className='titulo'>CAPITULO #2</h3>
                </div>
                <div className='col-12 mt-3'>
                  <p>El zorro descubrió una cueva misteriosa en lo más profundo del bosque. <br />Dentro había mapas antiguos y tesoros olvidados por generaciones. <br /> Nadie había llegado tan lejos, pero el zorro no temía nada. <br /> Su astucia lo guiaba a través de cada trampa y obstáculo.</p>
                </div>
                <div className='col-12 mt-5 text-center'>
                  <button type="button" className="btn btn-warning">Warning</button>
                </div>
              </div>
            </div>
          </div>

         
          <div className="carousel-item">
            <div className='container'>
              <div className='row'>
                <div className='col-12 mt-5 text-center'>
                  <h1 className='titulo'>EL SUPER ZORRO</h1>
                </div>
                <div className='col-12 mt-5'>
                  <h3 className='titulo'>CAPITULO #3</h3>
                </div>
                <div className='col-12 mt-3'>
                  <p>Una alianza inesperada surgió cuando el águila real se unió al zorro. <br />Juntos podían ver desde las alturas y moverse entre las sombras. <br /> La combinación de sus habilidades era imparable ante cualquier rival. <br /> El bosque nunca había visto una dupla tan poderosa.</p>
                </div>
                <div className='col-12 mt-5 text-center'>
                  <button type="button" className="btn btn-warning">Warning</button>
                </div>
              </div>
            </div>
          </div>

         
          <div className="carousel-item">
            <div className='container'>
              <div className='row'>
                <div className='col-12 mt-5 text-center'>
                  <h1 className='titulo'>EL SUPER ZORRO</h1>
                </div>
                <div className='col-12 mt-5'>
                  <h3 className='titulo'>CAPITULO #4</h3>
                </div>
                <div className='col-12 mt-3'>
                  <p>El gran cazador llegó al bosque con redes y trampas de acero. <br />Buscaba al zorro desde hacía años sin lograrlo jamás. <br /> Pero esta vez traía un secreto que nadie conocía todavía. <br /> El enfrentamiento final estaba más cerca que nunca antes.</p>
                </div>
                <div className='col-12 mt-5 text-center'>
                  <button type="button" className="btn btn-warning">Warning</button>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className='container'>
              <div className='row'>
                <div className='col-12 mt-5 text-center'>
                  <h1 className='titulo'>EL SUPER ZORRO</h1>
                </div>
                <div className='col-12 mt-5'>
                  <h3 className='titulo'>CAPITULO #5</h3>
                </div>
                <div className='col-12 mt-3'>
                  <p>Al amanecer del último día, el zorro se enfrentó a su destino. <br />Con una última maniobra brillante burló todas las trampas tendidas. <br /> El bosque volvió a ser libre, en paz y silencio otra vez. <br /> La leyenda del Super Zorro viviría para siempre en cada árbol.</p>
                </div>
                <div className='col-12 mt-5 text-center'>
                  <button type="button" className="btn btn-warning">Warning</button>
                </div>
              </div>
            </div>
          </div>

        </div>

       
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselCapitulos" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselCapitulos" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </>
  )
}
