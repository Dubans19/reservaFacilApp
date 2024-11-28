import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import '../styles/Dasboard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../redux/state';

interface UserInternal {
  apellido: string;
  email: string;
  fecha_registro: {
    seconds: number;
    nanoseconds: number;
  };
  id_usuario: string;
  imagen_perfil: string;
  nombre: string;
}

// Define la interfaz para el estado global
interface RootState {
 
    token: string;
    user: UserInternal | null;
 
}

const Dashboards: React.FC = () => {
  const users = useSelector((state: RootState) => state.user);
  console.log("users dashboard ",users)

  // const user = useSelector((state) => state);
  let usuario_propietario = users ? users.id_usuario : '';
  console.log("user en dashboard es", usuario_propietario);
  const navigate = useNavigate(); // Hook para redirigir
  const dispatch = useDispatch();



  const [imagenes, setImagenes] = useState<File[]>([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [negocio, setNegocio] = useState('');
  const [precio, setPrecio] = useState('');
  const [area, setArea] = useState('');
  const [banos, setBanos] = useState('');
  const [habitaciones, setHabitaciones] = useState('');
  const [garajes, setGarajes] = useState('');
  const [pisos, setPisos] = useState('');
  const [direccion, setDireccion] = useState('');
  const [mapa, setMapa] = useState('');
  // const [mensaje, setMensaje] = useState('');

  const camposObligatorios = [
    nombre,
    categoria,
    negocio,
    precio,
    area,
    banos,
    habitaciones,
    garajes,
    direccion,
    mapa,
  ];

  const botonHabilitado =
    camposObligatorios.every((campo) => campo.trim() !== '') && imagenes.length > 0;

  const manejarCambioArchivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const archivosSeleccionados = Array.from(event.target.files);
      if (imagenes.length + archivosSeleccionados.length <= 10) {
        setImagenes((prevImagenes) => [...prevImagenes, ...archivosSeleccionados]);
      } else {
        toast.error('Puedes subir un máximo de 10 imágenes.');
      }
    }
  };

  const eliminarImagen = (index: number) => {
    setImagenes((prevImagenes) => prevImagenes.filter((_, i) => i !== index));
  };

  const enviarFormulario = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!botonHabilitado) {
      toast.error('Por favor completa todos los campos obligatorios y sube al menos una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('id_propietario', usuario_propietario);
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('categoria', categoria);
    formData.append('negocio', negocio);
    formData.append('precio', precio);
    formData.append('area', area);
    formData.append('banos', banos);
    formData.append('habitaciones', habitaciones);
    formData.append('garages', garajes);
    formData.append('pisos', pisos);
    formData.append('direccion', direccion);
    formData.append('map_location', mapa);
    imagenes.forEach((imagen) => {
      formData.append(`imagenes`, imagen);
    });

    try {
      const respuesta = await fetch('http://localhost:3000/crear-propiedad', {
        method: 'POST',
        body: formData,
      });

      if (respuesta.ok) {
        toast.success('Propiedad creada exitosamente');
        limpiarFormulario();
      } else {
        toast.error('Error al crear la propiedad');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión con el servidor');
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setDescripcion('');
    setCategoria('');
    setNegocio('');
    setPrecio('');
    setArea('');
    setBanos('');
    setHabitaciones('');
    setGarajes('');
    setPisos('');
    setDireccion('');
    setMapa('');
    setImagenes([]);
  };

  const cerrarSesion = () => {
    console.log("Cerrar sesión");
  console.log("Token actual:", localStorage.getItem('token'));
  console.log("User actual:", localStorage.getItem('user'));

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(setLogout());


  console.log("Token después:", localStorage.getItem('token'));
  console.log("User después:", localStorage.getItem('user'));
    navigate('/iniciar-sesion', { replace: true }); // Redirige a iniciar sesión
  };

  return (
    <div className="dashboard">
      <aside className="barra-lateral">
        <nav>
          <ul>
            <li>Panel Principal</li>
            <li>Añadir Propiedad</li>
            <li>Favoritos</li>
            <li>Reseñas</li>
            <button onClick={cerrarSesion}>Cerrar Sesión</button>
          </ul>
        </nav>
      </aside>

      <main className="contenido">
        <h1>Añadir Nueva Propiedad</h1>
        <form onSubmit={enviarFormulario}>
          <section>
            <h3>Descripción General</h3>
            <div className="grupo-formulario">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Ejemplo: Casa San Ignacio"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="grupo-formulario">
              <label>Descripción</label>
              <textarea
                placeholder="Escribe sobre la propiedad..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <div className="grupo-formulario">
              <label>Categoría</label>
              <select onChange={(e) => setCategoria(e.target.value)} value={categoria}>
                <option value="">Selecciona una opción</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="finca">Finca</option>
              </select>
            </div>
            <div className="grupo-formulario">
              <label>Negocio</label>
              <select onChange={(e) => setNegocio(e.target.value)} value={negocio}>
                <option value="">Selecciona una opción</option>
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </div>
          </section>

          <section>
            <h3>Detalles de la Propiedad</h3>
            <div className="grupo-formulario">
              <label>Precio</label>
              <input
                type="number"
                placeholder="Ejemplo: 1500000"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>
            <div className="grupo-formulario">
              <label>Área (m²)</label>
              <input
                type="text"
                placeholder="Ejemplo: 2000"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
            <div className="grupo-formulario">
              <label>Baños</label>
              <input
                type="number"
                value={banos}
                onChange={(e) => setBanos(e.target.value)}
              />
            </div>
            <div className="grupo-formulario">
              <label>Habitaciones</label>
              <input
                type="number"
                value={habitaciones}
                onChange={(e) => setHabitaciones(e.target.value)}
              />
            </div>
            <div className="grupo-formulario">
              <label>Garajes</label>
              <input
                type="number"
                value={garajes}
                onChange={(e) => setGarajes(e.target.value)}
              />
            </div>
            <div className="grupo-formulario">
              <label>Pisos</label>
              <input
                type="number"
                value={pisos}
                onChange={(e) => setPisos(e.target.value)}
              />
            </div>
            <div className="grupo-formulario">
              <label>Dirección</label>
              <input
                type="text"
                placeholder="Ejemplo: Santa Elena"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
            <div className="grupo-formulario">
              <label>Ubicación en el mapa</label>
              <input
                type="text"
                placeholder="Ejemplo: Coordenadas"
                value={mapa}
                onChange={(e) => setMapa(e.target.value)}
              />
            </div>
          </section>

          <section>
            <h3>Subir Fotos y Videos</h3>
            <div className="seccion-subida">
              <label htmlFor="upload" className="boton-upload">
                <FaUpload /> Elegir archivos
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                multiple
                onChange={manejarCambioArchivo}
                style={{ display: 'none' }}
              />
              <p>Puedes subir hasta 10 imágenes.</p>
              <div className="vista-previa-imagenes">
                {imagenes.map((imagen, index) => (
                  <div key={index} className="contenedor-imagen">
                    <img src={URL.createObjectURL(imagen)} alt={`Vista previa ${index}`} />
                    <button type="button" onClick={() => eliminarImagen(index)}>Eliminar</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <button
            type="submit"
            className="boton-crear-propiedad"
          >
            Crear Propiedad
          </button>
        </form>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Dashboards;
