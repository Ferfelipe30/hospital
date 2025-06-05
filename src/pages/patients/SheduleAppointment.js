import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';

const specialties = [
    "Medicina General",
    "Pediatría",
    "Ginecología",
    "Cardiología",
    "Dermatología"
];

const doctorsBySpecialty = {
    "Medicina General": ["Dra. Sofia Ramirez", "Dr. Juan Pérez"],
    "Pediatría": ["Dra. Laura Niño"],
    "Ginecología": ["Dra. Ana Torres"],
    "Cardiología": ["Dr. Carlos Ruiz"],
    "Dermatología": ["Dra. Paula Gómez"]
};

const availableTimes = ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

const SheduleAppointment = () => {
    const [form, setForm] = useState({
        nombre: '',
        user_id: '',
        specialty: '',
        doctor: '',
        fecha: '',
        hora: '',
        motivo: ''
    });
    const [user, setUser] = useState(null);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.name === 'specialty') {
            setForm(f => ({ ...f, doctor: '' }));
        }
    };

    const handleDateSelect = (date) => {
        setForm({ ...form, date });
    };

    const handleTimeSelect = (time) => {
        setForm({ ...form, time });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setMensaje('Debes iniciar sesion para agendar una cita.');
            return;
        }
        const { error } = await supabase
            .from('citas_medicas')
            .insert([{
                nombre: form.nombre,
                user_id: form.user_id,
                specialty: form.specialty,
                doctor: form.doctor,
                fecha: form.fecha,
                hora: form.hora,
                motivo: form.motivo
            }]);
        if (error) {
            setMensaje(`Error al registrar la cita: ${error.message}`);
        } else {
            setMensaje('Cita registrada correctamente');
            setForm({ nombre: '', user_id: form.user_id, specialty: '', doctor: '', fecha: '', hora: '', motivo: ''});
        }
    };

    const today = new Date();
    const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
    const [calendarYear] = useState(today.getFullYear());

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const renderCalendar = () => {
        const days = [];
        const daysInMonth = getDaysInMonth(calendarMonth, calendarYear);
        const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
        for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`}></div>);
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            days.push(
                <button
                    key={d}
                    className={`calendar-day${form.fecha === dateStr ? ' selected ' : ''}`}
                    onClick={() => handleDateSelect(dateStr)}
                >
                    {d}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="dashboard-modern-container">
            <aside className="dashboard-sidebar">
                <div className="sidebar-profile">
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Perfil"
                        className="sidebar-avatar"
                    />
                    <span>{user?.email || "Paciente"}</span>
                </div>
                <nav>
                    <ul>
                        <li><a href="/dashboard">Inicio</a></li>
                        <li className="active">Citas</li>
                        <li><a href="/view-exams">Exámenes</a></li>
                        <li><a href="/profile">Perfil</a></li>
                    </ul>
                </nav>
                <div className="sidebar-bottom">
                    <button>⚙️ Configuración</button>
                    <button>❓ Ayuda</button>
                </div>
            </aside>
            <main className="dashboard-main">
                <h2>Agendar Nueva Cita</h2>
                <form className="appointment-form" onSubmit={handleSubmit} style={{ maxWidth: 700, margin: "0 auto" }}>
                    <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                        <select
                            name="specialty"
                            value={form.specialty}
                            onChange={handleChange}
                            required
                            style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
                        >
                            <option value="">Selecciona Especialidad</option>
                            {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <select
                            name="doctor"
                            value={form.doctor}
                            onChange={handleChange}
                            disabled={!form.specialty}
                            style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
                        >
                            <option value="">Selecciona Doctor (opcional)</option>
                            {form.specialty && doctorsBySpecialty[form.specialty].map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                    <div style={{ marginBottom: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <button type="button" onClick={() => setCalendarMonth(m => m - 1)}>&lt;</button>
                            <strong>
                                {new Date(calendarYear, calendarMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </strong>
                            <button type="button" onClick={() => setCalendarMonth(m => m + 1)}>&gt;</button>
                        </div>
                        <div className="calendar-grid" style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(7, 1fr)",
                            gap: 4,
                            marginTop: 12
                        }}>
                            <div>D</div><div>L</div><div>M</div><div>M</div><div>J</div><div>V</div><div>S</div>
                            {renderCalendar()}
                        </div>
                    </div>
                    <div style={{ marginBottom: 24 }}>
                        <strong>Horarios Disponibles</strong>
                        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                            {availableTimes.map(t => (
                                <button
                                    type="button"
                                    key={t}
                                    className={`time-btn${form.time === t ? ' selected' : ''}`}
                                    onClick={() => handleTimeSelect(t)}
                                    style={{
                                        padding: "10px 18px",
                                        borderRadius: 8,
                                        border: form.time === t ? "2px solid #00B0B0" : "1px solid #ccc",
                                        background: form.time === t ? "#e6f7f7" : "#fff",
                                        cursor: "pointer"
                                    }}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={{ marginBottom: 24 }}>
                        <label>Motivo de la cita</label>
                        <input
                            type="text"
                            name="motivo"
                            value={form.motivo}
                            onChange={handleChange}
                            placeholder="Ej: Chequeo general"
                            style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
                            required
                        />
                    </div>
                    <div className="appointment-summary" style={{
                        background: "#f8f9fa",
                        borderRadius: 10,
                        padding: 18,
                        marginBottom: 24
                    }}>
                        <strong>Resumen de la Cita</strong>
                        <table style={{ width: "100%", marginTop: 10 }}>
                            <tbody>
                                <tr>
                                    <td style={{ color: "#00B0B0" }}>Especialidad</td>
                                    <td>{form.specialty || "-"}</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00B0B0" }}>Doctor</td>
                                    <td>{form.doctor || "-"}</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00B0B0" }}>Fecha</td>
                                    <td>{form.date ? new Date(form.date).toLocaleDateString() : "-"}</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00B0B0" }}>Hora</td>
                                    <td>{form.time || "-"}</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00B0B0" }}>Motivo</td>
                                    <td>{form.motivo || "-"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button className="btn-primary" type="submit" style={{ width: 220, fontWeight: 600 }}>
                        Confirmar Cita
                    </button>
                    {mensaje && <p style={{ marginTop: 16, color: mensaje.includes('Error') ? 'red' : 'green' }}>{mensaje}</p>}
                </form>
            </main>
        </div>
    );
};

export default SheduleAppointment;