import { Jornadas } from "../../models/Jornadas.model.js";



export const getJornadas = async(req, res) => {
    try {
        const jornada = await Jornadas.findAll()  

        res.send(jornada)
        
    } catch (error) {
        console.log('error in get all jornadas controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const getJornada = async(req, res) => {

    const { id } = req.params

    try {
        const jornada = await Jornadas.findByPk(id);  
        res.send(jornada);
        
    } catch (error) {
        console.log('error in get one jornada controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const postJornada = async(req, res) => {

    const { cred, hrIni, hrFin, lugIni, lugFin, cumpliDescId } = req.body

    try {
        const newJornada = await Jornadas.create({cred, hrIni, hrFin, lugIni, lugFin, cumpliDescId})  
        res.send(newJornada)
        
    } catch (error) {
        console.log('error in post jornada controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const updateJornada = async(req, res) => {

    const { id } = req.params
    const { cred, hrIni, hrFin, lugIni, lugFin, cumpliDescId } = req.body


    try {
        const isUpdated = await Jornadas.update({ cred, hrIni, hrFin, lugIni, lugFin, cumpliDescId }, {
            where: { id }
        });
        const jornada = await Jornadas.findByPk(id)

        res.send(['update', jornada])
        
    } catch (error) {
        console.log('error in update jornada controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const deleteJornada = async(req, res) => {

    const { id } = req.params

    try {
        await Jornadas.destroy({
            where: {id}
        })
        res.sendStatus(204)
        
    } catch (error) {
        console.log(`error in delete jornada ${id | 'no Id'} controller`, error);
        return res.status(500).json({msg: error.message})
    }
}