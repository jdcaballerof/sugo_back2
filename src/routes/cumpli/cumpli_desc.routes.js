import { Router } from 'express';
import { deleteCumpliDesc, getCumpliDesc, getCumpliDescs, postCumpliDesc, updateCumpliDesc } from '../../controllers/cumpli/cumpli_desc.controllers.js';


const router = Router();


// router.get( "/hi",        (req, res)=> res.send({msg: 'Hiiii'}) );


router.get( "/api/cumpliDesc",        getCumpliDescs);
router.post("/api/cumpliDesc",        postCumpliDesc);
router.get( "/api/cumpliDesc/:id",    getCumpliDesc);
router.patch( "/api/cumpliDesc/:id",  updateCumpliDesc);
router.delete("/api/cumpliDesc/:id",  deleteCumpliDesc);


export default router;