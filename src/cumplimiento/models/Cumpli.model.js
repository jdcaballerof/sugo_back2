import {DataTypes} from 'sequelize';
import { CumpliDesc } from './CumpliDesc.model.js';
import { SUGO_sequelize_connection } from '../../database/sugo.connection.js';


/*
    & Siguiendo la doc: https://sequelize.org/docs/v6/core-concepts/model-basics/
        asi se define el esquema de una tabla
        Dentro de esa pagina se encuentra los diferentes Datatypes disponibles (/#data-types)
    (Se importa en index para que cree la tabla)
*/
export const Cumplimiento =  SUGO_sequelize_connection.define(
    'cumplimiento',     // nombre de la tabla (Añade una "s" al final del nombre)
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        porcentaje:{
            type: DataTypes.DECIMAL(5,2),
        },
        cumplidos:{
            type: DataTypes.INTEGER,
        },
        tipo:{
            type: DataTypes.INTEGER,
            comment: '0: eco, 1: operador'
        },
        serial:{
            type: DataTypes.INTEGER,
            comment: 'No. de operador o bus'
        },
        fecha:{
            type: DataTypes.DATEONLY,
        },
        modulo:{
            type: DataTypes.INTEGER,
        },
    }
)


/*
    & Definiendo la relacion con la tabla Tasks
        Project hasMany Tasks;          Tasks pertenece a Project (en Tasks)  */ 

Cumplimiento.hasOne(CumpliDesc, {
    //? Crear/usar la col para la foreignKey en Tasks llamada CumplimientoId
    foreignKey: 'cumplimientoId',
    //? Estará enlazado CumplimientoId con la col 'id' de Project (de Project a Tasks)
    sourceKey: 'id'
})

CumpliDesc.belongsTo(Cumplimiento, {
    //? Crear/usar la col para la foreignKey en Tasks llamada CumplimientoId
    foreignKey: 'cumplimientoId',
    //? Estará enlazado CumplimientoId con la col 'id' de Project (de Tasks a Project)
    targetId: 'id'
})
