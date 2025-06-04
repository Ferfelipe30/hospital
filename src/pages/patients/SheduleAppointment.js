import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';

const SheduleAppointment = () => {
    const [form, setForm] = useState({
        nombre: '',
        fecha: '',
        hora: '',
        motivo: ''
    });
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('citas_medicas')
            .insert([form]);
        if (error) {
            setMensaje('Error al registrar la cita');
        } else {
            setMensaje('Cita registrada correctamente');
            setForm({ nombre: '', fecha: '', hora: '', motivo: ''});
        }
    };

    return (
        <div className='shedule-container'>
            <h2>Agendar Cita Medica</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='nombre'
                    placeholder='Nombre del Paciente'
                    value={form.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type='date'
                    name='fecha'
                    value={form.fecha}
                    onChange={handleChange}
                    required
                />
                <input
                    type='time'
                    name='hora'
                    value={form.hora}
                    onChange={handleChange}
                    required
                />
                <input
                    type='text'
                    name='motivo'
                    placeholder='Motivo de la Cita'
                    value={form.motivo}
                    onChange={handleChange}
                    required
                />
                <button type='submit'>Agendar Cita</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default SheduleAppointment;