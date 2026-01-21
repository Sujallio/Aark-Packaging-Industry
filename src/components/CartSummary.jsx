import { ShoppingBag, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "917058017626"; // AARK's phone number

const CartSummary = () => {
  const { items, removeItem, updateQuantity, getTotalItems, generateWhatsAppLink, clearCart } = useCart();
  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  const whatsappLink = generateWhatsAppLink(WHATSAPP_NUMBER);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevated z-50 animate-fade-in-up">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span className="font-semibold">{totalItems} items selected</span>
            </div>
            
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              {items.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-full text-xs"
                >
                  <span className="truncate max-w-[100px]">{item.title}</span>
                  <span className="text-primary font-medium">×{item.quantity}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {items.length > 3 && (
                <span className="text-xs text-muted-foreground">+{items.length - 3} more</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" size="sm" onClick={clearCart}>
              Clear All
            </Button>
            <Button asChild className="flex-1 md:flex-none bg-green-600 hover:bg-green-700">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Continue on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
