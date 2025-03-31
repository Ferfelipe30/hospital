import React, {useState} from "react";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login Data: ', formData);
        //Aqui puedes agregar la logica para autenticar al usuario con tu backend
        alert("Inicio de sesion exitoso!");
        setFormData({
            email: '',
            password: '',
        });
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
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="forgot-password">
                    <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form> 
        </div>
    );
}

export default Login;