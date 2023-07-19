import { SUGO_sequelize_connection } from "../../database/sugo.connection.js"
import { Header } from "../models/Header.model.js"
import { Servicio } from "../models/Servicio.model.js"


export const getRol = async(req, res) => {
    
    const { id } = req.params
    
    try {
        const rol = await Header.findByPk(id, {
            include: [Servicio]
        })

        if(!rol) res.status(404).send({msg: `no se encontro el rol id= ${id}`})

        res.send(rol)
        
    } catch (error) {
        console.error('error in get one Rol', error);
        res.status(500).json({ error: `Ocurrió un error al getRol: ${error.message}` });
    }
}

export const getRoles = async(req, res) => {
    try {

        const roles = await Header.findAll({
            include: [Servicio]
        })

        if(roles.length < 1) res.status(404).send({msg: 'no hay roles cargados'})

        res.send(roles)
    } catch (error) {
        console.error('error in get Roles', error);
        res.status(500).json({ error: `Ocurrió un error al getRoles: ${error.message}` });
    }
}


/*
& Considerar eliminar: Duplica los headers
export const postRol = async(req, res) => {

    const data = req.body
    try {
        const rol = await Header.create( data, {
            include: [Servicio]
        })

        res.send(rol)
    } catch (error) {
        console.error('error in postRol', error);
        res.status(500).json({ error: `Ocurrió un error al postRol: ${error.message}` });
    }
}
*/



/*
&   Considerar eliminar: Debe ser 1 solo controller
      la logica de hacer primero el header y luego los servicios esta bien
    ToDo: Middleware para verificar que almenos venga un servicio y sea array      */
export const postRol = async(req, res) => {

    const {header, servicios} = req.body

    //^  Service
    const transaction = await SUGO_sequelize_connection.transaction();

    try {
        const h = await Header.create( header, { transaction } )

        const res_servicios = await Servicio.bulkCreate( 
            servicios.map( s => ({...s, "header_id": h.id })),
            { transaction }        
        );

        await transaction.commit();
        res.send({header: h, servicios: res_servicios})
    } catch (error) {
        await transaction.rollback();
    //^  --FIN Service
        console.error('error in postHeader', error);
        res.status(500).json({ error: `Ocurrió un error al postHeader: ${error.message}` });
    }
}

export const postService = async(req, res) => {

    const data = req.body
    try {
        const servicio = await Servicio.create( data)

        res.send(servicio)
    } catch (error) {
        console.error('error in postService', error);
        res.status(500).json({ error: `Ocurrió un error al postService: ${error.message}` });
    }
}