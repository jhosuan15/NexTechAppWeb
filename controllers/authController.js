const User = require('../models/User');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar el estado de la cuenta
        if (!user.status) {
            return res.status(401).json({ message: 'Cuenta inhabilitada' });
        }

        // Comparar contraseñas en texto claro (no recomendado)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ message: 'Login exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

const updateStatus = async (req, res) => {
    const { email } = req.params;
    const { status } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { email },
            { status },
            { new: true } // Devuelve el documento actualizado
        );

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Estado actualizado correctamente', user });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

module.exports = { login, updateStatus };
