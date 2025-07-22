import React from 'react'
import {Link} from 'react-router-dom'

export default function Estadisticas() {
    return (
        <div>
            <h1>hOLA, SOY ESTADISITICAS</h1>
            <Link to='/'>
                <button className='btn btn-secondary'
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        zIndex: 1000
                    }}>Volver al menú</button>
            </Link>
        </div>
    )
}
