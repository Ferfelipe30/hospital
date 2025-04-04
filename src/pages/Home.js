import React from 'react';
import ServicesGrid from '../components/ServicesGrid';
import HeroCarousel from '../components/HeroCarousel';

const Home = () => {
  return (
    <main>
      <HeroCarousel />
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Nuestros Servicios Destacados</h2>
      </section>
      <ServicesGrid />
    </main>
  );
};

export default Home;
