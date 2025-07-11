import { DataTypes } from 'sequelize'
import db from '../data/dbInit.js'


const usuarios = db.define('usuarios', {
    IdUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Clave: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Rol: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

export default usuarios;