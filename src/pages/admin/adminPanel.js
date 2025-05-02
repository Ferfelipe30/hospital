import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUsers, FaCalendarAlt, FaCog } from "react-icons/fa"; //Importar icons
import '../../style/adminPanel.css'; // Importar estilos CSS

const AdminPanel = () => {
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener datos de pacientes.
        axios.get('http://localhost:3000/admin/pacients')
            .then((res) => setPatients(res.data))
            .catch((error) => console.error('Error al obtener pacientes: ', error));

        // Obtener citas confirmadas.
        axios.get('http://localhost:3000/admin/appointments')
            .then((res) => setAppointments(res.data))
            .catch((error) => console.error('Error al obtener citas: ', error)); 
    }, []);

    return (
        <div className="admin-panel">
            {/* Barra lateral */}
            <aside className="sidebar">
                <h2>Aciones</h2>
                <button onClick={() => navigate("/registrarDoctor")}>
                    <FaUserMd className="icon" /> Registrar Doctor
                </button>
                <button onClick={() => navigate()}>
                    <FaUsers className="icon"/> Ver Pacientes
                </button>
                <button onClick={() => navigate()}>
                    <FaCalendarAlt className="icon"/> Ver Citas
                </button>
                <button onClick={() => navigate()}>
                    <FaCog className="icon"/> Configuración
                </button>
            </aside>
            <h1>Panel de Administrador</h1>

            <section>
                <h2>Pacientes</h2>
                <ul>
                    {patients.map((patients) => (
                        <li key={patients.id}>{patients.name} - {patients.email}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Citas Confirmadas</h2>
                <ul>
                    {appointments.map((appointments) => (
                        <li key={appointments.id}>
                            {appointments.date} - {appointments.patients_name} con {appointments.doctors_name}
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Acciones</h2>
                <button onClick={() => navigate("/registrarDoctor")}>
                    Registrar Doctor
                </button>
            </section>
        </div>
    );
};

export default AdminPanel;