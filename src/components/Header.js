import React from "react";

const Header = () => {
    return (
        <header>
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