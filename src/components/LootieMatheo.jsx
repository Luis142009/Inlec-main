import Lottie from "lottie-react"
import React from 'react'
import bolitaMatheo from '../assets/bolita.json'

export const LootieMatheo = () => {
  return (
    <div>
      <Lottie
        animationData={bolitaMatheo}
        loop={true}
        style={{ width: 500, height: 500 }}
      />
    </div>
  )
}