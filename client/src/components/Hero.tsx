import '../styles/Hero.scss';
// import SearchBar from "./SearchBar";
import BuildingsSVG  from "../assets/ils_08.svg"
// import Header from "./Header";
// import LocationCarousel from "./Carousel";

const Hero = () => {
    return (
        <section className="hero">
          <div className="hero-content">
            <h1>Encuentra la casa ideal para reservar con tu <span className="underline">familia</span></h1>
            <p>Reserva todo tipo de propiedades</p>
            <div className="search-form">
              <select>
                <option>Reservar casas</option>
                <option>Rent Apartments</option>
              </select>
              <input type="text" placeholder="Medellin, Colombia" />
              <select>
                <option>$10,000 - $200,000</option>
                <option>$200,000 - $500,000</option>
              </select>
              <button className="search-btn">Buscar</button>
            </div>
          </div>
    
          <div className="hero-svg">
            <img src={BuildingsSVG} alt="Buildings and houses" />
          </div>
  
        </section>
      );
};

export default Hero;
