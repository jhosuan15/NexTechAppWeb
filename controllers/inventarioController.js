const Inventario = require('../models/Inventario');

// Obtener todos los productos
exports.getProductos = async (req, res) => {
    try {
        const productos = await Inventario.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
    const { codigoBarras, nombre, descripcion, cantidad, precio, imagen } = req.body;
    try {
        const nuevoProducto = new Inventario({ codigoBarras, nombre, descripcion, cantidad, precio, imagen });
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};

// Editar producto existente
exports.updateProducto = async (req, res) => {
    const { id } = req.params;
    const { codigoBarras, nombre, descripcion, cantidad, precio, imagen } = req.body;
    try {
        const productoActualizado = await Inventario.findByIdAndUpdate(id, { codigoBarras, nombre, descripcion, cantidad, precio, imagen }, { new: true });
        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// Eliminar producto
exports.deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        await Inventario.findByIdAndDelete(id);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};
