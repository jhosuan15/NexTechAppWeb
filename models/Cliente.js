// models/Cliente.js
const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    empresa: {
        type: String,
        required: false,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
            message: (props) => `${props.value} no es un correo válido!`,
        },
    },
});

const Cliente = mongoose.model('clientes', ClienteSchema);
module.exports = Cliente;
