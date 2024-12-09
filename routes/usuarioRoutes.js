// routes/usuariosRoutes.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Ruta para agregar un nuevo usuario
router.post('/agregar', async (req, res) => {
    try {
        const nuevoUsuario = new Usuario({
            usuario: req.body.usuario,
            contrasena: req.body.contrasena,
            plazo: req.body.plazo,
        });
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario guardado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el usuario', error });
    }
});

module.exports = router;
