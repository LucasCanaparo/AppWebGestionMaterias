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

/*
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
    */


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


//ruta para el chatbot
router.post('/pregunta', async (req, res) => {
    const query = req.body.queryResult?.queryText?.toLowerCase()

    console.log(query)

    const añoMatch = query.match(/(\d+)/)
    const año = añoMatch ? parseInt(añoMatch[1]) : null

    console.log(añoMatch)
    console.log(año)

    if (!año) {
        return res.json({
            fulfillmentText: 'No entendí qué año querés consultar. ¿Podés repetirlo?',
        })
    }

    // Buscar en tu base de datos
    const materias = await services.getAll({ where: { anio: año, carrera: 1 } })

    if (!materias || materias.length === 0) {
        return res.json({
            fulfillmentText: `No encontré materias para ${año}° año.`,
        });
    }
    else {
        return res.json({
            fulfillmentText: `Hay ${materias.length} materias en ${año}° año.`,
        });
    }
})


/*
router.post('/pregunta', (req, res) => {
    console.log("<zdsczdxcv")
    console.log('✅ Webhook recibió algo:', req.body.queryResult?.queryText);

    res.json({
        fulfillmentText: 'Webhook activo y funcionando 🔥',
    });
});


router.post('/pregunta', async (req, res) => {
    try {
        const { nombre, anio, carrera } = req.body;

        console.log(req.body)

        const nuevaMateria = await services.crearMateria({
            nombre,
            anio,
            carrera,
        });

        res.json(nuevaMateria);
    } catch (error) {
        console.log("Error al crear el producto:", error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});
*/


export default router
