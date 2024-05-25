import express from 'express';
import * as vehicleController from '../controller/vehicle';

const router = express.Router();

router.post('/create', vehicleController.createVehicle);
router.get('/getAll', vehicleController.getAllVehicles);
router.get('/getId/:id', vehicleController.getVehicleById);
router.put('/update/:id', vehicleController.updateVehicle);
router.delete('/delete/:id', vehicleController.deleteVehicle);

export default router;
