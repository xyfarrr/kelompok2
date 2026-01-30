const express = require('express');
const router = express.Router();
const destController = require('../controllers/destinationController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', destController.getAllDestinations);
router.get('/search', destController.searchDestination); // Search (Public)
router.post('/', verifyToken, destController.createDestination); // Create (Private)
router.put('/:id', verifyToken, destController.updateDestination); // Update (Private)
router.delete('/:id', verifyToken, destController.deleteDestination); // Delete (Private)

module.exports = router;