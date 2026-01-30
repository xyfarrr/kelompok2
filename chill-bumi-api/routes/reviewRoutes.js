const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const verifyToken = require('../middleware/authMiddleware');

// User WAJIB login untuk memberi komentar
router.post('/', verifyToken, reviewController.addReview);
// Siapa saja boleh melihat komentar
router.get('/:id', reviewController.getReviews);
// Hapus komentar sendiri
router.delete('/:id', verifyToken, reviewController.deleteReview);

module.exports = router;