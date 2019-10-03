const router = require('express').Router();
const User = require('../models/user');

router
  .get('/favorites', ({ user }, res, next) => {
    User.findById(user.id)
      .populate('favorites', 'species')
      .lean()
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  })

  .put('/favorites/:animalId', ({ user, params }, res, next) => {
    User.updateById(user.id, {
      $addToSet: {
        favorites: params.animalId
      }
    })
      .populate('favorites', 'species')
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  })

  .delete('/favorites/:animalId', ({ user, params }, res, next) => {
    User.updateById(user.id, {
      $pull: {
        favorites: params.animalId
      }
    })
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  });

module.exports = router;