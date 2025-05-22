import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUsers, FaCalendarAlt, FaCog } from "react-icons/fa"; //Importar icons
import '../../style/adminPanel.css'; // Importar estilos CSS

const AdminPanel = () => {
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]); // Nuevo estado para doctores
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

        // Obtener datos de doctores.
        axios.get('http://localhost:3000/admin/doctors')
            .then((res) => {
                console.log('Respuesta completa de /doctors:', res); // Para ver toda la respuesta
                console.log('Datos de doctores (res.data):', res.data); // Para ver específicamente res.data
                if (Array.isArray(res.data)) {
                    setDoctors(res.data);
                } else {
                    console.error('Error: La respuesta de /doctors no es un array. Recibido:', res.data);
                    setDoctors([]); // Asegurar que doctors sea un array para evitar errores de renderizado
                }
            })
            .catch((error) => {
                console.error('Error detallado al obtener doctores:', error);
                if (error.response) {
                    // El servidor respondió con un estado fuera del rango 2xx
                    console.error('Error - Respuesta del servidor (data):', error.response.data);
                    console.error('Error - Respuesta del servidor (status):', error.response.status);
                } else if (error.request) {
                    // La solicitud se hizo pero no se recibió respuesta
                    console.error('Error - No se recibió respuesta del servidor:', error.request);
                } else {
                    // Algo más causó el error
                    console.error('Error - Mensaje:', error.message);
                }
                setDoctors([]); // Limpiar doctores en caso de error
            });
    }, []);

    return (
        <div className="admin-panel-container">
            {/* Barra lateral */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Acciones</h2>
                </div>
                <button onClick={() => navigate("/registrarDoctor")}>
                    <FaUserMd className="icon" /> Registrar Doctor
                </button>
                {/* Ejemplo de ruta, ajústala según tu configuración de rutas */}
                <button onClick={() => navigate('ver-pacientes')}>
                    <FaUsers className="icon"/> Ver Pacientes
                </button>
                {/* Ejemplo de ruta, ajústala según tu configuración de rutas */}
                <button onClick={() => navigate('/admin/ver-citas')}>
                    <FaCalendarAlt className="icon"/> Ver Citas
                </button>
                {/* Ejemplo de ruta, ajústala según tu configuración de rutas */}
                <button onClick={() => navigate('/admin/configuracion')}>
                    <FaCog className="icon"/> Configuración
                </button>
            </aside>

            {/* Contenido Principal */}
            <main className="main-content">
                <h1>Panel de Administrador</h1>

                <section className="content-section">
                    <h2>Pacientes Registrados</h2>
                    {patients.length > 0 ? (
                        <ul className="data-list">
                            {patients.map((patient) => (
                                <li key={patient.id} className="data-list-item">{patient.name} - {patient.email}</li>
                            ))}
                        </ul>
                    ) : <p>No hay pacientes registrados.</p>}
                </section>

                <section className="content-section">
                    <h2>Citas Confirmadas</h2>
                    {appointments.length > 0 ? (
                        <ul className="data-list">
                            {appointments.map((appointment) => (
                                <li key={appointment.id} className="data-list-item">
                                    {appointment.date} - {appointment.patients_name} con Dr. {appointment.doctors_name}
                                </li>
                            ))}
                        </ul>
                    ) : <p>No hay citas confirmadas.</p>}
                </section>

                <section className="content-section">
                    <h2>Doctores Registrados</h2>
                    {doctors.length > 0 ? (
                        <ul className="data-list">
                            {doctors.map((doctor) => (
                                <li key={doctor.id} className="data-list-item">
                                    Dr. {doctor.name} - Especialidad: {doctor.specialty}
                                </li>
                            ))}
                        </ul>
                    ) : <p>No hay doctores registrados.</p>}
                </section>
            </main>
        </div>
    );
};

export default AdminPanel;