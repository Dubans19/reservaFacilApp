import { useEffect, useState } from 'react';
import '../styles/NewListings.scss';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa'; // Íconos

// Define la interfaz para la propiedad
interface Property {
  id_propiedad: string;
  precio: string;
  map_location: string;
  pisos: string;
  area: string;
  imagenes_propiedad: string[];
  nombre: string;
  descripcion: string;
  garages: string;
  fecha_creacion: {
    seconds: number;
    nanoseconds: number;
  };
  categoria: string;
  banos: string;
  id_propietario: string;
  direccion: string;
  municipio:string;
  habitaciones: string;
  negocio: string;
}

const NewListings = () => {
  const [data, setData] = useState<Property[]>([]); // Usa la interfaz Property

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_RESERVA_FACIL_PROD}/propiedades`);
      const result = await response.json();
      if (result && Array.isArray(result.data)) {
        setData(result.data);
      } else {
        console.error('Datos no encontrados en la respuesta:', result);
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Función para formatear números a COP
  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(Number(value));
  };

  return (
    <div className="new-listings-container">
      <h1 className="new-listings-title">
        Nuevas <span className="highlight">Propiedades</span>
      </h1>
      <p className="new-listings-subtitle">Explora las últimas propiedades</p>
      <div className="new-listings-cards">
        {data.map((property) => (
          <div key={property.id_propiedad} className="new-listings-card">
            <Link
              to={`propiedad-detalle/${property.id_propiedad}`}
              style={{ textDecoration: 'none' }} // Asegura que no haya subrayados
            >
              <span
                className={`status ${
                  property.negocio.toLowerCase() === 'alquiler' ? 'for-rent' : 'for-sale'
                }`}
              >
                {property.negocio.toLowerCase() === 'alquiler' ? 'Alquiler' : 'En Venta'}
              </span>
              {property.imagenes_propiedad && property.imagenes_propiedad.length > 0 ? (
                <img
                  src={`${import.meta.env.VITE_API_RESERVA_FACIL_PROD}${property.imagenes_propiedad[0]}`}
                  alt={property.nombre || 'Property Image'}
                  className="new-listings-image"
                />
              ) : (
                <div className="placeholder-image">Image not available</div>
              )}
              <div className="new-listings-info">
                <h2 className="property-title">{property.nombre}</h2>
                <p className="location">{property.municipio}</p>
                <div className="details">
                  <span>
                    <FaRulerCombined /> {property.area} M2
                  </span>
                  <span>
                    <FaBed /> {property.habitaciones}
                  </span>
                  <span>
                    <FaBath /> {property.banos}
                  </span>
                </div>
                <div className="price">
                  {formatCurrency(property.precio)}
                  {property.negocio.toLowerCase() === 'alquiler' && '/mes'}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewListings;
