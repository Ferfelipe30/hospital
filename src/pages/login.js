import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                // Provide more user-friendly messages for common auth errors
                if (error.message.includes('Invalid login credentials')) {
                    setMessage('Credenciales inválidas. Por favor, verifica tu email y contraseña.'); // Handles incorrect email/password
                } else if (error.message.includes('Email not confirmed')) {
                    // Handles the specific "Email not confirmed" error
                    setMessage('Tu correo electrónico aún no ha sido confirmado. Por favor, revisa tu bandeja de entrada y haz clic en el enlace de confirmación.');
                } else {
                    setMessage(`Error al iniciar sesión: ${error.message}`);
                }
            } else if (data.user) {
                const user = data.user;
                // Check user metadata for roles and navigate accordingly
                const meta = user.user_metadata || {};
                if (meta.role === 'admin' || meta.is_admin) {
                    navigate('/admin');
                } else if (meta.role === 'doctor' || meta.is_doctor) {
                    navigate('/dashboardDoctor');
                } else {
                    navigate('/dashboard');
                    // Optionally set a success message state here if you want to show it briefly before redirect
                }
            }
        } catch (error) {
            console.error(error);
            setMessage('Error al conectar con el servidor.');
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Inicio de Sesión</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: </label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña: </label>
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{marginLeft: '10px'}}
                    >
                        {showPassword ? 'Ocultar': 'Mostrar'}
                    </button>
                </div>
                <div className="forgot-password">
                    <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form> 
            {message && <p style={{color: 'red', marginTop: '10px'}}>{message}</p>}
        </div>
    );
}

export default Login;