const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

router.get('/', casosController.getAll);
router.get('/:id', casosController.getById);
router.post('/', casosController.create);
router.put('/:id', casosController.update);
router.patch('/:id', casosController.partialUpdate);
router.delete('/:id', casosController.remove);

module.exports = router;
