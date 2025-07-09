import express from 'express'
import services from '../services/materias.services.js'
import { Op } from 'sequelize';

const router = express.Router()

router.get('/materiasMecanica', async (req, res) => {
    try {
        const data = await services.getAll({
            where: {
                [Op.or]: [
                    { carrera: 1 },
                    { carrera: null }
                ]
            }
        });

        res.json(data)

    } catch (error) {
        console.log("error al traer las materias de mecanica")
        res.status(500).json({ error: 'No se encontraron materias de mecanica' })
    }
})

router.get('/materiasSistemas', async (req, res) => {
    try {
        const data = await services.getAll({
            where: {
                [Op.or]: [
                    { carrera: 2 },
                    { carrera: null }
                ]
            }
        });
        res.json(data)

    } catch (error) {
        console.log("error al traer las materias de sistemas")
        res.status(500).json({ error: 'No se encontraron materias de sistemas' })
    }
})


router.put('/materiasMecanica/:id', async (req, res) => {

    const data = req.body
    const { id } = req.params

    console.log(data, 'soy estado')
    console.log(id)

    try {
        if (id) {
            //envio los datos como parametro a la funcion que busca por id y actualiza con los datos
            const materiaActualizada = await services.actualizarEstado(id, data)

            res.json(materiaActualizada)
        }
        else {
            res.status(404).json({ mensaje: 'ruta invalida' })
        }

    } catch (error) {
        console.log("error al actualizar el estadode la materia")
        res.status(500).json({ error: 'No se encontró la materia de mecanica' })
    }
})

export default router