import "../styles/Header.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";

const Header = () => {
  const user = useSelector((state) => state);
  console.log("user es", user); // Accediendo al estado del usuario
  return (
    <header className="header">
      <div className="logo">
        <h1>ReservaFacilApp</h1>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Listing</a>
          </li>
          <li>
            <a href="/">Pages</a>
          </li>
          <li>
            <a href="/">Blog</a>
          </li>
        </ul>
      </nav>
      <div className="header-buttons">
        {user.user == null ? (
          <Link to="/iniciar-sesion">
            <button className="login-btn">Iniciar Sesion</button>
          </Link>
        ) : (
          <p>Bienvenido {user.user.email} </p>
        )}

        {user.user == null ? null : (
          <button className="add-listing-btn">Add Listing</button>
        )}
      </div>
    </header>
  );
};

export default Header;
