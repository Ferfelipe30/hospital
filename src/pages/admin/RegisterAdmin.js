import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const RegisterAdmin = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState("");
    const navigate =useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }
        try {
            const hashedPassword = await bcrypt.hash(formData.password, 10);

            const { error } = await supabase.from("admins").insert([
                {
                    name: formData.name,
                    email: formData.email,
                    password: hashedPassword,
                    is_admin: true,
                },
            ]);
            if (error) {
                setMessage("Error al registrar el administrador: "+error.message);
            } else {
                setMessage("Administrador registrado con exito.");
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                setTimeout(() => navigate('/admin'), 1500);
            }
        } catch (err) {
            setMessage("Error de conexion.");
        }
    };

    return(
        <div>
      <h1>Registrar Administrador</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirmar Contraseña:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit">Registrar</button>
      </form>
      {message && <p style={{ color: message.startsWith("Error") ? "red" : "green" }}>{message}</p>}
    </div>
    );
};

export default RegisterAdmin;