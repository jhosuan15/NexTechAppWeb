const mongoose = require('mongoose');

const facturaSchema = new mongoose.Schema({
    nombreCliente: {
        type: String,
        required: true
    },
    nombreEmpleado: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    productos: {
        type: [String], // Suponiendo que sea un arreglo de nombres de productos
        required: true
    },
    costoExtras: {
        type: Number,
        required: false,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Facturas', facturaSchema);
