import React from 'react'
import { useEffect, useState } from "react"

export const MatheoRMPage = () => {
     const [Characters, setCharacters] = useState([])

    const getCharacters = async () => {
    const res = await fetch('https://rickandmortyapi.com/api/character')
    const data = res.json()

    console.log(data)

    }  

useEffect(() => {
  getCharacters()
}, [])


    return (
    <div>MatheoRMPages</div>


  )


}
