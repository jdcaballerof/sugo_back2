import { DataTypes } from 'sequelize';
import { SUGO_sequelize_connection } from '../../database/sugo.connection.js';
import { CumpliDesc } from './CumpliDesc.model.js';

/*
    & Siguiendo la doc: https://sequelize.org/docs/v6/core-concepts/model-basics/
        asi se define el esquema de una tabla
        Dentro de esa pagina se encuentra los diferentes Datatypes disponibles (/#data-types)
    (Se importa en index para que cree la tabla)
*/
// ToDo: Quitar mayusculas a los campos, cambiar a snake_case
export const Jornadas = SUGO_sequelize_connection.define(
    'jornadas',     // nombre de la tabla
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cred: {
            type: DataTypes.INTEGER,
        },
        hrIni: {
            type: DataTypes.TIME,
        },
        hrFin: {
            type: DataTypes.TIME,
        },
        //? Puede que lugares seran FK | solo match los string con el swap
        lugIni: {
            type: DataTypes.STRING,
        },
        lugFin: {
            type: DataTypes.STRING,
        },
        corridas: {
            type: DataTypes.INTEGER,
        },
        // done:{
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false
        // },

    },
    // { timestamps: false }        // para no crear las columnas de created_at y updated_at
)


/*
 & Tasks pertenece a Project    */
//  Jornadas.belongsTo(CumpliDesc, {
//     //? Crear/usar la col para la foreignKey en Tasks llamada CumpliDescId
//     foreignKey: 'cumpliDescId',
//     //? Estará enlazado CumpliDescId con la col 'id' de Project (de Tasks a Project)
//     targetId: 'id'
// })

// CumpliDesc.hasMany(Jornadas, {
//     //? Crear/usar la col para la foreignKey en Tasks llamada CumpliDescId
//     foreignKey: 'cumpliDescId',
//     //? Estará enlazado CumpliDescId con la col 'id' de Project (de Project a Tasks)
//     sourceKey: 'id'
// })