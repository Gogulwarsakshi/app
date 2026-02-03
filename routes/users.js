const express = require('express');
const router = express.Router();

// Using in-memory controller for now (switch to DB controller when MongoDB is available)
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/usersControllerMemory');

// Routes for /api/users/
router.route('/')
  .get(getUsers)
  .post(createUser);

// Routes for /api/users/:id
router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;