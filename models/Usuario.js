// models/Usuario.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    usuario: { type: String, required: true },
    contrasena: { type: String, required: true },
    plazo: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    preguntaSeguridad: { type: String, required: true } // Nuevo campo para la pregunta de seguridad
});

module.exports = mongoose.model('users', usuarioSchema);
