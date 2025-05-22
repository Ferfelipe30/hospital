import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

const VerPacientes = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/admin/pacients")
            .then((res) => res.json())
            .then((data) => setPatients(data))
            .catch((error) => {
                setPatients([]);
                console.error("Error al obtener pacientes: ", error);
            });
    }, []);

    return (
        <AdminLayout>
            <div style={{width: "100%"}}>
                <h1>Pacientes Registrados</h1>
                {patients.length > 0 ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Fecha de Nacimiento</th>
                                <th>EPS</th>
                                <th>Dirección</th>
                                <th>Ciudad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.name}</td>
                                    <td>{p.email}</td>
                                    <td>{p.phone}</td>
                                    <td>{p.birthdate}</td>
                                    <td>{p.eps}</td>
                                    <td>{p.address}</td>
                                    <td>{p.city}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay pacientes registrados.</p>
                )}
            </div>
        </AdminLayout>
    );
}

export default VerPacientes;