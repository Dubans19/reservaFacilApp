import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/LOcationPropiedades.scss';



interface Propertys {
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
    municipio: string;
    habitaciones: string;
    negocio: string;
}

const LocationPropiedades: React.FC = () => {
    const [data, setData] = useState<Propertys[]>([])

    const { municipio } = useParams<{ municipio: string }>();
    const TraerDataPropiedad = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_RESERVA_FACIL_PROD}/propiedades/municipio/${municipio}`);
            const respuesta = await response.json();
            console.log("respuesta municipio es", respuesta.data);
            setData(respuesta.data);
        } catch (error) {
            console.error("Error al traer los datos de la propiedad:", error);
        }
    };

    useEffect(() => {
        TraerDataPropiedad();
    }, [municipio]);

    const primerasImagenes = data.map(propiedad =>
        propiedad.imagenes_propiedad?.[0] || 'Sin imagen disponible'
    );
    console.log("todas las imagenes", primerasImagenes)

    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        minPrice: 0,
        maxPrice: 50000,
    });

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 12;

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredProperties = data.filter((property) => {
        const keywordMatch = filters.keyword
            ? property.nombre.toLowerCase().includes(filters.keyword.toLowerCase())
            : true;
        const locationMatch = filters.location
            ? property.municipio.toLowerCase() === filters.location.toLowerCase()
            : true;
        const priceMatch =
            parseInt(property.precio.replace('$', '')) >= filters.minPrice &&
            parseInt(property.precio.replace('$', '')) <= filters.maxPrice;

        return keywordMatch && locationMatch && priceMatch;
    });

    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

    const displayedProperties = filteredProperties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="location-propiedades">
            <aside className="filters">
                <h3>Filter Properties</h3>
                <div className="filter-group">
                    <label htmlFor="keyword">Keyword</label>
                    <input
                        type="text"
                        id="keyword"
                        name="keyword"
                        value={filters.keyword}
                        onChange={handleFilterChange}
                        placeholder="e.g., villa, apartment"
                    />
                </div>
                <div className="filter-group">
                    <label htmlFor="location">Location</label>
                    <select
                        id="location"
                        name="location"
                        value={filters.location}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Locations</option>
                        <option value="Medellín">Medellín</option>
                        <option value="Other City">Other City</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Price Range</label>
                    <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        placeholder="Min"
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="Max"
                    />
                </div>
            </aside>

            <main className="properties-section">
                {filteredProperties.length === 0 ? (
                    <p className="no-results">No se encontraron resultados</p>
                ) : (
                    <>
                        <div className="properties-grid">
                            {displayedProperties.map((property) => (
                                <Link
                                    to={`propiedad-detalle/${property.id_propiedad}`}
                                    style={{ textDecoration: 'none' }} // Asegura que no haya subrayados
                                >
                                    <div key={property.id_propiedad} className="property-card">
                                        <img src={`${import.meta.env.VITE_API_RESERVA_FACIL_PROD}${property.imagenes_propiedad?.[0]}`} alt="Main" className="main-image" />

                                        <h4>{property.nombre}</h4>
                                        <p>{property.municipio}</p>
                                        <p>{property.negocio}</p>
                                        <p>$ {property.precio}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default LocationPropiedades;
