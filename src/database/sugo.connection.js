import dotenv from 'dotenv'
dotenv.config()

import Sequelize from 'sequelize'



export const SUGO_sequelize_connection = new Sequelize(
    process.env.DB_SUGO_DATABASE,     // db name   
    process.env.DB_SUGO_USER,         // user 
    process.env.DB_SUGO_PASSWORD,     // passwd
    {
        host: process.env.DB_SUGO_HOST,
        port: process.env.DB_SUGO_PORT,
        dialect: 'postgres'
    }
)