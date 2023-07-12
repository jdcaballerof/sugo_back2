import { Cumplimiento } from "../../models/Cumpli.model.js";




export const getCumplimientos = async(req, res) => {

    try {
        const cumplimiento = await Cumplimiento.findAll()
        res.send(cumplimiento)

    } catch (error) {
        console.log('error in get all cumplimiento controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const getCumplimiento = async(req, res) => {

    const { id } = req.params

    try {
        const cumplimiento = await Cumplimiento.findOne({
            where: {
                id
            }
        })
        res.send(cumplimiento)

    } catch (error) {
        console.log('error in get one cumplimiento controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const postCumplimiento = async(req, res) => {

    const { porcentaje, cumplidos, tipo, serial, fecha, modulo } = req.body;

    try {
        const newCumplimiento = await Cumplimiento.create( { porcentaje, cumplidos, tipo, serial, fecha, modulo } )
        res.send(newCumplimiento)

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export const updateCumplimiento = async(req, res) => {
    const { id } = req.params
    const { porcentaje, cumplidos, tipo, serial, fecha, modulo } = req.body

    try {
        const isUpdated = await Cumplimiento.update({ porcentaje, cumplidos, tipo, serial, fecha, modulo }, {
            where: { id }
        });
        const cumplimiento = await Cumplimiento.findByPk(id)

        res.send(['update', cumplimiento])

    } catch (error) {
        console.log('error in patch cumplimiento controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const deleteCumplimiento = async(req, res) => {

    const { id } = req.params

    try {
        await Cumplimiento.destroy({
            where: {
                id
            }
        })
        
        res.send('delete ' + id)
    } catch (error) {
        console.log('error in delete cumplimiento controller', error);
        return res.status(500).json({msg: error.message})
    }
}


// ToDo: 
export const getCumplimientoAndDesc = async(req, res) => {
    
    const { id } = req.params
    const { done, name, id:idTask } = req.query
    console.log(done);

    let where = {}
    if(done) where = {...where, done}
    if(idTask) where = {...where, id: idTask}
    if(name) where = {...where, name}
    
    try {
        const cumplimiento = await Cumplimiento.findByPk(id,{
            include: [
                { 
                    model: Tasks,
                    where
                }
            ]
        })
        // const tasks = await Tasks.findAll({where: { cumplimientoId: id }})
        // res.send({ ...cumplimiento?.dataValues, tasks })
        res.send(cumplimiento)
        
    } catch (error) {
        console.log('error in get cumplimiento tasks controller', error);
        return res.status(500).json({msg: error.message})
    }
}