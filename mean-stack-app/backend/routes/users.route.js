const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const userRoute = express.Router();

// Employee model
let User = require('../models/users');

// Add User
userRoute.route('/createUser').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

//login
userRoute.route('/login').post((req, res, next) => {
  // console.log(req.body);
let fetchedUser;
  User.findOne({ email: req.body.email })
  .then(user => {
    // console.log(user);

    if(!user) {
      return res.status(401).json({
        message: "Auth failed"
      })
    }
    fetchedUser = user;
    return req.body.password;
  })
  .then(result => {
    console.log(result);

    if(!result) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    const token = jwt.sign({
      email: fetchedUser.email, userId: fetchedUser._id
    }, 'secret_this_longer',
    {expiresIn: '1h'}
    );
    console.log(token);

    res.status(200).json({
      token: token
    })
  })
  .catch(err => {
    console.log(err);

    return res.status(401).json({
      message: 'Auth failed'
    });

  });
});

// Get All Employees
userRoute.route('/').get((req, res) => {
  Employee.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


module.exports = userRoute;
