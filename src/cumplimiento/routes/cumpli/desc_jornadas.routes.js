import { Router } from 'express';
import { deleteJornada, getJornada, getJornadas, postJornada, updateJornada } from '../../controllers/cumpli/desc_jornadas.controllers.js';


const router = Router();


// router.get( "/hi",        (req, res)=> res.send({msg: 'Hiiii'}) );


router.get( "/api/jornadas",        getJornadas);
router.post("/api/jornadas",        postJornada);
router.get( "/api/jornadas/:id",    getJornada);
router.patch( "/api/jornadas/:id",  updateJornada);
router.delete("/api/jornadas/:id",  deleteJornada);


export default router;