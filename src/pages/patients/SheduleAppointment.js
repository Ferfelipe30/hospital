import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useNavigate } from 'react-router-dom';

const SheduleAppointment = () => {
    const [form, setForm] = useState({
        nombre: '',
        user_id: '',
        fecha: '',
        hora: '',
        motivo: ''
    });
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setForm(prevForm => ({ ...prevForm, user_id: user.id}));
            } else {
                setMensaje('Error: Debes iniciar sesion para agendar una cita.');
            }
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from('citas_medicas')
            .insert([{
                nombre: form.nombre,
                user_id: form.user_id,
                fecha: form.fecha,
                hora: form.hora,
                motivo: form.motivo
            }]);
        if (error) {
            setMensaje('Error al registrar la cita: ${error.message}');
        } else {
            setMensaje('Cita registrada correctamente');
            setForm({ nombre: '', user_id: form.user_id, fecha: '', hora: '', motivo: ''});
        }
    };

    return (
        <div className='shedule-container'>
            <h2>Agendar Cita Medica</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='hidden'
                    name='user_id'
                    value={form.user_id}
                />
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