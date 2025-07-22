import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function Estadisticas() {

    const [materias, setMaterias] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/materiasMecanica`)
            .then(res => setMaterias(res.data))
            .catch(err => console.error("Error al cargar materias:", err));
    }, []);

    // Agrupamos materias por año y por estado
    const materiasPorAnio = materias.reduce((acc, materia) => {
        const anio = materia.anio;
        if (!acc[anio]) acc[anio] = { aprobadas: [], pendientes: [] };
        if (materia.aprobada) acc[anio].aprobadas.push(materia);
        else acc[anio].pendientes.push(materia);
        return acc;
    }, {});

    const anios = Object.keys(materiasPorAnio).sort((a, b) => a - b);

    const totalAprobadas = materias.filter(m => m.aprobada).length
    const totalPendientes = materias.filter(m => !m.aprobada).length

    //para el grafico de torta
    const dataPie = [
        { name: 'Aprobadas', value: totalAprobadas },
        { name: 'Pendientes', value: totalPendientes }
    ];

    const COLORS = ['#28a745', '#dc3545']; // verde y rojo

    return (
        <div>
            <div className="container mt-4 text-light" style={{
                width: '100%',
                margin: '0 auto',
                padding: '20px',
                backgroundColor: '#1e1e2f',
                borderRadius: '10px'
            }}>

                <h2 >Estadisticas de tu carrera</h2>

                <div className="row mt-4">
                    <div className="col-md-6">
                        <h4>Aprobadas ({totalAprobadas})</h4>
                        {anios.map(anio => {
                            const bloque = materiasPorAnio[anio];
                            if (bloque.aprobadas.length === 0) return null

                            return (
                                <div key={`aprobadas-${anio}`} className="mb-4">
                                    <h5>{anio}° Año</h5>
                                    <table className="table table-dark table-bordered">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Materia</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bloque.aprobadas.map((m, i) => (
                                                <tr key={m.id}>
                                                    <td>{i + 1}</td>
                                                    <td>{m.nombre}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pendientes */}
                    <div className="col-md-6">
                        <h4>Pendientes ({totalPendientes})</h4>
                        {anios.map(anio => {
                            const bloque = materiasPorAnio[anio];
                            if (bloque.pendientes.length === 0) return null;

                            return (
                                <div key={`pendientes-${anio}`} className="mb-4">
                                    <h5>{anio}° Año</h5>
                                    <table className="table table-dark table-bordered">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Materia</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bloque.pendientes.map((m, i) => (
                                                <tr key={m.id}>
                                                    <td>{i + 1}</td>
                                                    <td>{m.nombre}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            );
                        })}
                    </div>
                </div>



                < Link to='/' >
                    <button className='btn btn-secondary'
                        style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            zIndex: 1000
                        }}>Volver al menú</button>
                </Link>
            </div >
            <div className="container mt-4 text-light" style={{
                width: '100%',
                margin: '0 auto',
                padding: '20px',
                backgroundColor: '#1e1e2f',
                borderRadius: '10px'
            }}>
                <h4>Progreso General</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={dataPie}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {dataPie.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    )
}
