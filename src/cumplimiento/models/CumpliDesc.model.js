import {DataTypes} from 'sequelize';
import { SUGO_sequelize_connection } from '../../database/sugo.connection.js';
import { Jornadas } from './Jornadas.model.js';
import { Cumplimiento } from './Cumpli.model.js';


/*
    & Siguiendo la doc: https://sequelize.org/docs/v6/core-concepts/model-basics/
        asi se define el esquema de una tabla
        Dentro de esa pagina se encuentra los diferentes Datatypes disponibles (/#data-types)
    (Se importa en index para que cree la tabla)
*/
export const CumpliDesc =  SUGO_sequelize_connection.define(
    'cumpli_description',     // nombre de la tabla (Añade una "s" al final del nombre)
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ruta:{
            type: DataTypes.STRING,
        },
        modalidad:{
            type: DataTypes.STRING,
        },
    }
)


/*
    & Definiendo la relacion con la tabla Tasks
        Project hasMany Tasks;          Tasks pertenece a Project (en Tasks)  */ 
CumpliDesc.hasMany(Jornadas, {
    //? Crear/usar la col para la foreignKey en Tasks llamada CumpliDescId
    foreignKey: 'cumpliDescId',
    //? Estará enlazado CumpliDescId con la col 'id' de Project (de Project a Tasks)
    sourceKey: 'id'
})

Jornadas.belongsTo(CumpliDesc, {
    //? Crear/usar la col para la foreignKey en Tasks llamada CumpliDescId
    foreignKey: 'cumpliDescId',
    //? Estará enlazado CumpliDescId con la col 'id' de Project (de Tasks a Project)
    targetId: 'id'
})

// CumpliDesc.belongsTo(Cumplimiento, {
//     //? Crear/usar la col para la foreignKey en Tasks llamada CumplimientoId
//     foreignKey: 'cumplimientoId',
//     //? Estará enlazado CumplimientoId con la col 'id' de Project (de Tasks a Project)
//     targetId: 'id'
// })