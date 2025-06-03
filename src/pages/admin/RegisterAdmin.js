import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

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
            // Step 1: Create the user in Supabase Authentication
            // This handles password hashing securely and creates the user in auth.users
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    // Add role information directly to user metadata
                    data: {
                        is_admin: true,
                        role: 'admin', // Optional: use a 'role' string as well
                        name: formData.name // Optionally store name in metadata too
                    }
                }
            });

            if (authError) {
                 if (authError.message.includes('User already registered')) {
                    setMessage('Este correo electrónico ya está registrado como usuario.');
                } else {
                    setMessage(`Error al registrar el usuario administrador: ${authError.message}`);
                }
                return;
            }

            // Ensure user object is available from authentication response
            if (!authData || !authData.user) {
                 setMessage('Error: No se pudo completar el registro. No se obtuvo la información del usuario después de la autenticación.');
                 console.error('Supabase signUp did not return user data despite no authError:', authData);
                 return;
            }

            // Step 2 (Optional): Insert additional admin profile data into 'admins' table
            // This assumes your 'admins' table stores more than just auth credentials (like name)
            // and is linked by user_id. DO NOT store the password here.
            const { error: adminInsertError } = await supabase.from("admins").insert([{
                user_id: authData.user.id, // Link to the auth user
                name: formData.name,
                email: formData.email, // Email is also in auth.users, but can be stored here for convenience
            }]);

            if (adminInsertError) {
                console.error('Error inserting admin profile data:', adminInsertError);
                 // Handle potential partial registration (auth user created, profile failed)
                 setMessage(`Error al guardar el perfil del administrador: ${adminInsertError.message}. La cuenta de usuario pudo haber sido creada. Por favor, contacte a soporte.`);
            } else {
                setMessage("Administrador registrado con éxito.");
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                // Redirect after successful registration and profile insert
                setTimeout(() => navigate('/admin'), 1500);
            }
        } catch (err) {
            setMessage("Error de conexion.");
            console.error('Catch block error:', err);
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