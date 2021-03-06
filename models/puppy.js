const db = require('../lib/dbConnect');

function getAllPuppies(req, res, next) {

  db.any('SELECT * from puppies WHERE $1~ = $2;', ['name','Irwin'])
    .then((puppies) => {
      res.puppies = puppies;
      next();
    })
    .catch(error => next(error));
}

function adoptPuppy(req, res, next) {
  // Implement adopting a puppy
  db.none(`INSERT INTO puppies (name, url)
          VALUES ($/name/, $/url/)`,
          req.body)
    .then(() => next())
    .catch(error => next(error));
}

function abandonPuppy(req, res, next) {
  // Implement abandoning the puppy :(
  db.none(`DELETE FROM puppies
          WHERE id = $1`,
          req.params.id)
    .then(() => next())
    .catch(error => next(error));
}

function likePuppy(req, res, next) {
  // Implement increasing the likes value of the puppy by one
  db.none(`UPDATE puppies 
          SET likes = likes + 1 
          WHERE id = $1`,
          req.params.id)
    .then(() => next())
    .catch(error => next(error));
}

module.exports = {
  getAllPuppies,
  adoptPuppy,
  abandonPuppy,
  likePuppy
};
