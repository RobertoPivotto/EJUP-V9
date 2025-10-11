import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  instructor: string;
  instructorRole: string;
  instructorInitials: string;
  instructors?: Array<{
    name: string;
    role: string;
    initials: string;
  }>;
  duration: string;
  modules: number;
  level: string;
  imageBg?: string;
  image?: string;
  promoted?: {
    by: string;
    logo?: string;
  };
  caap?: boolean;
  price?: number;
}

const CourseCard = ({
  id,
  title,
  description,
  instructor,
  instructorRole,
  instructorInitials,
  instructors,
  duration,
  modules,
  level,
  imageBg = 'bg-gradient-to-br from-ejup-orange/30 to-ejup-cyan/30',
  image,
  promoted,
  caap,
  price = 297,
}: CourseCardProps) => {
  const { addItem, items, openCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Verificar se o curso já está no carrinho
  const isInCart = items.some(item => item.id === id);

  const getAvatarUrl = (name: string) => {
    try {
      const encodedName = encodeURIComponent(name.trim());
      if (!encodedName) return '/placeholder.svg';
      return `https://ui-avatars.com/api/?name=${encodedName}&background=0D8ABC&color=fff&size=256`;
    } catch (error) {
      console.warn('Erro ao gerar URL do avatar:', error);
      return '/placeholder.svg';
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir navegação para a página do curso
    
    if (!isInCart) {
      addItem({
        id,
        title,
        price,
        image: image || getAvatarUrl(title)
      });
      
      // Mostrar animação de sucesso
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      
      // Abrir o carrinho automaticamente
      openCart();
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir navegação para a página do curso
    
    if (!isInCart) {
      addItem({
        id,
        title,
        price,
        image: image || getAvatarUrl(title)
      });
    }
    
    // Redirecionar diretamente para o checkout
    window.location.href = '/checkout';
  };

  return (
    <div className="relative w-full group h-full">
      {/* Efeito de brilho - atrás do card */}
      <div className="absolute -inset-0.5 bg-[#F2CA7E] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      
      <div className="relative bg-ejup-darkCard rounded-2xl border border-zinc-700/50 overflow-hidden h-full flex flex-col hover:scale-[1.02] transition-all duration-300">
        {/* Imagem do curso */}
        <Link to={`/courses/${id}`} className="block">
          <div className="relative h-32 md:h-48 overflow-hidden bg-zinc-800">
            {image ? (
              <>
                <img 
                  src={imageError ? '/placeholder.svg' : image} 
                  alt={title}
                  className="w-full h-full object-cover object-center"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-black/30"></div>
                {/* Fallback caso a imagem não carregue */}
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-800" style={{zIndex: -1}}>
                  <div className="w-12 h-12 rounded-full bg-ejup-cyan flex items-center justify-center text-lg font-medium text-black">
                    {instructorInitials}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full w-full bg-zinc-800 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-ejup-cyan flex items-center justify-center text-lg font-medium text-black">
                  {instructorInitials}
                </div>
              </div>
            )}
            
            {/* Preço do curso */}
            <div className="absolute bottom-3 right-3 bg-black/70 px-3 py-1 rounded-full">
              <span className="text-white font-semibold">R$ {price.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </Link>
        
        {/* Conteúdo do card */}
        <div className="p-4 flex flex-col flex-1">
          <Link to={`/courses/${id}`} className="block">
            {/* Título e descrição com altura fixa */}
            <div className="mb-3">
              <h3 className="text-xl font-semibold mb-2 line-clamp-2 h-14">{title}</h3>
              <p className="text-zinc-400 text-sm line-clamp-2 h-10">{description}</p>
            </div>
            
            {/* Informações do Instrutor com altura fixa */}
            <div className="mb-3">
              {instructors && instructors.length > 2 ? (
                // Múltiplos instrutores (mais de 2) - mostra apenas o primeiro + indicador
                <div className="flex items-center h-12">
                  <div className="w-10 h-10 rounded-full bg-ejup-cyan flex items-center justify-center text-sm font-medium text-black mr-3">
                    {instructors[0].initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-medium truncate">{instructors[0].name} <span className="text-zinc-400">+{instructors.length - 1}</span></div>
                    <div className="text-sm text-[#F2CA7E] truncate">{instructors[0].role}</div>
                  </div>
                </div>
              ) : instructors && instructors.length === 2 ? (
                // Exatamente 2 instrutores - mostra ambos
                <div className="space-y-1">
                  <div className="text-xs text-zinc-400 font-medium">Instrutores:</div>
                  <div className="flex items-center gap-2">
                    {instructors.map((inst, index) => (
                      <div key={index} className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-ejup-cyan flex items-center justify-center text-xs font-medium text-black">
                          {inst.initials}
                        </div>
                        <div className="text-xs">
                          <div className="font-medium text-white truncate max-w-16">{inst.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Instrutor único
                <div className="flex items-center h-12">
                  <div className="w-10 h-10 rounded-full bg-ejup-cyan flex items-center justify-center text-sm font-medium text-black mr-3">
                    {instructorInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-medium truncate">{instructor}</div>
                    <div className="text-sm text-[#F2CA7E] truncate">{instructorRole}</div>
                  </div>
                </div>
              )}
            </div>
            

          </Link>
          
          {/* Detalhes do curso - sempre na mesma posição */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-zinc-800 p-2 rounded-lg h-12 flex flex-col justify-center">
              <div className="text-xs text-zinc-500">Duração</div>
              <div className="text-xs font-medium">{duration}</div>
            </div>
            <div className="bg-zinc-800 p-2 rounded-lg h-12 flex flex-col justify-center">
              <div className="text-xs text-zinc-500">Módulos</div>
              <div className="text-xs font-medium">{modules} módulos</div>
            </div>
          </div>
          
          {/* Seção de preço e botões - sempre no final */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs text-zinc-500">Investimento</div>
                <div className="text-base font-bold text-white">R$ {price.toFixed(2).replace('.', ',')}</div>
              </div>
              <Button 
                variant="outline"
                size="sm"
                className={`relative ${
                  isInCart || showSuccess
                    ? 'bg-ejup-cyan hover:bg-ejup-cyan/90 text-black border-0' 
                    : 'bg-zinc-800 hover:bg-zinc-700 text-white border-0'
                }`}
                onClick={isInCart ? () => openCart() : handleAddToCart}
              >
                {isInCart ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    <span className="text-xs">No carrinho</span>
                  </>
                ) : showSuccess ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    <span className="text-xs">Adicionado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    <span className="text-xs">Adicionar</span>
                  </>
                )}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <Button className="w-full bg-[#F2CA7E] hover:bg-[#F2CA7E]/90 text-[#A66F0A] border-0 py-2 md:py-4" 
                onClick={isInCart ? () => openCart() : handleBuyNow}>
                <span className="text-xs md:text-sm">Comprar agora</span>
              </Button>
              
              <Button className="w-full bg-zinc-800 hover:bg-[#F2CA7E]/20 hover:text-white hover:border-[#F2CA7E]/50 text-white border border-zinc-700 py-2 md:py-4" asChild>
                <Link to={`/courses/${id}`}>
                  <span className="text-xs md:text-sm">Ver detalhes</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
