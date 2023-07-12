import { QueryTypes } from "sequelize";
import { SUGO_sequelize_connection } from "../database/sugo.connection.js";
import { Cumplimiento } from "../models/Cumpli.model.js";
import { CumpliDesc } from "../models/CumpliDesc.model.js";
import { Jornadas } from "../models/Jornadas.model.js";



export const getAllCumpli = async (req, res) => {

    try {
        const cumplimientos = await Cumplimiento.findAll({
            // raw: true,      // NO wrap resp. Deja todo en 1 solo obj (se repite X num de jornadas)
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: CumpliDesc,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    include: [
                        {
                            model: Jornadas,
                            attributes: { exclude: ["createdAt", "updatedAt"] },
                        },
                    ]
                },
            ]
        })

        res.send( cumplimientos )

    } catch (error) {
        console.log('error in get one cumpli with desc controller', error);
        return res.status(500).json({ msg: error.message })
    }
}

export const getCumpli = async (req, res) => {

    const { id } = req.params

    try {
        const cumplimiento = await Cumplimiento.findByPk(id, {
            include: [
                {
                    model: CumpliDesc,
                    include: [
                        {
                            model: Jornadas,
                        },
                    ]
                },
            ]
        })

        res.send( cumplimiento )

    } catch (error) {
        console.log('error in get one cumpli with desc controller', error);
        return res.status(500).json({ msg: error.message })
    }
}


export const postCumpli = async (req, res) => {

    const cumplimientos = req.body;

    // Iniciar transacción
    const transaction = await SUGO_sequelize_connection.transaction();

    try {
        // Crear los Cumplimientos junto con CumpliDescriptions y Jornadas relacionadas
        const nuevosCumplimientos = [];
        for (const cumplimientoData of cumplimientos) {
            const nuevoCumplimiento = await Cumplimiento.create(cumplimientoData, {
                include: [{ model: CumpliDesc, include: [Jornadas] }],
                transaction,
            });
            nuevosCumplimientos.push(nuevoCumplimiento);
        }

        // Confirmar la transacción
        await transaction.commit();

        // Enviar respuesta exitosa con los Cumplimientos creados
        res.status(201).json({ message: 'Datos insertados correctamente', cumplimientos: nuevosCumplimientos });
    } catch (error) {
        // Si ocurre un error, deshacer la transacción
        await transaction.rollback();
        console.error('error in get one cumpli with desc controller', error);
        res.status(500).json({ error: `Ocurrió un error al insertar los datos: ${error.message}` });
    }
}

export const deleteCumplimiento = async(req, res) => {
    
    const { id } = req.query;

    // Obtener el array de id y en string separados por comas sin espacios
    const idsArray = id.split(',').map( s => s.trim())          
    
    // Iniciar transacción
    const transaction = await SUGO_sequelize_connection.transaction();

    try {

        // Obtener los ids de los CumpliDesc asociados a los Cumplimientos
        const desc_ids = await CumpliDesc.findAll({
            attributes: ['id'],
            where: { cumplimientoId: idsArray },
        })

        // Eliminar las Jornadas asociadas a los CumpliDesc
        await Jornadas.destroy({
            where: {
                cumpliDescId: desc_ids.map( ({id}) => id  )
            }
        });

        // Eliminar los CumpliDesc asociados a los Cumplimientos
        await CumpliDesc.destroy({
        where: { cumplimientoId: idsArray },
        transaction,
        });

        // Eliminar los Cumplimientos
        await Cumplimiento.destroy({
        where: { id: idsArray },    
        transaction,
        });

        // Confirmar la transacción
        await transaction.commit();

        // Enviar respuesta exitosa
        res.status(200).json({ message: 'Registros eliminados correctamente: ' + idsArray.join(',') });
    } catch (error) {
        // Si ocurre un error, deshacer la transacción
        await transaction.rollback();
        console.error(error);
        res.status(500).json({ error: `Ocurrió un error al eliminar los registros: ${error.message}` });
    }

}


export const example = async(req, res) => {

    const body   = req.body
    const params = req.params
    const q      = req.query

    const { id } = q;
    const ids = id.split(',').map( s => s.trim())

    //& Sol 2
    const desc_ids = await CumpliDesc.findAll({
        attributes: ['id'],
        where: { cumplimientoId: ids },
    })

    const jornadas = await Jornadas.findAll({
        where: {
            cumpliDescId: desc_ids.map( ({id}) => id  )
        }
    });

    //& Sol 1.1 X No sirve: devuelve un array de obj y espera un array de id
    // const jornadas = await Jornadas.findAll({
    //     where: {
    //         cumpliDescId: {
    //         in: await SUGO_sequelize_connection.query(
    //             `(SELECT id FROM cumpli_descriptions WHERE modalidad IN ('M', 'M2') )`,
    //             { type: QueryTypes.SELECT }
    //         )
    //         },
    //     }
    // });

    //& Sol 1.2 X No sirve: el nombre de las cols debe ser minusculas 
    // const resp = await SUGO_sequelize_connection.query(
    //     `(SELECT id FROM cumpli_descriptions WHERE cumplimientoId IN (8,10) )`,
    //     { type: QueryTypes.SELECT }
    // )


    res.send({
        // cumpli_ids: ids, 
        jornadas
    })
}