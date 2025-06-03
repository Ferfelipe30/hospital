import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { supabase } from '../utils/supabase';

function PatientRegistration(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthdate: '',
        phone: '',
        eps: '',
        address: '',
        city: '',
    });

    //Mensaje de confirmacion de registro
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Validacion basica: verificar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            setMessage('Error: Las contraseñas no coinciden.');
            return;
        }

        try {
            // Step 1: Authenticate and create the user in Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (authError) {
                if (authError.message.includes('User already registered')) {
                    setMessage('Este correo electrónico ya está registrado. Por favor, intente iniciar sesión o utilice otro correo.');
                } else {
                    setMessage(`Error al registrar el usuario: ${authError.message}`);
                }
                return;
            }

            // Ensure user object is available from authentication response
            if (!authData || !authData.user) {
                setMessage('Error: No se pudo completar el registro. No se obtuvo la información del usuario después de la autenticación.');
                console.error('Supabase signUp did not return user data despite no authError:', authData);
                return;
            }

            // Step 2: Insert patient details into the 'patients' table
            const { data: patientData, error: patientError } = await supabase.from('patients').insert([{
                name: formData.name,
                email: formData.email,
                birthdate: formData.birthdate,
                phone: formData.phone,
                eps: formData.eps,
                address: formData.address,
                city: formData.city,
                user_id: authData.user.id, // authData.user is confirmed to exist here
            }]);

            if (patientError) {
                console.error('Error inserting patient data:', patientError);
                // At this point, an auth user exists, but patient profile creation failed.
                // This is a partial registration state.
                if (patientError.code === '23505') { // Unique constraint violation
                    setMessage('Error al guardar el perfil del paciente: Ya existe un registro con esta información (ej. email o ID de usuario). Por favor, contacte a soporte si el problema persiste.');
                } else {
                    setMessage(`Error al guardar los datos del paciente: ${patientError.message}. Su cuenta de usuario pudo haber sido creada. Por favor, intente iniciar sesión o contacte a soporte.`);
                }
            } else {
                setMessage('¡Paciente registrado con éxito!');
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    birthdate: '',
                    phone: '',
                    eps: '',
                    address: '',
                    city: '',
                });
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
            setMessage('Error al conectar con el servidor.');
        }
    };

    return (
        <div>
            <h1>Registro de Pacientes</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirmar Contraseña:</label>
                    <input 
                        type="password" 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Fecha de Nacimiento:</label>
                    <input 
                        type="date" 
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="eps-container">
                    <label>EPS: </label>
                    <select 
                        name="eps" 
                        value={formData.eps} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Seleccione una EPS</option>
                        <option value="Sura">Sura</option>
                        <option value="Sanitas">Sanitas</option>
                        <option value="Coomeva">Coomeva</option>
                        <option value="Compensar">Compensar</option>
                        <option value="Nueva EPS">Nueva EPS</option>
                        <option value="Famisanar">Famisanar</option>
                        <option value="Medimás">Medimás</option>
                        <option value="Salud Total">Salud Total</option>
                    </select>
                </div>
                <div>
                    <label>Dirección:</label>
                    <input 
                        type="text" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Ciudad:</label>
                    <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
            {/*Mostrar mensaje de confirmacion o error */}
            {message && (
                <p
                    style={{
                        marginTop: '20px',
                        color: message.startsWith('Error') ? 'red' : 'green',
                    }}   
                >
                    {message}
                </p>
            )}
        </div>
    );
}

export default PatientRegistration;