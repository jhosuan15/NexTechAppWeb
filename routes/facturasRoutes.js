const express = require('express');
const router = express.Router();
const Factura = require('../models/Factura'); // Asegúrate de que la ruta al modelo sea correcta

// Obtener todas las facturas
router.get('/', async (req, res) => {
    try {
        const facturas = await Factura.find();
        res.json(facturas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva factura
router.post('/', async (req, res) => {
    const factura = new Factura({
        nombreCliente: req.body.nombreCliente,
        nombreEmpleado: req.body.nombreEmpleado,
        email: req.body.email,
        productos: req.body.productos,
        costoExtras: req.body.costoExtras,
        total: req.body.total,
    });

    try {
        const nuevaFactura = await factura.save();
        res.status(201).json(nuevaFactura);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener una factura por ID
router.get('/:id', async (req, res) => {
    try {
        const factura = await Factura.findById(req.params.id);
        if (!factura) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }
        res.json(factura);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar una factura por ID
router.put('/:id', async (req, res) => {
    try {
        const factura = await Factura.findById(req.params.id);
        if (!factura) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }

        factura.nombreCliente = req.body.nombreCliente || factura.nombreCliente;
        factura.nombreEmpleado = req.body.nombreEmpleado || factura.nombreEmpleado;
        factura.email = req.body.email || factura.email;
        factura.productos = req.body.productos || factura.productos;
        factura.costoExtras = req.body.costoExtras || factura.costoExtras;
        factura.total = req.body.total || factura.total;

        const facturaActualizada = await factura.save();
        res.json(facturaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar una factura por ID
router.delete('/:id', async (req, res) => {
    try {
        const factura = await Factura.findById(req.params.id);
        if (!factura) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }

        await factura.remove();
        res.json({ message: 'Factura eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
