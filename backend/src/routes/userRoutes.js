import express from 'express';
import {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser
} from '../controller/userController.js';

const router = express.Router();

router.post('/', handleCreateUser);
router.get('/', handleGetAllUsers);
router.get('/:id', handleGetUserById);
router.put('/:id', handleUpdateUser);
router.delete('/:id', handleDeleteUser);

export default router;
