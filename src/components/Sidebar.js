import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUsers, FaCalendarAlt, FaCog } from "react-icons/fa";
import "../style/adminPanel.css";

const Sidebar = () => {
    const navigate =useNavigate();
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>Acciones</h2>
            </div>
            <button onClick={() => navigate('/registrarDoctor')}>
                <FaUserMd className="icon"/> Registrar Doctor
            </button>
            <button onClick={() => navigate('/admin/ver-pacientes')}>
                <FaUsers className="icon"/> Ver Pacientes
            </button>
            <button onClick={() => navigate('/admin/ver-citas')}>
                <FaCalendarAlt className="icon"/> Ver Citas
            </button>
            <button onClick={() => navigate('/admin/configuracion')}>
                <FaCog className="icon"/> Configuración
            </button>
        </aside>
    );
};

export default Sidebar;