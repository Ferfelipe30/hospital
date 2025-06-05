import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Dashboard.css';

const Dashboard = () => {
    const user = {
        name: "Elena Rodriguez",
        birthdate: "1994-03-12",
        gender: "Femenino",
        phone: "+57 3221458796",
        email: "elena.rodriguez@gmail.com"
    };

    const nextAppointment = {
        doctor: "Dra. Sofia Ramirez",
        date: "2024-07-15",
        time: "10:00",
        reason: "Chequeo General"
    }

    const medicalExams = [
        {
        title: "Resultados de Sangre",
        date: "2024-06-20",
        description: "Completado",
        img: "https://img.icons8.com/color/96/000000/test-tube.png"
        },
        {
        title: "Resonancia MRI",
        date: "2024-05-10",
        description: "Completado",
        img: "https://img.icons8.com/color/96/000000/mri.png"
        }
    ];

    return (
        <div className="dashboard-modern-container">
            <aside className="dashboard-sidebar">
                <div className="sidebar-profile">
                <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Perfil"
                    className="sidebar-avatar"
                />
                <span>{user.name}</span>
                </div>
                <nav>
                <ul>
                    <li className="active">Inicio</li>
                    <li> <a href="/shedule-appointment">Citas</a> </li>
                    <li> <a href="/view-exams">Exámenes</a> </li>
                    <li> <a href="/profile">Perfil</a> </li>
                </ul>
                </nav>
                <div className="sidebar-bottom">
                <button>⚙️ Configuración</button>
                <button>❓ Ayuda</button>
                </div>
            </aside>
            <main className="dashboard-main">
                <h2>Bienvenida, {user.name}</h2>

                {/* Próxima cita */}
                <section className="dashboard-section">
                <h3>Próxima Cita</h3>
                <div className="appointment-card">
                    <div>
                    <strong>{nextAppointment.reason}</strong><br />
                    {nextAppointment.doctor}<br />
                    {new Date(nextAppointment.date).toLocaleDateString()} | {nextAppointment.time}
                    </div>
                    <img src="https://img.icons8.com/color/96/doctor-male.png" alt="Doctor" />
                </div>
                <div className="dashboard-actions">
                    <a className="btn-primary" href="/shedule-appointment">Agendar Nueva Cita</a>
                    <a className="btn-secondary" href="/appointments">Ver Citas Pasadas</a>
                </div>
                </section>

                {/* Exámenes médicos */}
                <section className="dashboard-section">
                <h3>Exámenes Médicos</h3>
                <div className="exams-list">
                    {medicalExams.map((exam, idx) => (
                    <div className="exam-card" key={idx}>
                        <img src={exam.img} alt={exam.title} />
                        <div>
                        <strong>{exam.title}</strong>
                        <div className="exam-date">{exam.description} el {new Date(exam.date).toLocaleDateString()}</div>
                        <a className="btn-secondary" href="/view-exams">Ver Resultados</a>
                        </div>
                    </div>
                    ))}
                </div>
                <div style={{ textAlign: "right" }}>
                    <a className="btn-secondary" href="/view-exams">Ver Todos los Exámenes</a>
                </div>
                </section>

                {/* Datos de perfil */}
                <section className="dashboard-section">
                <h3>Datos de Perfil</h3>
                <table className="profile-table">
                    <tbody>
                    <tr>
                        <td>Nombre</td>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <td>Fecha de Nacimiento</td>
                        <td>{new Date(user.birthdate).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td>Género</td>
                        <td>{user.gender}</td>
                    </tr>
                    <tr>
                        <td>Teléfono</td>
                        <td>{user.phone}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{user.email}</td>
                    </tr>
                    </tbody>
                </table>
                <div style={{ textAlign: "right" }}>
                    <a className="btn-primary" href="/profile">Actualizar Perfil</a>
                </div>
                </section>
            </main>
            </div>
    );
};

export default Dashboard;