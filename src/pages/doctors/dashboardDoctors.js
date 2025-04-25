import React from "react";

const DashboardDoctors = () => {
    return (
        <div>
            <h1>Dashboard de Doctores</h1>
            <ul>
                <li><a href="/manage-doctors">Gestionar Doctores</a></li>
                <li><a href="/manage-schedules">Gestionar Horario</a></li>
                <li><a href="/view-reports">Ver Reportes</a></li>
            </ul>
        </div>
    );
};

export default DashboardDoctors;