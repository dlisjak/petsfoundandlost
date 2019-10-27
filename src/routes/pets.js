const express = require('express');
const Pet = require('../models/Pets');
const router = new express.Router();

// GET "/pets"
// Get All Pets
// Public
router.get('/pets/:status', async (req, res) => {
  const status = req.params.status;
  const resPerPage = req.query.page ? 15 : 100;
  const page = req.query.page || 1;

  try {
    const pets = await Pet.find({ status })
      .skip(resPerPage * page - resPerPage)
      .limit(resPerPage);

    const numberOfPetsFound = (await Pet.countDocuments({ status })) || 0;
    if (!pets) {
      res.status(404).send(`There aren't any ${status} pets.`);
    }

    const numberOfPages = numberOfPetsFound / resPerPage;

    const nextPage =
      page * resPerPage > numberOfPetsFound && `?page=${page + 1}`;
    const prevPage = page > 1 ? `?page=${page - 1}` : null;

    const links = {
      nextPage,
      prevPage
    };

    res.send({
      data: pets,
      meta: {
        pagination: {
          total: numberOfPetsFound,
          count: pets.length,
          per_page: resPerPage,
          current_page: page,
          total_pages: numberOfPages,
          links
        }
      }
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

// POST "/pets"
// Create New Pet
// Private
router.post('/pets', async (req, res) => {
  const {
    description,
    latitude,
    longitude,
    time_found,
    time_lost,
    image_url,
    status
  } = req.body;

  try {
    const newPet = new Pet({
      description,
      latitude,
      longitude,
      time_found,
      time_lost,
      image_url,
      status
    });
    const pet = await newPet.save();

    res.json(pet);
  } catch (e) {
    console.error(e.message);
    res.status(500).send(e);
  }
});

// GET "/pets/:id"
// Get Pet by Id
// Public
router.get('/pets/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const pet = await Pet.findById(_id);
    if (!pet) {
      res.status(404).send('Ni petja s tem id-jem!');
    }
    res.send(pet);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Patch "/pets/:id"
// Update Pet by Id
// Private
router.patch('/pets/:id', async (req, res) => {
  const updates = Object.keys(req.body); //shrani properties from object in jih spremeni v array
  const allowedUpdates = [
    'description',
    'image_url',
    'latitude',
    'longitude',
    'time_lost',
    'time_found'
  ];
  const isValid = updates.every(e => allowedUpdates.includes(e));

  if (!isValid) {
    return res.status(400).send({
      error: 'Nepravilni update!'
    });
  }

  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!pet) {
      res.status(404).send('Ni pet-a!');
    }

    res.send(pet);
  } catch (e) {
    res.status(400).send(e);
  }
});

// DELETE "/pets/:id"
// Delete Pet by Id
// Private
router.delete('/pets/:id', async (req, res) => {
  try {
    const deletePet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletePet) {
      res.status(404).send('Ni takega pet-aa!');
    }
    res.send(deletePet);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
