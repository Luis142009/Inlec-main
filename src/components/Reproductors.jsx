import React, { useRef, useState } from 'react'

export const Reproductors = () => {

    const [monstrarMensaje, setMonstrarMensaje] = useState(false)
    const [detener, setDetener] = useState(false)
   

    const videoRef = useRef(null)

    const handlePlay = () => {
        videoRef.current.play()
    }

    const handlePause = () => {
        videoRef.current.pause()
    }

    const handleAvanzar = () => {
        videoRef.current.currentTime = 6
    }

    const handleContinuar = () => {
        setMonstrarMensaje(false)
        videoRef.current.play()
    }

    const handleUpdate = () => {
        if(videoRef.current.currentTime >= 5 && !detener) {
            videoRef.current.pause()
            setMonstrarMensaje(true)
            setDetener(true)
        }
    }

   

    return (
        <>
            <h1>Reproductore interactivo</h1>
            <video
                ref={videoRef}
            width={700}
            onTimeUpdate={handleUpdate}
            controls
            >
                <source
                    src="animacion1.mp4"
                    type="video/mp4"
                />

            </video>

            {
                monstrarMensaje && (
                    <div>
                        <h2>video  detenido en el segundo 🤢👀 5 segundos</h2>
                    </div>
                )
            }


            <div>
                <button onClick={handlePlay}>Play</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleAvanzar}>Avanzar a 6 segundos</button>
                <button onClick={handleContinuar}>Continuar</button>
            </div>
        </>
    )
}

