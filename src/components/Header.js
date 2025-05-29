import React from "react";
import logo from "../assets/images/logo-de-la-clinica.webp";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#00B0B0",
        color: "#fff",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Logo Salud Vida Clínica"
          style={{ height: "60px", marginRight: "1rem" }}
        />
        <h1
          style={{
            fontSize: "1.7rem",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          Salud Vida Clínica
        </h1>
      </div>

      <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link to="/" style={linkStyle}>Inicio</Link>
        <Link to="/about" style={linkStyle}>Quiénes Somos</Link>
        <Link to="/PatientRegistration" style={linkStyle}>Registro de Pacientes</Link>
        <Link to="/login" style={linkStyle}>Iniciar Sesión</Link>
      </nav>
    </header>
  );
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: "500",
  transition: "color 0.3s ease",
};

export default Header;
