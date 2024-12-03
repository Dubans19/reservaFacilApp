import { FaWhatsapp } from 'react-icons/fa';  // Importa el ícono de WhatsApp de react-icons
import '../styles/WhatsappButton.scss';  // Asegúrate de tener un archivo CSS para la personalización
import { useSelector } from 'react-redux';

const WhatsappButton = ({contacto}:{contacto:string}) => {
  const whatsappNumber =`+57${contacto}`;  // Cambia este número por tu número de WhatsApp
  const message = "¡Hola! Quiero más información."; // El mensaje que aparecerá predefinido

  // Enlace para redirigir a WhatsApp
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
      <FaWhatsapp size={60} />
    </a>
  );
};

export default WhatsappButton;
