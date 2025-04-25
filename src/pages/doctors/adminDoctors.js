import React, { useState } from "react";

const AdminDoctors = () => {
    const [doctorData, setDoctorData] = useState({
        name: "",
        email: "",
        specialty: "",
        phone: "",
        address: "",
        city: "",
        password: "",
    });

    const [scheduleData, setScheduleData] = useState({
        doctorId: "",
        day_of_week: "",
        start_time: "",
        end_time: "",
    });

    const handleDoctorChange = (e) => {
        const { name, value} = e.target;
        setDoctorData({...doctorData, [name]: value });
    };

    const handleScheduleChange = (e) => {
        const { name, value } = e.target;
        setScheduleData({...scheduleData, [name]: value });
    };

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/doctors", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doctorData),
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error(error);
            alert('Error al agregar el doctor');
        }
    };

    const handleAddSchedule = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/doctor-schedules", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scheduleData),
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error(error);
            alert('Error al agregar el horario del doctor');
        }
    };

    return (
        <div>
            <h1>Doctor Nuevo</h1>
            <form onSubmit={handleAddDoctor}>
                <h2>Agregar Doctor</h2>
                <input type="text" name="name" placeholder="Nombre" onChange={handleDoctorChange} required/>
                <input type="email" name="email" placeholder="Email" onChange={handleDoctorChange} required/>
                <input type="text" name="specialty" placeholder="Especialidad" onChange={handleDoctorChange} required/>
                <input type="text" name="phone" placeholder="Teléfono" onChange={handleDoctorChange} required/>
                <input type="text" name="address" placeholder="Dirección" onChange={handleDoctorChange} required/>
                <input type="text" name="city" placeholder="Ciudad" onChange={handleDoctorChange} required/>
                <input type="password" name="password" placeholder="Contraseña" onChange={handleDoctorChange} required/>
                <button type="submit">Agregar Doctor</button>
            </form>

            <form onSubmit={handleAddSchedule}>
                <h2>Agregar Horario</h2>
                <input type="text" name="doctorId" placeholder="ID del Doctor" onChange={handleScheduleChange} required/>
                <input type="text" name="day_of_week" placeholder="Día de la Semana" onChange={handleScheduleChange} required/>
                <input type="time" name="start_time" placeholder="Hora de Inicio" onChange={handleScheduleChange} required/>
                <input type="time" name="end_time" placeholder="Hora de Fin" onChange={handleScheduleChange} required/>
                <button type="submit">Agregar Horario</button>
            </form>
        </div>
    );
};

export default AdminDoctors;