import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout"; // Descomentar para usar el layout
import { supabase } from "../../utils/supabase";

const VerPacientes = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getPatients() {
            setLoading(true);
            setError(null); // Limpiar errores previos
            console.log("Intentando obtener pacientes desde Supabase..."); // Log de inicio

            const { data, error: supabaseError } = await supabase
                .from('patients') // Asegúrate que 'patients' es el nombre exacto de tu tabla
                .select(); 

            console.log("Respuesta Supabase:", { data, supabaseError }); // Mostrar data y error como un objeto

            if (supabaseError) {
                console.error("Error detallado al obtener pacientes:", supabaseError.message, supabaseError);
                setError(supabaseError.message);
                setPatients([]); // Asegurar que patients sea un array vacío en caso de error
            } else {
                setPatients(data || []); // Asegurar que patients sea un array, incluso si data es null
            }
            setLoading(false);
        }
        getPatients();
    }, []);

    return (
        <AdminLayout> {/* Envolver con AdminLayout */}
            <div style={{width: "100%"}}>
                <h1>Lista de Pacientes</h1>
                {loading && <p>Cargando pacientes...</p>}
                {error && <p style={{ color: 'red' }}>Error al cargar pacientes: {error}</p>}
                {!loading && !error && patients.length === 0 && <p>No hay pacientes registrados.</p>}
                {!loading && !error && patients.length > 0 && (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>EPS</th>
                                <th>Direccion</th>
                                <th>Ciudad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient) => (
                                <tr key={patient.id}>
                                    <td>{patient.name}</td> 
                                    <td>{patient.email}</td> 
                                    <td>{patient.phone}</td>
                                    <td>{patient.eps}</td>
                                    <td>{patient.address}</td>
                                    <td>{patient.city}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminLayout>
    );
};

export default VerPacientes;