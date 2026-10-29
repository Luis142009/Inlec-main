import './App.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'

const Home = lazy(() => import('./pages/Home'))
const Galeria = lazy(() => import('./pages/Galeria'))
const AppMain = lazy(() => import('./AppMain'))

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/capitulos/1" element={<AppMain />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App