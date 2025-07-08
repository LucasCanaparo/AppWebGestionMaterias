import materias from "../models/materias.model.js"

const getAll = () => {
    return materias.findAll({
        include: {
            model: materias,
            as: 'Correlativas',
            through: { attributes: [] } // Oculta la tabla intermedia
        }
    })

}

const actualizarEstado = async (id, data) => {
    console.log(id, 'soy id')
    try {
        //busco por PK
        const materiaActualizada = await materias.findByPk(id)

        if (materiaActualizada) {
            //i existe le paso los datos -> update es una function que actualiza
            return materiaActualizada.update(data)
        }
    } catch (error) {
        console.log(error)
    }
}

export default {
    getAll, actualizarEstado
}