import { div } from 'motion/react-client'
import React, { useRef, useState } from 'react'

export const ReproductorMatheo = () => {

    const [mostrarMensaje,setMostrarMensaje] = useState(false)
    const [detener,setDetener] = useState(false)

    const videoRef = useRef (null)

    const handlePlay = () => {
        videoRef.current.play()
    }

        const handlePause = () => {
        videoRef.current.pause()
    }

          const handleAvanzar = () => { 
        videoRef.current.currentTime = 6
    }
  
    const handleUpdate = () => {

       if (videoRef.current.currentTime >= 5 && !detener){
        videoRef.current.pause()
        setMostrarMensaje(true)
        setDetener(true)
        }
    }

    const handleContinuar = () => {
        setMostrarMensaje(false)
        videoRef.current.play()
    }

  return (
    <>
    <h1> Reproductor Interactivo 📹
    </h1>
    <video 
    ref={videoRef}
    width={500} src="" onTimeUpdate={handleUpdate} >
    <source 
    src="https://www.w3schools.com/Html/mov_bbb.mp4" 
    type='video/mp4'
    />

    </video>

   {
    mostrarMensaje && (
        <div>
            <h1>Video detenido en el segundo 5 🤸</h1>
        </div>
    )
   }

    <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleAvanzar}>Segundo 6</button>
        <button onClick={handleContinuar}>Continuar</button>

    </div>
    </>
  )
}

