const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const inventarioRoutes = require('./routes/inventarioRoutes');
const facturasRoutes = require('./routes/facturasRoutes');
const clientesRoutes = require('./routes/clientes');
const usuariosRoutes = require('./routes/usuarioRoutes');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Para manejar JSON en el body de las solicitudes

// Conectar a MongoDB
mongoose.connect('mongodb+srv://Jhosuan:Jhosuan@cluster.ftalklb.mongodb.net/Sistema', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a la base de datos MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Rutas
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/inventario', inventarioRoutes); // Rutas de inventario
app.use('/api/facturas', facturasRoutes); // Rutas de facturación
app.use('/api/clientes', clientesRoutes); // Rutas de clientes
app.use('/api/usuarios', usuariosRoutes); // Rutas para usuarios

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://192.168.100.130:${PORT}`);
});
