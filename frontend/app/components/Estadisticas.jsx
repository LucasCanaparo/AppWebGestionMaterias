import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Estadisticas() {

    const [materias, setMaterias] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/materiasMecanica`)
            .then(res => setMaterias(res.data))
            .catch(err => console.error("Error al cargar materias:", err));
    }, []);

    const aprobadas = materias.filter(m => m.aprobada);
    const noAprobadas = materias.filter(m => !m.aprobada);

    return (
        <div className="container mt-4 text-light">

            <h2>Estadisticas de tu carrera</h2>

            <div className="row mt-4">
                <div className="col-md-6">
                    <h4>Aprobadas</h4>
                    <table className="table table-dark table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Materia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aprobadas.map((m, i) => (
                                <tr key={m.id}>
                                    <td>{i + 1}</td>
                                    <td>{m.nombre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="col-md-6">
                    <h4>Pendientes</h4>
                    <table className="table table-dark table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Materia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noAprobadas.map((m, i) => (
                                <tr key={m.id}>
                                    <td>{i + 1}</td>
                                    <td>{m.nombre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
    )
}
