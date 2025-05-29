import React, { useState } from 'react';
import {
  FaHeartbeat,
  FaStethoscope,
  FaPills,
  FaUserMd,
  FaNotesMedical,
  FaBriefcaseMedical,
  FaSyringe,
} from 'react-icons/fa';

const services = [
  {
    id: 1,
    title: "Cardiología",
    icon: <FaHeartbeat />,
    description:
      "Cuidamos tu corazón con tecnología avanzada y un equipo humano excepcional.",
    extraItems: [
      { icon: <FaUserMd />, label: "Dr. Juan Pérez – Electrofisiología" },
      { icon: <FaUserMd />, label: "Dra. Laura Gómez – Cardiología pediátrica" },
      { icon: <FaUserMd />, label: "Dr. Andrés Ríos – Intervencionismo" },
    ],
  },
  {
    id: 2,
    title: "Medicina General",
    icon: <FaStethoscope />,
    description:
      "Brindamos atención integral para pacientes de todas las edades, enfocándonos en la prevención, diagnóstico y tratamiento.",
    extraItems: [
      { icon: <FaNotesMedical />, label: "Consultas presenciales y virtuales" },
      { icon: <FaBriefcaseMedical />, label: "Atención por síntomas generales" },
      { icon: <FaHeartbeat />, label: "Seguimiento de enfermedades crónicas" },
      { icon: <FaSyringe />, label: "Vacunación y certificados médicos" },
    ],
  },
  {
    id: 3,
    title: "Farmacia",
    icon: <FaPills />,
    description: "Medicamentos seguros y asesoría profesional al instante.",
    extraItems: [
      { icon: <FaPills />, label: "Paracetamol – Analgésico y antipirético" },
      { icon: <FaPills />, label: "Losartán – Control de presión arterial" },
      { icon: <FaPills />, label: "Amoxicilina – Antibiótico amplio espectro" },
    ],
  },
  {
    id: 4,
    title: "Consultas Especializadas",
    icon: <FaUserMd />,
    description: "Especialistas en diversas áreas médicas para necesidades más específicas.",
    extraItems: [
      { icon: <FaUserMd />, label: "Pediatría" },
      { icon: <FaUserMd />, label: "Ginecología" },
      { icon: <FaUserMd />, label: "Dermatología" },
      { icon: <FaUserMd />, label: "Endocrinología" },
    ],
  },
];

const ServicesGrid = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <>
      <div className="services-container">
        {services.map((service) => (
          <div
            className="service-icon"
            key={service.id}
            onClick={() => setSelectedService(service)}
          >
            <div style={{ fontSize: "2.5rem", color: "#4A7A57" }}>{service.icon}</div>
            <h3>{service.title}</h3>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedService && (
        <div
          onClick={() => setSelectedService(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              maxWidth: "600px",
              width: "90%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", color: "#4A7A57", marginBottom: "10px" }}>
                {selectedService.icon}
              </div>
              <h2 style={{ color: "#004d4d" }}>{selectedService.title}</h2>
              <p style={{ fontSize: "1rem", color: "#555", lineHeight: "1.6" }}>
                {selectedService.description}
              </p>
            </div>

            {/* MATRIZ DE ÍTEMS */}
            <div
              style={{
                marginTop: "25px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              {selectedService.extraItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#f1f8f4",
                    borderRadius: "10px",
                    padding: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "0.95rem",
                    color: "#333",
                  }}
                >
                  <span style={{ fontSize: "1.3rem", color: "#00B0B0" }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => setSelectedService(null)}
                style={{
                  marginTop: "25px",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  backgroundColor: "#00B0B0",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesGrid;
