import {DataTypes} from 'sequelize';
import { SUGO_sequelize_connection } from '../../database/sugo.connection.js';
import { Header } from './Header.model.js';

/*
    & Siguiendo la doc: https://sequelize.org/docs/v6/core-concepts/model-basics/
        asi se define el esquema de una tabla
        Dentro de esa pagina se encuentra los diferentes Datatypes disponibles (/#data-types)
    (Se importa en index para que cree la tabla)
*/
export const Servicio =  SUGO_sequelize_connection.define(
    'rol_servicios',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        servicio:{
            type: DataTypes.INTEGER,    // De -128 a 127 (si se utiliza el signo) o de 0 a 255
        },
        turno:{
            type: DataTypes.INTEGER,
        },
        dia:{
            type: DataTypes.DATEONLY,
        },
        eco:{
            type: DataTypes.INTEGER,
        },
        cred:{
            type: DataTypes.INTEGER,
        },
        hr_ini:{
            type: DataTypes.TIME,
        },
        hr_fin:{
            type: DataTypes.TIME,
        },
        lug_ini:{
            type: DataTypes.STRING,
            comment: 'lugar_id catalogo'
        },
        lug_fin:{
            type: DataTypes.STRING,
            comment: 'lugar_id catalogo'
        },
        tipo_id:{
            type: DataTypes.STRING,
            comment: 'catalogo, 0: ordinario, 1: cubredescanso'
        },
        estado_op_id:{
            type: DataTypes.STRING,
            comment: 'catalogo, 0: lab, 1: d, 2: v, 3: o, 4: c, 5: pxp'
        },
    }
)


/*
    & Definiendo la relacion con la tabla Tasks
        Project hasMany Tasks;          Tasks pertenece a Project (en Tasks)  */ 
// Servicio.belongsTo(Header, {
//     //? Crear/usar la col para la foreignKey en Tasks llamada header_id
//     foreignKey: 'header_id',
//     //? Estará enlazado header_id con la col 'id' de Project (de Tasks a Project)
//     targetId: 'id'
// })
