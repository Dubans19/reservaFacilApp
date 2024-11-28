import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "../styles/Footer.scss";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-section contact-info">
        <div className="logo">
          <div className="logo-circle">R</div>
          <span>ReservaFacil</span>
        </div>
        <address>
            Colombia, medellin, Antioquia
        </address>
        <p>CONTACTO</p>
        <a href="mailto:homyreal@demo.com" className="email">
       reservafacilapp@gmail.com
        </a>
        <div className="social-icons">
          <a href="#" className="icon" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" className="icon" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" className="icon" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className="footer-section links">
        <h3>Links</h3>
        <ul>
          <Link to="/">Inicio</Link>
          {/* <li><a href="#">Membership</a></li>
          <li><a href="#">About Company</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Explore Careers</a></li>
          <li><a href="#">Pricing</a></li> */}
          
        </ul>
      </div>
      <div className="footer-section legal">
        <h3>Legal</h3>
        <ul>
          {/* <li><a href="#">Terms & conditions</a></li>
          <li><a href="#">Cookie</a></li>
          <li><a href="#">Privacy policy</a></li> */}
          <li><a href="#">FAQ's</a></li>
        </ul>
      </div>
      <div className="footer-section new-listing">
        <h3>Nuevas Propiedades</h3>
        <ul>
          <li><a href="#">Apartmentos</a></li>
          <li><a href="#">Casas</a></li>
          <li><a href="#">Fincas</a></li>


         
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
