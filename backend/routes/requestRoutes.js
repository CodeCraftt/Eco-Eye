const express = require('express');
const { submitRequest, getAllRequests, resolveRequest, scanTrash } = require('../controllers/requestController');

const { protect } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/',protect,  submitRequest);
router.get('/', protect, getAllRequests);
router.put('/:id/resolve', protect, resolveRequest);
router.post('/scan', protect, scanTrash);

module.exports = router;
