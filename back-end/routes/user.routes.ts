import express from 'express';
import * as userController from '../controller/user';

const router = express.Router();

router.post('/create', userController.createUser);
router.get('/getAll', userController.getAllUsers);
router.get('/getId/:id', userController.getUserById);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.post('/login', userController.loginUser);

export default router;
