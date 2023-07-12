import { Router } from 'express';
import { deleteCumplimiento, example, getAllCumpli, getCumpli, postCumpli } from '../controllers/cumpli.controllers.js';


const router = Router();


// router.get( "/hi",        (req, res)=> res.send({msg: 'Hiiii'}) );


router.get( "/api/cumpli/:id",      getCumpli);
router.get( "/api/cumpli",          getAllCumpli);
router.post("/api/cumpli",          postCumpli);
router.delete("/api/cumpli",        deleteCumplimiento);
// router.patch( "/api/cumpli/:id",  updateCumplimiento);


export default router;