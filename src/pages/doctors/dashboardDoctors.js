import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import "../../style/dashboardDoctor.css";

const DashboardDoctors = () => {
    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const doctorEmail = localStorage.getItem('doctorEmail');

    useEffect(() => {
        const fetchData = async () => {
            if (doctorEmail) {
                const { data: doctorData } = await supabase
                    .from('doctors')
                    .select('*')
                    .eq('email', doctorEmail)
                    .single();
                setDoctor(doctorData);

                const dateStr = selectedDate.toISOString().split('T')[0];
                const { data: appointmentsData } = await supabase
                    .from('appointments')
                    .select('*')
                    .eq('doctor_email', doctorEmail)
                    .eq('date', dateStr)
                    .order('time', { ascending: true });
                setAppointments(appointmentsData || []);
            }
        };

        fetchData();
    }, [doctorEmail, selectedDate]);

    const today = new Date();
    const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
    const [calendarYear, setCalendarYear] = useState(today.getFullYear());

    useEffect(() => {
        setCalendarMonth(selectedDate.getMonth());
        setCalendarYear(selectedDate.getFullYear());
    }, [selectedDate]);

    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

    const renderCalendar = () => {
        const days = [];
        const daysInMonth = getDaysInMonth(calendarMonth, calendarYear);
        const firstDay = new Date(calendarYear, calendarMonth, 1). getDay();
        for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`}></div>);
        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(calendarYear, calendarMonth, d);
            const isSelected = selectedDate.toDateString() === dateObj.toDateString();
            days.push(
                <button
                    key={d}
                    className={`calendar-day${isSelected ? ' selected' : ''}`}
                    onClick={() => setSelectedDate(dateObj)}
                >
                    {d}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="doctor-dashboard-container">
            <aside className="doctor-sidebar">
                <div className="sidebar-profile">
                    <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Perfil"
                        className="sidebar-avatar"
                    />
                    <span className="sidebar-name">{doctor?.name || "Doctor/a"}</span>
                    <span className="sidebar-specialty">{doctor?.specialty || ""}</span>
                </div>
                <nav>
                    <ul>
                        <li className="active">Dashboard</li>
                        <li><a href="/patients">Patients</a></li>
                        <li><a href="/appointments">Appointments</a></li>
                        <li><a href="/messages">Messages</a></li>
                        <li><a href="/settings">Settings</a></li>
                    </ul>
                </nav>
            </aside>
            <main className="doctor-dashboard-main">
                <h1>Dashboard</h1>
                <p className="welcome-msg">
                    {doctor && <>Welcome back, Dr. {doctor.name}. Here's your overview for today.</>}
                </p>
                <h2>Today's Appointments</h2>
                <div className="doctor-calendar-section">
                    <div className="calendar-header">
                        <button onClick={() => setCalendarMonth(m => m - 1)}>&lt;</button>
                        <strong>
                            {new Date(calendarYear, calendarMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </strong>
                        <button onClick={() => setCalendarMonth(m => m + 1)}>&gt;</button>
                    </div>
                    <div className="calendar-grid">
                        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                        {renderCalendar()}
                    </div>
                </div>
                <div className="appointments-table-section">
                    <table className="appointments-table">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Patient</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length > 0 ? appointments.map((cita) => (
                                <tr key={cita.id}>
                                    <td>{cita.time}</td>
                                    <td>{cita.patient_name}</td>
                                    <td>{cita.type}</td>
                                    <td>
                                        <span className={`status-badge ${cita.status?.toLowerCase()}`}>
                                            {cita.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: "center" }}>No appointments for this day.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="quick-actions">
                    <button className="btn-primary">View Patient Records</button>
                    <button className="btn-secondary">Schedule New Appointment</button>
                </div>
            </main>
        </div>
    );
};

export default DashboardDoctors;