import { CumpliDesc } from "../../models/CumpliDesc.model.js";




export const getCumpliDescs = async(req, res) => {

    try {
        const cumpliDesc = await CumpliDesc.findAll()
        res.send(cumpliDesc)

    } catch (error) {
        console.log('error in get all cumpliDesc controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const getCumpliDesc = async(req, res) => {

    const { id } = req.params

    try {
        const cumpliDesc = await CumpliDesc.findOne({
            where: {
                id
            }
        })
        res.send(cumpliDesc)

    } catch (error) {
        console.log('error in get one cumpliDesc controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const postCumpliDesc = async(req, res) => {

    const { ruta, modalidad, cumplimientoId } = req.body;

    try {
        const newCumpliDesc = await CumpliDesc.create( { ruta, modalidad, cumplimientoId } )
        res.send(newCumpliDesc)

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export const updateCumpliDesc = async(req, res) => {
    const { id } = req.params
    const { ruta, modalidad, cumplimientoId } = req.body

    try {
        const isUpdated = await CumpliDesc.update({ ruta, modalidad, cumplimientoId }, {
            where: { id }
        });
        const cumpliDesc = await CumpliDesc.findByPk(id)

        res.send(['update', cumpliDesc])

    } catch (error) {
        console.log('error in patch cumpliDesc controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const deleteCumpliDesc = async(req, res) => {

    const { id } = req.params

    try {
        await CumpliDesc.destroy({
            where: {
                id
            }
        })
        
        res.send('delete ' + id)
    } catch (error) {
        console.log('error in delete cumpliDesc controller', error);
        return res.status(500).json({msg: error.message})
    }
}

// ToDo: 
export const getCumpliDescAndJornadas = async(req, res) => {
    
    const { id } = req.params
    const { done, name, id:idTask } = req.query
    console.log(done);

    let where = {}
    if(done) where = {...where, done}
    if(idTask) where = {...where, id: idTask}
    if(name) where = {...where, name}
    
    try {
        const cumpliDesc = await CumpliDesc.findByPk(id,{
            include: [
                { 
                    model: Tasks,
                    where
                }
            ]
        })
        // const tasks = await Tasks.findAll({where: { cumpliDescId: id }})
        // res.send({ ...cumpliDesc?.dataValues, tasks })
        res.send(cumpliDesc)
        
    } catch (error) {
        console.log('error in get cumpliDesc tasks controller', error);
        return res.status(500).json({msg: error.message})
    }
}