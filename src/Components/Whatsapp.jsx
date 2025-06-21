import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFloat = () => {
  const phoneNumber = '+2347031920023';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer" 
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsAppFloat;