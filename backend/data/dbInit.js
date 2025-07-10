import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('MateriasUtnFrc', '', '', {
    dialect: 'sqlite',
    storage: './materiasUtnFrc.db'

}) 

export default sequelize