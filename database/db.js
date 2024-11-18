import { Sequelize } from 'sequelize';

const db = new Sequelize('db_fullstack_project','root','P@lermo2024',{
    host:'localhost',
    dialect:'mysql'
})

export default db