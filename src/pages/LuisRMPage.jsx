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

const res = await fetch("https://pokeapi.co/api/v2/pokemon/limit=12")
const data = await res.json()

const detallesPokemon = await Promise.all(

  data.results.map(async (Pokemon) => {
  const res = await fetch(Pokemon.url)
  const detalles = await res.json()

  return{
    id: detalles.id,
    name: detalles.name,
    image: detalles.sprites.other["official-artwork"].front_default,
    types : detalles.types[0].type.name
    
    
  }
  })
  
)

setPokemon(data.results)
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
     <div className="card mb-3" style={{ maxWidth: "640px" }}>
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
    
  
   

   
   </>
  )


}
