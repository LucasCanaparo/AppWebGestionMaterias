import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
//import '../CSS/Mecanica.css'

export default function Sistemas() {

    const [materias, setMaterias] = useState([])

    useEffect(() => {
        const Materias = async () => {
            const materias = await axios.get('http://localhost:4000/materiasSistemas')
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
                //alert('Aprobasteeeeeee');

                //actualiza el estado
                const materiaAprobada = materias.map((m) => {
                    // Si es la materia aprobada, marcala como aprobada
                    if (m.id === data.id) {
                        return { ...m, aprobada: true }
                    }

                    // Si no, revisá si tenía a esta materia como correlativa
                    const nuevasCorrelativas = m.Correlativas.map((corr) =>
                        corr.id === data.id ? { ...corr, aprobada: true } : corr
                    )

                    return { ...m, Correlativas: nuevasCorrelativas }
                })
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
                //alert('Quitaste la aprobacion');

                //actualiza el estado
                const materiaDesaprobada = materias.map((m) => {
                    // Si es la materia aprobada, marcala como aprobada
                    if (m.id === data.id) {
                        return { ...m, aprobada: false }
                    }

                    // Si no, revisá si tenía a esta materia como correlativa
                    const nuevasCorrelativas = m.Correlativas.map((corr) =>
                        corr.id === data.id ? { ...corr, aprobada: false } : corr
                    )

                    return { ...m, Correlativas: nuevasCorrelativas }
                })


                setMaterias(materiaDesaprobada)
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
        <div style={{
            width: '100%',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#1e1e2f',
            borderRadius: '10px'
        }}>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            <h1 style={{ color: 'white' }}>Malla Ingenieria Mecánica</h1>

            {materias.length === 0 ? (
                <p>No hay materias disponibles</p>
            ) : (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap'
                }}>
                    {Object.keys(materiasPorAnio)
                        .sort((a, b) => a - b)
                        .map((anio) => (
                            <div key={anio} style={{
                                flex: 1, minWidth: '220px'
                            }}>
                                <h3 style={{ textAlign: 'center', color: 'white' }}> {anio} Año </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {materiasPorAnio[anio].map((e, i) => (
                                        <div
                                            key={i}
                                            className={`card shadow-sm mb-4 px-3 py-2 border-0 rounded-4`}
                                            style={{
                                                padding: '1rem',
                                                borderRadius: '12px',
                                                backgroundColor: e.aprobada
                                                    ? '#20c997'
                                                    : puedeAprobar(e)
                                                        ? '#fff'
                                                        : '#f3f4f6',
                                                color: !puedeAprobar(e) ? '#9ca3af' : 'inherit',
                                                border: e.aprobada
                                                    ? '2px solid #10b981'
                                                    : '1px solid #e5e7eb',
                                                transition: '0.3s ease'
                                            }}
                                        >
                                            <div className="card-body" >
                                                <h5 style={{ fontWeight: 'bold' }}>{e.nombre}</h5>
                                                <div className="d-flex flex-wrap justify-content-center gap-1 py-1">
                                                    {e.Correlativas.length > 0 && !e.aprobada ? (
                                                        e.Correlativas
                                                            .filter((c) => !c.aprobada)
                                                            .map((c, j) => (
                                                                <span
                                                                    key={j}
                                                                    className="badge bg-primary me-1"
                                                                    style={{ fontSize: '0.65rem' }}
                                                                >
                                                                    {c.nombre}
                                                                </span>
                                                            ))
                                                    ) : (
                                                        <span></span>
                                                    )}
                                                </div>

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
                            </div>
                        ))}
                </div>
            )
            }
            <Link to='/'>
                <button className='btn btn-secondary'
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        zIndex: 1000
                    }}>Volver al menú</button>
            </Link>
        </div >
    )
}