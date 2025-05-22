import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

const VerCitas = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/admin/appointments")
            .then((res) => res.json())
            .then((data) => setAppointments(data))
            .catch((error) => {
                setAppointments([]);
                console.error("Error al obtener citas: ", error);
            });
    }, []);

    return (
        <AdminLayout>
            <div style={{width: "100%"}}>
                <h1>Citas Agendadas</h1>
                {appointments.length > 0 ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Paciente</th>
                                <th>Doctor</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((cita) => (
                                <tr key={cita.id}>
                                    <td>{cita.pacients_name}</td>
                                    <td>{cita.doctors_name}</td>
                                    <td>{cita.date}</td>
                                    <td>{cita.time || cita.hour || cita.start_time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay citas agendadas.</p>
                )}
            </div>
        </AdminLayout>
    );
};

export default VerCitas;