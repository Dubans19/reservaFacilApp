// CarouselComponent.jsx
import { useEffect, useState } from 'react';
import '../styles/LOcationCarousel.scss';
import assets from '../assets/medellin.jpg';
import envigado from '../assets/envigado.jpg';
import sabaneta from '../assets/sabaneta.jpg';

import { Link } from 'react-router-dom';


const CarouselComponent = () => {
  const locations = [
    { 
        title: 'Medellín', 
        subtitle: 'Propiedades Medellín', 
        imageUrl: assets, 
        parametro:"medellin"
    },
    { 
        title: 'Envigado', 
        subtitle: 'Propiedades Envigado', 
        imageUrl: envigado,
        parametro:"envigado"

    },
    { 
        title: 'Sabaneta', 
        subtitle: 'Propiedades Sabaneta', 
        imageUrl:sabaneta,
        parametro:"sabaneta"
 
    },
  
];


  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % locations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + locations.length) % locations.length);
  };

  const visibleCards = 4;

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Explorar Locaciones</h2>
      <p className="carousel-subtitle">Explore las listas</p>
      <div className="carousel-wrapper">
        <button className="carousel-btn prev-btn" onClick={handlePrev}>❮</button>
        <div
          className="carousel-content"
          style={{
            transform: `translateX(-${(100 / visibleCards) * currentIndex}%)`,
            width: `${(100 / visibleCards) * locations.length}%`,
          }}
        >
          {locations.map((location, index) => (
            <Link to={`/location/${location.parametro}`}>
            <div key={index} className="card">
              <img src={location.imageUrl} alt={location.title} />
              <div className="card-info">
                <div className="card-title">{location.title}</div>
                <div className="card-subtitle">{location.subtitle}</div>
              </div>
            </div>
            </Link>
          ))}
        </div>
        <button className="carousel-btn next-btn" onClick={handleNext}>❯</button>
      </div>
    </div>
  );
};

export default CarouselComponent;
