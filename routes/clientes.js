// routes/clientes.js
const express = require('express');
const router = express.Router();
const { crearCliente } = require('../controllers/ClienteController');

// Ruta para crear un nuevo cliente
router.post('/', crearCliente);

module.exports = router;
