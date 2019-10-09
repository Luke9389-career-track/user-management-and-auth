const request = require('../request');
const db = require('../db');
const { signupAdmin } = require('../data-helpers');



describe('me API', () => {
  beforeEach(() => db.dropCollection('users'));

  let user = null;
  beforeEach(() => {
    return signupAdmin().then(newUser => (user = newUser));
  });

  const elephant = {
    species: 'elephant',
    appearances: {
      pattern: 'monochrome',
      mainColor: 'grey'
    },
    numberOfEyes: 2,
    hasTail: true,
    continents: ['asia', 'africa']
  };

  function postAnimal(animal) {
    return request
      .post('/api/animals')
      .set('Authorization', user.token)
      .send(animal)
      .expect(200)
      .then(({ body }) => body);
  }

  it('getting no favorites returns empty array', () => {
    return request
      .get('/api/me/favorites')
      .set('Authorization', user.token)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual([]);
      });
  });

  it('updates a favorite animal for a user', () => {
    return postAnimal(elephant)
      .then(animal => {
        return request
          .put(`/api/me/favorites/${animal._id}`)
          .set('Authorization', user.token)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body[0].species).toBe(elephant.species);
      });
  });

  it('gets a favorite animal for a user', () => {
    return postAnimal(elephant)
      .then(animal => {
        return request
          .put(`/api/me/favorites/${animal._id}`)
          .set('Authorization', user.token)
          .send(elephant)
          .expect(200);
      })
      .then(() => {
        return request
          .get('/api/me/favorites')
          .set('Authorization', user.token)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(1);
        expect(body[0].species).toBe(elephant.species);
      });
  });

  it('removes a favorite animal for a user', () => {
    return postAnimal(elephant)
      .then(animal => {
        return request
          .put(`/api/me/favorites/${animal._id}`)
          .set('Authorization', user.token)
          .send(elephant)
          .expect(200);
      })
      .then(({ body }) => {
        return request
          .delete(`/api/me/favorites/${body[0]._id}`)
          .set('Authorization', user.token)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(0);
      });
  });
});

