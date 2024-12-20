import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/PropiedadDetalle.scss";
import WhatsappButton from "../components/WhatsappButton";

const PropertyDetail: React.FC = () => {
  const [data, setData] = useState<any | null>(null); // Cambiar el estado inicial a `null`
  const [mainImage, setMainImage] = useState<string>(""); // Estado inicial para `mainImage`

  const { id } = useParams<{ id: string }>();
  console.log("El id es", id);

  const TraerDataPropiedad = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_RESERVA_FACIL_PROD}/propiedades/${id}`);
      const respuesta = await response.json();
      console.log("respuesta es", respuesta.data);
      setData(respuesta.data);
      setMainImage(respuesta.data.imagenes_propiedad[0]); // Establecer la imagen principal después de cargar los datos
    } catch (error) {
      console.error("Error al traer los datos de la propiedad:", error);
    }
  };

  useEffect(() => {
    TraerDataPropiedad();
  }, [id]); // Agregar `id` como dependencia

  if (!data) {
    return <div>Propiedad no encontrada</div>;
  }

  return (
    <div className="property-detail">
      <div className="property-header">
        <h1>{data.nombre}</h1>
        <span className="price">Precio: ${data.precio.toLocaleString()}</span>
      </div>

      <div className="image-section">
        {mainImage && <img src={`${import.meta.env.VITE_API_RESERVA_FACIL_PROD}/${mainImage}`} alt="Main" className="main-image" />}
        <div className="gallery">
          {data.imagenes_propiedad?.map((img: string, index: number) => (
            <img
              key={index}
              src={`${import.meta.env.VITE_API_RESERVA_FACIL_PROD}/${img}`}
              alt={`Gallery ${index}`}
              onClick={() => setMainImage(img)}
              className={img === mainImage ? "highlighted" : ""}
            />
          ))}
        </div>
      </div>


      <div className="property-overview">
        
        <h2>Resumen de la Propiedad</h2>
        <div className="overview-grid">
          <p>Habitaciones: {data.habitaciones}</p>
          <p>Baños: {data.banos}</p>
          <p>Tipo: {data.categoria}</p>
        </div>
      </div>
      <div className="property-overview">
        
        <h2>Descripción</h2>
        <div className="overview-grid">
          <p> {data.descripcion}</p>
        </div>
      </div>

      <div className="agent-section">
        <h3>Contactar al Agente</h3>
        <div className="agent-info">        
          <p>Teléfono / WhatsApp: {data.contacto_propietario}</p>
          <WhatsappButton contacto={data.contacto_propietario}/>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
