import React, { useState, useEffect } from "react";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg"; // reemplaza si tienes image3
import image4 from "../assets/images/image4.webp";

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [image1, image2, image3, image4];

  const banners = [
    {
      title: "Salas de Parto y Recuperación (TPR)",
      subtitle: "Comodidad, tecnología y atención especializada",
      description:
        "Nuestras salas TPR están diseñadas para ofrecerte un ambiente seguro y confortable durante el trabajo de parto y la recuperación, con personal capacitado y atención personalizada las 24 horas.",
    },
    {
      title: "Especialistas a tu Servicio",
      subtitle: "Experiencia y compromiso en cada consulta",
      description:
        "Contamos con un equipo médico multidisciplinario listo para atender tus necesidades con enfoque humano y profesional.",
    },
    {
      title: "Cuidado Integral para Toda la Familia",
      subtitle: "Prevención, diagnóstico y tratamiento",
      description:
        "Brindamos servicios integrales que abarcan desde chequeos preventivos hasta tratamientos especializados, adaptados a cada etapa de la vida.",
    },
    {
      title: "Infraestructura Moderna y Segura",
      subtitle: "Tecnología de punta al servicio de tu salud",
      description:
        "Nuestra clínica cuenta con instalaciones de última generación que garantizan comodidad, eficiencia y altos estándares de seguridad para todos.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Alternar posición del texto: izquierda en pares, derecha en impares
  const isEven = currentIndex % 2 === 0;
  const textPositionStyle = {
    left: isEven ? "5%" : "auto",
    right: isEven ? "auto" : "5%",
    textAlign: isEven ? "left" : "right",
    alignItems: isEven ? "flex-start" : "flex-end",
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        overflow: "hidden",
        borderRadius: "10px",
      }}
    >
      <img
        src={images[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
          transition: "opacity 1.5s ease-in-out",
        }}
      />

      {/* Texto dinámico: alterna izquierda/derecha */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          ...textPositionStyle,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          color: "#004d4d",
          padding: "25px 35px",
          borderRadius: "12px",
          width: "35%",
          maxWidth: "500px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2 style={{ marginBottom: "10px", fontSize: "1.7rem", fontWeight: "bold" }}>
          {banners[currentIndex].title}
        </h2>
        <h4 style={{ marginBottom: "12px", fontWeight: "600", color: "#007777" }}>
          {banners[currentIndex].subtitle}
        </h4>
        <p style={{ fontSize: "1rem", color: "#333", lineHeight: "1.6" }}>
          {banners[currentIndex].description}
        </p>
      </div>

      {/* Botones */}
      <button
        onClick={() =>
          setCurrentIndex((currentIndex - 1 + images.length) % images.length)
        }
        style={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "1.5rem",
          zIndex: 10,
        }}
      >
        &#10094;
      </button>
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "1.5rem",
          zIndex: 10,
        }}
      >
        &#10095;
      </button>
    </div>
  );
};

export default HeroCarousel;
