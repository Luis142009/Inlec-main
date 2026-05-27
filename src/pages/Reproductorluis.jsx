import React, {useRef, useState } from 'react'

export const Reproductorluis = () => {
    
const [mostrarMensaje, setMostrarMensaje] = useState(false)
const [Detener, setDetener] = useState(true)

const videoRef= useRef(null)
const handlePlay = () => {
    videoRef.current.play()
}


const handlePause = () => {
    videoRef.current.pause()
}

const handleavanzar = () => {
    videoRef.current.currentTime =6
}


const handleUpdate = () => {
    if ( videoRef.current.currentTime >= 5  && !Detener){
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
    <h1>Reproductor interactivo</h1>
 
    <video
      ref={videoRef}  width={700} onTimeUpdate={handleUpdate}  >

        <source
         src="https://www.w3schools.com/Html/mov_bbb.mp4"
         type='video/mp4'
         
         />
    </video>
{
    mostrarMensaje &&(
        <div>
            <h2>video detenido en el seg. 5 😘</h2>
        </div>
    )
}

  <div>
     <button onClick={handleContinuar}>Continuar</button>
    <button onClick={handleavanzar}>ir al 6</button>
    <button onClick={handlePlay}>Play</button>
    <button onClick={handlePause}>Pause</button>
  </div>


    </>
  )
}
