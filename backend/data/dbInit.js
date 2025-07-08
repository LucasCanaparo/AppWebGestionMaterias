import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('MateriasMecanica', '', '', {
    dialect: 'sqlite',
    storage: './materiasMecanica.db'

}) 

export default sequelize