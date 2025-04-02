import React from "react";
import logo from "../assets/images/logo-de-la-clinica.webp";

const Header = () => {
    return (
        <header>
            <img src={logo} alt="Logo Salud Vida Clinica" className="logo" />
            <h1>Clinica Vida Salud</h1>
            <nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/PatientRegistration">Registro de Pacientes</a>
                <a href="/login">Iniciar Sesión</a>
            </nav>
        </header>
    );
};

export default Header;