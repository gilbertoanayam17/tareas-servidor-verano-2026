const express = require('express');

const homeController = require('../controllers/homeController');
const contactoController = require('../controllers/contactoController');

const router = express.Router();

router.get('/', homeController.index);
router.get('/contacto', contactoController.showForm);
router.post('/contacto', contactoController.submitForm);

module.exports = router;