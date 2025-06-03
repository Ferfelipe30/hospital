import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUsers, FaCalendarAlt, FaCog } from "react-icons/fa"; //Importar icons
import '../../style/adminPanel.css'; // Importar estilos CSS
import { supabase } from "../../utils/supabase";

const AdminPanel = () => {
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]); // Nuevo estado para doctores
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener datos de pacientes.
        const fetchPatients = async () => {
            const { data, error } = await supabase
                .from('patients')
                .select('*')
                .order('created_at', { ascending: false});
            
            if (error) {
                console.error('Error al obtener pacientes:', error);
                setPatients([]);
            } else {
                setPatients(data || []);
            }
        };

        //Obtener doctores desde Supabase
        const fetchDoctors = async () => {
            const { data, error } = await supabase
                .from('doctors')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) {
                console.error('Error al obtener doctores:', error);
                setDoctors([]);
            } else {
                setDoctors(data || []);
            }
        };

        fetchPatients();
        fetchDoctors();

        // Obtener citas confirmadas.
        axios.get('http://localhost:3000/admin/appointments')
            .then((res) => setAppointments(res.data))
            .catch((error) => console.error('Error al obtener citas: ', error));
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
                            {patients.slice(0, 5).map((patients) => (
                                <li key={patients.id} className="data-list-item">
                                    {patients.name} - {patients.email}
                                </li>
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