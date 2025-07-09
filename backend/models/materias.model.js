import { DataTypes } from "sequelize";
import db from "../data/dbInit.js";

//producto es un modelo
const materias = db.define('Materias', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    aprobada: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    carrera: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
    },
    {
        timestamps: false,
        db
    }
) 

materias.belongsToMany(materias, {
  as: 'Correlativas',
  through: 'CorrelativasMaterias',
  foreignKey: 'materiaId',
  otherKey: 'correlativaId'
});


export default materias