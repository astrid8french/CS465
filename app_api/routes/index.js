const express = require('express'); // Express app
const router = express.Router(); // Router logic
const { expressjwt: jwt } = require('express-jwt'); // Correct way to import express-jwt v6.x.x

// Define the authentication middleware
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'], // Specify the algorithm used for the JWT
    userProperty: 'payload', // Add the decoded JWT to req.payload
});

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Define routes for login and register
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

// Define routes for the trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(auth, tripsController.tripsAddTrip); // POST Method adds a trip

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;
