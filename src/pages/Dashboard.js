import React from 'react';
import '../style/Dashboard.css';

const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <h1 className='dashboard-title'>Bienvenido al Dashboard</h1>
            <ul className='dashboard-menu'>
                <li><a href='/shedule-appointment'>Agendar Citas</a></li>
                <li><a href='/view-exams'>Ver Examenes</a></li>
                <li><a href='/profile'>Perfil</a></li>
            </ul>
        </div>
    );
};

export default Dashboard;