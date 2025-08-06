import materias from "../models/materias.model.js"

const getAll = async(options = {}) => {
    return materias.findAll({
        ...options,
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

async function crearMateria(datos) {
    try {
        const nuevaMateria = await materias.create({
            nombre: datos.nombre,
            anio: datos.anio,
            carrera: datos.carrera,
        });
        return nuevaMateria;
    } catch (error) {
        console.log("Error al crear el producto")
    }
};

export default {
    getAll, actualizarEstado, crearMateria
}