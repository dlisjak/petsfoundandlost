const express = require('express');
const User = require('../models/users');
const router = new express.Router();

router.post('/user', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/users', async (req, res) => {
  try {
    const user = await User.find({});
    if (!user) {
      res.status(404).send('Ni user-jev!');
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).send('Ni userja s tem id-jem!');
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body); //shrani properties from object in jih spremeni v array
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValid = updates.every(e => allowedUpdates.includes(e));

  if (!isValid) {
    return res.status(400).send({
      error: 'Nepravilni update!'
    });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      res.status(404).send('Ni user-ja!');
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      res.status(404).send('Ni takega user-ja!');
    }
    res.send(deleteUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
