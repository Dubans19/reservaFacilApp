// import React, { useState } from 'react';
// import { FaUpload } from 'react-icons/fa';
import '../styles/Dasboard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate } from 'react-router-dom';
import { setLogout } from '../redux/state';
import { AnadirPropiedad } from './AnadirPropiedad';
import UserProperties from './PropiedadesUsuario';

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
  console.log("users dashboard ", users)


  // const user = useSelector((state) => state);
  let usuario_propietario = users ? users.id_usuario : '';
  console.log("user en dashboard es", usuario_propietario);
  const navigate = useNavigate(); // Hook para redirigir
  const dispatch = useDispatch();



  // const [imagenes, setImagenes] = useState<File[]>([]);
  // const [nombre, setNombre] = useState('');
  // const [descripcion, setDescripcion] = useState('');
  // const [categoria, setCategoria] = useState('');
  // const [negocio, setNegocio] = useState('');
  // const [precio, setPrecio] = useState('');
  // const [area, setArea] = useState('');
  // const [banos, setBanos] = useState('');
  // const [habitaciones, setHabitaciones] = useState('');
  // const [garajes, setGarajes] = useState('');
  // const [pisos, setPisos] = useState('');
  // const [direccion, setDireccion] = useState('');
  // const [municipio, setMunicipio] = useState('');

  // const [mapa, setMapa] = useState('');
  // // const [mensaje, setMensaje] = useState('');

  // const camposObligatorios = [
  //   nombre,
  //   categoria,
  //   negocio,
  //   precio,
  //   area,
  //   banos,
  //   habitaciones,
  //   garajes,
  //   direccion,
  //   municipio,
  //   mapa,
  // ];

  // const botonHabilitado =
  //   camposObligatorios.every((campo) => campo.trim() !== '') && imagenes.length > 0;

  // const manejarCambioArchivo = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const archivosSeleccionados = Array.from(event.target.files);
  //     if (imagenes.length + archivosSeleccionados.length <= 10) {
  //       setImagenes((prevImagenes) => [...prevImagenes, ...archivosSeleccionados]);
  //     } else {
  //       toast.error('Puedes subir un máximo de 10 imágenes.');
  //     }
  //   }
  // };

  // const eliminarImagen = (index: number) => {
  //   setImagenes((prevImagenes) => prevImagenes.filter((_, i) => i !== index));
  // };

  // const enviarFormulario = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   if (!botonHabilitado) {
  //     toast.error('Por favor completa todos los campos obligatorios y sube al menos una imagen.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('id_propietario', usuario_propietario);
  //   formData.append('nombre', nombre);
  //   formData.append('descripcion', descripcion);
  //   formData.append('categoria', categoria);
  //   formData.append('negocio', negocio);
  //   formData.append('precio', precio);
  //   formData.append('area', area);
  //   formData.append('banos', banos);
  //   formData.append('habitaciones', habitaciones);
  //   formData.append('garages', garajes);
  //   formData.append('pisos', pisos);
  //   formData.append('direccion', direccion);
  //   formData.append('municipio', municipio);
  //   formData.append('map_location', mapa);
  //   imagenes.forEach((imagen) => {
  //     formData.append(`imagenes`, imagen);
  //   });

  //   try {
  //     const respuesta = await fetch(`${import.meta.env.VITE_API_RESERVA_FACIL_PROD}/crear-propiedad`, {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (respuesta.ok) {
  //       toast.success('Propiedad creada exitosamente');
  //       limpiarFormulario();
  //     } else {
  //       toast.error('Error al crear la propiedad');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Error de conexión con el servidor');
  //   }
  // };

  // const limpiarFormulario = () => {
  //   setNombre('');
  //   setDescripcion('');
  //   setCategoria('');
  //   setNegocio('');
  //   setPrecio('');
  //   setArea('');
  //   setBanos('');
  //   setHabitaciones('');
  //   setGarajes('');
  //   setPisos('');
  //   setMunicipio('');
  //   setDireccion('');
  //   setMapa('');
  //   setImagenes([]);
  // };

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
            {/* <li>Panel Principal</li> */}
            <Link to="/dashboard" >  <li style={{ backgroundColor: location.pathname === "/dashboard" ? "#FF6633" : "" }}>Añadir Propiedad</li></Link>
            <Link to={`/dashboard/mis-propiedades/${usuario_propietario}`}>  <li style={{ backgroundColor: location.pathname.startsWith("/dashboard/mis-propiedades") ? "#FF6633" : "" }}>Mis propiedades</li></Link>

            {/* <li>Favoritos</li>
            <li>Reseñas</li> */}
            <button onClick={cerrarSesion} style={{ backgroundColor: "orange", padding: "9px", color: "white", border: "none", cursor: "pointer" }}>Cerrar Sesión</button>
          </ul>
        </nav>
      </aside>

      <main className="contenido">
        {location.pathname === "/dashboard" ? <AnadirPropiedad /> : <UserProperties />}

      </main>
      <ToastContainer />
    </div>
  );
};

export default Dashboards;
