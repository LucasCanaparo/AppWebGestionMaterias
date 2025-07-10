import React from 'react'
import { Link } from 'react-router-dom'

export default function UTNFRC() {
    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            <div className="container text-center p-4 bg-dark rounded shadow-sm" style={{ maxWidth: '700px' }}>
                <h1 className="fw-bold mb-3 text-light">Ingenierías de la UTN-FRC</h1>
                <h5 className="mb-4 text-secondary">Seleccione su ingeniería:</h5>

                <div className="row g-3 justify-content-center">
                    <div className="col-12 col-sm-6">
                        <Link to="/mecanica" className="text-decoration-none">
                            <button className="btn btn-success w-100 py-3 shadow-sm">
                                Ingeniería Mecánica
                            </button>
                        </Link>
                    </div>
                    <div className="col-12 col-sm-6">
                        <Link to="/sistemas" className="text-decoration-none">
                            <button className="btn btn-success w-100 py-3 shadow-sm">
                                Ingeniería en Sistemas
                            </button>
                        </Link>
                    </div>
                    {/*
          <div className="col-12 col-sm-6">
            <Link to="/sistemas" className="text-decoration-none">
              <button className="btn btn-success w-100 py-3 shadow-sm">
                Ingeniería Electronica
              </button>
            </Link>
          </div>
          */}
                </div>
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
        </div>
    )
}
