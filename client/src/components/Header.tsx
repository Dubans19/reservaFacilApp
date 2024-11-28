import "../styles/Header.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

// Define la interfaz para el usuario interno
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

const Header = () => {
  // Usa useSelector para obtener solo el estado `user` directamente
  const user = useSelector((state: RootState) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <h1>ReservaFacil</h1>
        </Link>
      </div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Lista de propiedades</a></li>
        <li><a href="#">Páginas</a></li>
        <li><a href="#">Blog</a></li>
      </ul>
      <div className="nav-buttons">
        {user === null ? (
          <Link to="/iniciar-sesion">
            <button className="login-btn">Iniciar sesión</button>
          </Link>
        ) : (
          <>
            <p>Hola, {user.nombre} {user.apellido}</p>
            <img
              src={`${import.meta.env.VITE_API_RESERVA_FACIL_PROD}/${user.imagen_perfil}`}
              alt="Perfil"
              className="profile-img"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <Link to="/dashboard">
              <button className="add-listing-btn">Dashboard</button>
            </Link>
          </>
        )}
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Header;
