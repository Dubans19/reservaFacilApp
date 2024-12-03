import  { useEffect, useState } from "react";
import "../styles/PropiedadesUsuarios.scss";
import { useParams } from "react-router-dom";

const UserProperties = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Galaxy Flat",
      location: "Mirpur 10, dhaka, BD",
      price: "$32800",
      date: "13 Jan, 2023",
      views: 1210,
      status: "Active",
      image: "https://placehold.co/100x100?text=Galaxy+Flat",
    },
    {
      id: 2,
      title: "White House villa",
      location: "Ranchview, California, USA",
      price: "$42130",
      date: "09 Jan, 2023",
      views: 0,
      status: "Pending",
      image: "https://placehold.co/100x100?text=White+House",
    },
    {
      id: 3,
      title: "Luxury villa in Dal lake",
      location: "Muza link road, ca, usa",
      price: "$2370",
      date: "17 Oct, 2022",
      views: 0,
      status: "Processing",
      image: "https://placehold.co/100x100?text=Luxury+Villa",
    },
  ]);


  const [data, setData] = useState<any | null>([]); // Cambiar el estado inicial a `null`
//   const [mainImage, setMainImage] = useState<string>(""); // Estado inicial para `mainImage`

  const { id } = useParams<{ id: string }>();
  console.log("El id es", id);

  const TraerDataPropiedad = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_RESERVA_FACIL_PROD}/mis-propiedades/${id}`);
      const respuesta = await response.json();
      console.log("respuesta es", respuesta.data);
      setData(respuesta.data);
    //   setMainImage(respuesta.data.imagenes_propiedad[0]); // Establecer la imagen principal después de cargar los datos
    } catch (error) {
      console.error("Error al traer los datos de la propiedad:", error);
    }
  };


  useEffect(()=>{
TraerDataPropiedad()
  },[])

  console.log("data es",data)

  const handleEdit = (id:any) => {
    alert(`Edit property with ID: ${id}`);
  };

  const handleDelete = (id:any) => {
    const updatedProperties = properties.filter((property) => property.id !== id);
    setProperties(updatedProperties);
  };

  if (properties.length === 0) {
    return <p className="no-results">No properties found.</p>;
  }

  return (
    <div className="user-properties">
      <table className="properties-table">
        <thead>
          <tr>
            <th>TITLE</th>
            {/* <th>DATE</th>
            <th>VIEW</th> */}
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {data.map((property:any) => (
            <tr key={property.id}>
              <td>
                <div className="property-details">
                  <img src={`${import.meta.env.VITE_API_RESERVA_FACIL_PROD}${property.imagenes_propiedad?.[0]}`} alt={`Image of ${property.nombre}`} />
                  <div>
                    <h3 className="property-title">{property.nombre}</h3>
                    <p className="property-location">{property.municipio}</p>
                    <p className="property-price">{property.precio}</p>
                  </div>
                </div>
              </td>
              {/* <td>{property.fecha_creacion}</td> */}
              {/* <td>{property.views}</td> */}
              <td>
                <span>
                 Activa
                </span>
              </td>
              <td>
                <div className="actions">
                  <button onClick={() => handleEdit(property.id)}>Edit</button>
                  <button onClick={() => handleDelete(property.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProperties;
