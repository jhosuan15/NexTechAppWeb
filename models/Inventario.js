const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
    codigoBarras: { type: String, required: true },
    imagen: { type: String, required: false }, // Para almacenar la URL de la imagen
});

const Producto = mongoose.model('inventarios', productoSchema);
module.exports = Producto;
