const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

router.get('/casos', casosController.getAllCasos);
router.get('/casos/:id', casosController.getCasoById);
router.post('/casos', casosController.createCaso);
router.put('/casos/:id', casosController.updateCaso);
router.patch('/casos/:id', casosController.partialUpdateCaso);
router.delete('/casos/:id', casosController.deleteCaso);
router.get('/casos/search', casosController.searchCasos);

module.exports = router;