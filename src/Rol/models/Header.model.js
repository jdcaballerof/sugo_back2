import {DataTypes} from 'sequelize';
import { SUGO_sequelize_connection } from '../../database/sugo.connection.js';
import { Servicio } from './Servicio.model.js';

/*
    & Siguiendo la doc: https://sequelize.org/docs/v6/core-concepts/model-basics/
        asi se define el esquema de una tabla
        Dentro de esa pagina se encuentra los diferentes Datatypes disponibles (/#data-types)
    (Se importa en index para que cree la tabla)
*/
export const Header =  SUGO_sequelize_connection.define(
    'rol_headers',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        modulo:{
            type: DataTypes.INTEGER,     // De -128 a 127 (si se utiliza el signo) o de 0 a 255
            comment: 'modulos 1-7, 0: oficinas'
        },
        ruta_id:{
            type: DataTypes.STRING,
            comment: 'catalogo'
        },
        modalidad_id:{
            type: DataTypes.STRING,
            comment: 'catalogo'
        },
        periodo_id:{
            type: DataTypes.STRING,
            comment: 'catalogo'
        },
    }
)


/*
    & Definiendo la relacion con la tabla Tasks
        Project hasMany Tasks;          Tasks pertenece a Project (en Tasks)  */ 

Header.hasMany(Servicio, {
    //? Crear/usar la col para la foreignKey en Tasks llamada header_id
    foreignKey: 'header_id',
    //? Estará enlazado header_id con la col 'id' de Project (de Project a Tasks)
    sourceKey: 'id'
})

Servicio.belongsTo(Header, {
    //? Crear/usar la col para la foreignKey en Tasks llamada header_id
    foreignKey: 'header_id',
    //? Estará enlazado header_id con la col 'id' de Project (de Tasks a Project)
    targetId: 'id'
})
