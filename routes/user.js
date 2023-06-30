const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/', (req, res) => {
  const { name, email, age } = req.body;
  const user = new User({ name, email, age });
  user.save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Get all users
router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Get a single user by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Update a user by ID
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, age } = req.body;
  User.findByIdAndUpdate(userId, { name, email, age }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
