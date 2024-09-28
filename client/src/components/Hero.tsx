import React from "react";
import '../styles/Hero.scss';
import SearchBar from "./SearchBar";
import BuildingsSVG  from "../assets/ils_08.svg"

const Hero = () => {
  return (
    <div className="hero">
      <h1>Encuentra la propiedad ideal para ti y tu <span>familia</span></h1>
      <p>We’ve more than 745,000 apartments, place & plot.</p>

      <SearchBar />
      <img src={BuildingsSVG} alt="buildings" className="buildings-svg" />

    </div>
  );
};

export default Hero;
