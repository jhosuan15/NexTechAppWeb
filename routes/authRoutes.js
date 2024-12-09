const express = require('express');
const { login, updateStatus } = require('../controllers/authController');
const router = express.Router();

// Ruta para el login
router.post('/', login);

router.put('/users/:email/status', updateStatus);

module.exports = router;


