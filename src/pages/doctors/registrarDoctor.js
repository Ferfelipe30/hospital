import React, { useState } from "react";
import AdminLayout from "../admin/AdminLayout";
import { supabase } from "../../utils/supabase";
import bcrypt from "bcryptjs";

const RegistrarDoctor = () => {
    const [doctorData, setDoctorData] = useState({
        name: "",
        email: "",
        specialty: "",
        phone: "",
        address: "",
        city: "",
        password: "",
    });

    const handleDoctorChange = (e) => {
        const { name, value } = e.target;
        setDoctorData({ ...doctorData, [name]: value });
    };

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            const hashedPassword = await bcrypt.hash(doctorData.password, 10);
            const doctorToInsert = { ...doctorData, password: hashedPassword };

            const { data, error } = await supabase.from('doctors').insert([doctorToInsert]);
            if (error) {
                alert(error.message || 'Error al registrar el doctor.');
            } else {
                alert('Doctor Registrado con exito.');
                setDoctorData({
                    name: "",
                    email: "",
                    specialty: "",
                    phone: "",
                    address: "",
                    city: "",
                    password: "",
                });
            }
        } catch (error) {
            console.error(error);
            alert('Error al conectar con Supabase.');
        }
    };

    return (
        <AdminLayout>
            <div className="doctor-form-container">
                <h1>Registrar Doctor</h1>
                <form onSubmit={handleAddDoctor}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" name="name" value={doctorData.name} onChange={handleDoctorChange} placeholder="Nombre" required/>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={doctorData.email} onChange={handleDoctorChange} placeholder="Email" required/>
                    </div>
                    <div>
                        <label>Especialidad:</label>
                        <input type="text" name="specialty" value={doctorData.specialty} onChange={handleDoctorChange} placeholder="Especialidad" required/>
                    </div>
                    <div>
                        <label>Telefono:</label>
                        <input type="text" name="phone" value={doctorData.phone} onChange={handleDoctorChange} placeholder="Telefono" required/>
                    </div>
                    <div>
                        <label>Dirección:</label>
                        <input type="text" name="address" value={doctorData.address} onChange={handleDoctorChange} placeholder="Direccion" required/>
                    </div>
                    <div>
                        <label>Ciudad:</label>
                        <input type="text" name="city" value={doctorData.city} onChange={handleDoctorChange} placeholder="Ciudad" required/>
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input type="password" name="password" value={doctorData.password} onChange={handleDoctorChange} placeholder="Contraseña" required/>
                    </div>
                    <button type="submit">Registrar Doctor</button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default RegistrarDoctor;