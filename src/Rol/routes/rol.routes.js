import { Router } from 'express';
import { getRol, getRoles, postRol } from '../controllers/rol.controllers.js';

const router = Router();


router.get( '/api/rol/hi',        (req, res)=> res.send({msg: 'Hiiii'}) );


router.get( '/api/rol/:id',      getRol);
router.get( '/api/rol',          getRoles);
router.post('/api/rol',          postRol);
// router.delete('/api/rol',        deleteRol);
// router.patch( '/api/rol/:id',    updateRol);


export default router;