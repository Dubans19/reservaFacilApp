// import LocationCarousel from "../components/Carousel"
import { useLocation } from "react-router-dom";
import CarouselComponent from "../components/Carousel"
// import Carousel from "../components/Carousel"
// import Header from "../components/Header"
import Hero from "../components/Hero"
import NewListings from "../components/NewListings"


const HomePage = () => {
  const location = useLocation();

  console.log("location", location)
  return (
    <div>
      <Hero/>
      <CarouselComponent/>
      <NewListings/>
   
    </div>
  )
}

export default HomePage