const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Pool} = require('pg');

const app = express();
const port = 5000;

//Configuracion de la conexion a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Clinica_salud_vida',
    password: '1003',
    port: 3306,
});

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Ruta para registrar pacientes
app.post('/api/pacientes', async (req, res) => {
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
        const result = await pool.query(
            'INSERT INTO pacientes (name, email, password, birthdate, phone, eps, address, city) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [name, email, password, birthdate, phone, eps, address, city]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar el paciente');
    }
});

app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:${port}');
});