import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Dashboard.css';

const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <h1 className='dashboard-title'>Bienvenido al Dashboard</h1>
            <ul className='dashboard-menu'>
                <li><Link to='/shedule-appointment'>Agendar Citas</Link></li>
                <li><Link to='/view-exams'>Ver Examenes</Link></li>
                <li><Link to='/profile'>Perfil</Link></li>
            </ul>
        </div>
    );
};

export default Dashboard;