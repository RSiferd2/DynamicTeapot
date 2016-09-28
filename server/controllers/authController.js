// const passport = require('passport');
// const jwt = require('jwt-simple');
const db = require('../db/model');
const bcrypt = require('bcrypt');


const strategies = {};

strategies.local = {
  login: (req, res) => {
    console.log(req.body);
    db.users.getByEmail(req.body.email)
    .then((err, data) => {
      console.log(err, data);
      res.send(JSON.stringify('O K'));
    });
  },
  signup: (req, res, next) => {
<<<<<<< 7f6d0f5d2e6e8eb463e44838e63c6dd3d3fd8869
    bcrypt.hash(req.query.password, 5, (err, hash) => {
      db.users.create({ email: req.query.email, password: hash })
      .then((data) => {
        console.log(data);
        res.send(JSON.stringify('O K'));
=======
    bcrypt.hash(req.body.password, 5, (err, hash) =>{
      db.users.create({email: req.body.email, password: hash})
<<<<<<< ea0beb77b20c7292f2c3eb5f866a3fcc5a716753
      .then(data => {
          console.log(data);
          next(req, res);
>>>>>>> Made urls relative
=======
      .then((data, err) => {
          console.log(data, err);
          next();
>>>>>>> Added auth to when you signup
      });
    });
  }
};

strategies.coinbase = {
  login: (req, res) => {
    db.users.getByEmail(req.user.profile.emails[0])
    .then((data) => {
      db.users.create({ username: req.user.profile.displayName, email: req.user.profile.emails[0], coinbase_id: req.user.profile.id });
      res.redirect('/');
    });
  }
  // Only has login because we assume they can't sign up through coinbase on our site
};

strategies.fail = (req, res) => {
  res.sendStatus(401);
};


module.exports = strategies;
