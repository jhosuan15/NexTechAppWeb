import React, { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto
const InventoryContext = createContext();

// Proveedor del contexto
export const InventoryProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);

    // Cargar productos desde el backend
    const obtenerProductos = async () => {
        try {
            const response = await fetch('http://192.168.100.130:5003/api/inventario');
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    // Agregar un producto
    const agregarProducto = async (producto) => {
        try {
            const response = await fetch('http://192.168.100.130:5003/api/inventario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });
            const data = await response.json();
            setProductos([...productos, data]);
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    };

    // Editar un producto por nombre
    const editarProducto = async (nombre, productoActualizado) => {
        try {
            const response = await fetch(`http://192.168.100.130:5003/api/inventario/${nombre}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productoActualizado),
            });
            const data = await response.json();
            setProductos(productos.map((producto) =>
                producto.nombre === nombre ? data : producto
            ));
        } catch (error) {
            console.error('Error al editar producto:', error);
        }
    };

    // Eliminar un producto por nombre
    const eliminarProducto = async (nombre) => {
        try {
            await fetch(`http://192.168.100.130:5003/api/inventario/${nombre}`, {
                method: 'DELETE',
            });
            setProductos(productos.filter((producto) => producto.nombre !== nombre));
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    return (
        <InventoryContext.Provider value={{ productos, agregarProducto, editarProducto, eliminarProducto }}>
            {children}
        </InventoryContext.Provider>
    );
};

// Hook para usar el contexto
export const useInventory = () => {
    return useContext(InventoryContext);
};
