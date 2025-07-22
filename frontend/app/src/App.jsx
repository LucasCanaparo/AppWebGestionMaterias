import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Mecanica from '../components/Mecanica'
import Sistemas from '../components/Sistemas'
import Menu from '../components/Menu'
import UTNFRC from '../components/UTNFRC'
import Navbar from '../components/Navbar'
import Estadisticas from '../components/Estadisticas'

function App() {

  return (
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Menu></Menu>}  />
        <Route path='/utnfrc' element={<UTNFRC></UTNFRC>} />
        <Route path='/utnfrc/mecanica' element={<Mecanica></Mecanica>}  />
        <Route path='/utnfrc/sistemas' element={<Sistemas></Sistemas>}  />
        <Route path='/estadisticas' element={<Estadisticas></Estadisticas>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App