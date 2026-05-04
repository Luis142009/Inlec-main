import React from 'react'

export const StatusGame = () => {

  const [Gemas, setGemas] = useState (0)

  const [Puntos, setPuntos] = useState (0)

  const [Vidas, setVidas] = useState (0)


  return (

    <>
    <div className='Gemas'>
      <h1>Gemas 🐧</h1>
      <button>Gemas 1</button>
      <button>Gemas 2</button>
      <button>Gemas 3</button>
    </div>

    <div className='puntos'>
      <h1>Puntos 💫</h1>
        <button>+5</button>
        <button>+10</button>
        <button>15</button>

    </div>

    <div className='Vidas'>
      <h1>Vidas ❤️</h1>
        <button>Vida 1</button>
        <button>Vida 2</button>
        <button>Vida 3</button>

    </div>

    </>

  )
}

  