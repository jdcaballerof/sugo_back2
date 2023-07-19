import { DataTypes } from "sequelize";
import { SUGO_sequelize_connection } from "../../database/sugo.connection.js";



export const catalogo_modalidad = SUGO_sequelize_connection.define(
    'cat_modalidades',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cve: {
            type: DataTypes.STRING(5)
        },
        desc: {
            type: DataTypes.STRING
        }
    }
)