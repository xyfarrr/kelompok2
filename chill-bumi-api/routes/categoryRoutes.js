const express = require('express');
const router = express.Router();
const catController = require('../controllers/categoryController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', catController.getAll);
router.get('/:id', catController.getDetail);
router.get('/:id/destinations', catController.getDestinations); // Filter Wisata by Kategori
router.post('/', verifyToken, catController.create);
router.put('/:id', verifyToken, catController.update);
router.delete('/:id', verifyToken, catController.delete);

module.exports = router;