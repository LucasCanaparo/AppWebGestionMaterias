import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Mecanica from '../components/Mecanica'
import Sistemas from '../components/Sistemas'
import Menu from '../components/Menu'
import UTNFRC from '../components/UTNFRC'

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu></Menu>}  />
        <Route path='/utnfrc' element={<UTNFRC></UTNFRC>} />
        <Route path='/utnfrc/mecanica' element={<Mecanica></Mecanica>}  />
        <Route path='/utnfrc/sistemas' element={<Sistemas></Sistemas>}  />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App