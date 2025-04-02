import React, {useState} from "react";

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

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validacion basica: verificar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            setMessage('Error: Las contraseñas no coinciden.');
            return;
        }

        //Simular envio de datos al backend
        console.log('Patient Data:', formData);
        setMessage('Paciente registrado con éxito!');
        //Aqui puedes agregar la logica para enviar los datos a tu backend
        alert('Paciente registrado con éxito!');
        //Limpiar formulario
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
            {message && <p style={{marginTop: '20px', color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
}

export default PatientRegistration;