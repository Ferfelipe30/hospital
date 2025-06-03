const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const users = [];

app.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
    if (email || password || role) {
        return res.status(400).json({ message: 'Faltan datos' });
    }
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const is_admin = role === 'admin';
    const is_doctor = role === 'doctor';
    users.push({
        id: users.length +1,
        email,
        password: hashedPassword,
        role,
        is_admin,
        is_doctor
    });
    res.json({ message: 'Usuario registrado correctamente' });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, is_admin: user.is_admin, is_doctor: user.is_doctor },
        'SECRET_KEY'
    );
    res.json({
        token,
        user: {
            email: user.email,
            role: user.role,
            is_admin: user.is_admin,
            is_doctor: user.is_doctor
        }
    });
});

app.listen(4000, () => {
    console.log('Backend corriendo en http://localhost:4000');
});