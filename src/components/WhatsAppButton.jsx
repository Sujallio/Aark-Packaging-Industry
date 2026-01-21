import { MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "917058017626";

const WhatsAppButton = () => {
  const { getTotalItems } = useCart();
  const hasCartItems = getTotalItems() > 0;
  
  const message = encodeURIComponent(
    "Hello AARK Packaging Industries, I would like to enquire about your products."
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed right-6 z-40 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-fade-in ${
        hasCartItems ? "bottom-24 md:bottom-20" : "bottom-6"
      }`}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
