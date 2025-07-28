import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipo para um item do carrinho
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image?: string;
  type?: 'course' | 'event'; // Novo campo para identificar o tipo do item
}

// Interface do contexto do carrinho
interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number, type?: 'course' | 'event') => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// Criando o contexto com valor padrão
const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
  totalItems: 0,
  totalPrice: 0
});

// Hook personalizado para usar o contexto do carrinho
export const useCart = () => useContext(CartContext);

// Props para o provider
interface CartProviderProps {
  children: ReactNode;
}

// Provider do contexto
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Carregar itens do localStorage quando o componente montar
  const getInitialItems = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    
    const savedItems = localStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [];
  };

  // Estado para itens do carrinho
  const [items, setItems] = useState<CartItem[]>(getInitialItems);
  // Estado para controlar se o carrinho está aberto ou fechado
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Estados calculados
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Atualizar totais quando items mudar
  useEffect(() => {
    setTotalItems(items.length);
    setTotalPrice(items.reduce((sum, item) => sum + item.price, 0));
    
    // Comentado: não fechar o carrinho automaticamente quando vazio
    // para permitir que o usuário veja a mensagem de carrinho vazio
    // if (items.length === 0 && isCartOpen) {
    //   setIsCartOpen(false);
    // }
    
    // Salvar itens no localStorage sempre que eles mudarem
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items, isCartOpen]);

  // Adicionar item ao carrinho
  const addItem = (newItem: CartItem) => {
    // Verificar se o item já existe no carrinho (considerando tipo e id)
    const exists = items.some(item => 
      item.id === newItem.id && 
      (item.type || 'course') === (newItem.type || 'course')
    );
    
    if (!exists) {
      // Se não especificado, assumir que é um curso para retrocompatibilidade
      const itemWithType = { ...newItem, type: newItem.type || 'course' as const };
      setItems([...items, itemWithType]);
    } else {
      // Opcional: mostrar mensagem de item já adicionado
      console.log('Item já está no carrinho');
    }
  };

  // Remover item do carrinho
  const removeItem = (id: number, type: 'course' | 'event' = 'course') => {
    setItems(items.filter(item => !(item.id === id && (item.type || 'course') === type)));
  };

  // Limpar carrinho
  const clearCart = () => {
    setItems([]);
  };

  // Abrir carrinho
  const openCart = () => {
    setIsCartOpen(true);
  };

  // Fechar carrinho
  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Alternar estado do carrinho
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Valor do contexto
  const value = {
    items,
    addItem,
    removeItem,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
    totalItems,
    totalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 