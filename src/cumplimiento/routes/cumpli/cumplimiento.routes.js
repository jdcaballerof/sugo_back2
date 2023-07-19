import { Router } from 'express';
import { deleteCumplimiento, getCumplimiento, getCumplimientos, postCumplimiento, updateCumplimiento } from '../../controllers/cumpli/cumplimiento.controllers.js';


const router = Router();


// router.get( "/hi",        (req, res)=> res.send({msg: 'Hiiii'}) );


router.get( "/api/cumplimiento",        getCumplimientos);
router.post("/api/cumplimiento",        postCumplimiento);
router.get( "/api/cumplimiento/:id",    getCumplimiento);
router.patch( "/api/cumplimiento/:id",  updateCumplimiento);
router.delete("/api/cumplimiento/:id",  deleteCumplimiento);


export default router;