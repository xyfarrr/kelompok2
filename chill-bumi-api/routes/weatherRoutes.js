// File: routes/weatherRoutes.js
const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Endpoint: GET /api/weather?city=NamaKota
router.get('/', weatherController.getWeather);

module.exports = router;