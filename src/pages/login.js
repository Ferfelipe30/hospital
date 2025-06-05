import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [showPassword] = useState(false);
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
        <div className="login-bg">
            <div className="login-card">
                <h1 className="login-title">Login to Your Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="login-label-group">
                        <label>Username or Email</label>
                        <input 
                            type="email"
                            name="email"
                            placeholder="Enter your username or email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="login-label-group">
                        <label>Password</label>
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{textAlign: "left", marginBottom: "18px"}}>
                        <a className="login-link" href="/forgot-password">Forgot Password?</a>
                    </div>
                    <button className="login-btn" type="submit">Login</button>
                </form>
                <div style={{textAlign: "center", marginTop: "18px"}}>
                    <span style={{fontSize: "1rem", color: "#555"}}>
                        Don't have an account? <a className="login-link" href="/PatientRegistration">Register</a>
                    </span>
                </div>
                {message && <p style={{color: 'red', marginTop: '10px'}}>{message}</p>}
            </div>
        </div>
    );
}

export default Login;