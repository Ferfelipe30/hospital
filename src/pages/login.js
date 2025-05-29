import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

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
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Inicio de sesion exitoso');
                console.log('Usuario:', data.user);
                //Redirigir al dashboard o guardar el estado del usuario
                if (data.user.is_admin) {
                    navigate('/admin');
                } else if (data.user.role === 'doctor' || data.user.is_doctor){
                    navigate('/dashboardDoctor');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setMessage(data.message);
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