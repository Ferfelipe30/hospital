import React, { useEffect, useState } from "react";

const DashboardDoctors = () => {
    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);

    const doctorEmail = localStorage.getItem('doctorEmail');

    useEffect(() => {
        if (doctorEmail) {
            fetch('http://localhost:3000/doctors/info?email=${doctorEmail}')
                .then(res => res.json())
                .then(data => setDoctor(data));
                
            fetch('http://localhost:3000/doctors/appointments?email=${doctorEmail}')
                .then(res => res.json())
                .then(data => setAppointments(data));
        
            fetch('http://localhost:3000/doctors/patients?email=${doctorEmail}')
                .then(res => res.json())
                .then(data => setPatients(data));
        }
        
    }, [doctorEmail]);

    return (
        <div className="doctor-dashboard-container" style={{padding: '32px'}}>
            <h1>Dashboard de Doctores</h1>
            {doctor && (
                <div style={{marginBottom: "24px"}}>
                    <h2>Bienvenido, Dr. {doctor.name}</h2>
                    <p>Especialidad: {doctor.specialty}</p>
                </div>
            )}

            <section style={{marginBottom: "32px"}}>
                <h3>Citas Agendadas</h3>
                {appointments.length > 0 ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Paciente</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Motivo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((cita) => (
                                <tr key={cita.id}>
                                    <td>{cita.patients_name}</td>
                                    <td>{cita.date}</td>
                                    <td>{cita.time || cita.hour || cita.start_time}</td>
                                    <td>{cita.reason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No tiene citas agendadas</p>
                )}
            </section>

            <section>
                <h3>Pacientes Asignados</h3>
                {patients.length > 0 ? (
                    <ul>
                        {patients.map((p) => (
                            <li key={p.id}>{p.name} - {p.email}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No tienes pacientes asignados.</p>
                )}
            </section>
        </div>
    );
};

export default DashboardDoctors;