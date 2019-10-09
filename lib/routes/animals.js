const router = require('express').Router();
const Animal = require('../models/animal');
const ensureRole = require('../middleware/ensure-role');

router
  .get('/', (req, res, next) => {
    Animal.find()
      .then((animals) => {
        res.json(animals);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Animal.findById(req.params.id)
      .then((animal) => {
        res.json(animal);
      })
      .catch(next);
  })

  .post('/', ensureRole('admin'), (req, res, next) => {
    Animal.create(req.body)
      .then((animal) => {
        res.json(animal);
      })
      .catch(next);
  })

  .put('/:id', ensureRole('admin'), (req, res, next) => {
    Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .then(animal => {
        res.json(animal);
      })
      .catch(next);
  })

  .delete('/:id', ensureRole('admin'), (req, res, next) => {
    Animal.findByIdAndRemove(req.params.id)
      .then(removed => {
        res.json(removed);
      })
      .catch(next);
  });

module.exports = router;

