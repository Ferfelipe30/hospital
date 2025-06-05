import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUsers, FaCalendarAlt, FaCog } from "react-icons/fa"; //Importar icons
import '../../style/adminPanel.css'; // Importar estilos CSS
import { supabase } from "../../utils/supabase";

const AdminPanel = () => {
    const [patients, setPatients] = useState([]);
    const [citas_medicas, setcitas_medicas] = useState([]);
    const [doctors, setDoctors] = useState([]); // Nuevo estado para doctores
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener datos de pacientes.
        const fetchPatients = async () => {
            const { data, error } = await supabase
                .from('patients')
                .select('*')
                .order('id', { ascending: false});
            
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
                .order('id', { ascending: false });
            if (error) {
                console.error('Error al obtener doctores:', error);
                setDoctors([]);
            } else {
                setDoctors(data || []);
            }
        };

        //Obtener citas desde Supabase
        const fetchAppointments = async () => {
            const { data, error } = await supabase
                .from('citas_medicas')
                .select('*')
                .order('id', { ascending: false });
            if (error) {
                console.error('Error al obtener citas:', error);
                setcitas_medicas([]);
            } else {
                setcitas_medicas(data || []);
            }
        }

        fetchPatients();
        fetchDoctors();
        fetchAppointments();
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
                            {patients.slice(0, 5).map((patient) => (
                                <li key={patient.id} className="data-list-item">
                                    {patient.name} - {patient.email} - {patient.phone || 'Teléfono no disponible'}
                                </li>
                            ))}
                        </ul>
                    ) : <p>No hay pacientes registrados.</p>}
                </section>

                <section className="content-section">
                    <h2>Citas Agendadas</h2>
                    {citas_medicas.length > 0 ? (
                        <ul className="data-list">
                            {citas_medicas.map((cita) => (
                                <li key={cita.id} className="data-list-item">
                                    {cita.date} - Paciente: {cita.patients_name || cita.patient_name || cita.patient_id} con Dr. {cita.doctors_name || cita.doctor_name || cita.doctor_id}
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