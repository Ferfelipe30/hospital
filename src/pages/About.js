import React, { useState } from "react";
import {
  FaUserTie,
  FaHeart,
  FaBrain,
  FaGavel,
  FaBalanceScale
} from "react-icons/fa";

// ✅ Importación de imágenes desde src/assets/images
import clinicaImg from '../assets/images/clinica-institucional.jpg';

import director1 from '../assets/images/director1.jpg';
import director2 from '../assets/images/director2.jpg';
import director3 from '../assets/images/director3.jpg';

import doctor1 from '../assets/images/doctor1.jpg';
import doctor2 from '../assets/images/doctor2.jpg';
import doctor3 from '../assets/images/doctor3.jpg';
import doctor4 from '../assets/images/doctor4.jpg';
import doctor5 from '../assets/images/doctor5.jpg';

const About = () => {
  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const directivos = [
    { nombre: "José C. Castellanos", cargo: "Director General", img: director1 },
    { nombre: "Alvaro Zabala", cargo: "Director Médico", img: director2 },
    { nombre: "Dra. Laura Restrepo", cargo: "Coordinadora Clínica", img: director3 },
  ];

  const doctores = [
    { nombre: "Dra. Laura Martínez", especialidad: "Cardióloga", img: doctor1 },
    { nombre: "Dr. Miguel Torres", especialidad: "Pediatra", img: doctor2 },
    { nombre: "Dra. Natalia Ríos", especialidad: "Dermatóloga", img: doctor3 },
    { nombre: "Dr. Andrés Cifuentes", especialidad: "Ortopedista", img: doctor4 },
    { nombre: "Dra. Paola Jiménez", especialidad: "Ginecóloga", img: doctor5 },
  ];

  return (
    <div style={{ padding: "40px", fontFamily: "'Poppins', sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#004d4d", marginBottom: "20px" }}>
        ¿Quiénes somos?
      </h2>

      <p style={{
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
        fontSize: "1.1rem",
        lineHeight: "1.8",
        color: "#444"
      }}>
        En Salud Vida Clínica, nos dedicamos a brindar atención médica integral, segura y centrada en el paciente.
        Combinamos tecnología de vanguardia con un equipo humano comprometido, para ofrecer servicios de salud de alta calidad a toda la comunidad.
      </p>

      {/* Imagen institucional */}
      <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
        <img
          src={clinicaImg}
          alt="Imagen institucional de la clínica"
          style={{
            width: "100%",
            maxWidth: "1200px",
            height: "auto",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
            objectFit: "cover"
          }}
        />
      </div>

      {/* Nuestros pilares */}
      <section style={{ margin: "60px 0" }}>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Nuestros pilares</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}>
          {[
            { icon: <FaHeart />, title: "El paciente en el centro", text: "Atención personalizada, integral y humana." },
            { icon: <FaBrain />, title: "Generamos conocimiento", text: "Investigación y docencia en salud." },
            { icon: <FaUserTie />, title: "Equipo interdisciplinar", text: "Colaboración entre áreas médicas." },
            { icon: <FaGavel />, title: "Ética médica", text: "Actuamos con responsabilidad y transparencia." },
            { icon: <FaBalanceScale />, title: "Clínica Excelencia", text: "Tecnología y resultados de alto nivel." },
          ].map((item, index) => (
            <div key={index} style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2rem", color: "#00B0B0", marginBottom: "10px" }}>{item.icon}</div>
              <h4>{item.title}</h4>
              <p style={{ fontSize: "0.95rem", color: "#555" }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

     {/* Nuestro equipo directivo */}
<section style={{ marginBottom: "60px" }}>
  <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Nuestro equipo directivo</h3>
  <div style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  }}>
    {directivos.map((item, index) => (
      <div key={index} style={{
        width: "220px",
        textAlign: "center",
        background: "#fff",
        padding: "15px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <img
          src={item.img}
          alt={item.nombre}
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "top", // ✅ Enfoca hacia arriba
            marginBottom: "10px",
            border: "3px solid #00B0B0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
          }}
        />
        <h4 style={{ marginBottom: "5px" }}>{item.nombre}</h4>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>{item.cargo}</p>
      </div>
    ))}
  </div>
</section>

{/* Nuestro equipo de médicos */}
<section style={{ marginBottom: "60px" }}>
  <h3 style={{ textAlign: "center", marginBottom: "30px" }}>Nuestro equipo de médicos</h3>
  <div style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  }}>
    {doctores.map((doc, index) => (
      <div key={index} style={{
        width: "220px",
        textAlign: "center",
        background: "#fff",
        padding: "15px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <img
          src={doc.img}
          alt={doc.nombre}
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "top", // ✅ Corregido para que se vea la cara
            marginBottom: "10px",
            border: "3px solid #00B0B0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
          }}
        />
        <h4 style={{ marginBottom: "5px" }}>{doc.nombre}</h4>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>{doc.especialidad}</p>
      </div>
    ))}
  </div>
</section>

{/* Acordeón informativo */}
<section>
  <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Saber más sobre la Clínica</h3>
  {[
    {
      id: 1,
      title: "Derechos y deberes del paciente",
      content: `En nuestra clínica, reconocemos que todo paciente tiene derechos fundamentales que deben ser respetados y promovidos durante su atención médica. Estos derechos incluyen el acceso a una atención segura, oportuna, ética y basada en la evidencia científica. Cada paciente tiene derecho a recibir información clara y suficiente sobre su diagnóstico, opciones terapéuticas, riesgos y beneficios, así como a decidir de forma libre e informada sobre los procedimientos que le serán practicados.

De igual forma, los deberes del paciente son fundamentales para el desarrollo de una relación respetuosa y efectiva con el personal de salud. Se espera que el paciente proporcione información veraz y completa sobre su estado de salud, siga las indicaciones médicas, y trate con respeto a los profesionales de la clínica y a los demás usuarios. La colaboración activa del paciente es esencial para el éxito del tratamiento y el bienestar general.`
    },
    {
      id: 2,
      title: "Código ético",
      content: `El código ético de nuestra institución está basado en principios de integridad, respeto, confidencialidad y profesionalismo. Cada miembro del equipo de salud está comprometido con el trato humano y digno de los pacientes, garantizando que sus acciones estén regidas por la responsabilidad moral y el bienestar del ser humano.

Este código establece pautas para la conducta diaria del personal, promoviendo la transparencia, la equidad y el respeto a los derechos individuales. Asimismo, se orienta a prevenir conflictos de interés y asegurar la confidencialidad de la información clínica, reforzando la confianza entre el paciente y los profesionales que lo atienden.`
    },
    {
      id: 3,
      title: "Misión y Visión",
      content: `Misión: Brindar servicios de salud con altos estándares de calidad, basados en la ética, la seguridad del paciente y la atención centrada en la persona. Nos comprometemos a ofrecer una atención integral, oportuna y humanizada, con el objetivo de mejorar la calidad de vida de nuestros pacientes y sus familias.

Visión: Ser una clínica líder en el sector salud, reconocida por su excelencia en la atención médica, la innovación tecnológica y el desarrollo continuo del talento humano. Aspiramos a consolidarnos como referente regional en el cuidado integral del paciente, promoviendo una cultura de mejora continua y responsabilidad social.`
    },
    {
      id: 4,
      title: "Valores",
      content: `Nuestros valores institucionales representan el fundamento que guía cada una de nuestras acciones:

• Respeto: Tratamos a cada persona con dignidad, sin discriminación, reconociendo su autonomía y decisiones.

• Compromiso: Asumimos con responsabilidad nuestro rol en la salud y el bienestar de los pacientes.

• Calidez humana: Ofrecemos una atención cercana, empática y humanizada en cada interacción.

• Ética: Actuamos con transparencia, honestidad y profesionalismo en todos los niveles de atención.

• Excelencia: Buscamos la mejora continua en nuestros servicios, priorizando la calidad y la seguridad del paciente.

• Trabajo en equipo: Fomentamos la colaboración y comunicación entre los distintos profesionales para lograr una atención integral y eficiente.`
    },
  ].map((item) => (
    <div key={item.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
      <h4
        onClick={() => toggleSection(item.id)}
        style={{
          cursor: "pointer",
          color: "#007777",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {item.title}
        <span>{openSection === item.id ? "▲" : "▼"}</span>
      </h4>
      {openSection === item.id && (
        <p style={{
          marginTop: "10px",
          fontSize: "0.95rem",
          color: "#555",
          lineHeight: "1.7",
          whiteSpace: "pre-line"
        }}>
          {item.content}
        </p>
      )}
    </div>
  ))}
</section>

    </div>
  );
};

export default About;
