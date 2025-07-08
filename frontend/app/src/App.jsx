import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Mecanica from '../components/mecanica'
import Menu from '../components/Menu'

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu></Menu>}  />
        <Route path='/mecanica' element={<Mecanica></Mecanica>}  />
      </Routes>
    </BrowserRouter>
  )
}

export default App