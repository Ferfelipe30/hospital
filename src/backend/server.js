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

app.use(express.json());
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
            [name, email, hashedPassword, birthdate, phone, eps, address, city]
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

//Ruta para el inicio de sesion
app.post('/login', async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;

    try {
        //Buscar el usuario por email
        const result = await pool.query('SELECT * FROM patients WHERE email = $1', [email]);

        if (result.rows.length === 0){
            return res.status(401).json({message: 'Usuario no encontrado.'});
        }

        const user = result.rows[0];

        //Comparar la constraseña ingresada con la base de datos.
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({message: 'Contraseña incorrecta.'});
        }

        //Si las credenciales son correctas
        res.status(200).json({
            message: 'Inicio de sesion exitoso!',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                is_admin: user.is_admin,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error interno del servidor.'});
    }
});

app.post('/doctors', async (req, res) => {
    const {name, email, specialty, phone, address, city, password} = req.body;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        //Insetar los datos en la base de datos
        const result = await pool.query(
            'INSERT INTO doctors (name, email, specialty, phone, address, city, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, email, specialty, phone, address, city, hashedPassword]
        );
        res.status(201).json({message: 'Doctor agregado con exito!', doctor: result.rows[0].id });
    } catch (error) {
        console.error(error);
        if (error.code === '23505') {
            res.status(400).json({ message: 'El email ya está registrado.' });
        } else {
            res.status(500).json({ message: 'Error al registrar el doctor.' });
        }
    }
});

app.post('/doctor-shedules', async (req, res) => {
    const {doctor_id, day_of_week, start_time, end_time} = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *',
            [doctor_id, day_of_week, start_time, end_time]
        );
        res.status(201).json({message: 'Horario asinganado con exito', schedule: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al asignar el horario.'});
    }
});

//Ruta para registrar usuarios (pacientes o doctores)
app.post('/admin/register-user', async (req, res) => {
    const {name, email, password, role, specialty, phone, address, city} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === 'patients') {
            await pool.query(
                'INSERT INTO patients (name, email, password, phone, address, city) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [name, email, hashedPassword, phone, address, city]
            );
        } else if (role === 'doctors'){
            await pool.query(
                'INSERT INTO doctors (name, email, specialty, phone, address, city, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [name, email, specialty, phone, address, city, hashedPassword]
            );
        } else {
            return res.status(400).json({message: 'Rol no valido.'});
        }
        res.status(201).json({message: 'Usuario registrado con exito.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al registrar el usuario.'});
    }
});

app.post('/admin/assign-schedule', async (req, res) => {
    const {doctor_id, day_of_week, start_time, end_time} = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *',
            [doctor_id, day_of_week, start_time, end_time]
        );
        res.status(201).json({message: 'Horario asignado con exito', schedule: result.rows[0]});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al asignar el horario.'});
    }
});

app.get('/admin/pacients', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patients');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al obtener los datos de los pacientes.'});
    }
});

app.get('/admin/appointments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM appointments');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al obtener las citas confirmadas.'});
    }
});