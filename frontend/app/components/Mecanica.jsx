import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../CSS/Mecanica.css'

export default function Mecanica() {

  const [materias, setMaterias] = useState([])

  useEffect(() => {
    const Materias = async () => {
      const materias = await axios.get('http://localhost:4000/materiasMecanica')
      //ordena por anio
      const materiasOrdenadas = materias.data.slice().sort((a, b) => a.anio - b.anio)
      setMaterias(materiasOrdenadas)

    }

    Materias()
  }, [])

  // Agrupar materias por anio
  //reduce() se utiliza para iterar sobre los elementos de un array y reducirlo a un único valor
  const materiasPorAnio = materias.reduce((acc, materia) => {
    if (!acc[materia.anio]) {
      console.log(materia)
      acc[materia.anio] = []
    }
    acc[materia.anio].push(materia)
    return acc
  }, {})

  const handleAprobado = async (data) => {

    const materiaActualizada = {
      ...data,
      aprobada: true
    }
    try {
      console.log("data a enviar:", materiaActualizada);

      const aprobada = await axios.put(`http://localhost:4000/materiasMecanica/${materiaActualizada.id}`, materiaActualizada)
      if (aprobada) {
        alert('Aprobasteeeeeee');

        //actualiza el estado
        const materiaAprobada = materias.map((m) =>
          m.id === data.id ? { ...m, aprobada: true } : m
        )
        setMaterias(materiaAprobada)
      } else {
        console.log('error al aprobar la materia :(')
      }
    } catch (error) {
      console.log({ message: 'error de modifcar materia: ', error })
    }
  }

  const handleDesaprobado = async (data) => {

    const materiaActualizada = {
      ...data,
      aprobada: false
    }
    try {
      console.log("data a enviar:", materiaActualizada);

      const desaprobada = await axios.put(`http://localhost:4000/materiasMecanica/${materiaActualizada.id}`, materiaActualizada)
      if (desaprobada) {
        alert('Quitaste la aprobacion');

        //actualiza el estado
        const materiaDesprobada = materias.map((m) =>
          m.id === data.id ? { ...m, aprobada: false } : m
        )
        setMaterias(materiaDesprobada)
      } else {
        console.log('error al quitar la aprobacion a la materia :(')
      }
    } catch (error) {
      console.log({ message: 'error de modifcar materia: ', error })
    }
  }

  const puedeAprobar = (materia) => {
    // Si no tiene correlativas, se puede aprobar
    if (!materia.Correlativas || materia.Correlativas.length === 0) return true

    // Verifica que todas las correlativas estén aprobadas
    return materia.Correlativas.every((corr) => {
      const materiaCorr = materias.find((m) => m.id === corr.id)
      return materiaCorr?.aprobada === true
    })
  }




  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', padding: '20px' }}>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
      <h1>Soy el componente de mecanica</h1>

      {materias.length === 0 ? (
        <p>No hay materias disponibles</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          {Object.keys(materiasPorAnio)
            .sort((a, b) => a - b)
            .map((anio) => (
              <div key={anio} style={{ flex: 1 }}>
                <h3 style={{ textAlign: 'center' }}> {anio} Año </h3>
                {materiasPorAnio[anio].map((e, i) => (
                  <div
                    key={i}
                    className="card mb-3"
                    style={{
                      cursor: 'default',
                      minWidth: '200px',
                      border: e.aprobada
                        ? '2px solid #0d9488'
                        : !puedeAprobar(e)
                          ? '2px solid #d6d6d6'
                          : '1px solid #ccc',
                      backgroundColor: e.aprobada
                        ? '#20c997'
                        : !puedeAprobar(e)
                          ? '#f8f9fa'
                          : '#ffffff',
                      opacity: !puedeAprobar(e) ? 0.6 : 1 
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{e.nombre}</h5>
                      <p>
                        {e.Correlativas.length > 0 ? (
                          e.Correlativas.map((c, j) => (
                            <span key={j} className="badge bg-primary me-1">
                              {c.nombre}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted">Sin correlativas</span>
                        )}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">Aprobada: {e.aprobada === false ? 'NO' : 'SI'} </small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted">{e.anio} Año </small>
                      </p>
                      {e.aprobada ? <button
                        onClick={() => handleDesaprobado(e)}
                        className="btn btn-secondary"
                        disabled={!e.aprobada}
                      >
                        Quitar aprobado
                      </button> : (
                        <button
                          onClick={() => handleAprobado(e)}
                          className={`btn ${e.aprobada ? 'btn-secondary' : puedeAprobar(e) ? 'btn-success' : 'btn-outline-secondary'}`}
                          disabled={e.aprobada || !puedeAprobar(e)}
                        >
                          {e.aprobada
                            ? 'Ya aprobada'
                            : !puedeAprobar(e)
                              ? 'Correlativas pendientes'
                              : 'Aprobar'}
                        </button>

                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )
      }
    </div >
  )
}
