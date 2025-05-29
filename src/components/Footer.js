import React from "react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#00B0B0", color: "#fff", padding: "2rem 1rem", textAlign: "center" }}>
      <div style={{ marginBottom: "1rem" }}>
        <h3>Salud Vida Clínica</h3>
        <p>Dirección: Carrera 12 #45-67, Bogotá, Colombia</p>
        <p>Teléfono: (601) 555 6789 | emergencias: 123</p>
        <p>Correo: contacto@saludvidaclinica.com</p>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <p>Horario de atención: Lunes a Viernes 7:00 a.m. - 6:00 p.m.</p>
        <p>Sábados 7:00 a.m. - 1:00 p.m.</p>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <a href="/certificaciones" style={{ color: "#fff", margin: "0 0.5rem" }}>Certificaciones</a>|
        <a href="/politicas" style={{ color: "#fff", margin: "0 0.5rem" }}>Políticas de privacidad</a>|
        <a href="/terminos" style={{ color: "#fff", margin: "0 0.5rem" }}>Términos y condiciones</a>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button style={{
          backgroundColor: "#E60000",
          color: "#fff",
          padding: "0.8rem 1.5rem",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Emergencias
        </button>
      </div>

      <p style={{ marginTop: "1rem" }}>&copy; 2025 Salud Vida Clínica. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
