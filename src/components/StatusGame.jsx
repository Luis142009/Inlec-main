import React from 'react'

export const StatusGame = () => {

  const [Gemas, setGemas] = useState (0)

  const [Puntos, setPuntos] = useState (0)

  const [Vidas, setVidas] = useState (0)


  return (

    <>
    <div className='Gemas'>
      <h1>Gemas 🐧</h1>
      <button onClick={() => setGemas(prev => prev + 1)} >Gemas 1</button>
      <button onClick={() => setGemas(prev => prev + 2)} >Gemas 2</button>
      <button onClick={() => setGemas(prev => prev + 3)} >Gemas 3</button>
    </div>

    <div className='puntos'>
      <h1>Puntos 💫</h1>
        <button onClick={() => setPuntos(prev => prev + 5)} >+5</button>
        <button onClick={() => setPuntos(prev => prev + 10)} >+10</button>
        <button onClick={() => setPuntos(prev => prev + 15)} >+15</button>

    </div>

    <div className='Vidas'>
      <h1>Vidas ❤️</h1>
        <button onClick={() => setVidas(prev => prev + 1)} >Vida 1</button>
        <button onClick={() => setVidas(prev => prev + 2)} >Vida 2</button>
        <button onClick={() => setVidas(prev => prev + 3)} >Vida 3</button>

    </div>

    </>

  )
}

  