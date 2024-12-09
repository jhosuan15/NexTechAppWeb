const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

// Rutas CRUD para el inventario
router.get('/', inventarioController.getProductos); // Obtener todos los productos
router.post('/', inventarioController.createProducto); // Crear un nuevo producto
router.put('/:id', inventarioController.updateProducto); // Actualizar un producto
router.delete('/:id', inventarioController.deleteProducto); // Eliminar un producto

module.exports = router;
