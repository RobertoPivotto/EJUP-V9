import React, { useEffect } from 'react';
import { X, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, type CartItem as CartItemType } from '@/lib/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { items, isCartOpen, closeCart, removeItem, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  
  // Adicionar/remover classe no body quando o carrinho estiver aberto
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('cart-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('cart-open');
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.classList.remove('cart-open');
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);
  
  const handleCheckout = () => {
    closeCart(); // Fechar o carrinho
    navigate('/checkout'); // Redirecionar para a página de checkout
  };

  const handleGoToCourses = () => {
    closeCart(); // Fechar o carrinho
    navigate('/courses'); // Redirecionar para a página de cursos
  };

  // Função para obter o texto apropriado baseado nos tipos de itens
  const getCartTypeText = () => {
    const hasEvents = items.some(item => item.type === 'event');
    const hasCourses = items.some(item => !item.type || item.type === 'course');
    
    if (hasEvents && hasCourses) {
      return 'itens';
    } else if (hasEvents) {
      return totalItems === 1 ? 'evento' : 'eventos';
    } else {
      return totalItems === 1 ? 'curso' : 'cursos';
    }
  };

  return (
    <>
      {/* Overlay para dispositivos móveis com animação de fade */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />
      
      {/* Sidebar do carrinho com animação de deslize */}
      <aside 
        className={`fixed right-0 top-0 bottom-0 w-full max-w-xs md:max-w-sm bg-ejup-darkBg border-l border-zinc-800 shadow-xl z-50 transition-transform duration-300 ease-in-out transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-ejup-pink" />
              <h2 className="text-xl font-semibold">Seu Carrinho</h2>
              <span className="bg-ejup-pink/20 text-ejup-pink text-xs font-medium px-2.5 py-0.5 rounded-full">
                {totalItems} {getCartTypeText()}
              </span>
            </div>
            <button 
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Cart content */}
          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-10">
                <div className="mx-auto w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="h-8 w-8 text-zinc-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Carrinho vazio</h3>
                <p className="text-zinc-400 mb-6">Que tal explorar nossos cursos e encontrar o conhecimento que você precisa?</p>
                <Button 
                  onClick={handleGoToCourses}
                  className="bg-ejup-pink hover:bg-ejup-pink/90 text-white mb-3 w-full"
                >
                  Veja agora os melhores cursos
                </Button>
                <Button 
                  variant="outline"
                  onClick={closeCart}
                  className="border-zinc-600 text-zinc-400 hover:bg-zinc-800 w-full"
                >
                  Continuar navegando
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <CartItem 
                    key={`${item.type || 'course'}-${item.id}`} 
                    item={item} 
                    onRemove={() => removeItem(item.id, item.type)} 
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Footer with summary and checkout button */}
          {items.length > 0 && (
            <div className="p-4 border-t border-zinc-800 bg-zinc-900">
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>Subtotal</span>
                  <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                
                <Button 
                  className="w-full bg-ejup-pink hover:bg-ejup-pink/90 text-white py-6 mt-4"
                  onClick={handleCheckout}
                >
                  <span>Finalizar Compra</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2 border-zinc-600 text-zinc-400 hover:bg-zinc-800"
                  onClick={closeCart}
                >
                  Continuar comprando
                </Button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

// Componente para item do carrinho
const CartItem: React.FC<{ 
  item: CartItemType; 
  onRemove: () => void;
}> = ({ item, onRemove }) => {
  const isEvent = item.type === 'event';
  const linkPath = isEvent ? `/events/${item.id}` : `/courses/${item.id}`;
  const typeText = isEvent ? 'Evento' : 'Curso';
  
  return (
    <div className="flex border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900">
      {item.image && (
        <div className="w-24 h-24 shrink-0 relative bg-zinc-800">
          <img 
            src={item.image} 
            alt={item.title} 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Badge indicando o tipo */}
          <div className="absolute top-1 left-1">
            <span className={`text-xs px-1.5 py-0.5 rounded text-white font-medium ${
              isEvent ? 'bg-ejup-orange/80' : 'bg-ejup-cyan/80'
            }`}>
              {typeText}
            </span>
          </div>
        </div>
      )}
      
      <div className="flex-grow p-3 flex flex-col justify-between min-w-0">
        <div className="flex justify-between items-start gap-2">
          <Link 
            to={linkPath} 
            className="font-medium line-clamp-2 text-sm hover:text-ejup-pink transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {item.title}
          </Link>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="text-zinc-500 hover:text-red-500 p-1 transition-colors ml-auto flex-shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs text-zinc-500 capitalize">{typeText}</span>
          <span className="font-semibold text-ejup-pink">
            R$ {item.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer; 