// controllers/ClienteController.js
const Cliente = require('../models/Cliente');

// Agregar un nuevo cliente
const crearCliente = async (req, res) => {
    const { nombre, empresa, correo } = req.body;

    const nuevoCliente = new Cliente({
        nombre,
        empresa,
        correo,
    });

    try {
        const clienteGuardado = await nuevoCliente.save();
        res.status(201).json(clienteGuardado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al guardar el cliente', error });
    }
};

module.exports = {
    crearCliente,
};
