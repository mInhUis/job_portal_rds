import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../models/userModel.js';


export async function handleCreateUser(req, res) {
  try {
    const id = await createUser(req.body);
    res.status(201).json({ message: 'User created', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetAllUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetUserById(req, res) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleUpdateUser(req, res) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await updateUser(req.params.id, req.body);
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleDeleteUser(req, res) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
