import React, {useEffect, useState } from "react"

export const LuisRMPage = () => {

const [character, setCharacter] = useState([0])

const getCharacter = async () => {

const res = await fetch("https://rickandmortyapi.com/api/character")
const data = await res.json()

console.log(data)
}
useEffect(() => {
  getCharacter()

}, [])


  return (
    <div>LuisRMPage</div>
  )
}
