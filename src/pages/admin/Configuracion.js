import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

const Configuracion = () => {
    const [admin, setAdmin] = useState(null);

    const adminEmail = localStorage.getItem("adminEmail");

    useEffect(() => {
        if (adminEmail) {
            fetch('http://localhost:3000/admin/info?email=${adminEmail')
                .then(res => res.json())
                .then(data => setAdmin(data))
                .catch(() => setAdmin(null));
        }
    }, [adminEmail]);

    return (
        <AdminLayout>
            <div style={{ width: "100%" }}>
                <h1>Configuración de Administrador</h1>
                {admin ? (
                    <div className="admin-config-card" style={{
                        background: "#fff",
                        padding: "32px",
                        borderRadius: "12px",
                        maxWidth: "400px",
                        margin: "40px auto",
                        boxShadow: "0 2px 12px rgba(44,62,80,0.08)"
                    }}>
                        <p><strong>Nombre:</strong> {admin.name}</p>
                        <p><strong>Email:</strong> {admin.email}</p>
                        <p><strong>Rol:</strong> Administrador</p>
                    </div>
                ) : (
                    <p>No se pudo cargar la información del administrador.</p>
                )}
            </div>
        </AdminLayout>
    );
};

export default Configuracion;