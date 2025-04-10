const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Pool} = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = 3000;

//Configuracion de la conexion a PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Ruta para registrar pacientes
app.post('/register', async (req, res) => {
    const {
        name, 
        email, 
        password, 
        birthdate, 
        phone, 
        eps, 
        address, 
        city,
    } = req.body;
    try {
        //Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        //Insertar los datos en la base de datos 
        const result = await pool.query(
            'INSERT INTO patients (name, email, password, birthdate, phone, eps, address, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [name, email, password, birthdate, phone, eps, address, city]
        );
        res.status(201).json({message: 'Paciente registrado con exito!', patientId: result.rows[0].id});
    } catch (error) {
        console.error(error);
        if (error.code === '23505') {
            res.status(400).json({message: 'El email ya esta registrado.'});
        } else {
            res.status(500).json({message: 'Error al registrar el paciente.'});
        }
    }
});

app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:${PORT}');
});