import React, {useEffect, useState } from "react"

export const LuisRMPage = () => {

const [character, setCharacter] = useState([0])

const getCharacter = async () => {

const res = await fetch("https://rickandmortyapi.com/api/character")
const data = await res.json()
setCharacter(data.results)
console.log(data)
}
useEffect(() => {
  getCharacter()

}, [])


  return (
   <>
    <h1> Personajes de rick and Morty</h1>
    <ul>
      {character.map( (char, index) => (
        <li key={index}>
            <p>{char.name}</p>
        </li>
      ))}
    </ul>
   
   </>
  )


}
