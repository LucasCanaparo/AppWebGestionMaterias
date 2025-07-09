import React from 'react'
import { Link } from 'react-router-dom' 


export default function Menu() {
  return (
    <div>
      <h1>Hola soy menu</h1>
      <Link to='/mecanica'>
        <button>Ingenieria Mecanica</button>
      </Link>
      <Link to='/sistemas'>
        <button>Ingenieria en Sistemas</button>
      </Link>
    </div>
  )
}