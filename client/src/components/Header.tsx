import "../styles/Header.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
// import { RootState } from "../redux/store";

const Header = () => {
  const user = useSelector((state) => state);
  console.log("user es", user); // Accediendo al estado del usuario
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
       <Link to="/"><h1>ReservaFacil</h1></Link> 
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Lista de propiedades</a></li>
        <li><a href="#">Paginas</a></li>
        <li><a href="#">Blog</a></li>
      </ul>
      <div className="nav-buttons">
        {user.user==null ?        <Link to="/iniciar-sesion"><button className="login-btn">Iniciar sesión</button></Link>: <p>{user.user.nombre}</p>}
        {user.user==null ?               null
: <button className="add-listing-btn">Dashboard</button>}

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
