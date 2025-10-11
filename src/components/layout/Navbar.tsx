import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { User, Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/lib/CartContext';
import { getAllSchools } from '@/utils/courseData';


// Mock data para simular usuário logado (em uma aplicação real, isso viria de um contexto de autenticação)
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const userName = "João Silva";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSchoolsOpen, setIsSchoolsOpen] = useState(false);
  const location = useLocation();
  const { totalItems, toggleCart } = useCart();
  
  // Verificar se está na página de checkout
  const isCheckout = location.pathname === '/checkout';

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const schools = getAllSchools();

  // Se estiver na página de checkout, exibir apenas a logo
  if (isCheckout) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-ejup-darkBg/95 backdrop-blur-lg border-b border-zinc-800">
        <div className="w-full flex items-center justify-center h-20 px-2 sm:px-4">
          <div className="flex items-center">
            <Logo className="h-10" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ejup-darkBg/95 backdrop-blur-lg border-b border-zinc-800">
      <div className="w-full flex items-center justify-between h-20 px-2 sm:px-4">
        <Link to="/" className="flex items-center">
          <Logo className="h-10" />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors flex items-center ${
              isActive('/')
                ? 'text-white'
                : 'text-zinc-400 hover:text-[#F2CA7E]'
            }`}
          >
            Home
          </Link>
          
          {/* Dropdown de Cursos */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm font-medium text-zinc-400 hover:text-[#F2CA7E] transition-colors flex items-center gap-1 outline-none focus:outline-none">
                Cursos
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="bg-zinc-900 border-[#F2CA7E]/20 min-w-[640px] z-50 p-3 shadow-2xl shadow-[#F2CA7E]/10" 
              align="center"
              sideOffset={10}
              collisionPadding={12}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-items-stretch mx-auto max-w-[700px]">
                {schools.map((school) => (
                  <div key={school.id} className="w-full p-3 rounded-md bg-zinc-800/40 border border-zinc-700/40 hover:bg-zinc-800/60 transition-colors min-h-[180px] flex flex-col">
                    <h4 className="text-white font-semibold mb-1 text-sm md:text-base">
                      {school.id === 'direito' ? 'Direito' : school.id === 'power-skills' ? 'Power Skills' : school.id === 'gestao-tech' ? 'Negócios e Inovação Jurídica' : school.name}
                    </h4>
                    <p className="text-zinc-400 text-xs md:text-sm mb-2">
                      {school.id === 'direito'
                        ? 'Cursos jurídicos com profundidade acadêmica e aplicação prática imediata.'
                        : school.id === 'power-skills'
                        ? 'Formação além do técnico: desenvolva as competências que impulsionam sua carreira.'
                        : school.id === 'gestao-tech'
                        ? 'Negócios, tecnologia e inovação: o futuro do Direito começa aqui.'
                        : school.description}
                    </p>
                    <Link 
                      to={`/schools/${school.id}`}
                      className="mt-auto text-[#F2CA7E] hover:text-white text-xs md:text-sm flex items-center gap-2"
                    >
                      Ver cursos
                      <ChevronDown className="h-4 w-4 -rotate-90" />
                    </Link>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Links de texto independentes para Coluna e Podcast (desktop) */}
          <Link
            to="/content/articles"
            className={`text-sm font-medium transition-colors flex items-center ${
              isActive('/content/articles') ? 'text-white' : 'text-zinc-400 hover:text-[#F2CA7E]'
            }`}
          >
            Coluna
          </Link>
          <Link
            to="/content/podcast"
            className={`text-sm font-medium transition-colors flex items-center ${
              isActive('/content/podcast') ? 'text-white' : 'text-zinc-400 hover:text-[#F2CA7E]'
            }`}
          >
            Podcast
          </Link>
          

        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Carrinho de compras - sempre visível */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-zinc-400 hover:text-[#F2CA7E] transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F2CA7E] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>



          {isLoggedIn ? (
            <Button variant="outline" className="border-zinc-700 text-zinc-300" asChild>
              <Link to="/my-courses">
                <span className="mr-2">{userName}</span>
                <User className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Link to="/login" aria-label="Entrar" className="p-2 text-zinc-300 hover:text-[#F2CA7E] transition-colors">
              <User className="h-5 w-5" />
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            if (isMenuOpen) {
              setIsSchoolsOpen(false);
            }
          }}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-ejup-darkBg border-t border-zinc-800 py-2">
          <div className="ejup-container flex flex-col">
            <Link
              to="/"
              className={`py-3 text-base font-medium transition-colors flex items-center ${
                isActive('/')
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-[#F2CA7E]'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Cursos dropdown */}
            <div className="flex flex-col">
              <button
                onClick={() => {
                  setIsSchoolsOpen(!isSchoolsOpen);
                }}
                className="py-3 text-base font-medium text-zinc-400 hover:text-[#F2CA7E] transition-colors flex items-center justify-between"
              >
                <span>Cursos</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isSchoolsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isSchoolsOpen && (
                <div className="pl-4 flex flex-col mt-1 border-l border-zinc-800">
                  {schools.map((school) => (
                    <Link
                      key={school.id}
                      to={`/schools/${school.id}`}
                      className="py-2 text-sm text-zinc-400 hover:text-[#F2CA7E] transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsSchoolsOpen(false);
                      }}
                    >
                      {school.id === 'direito' ? 'Direito' : school.id === 'power-skills' ? 'Power Skills' : school.id === 'gestao-tech' ? 'Negócios e Inovação Jurídica' : school.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile links diretos para Coluna e Podcast */}
            <div className="flex flex-col">
              <Link
                to="/content/articles"
                className="py-3 text-base font-medium text-zinc-400 hover:text-[#F2CA7E] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Coluna
              </Link>
              <Link
                to="/content/podcast"
                className="py-3 text-base font-medium text-zinc-400 hover:text-[#F2CA7E] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Podcast
              </Link>
            </div>
            
            {/* Mobile login/account */}
            <div className="flex flex-col gap-3 mt-3 pt-4 border-t border-zinc-800">
              {/* Carrinho mobile */}
              <button
                onClick={() => {
                  toggleCart();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-zinc-400 hover:text-[#F2CA7E] transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Carrinho</span>
                {totalItems > 0 && (
                  <span className="bg-[#F2CA7E] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                    {totalItems}
                  </span>
                )}
              </button>
              
              {isLoggedIn ? (
                <Button variant="outline" className="border-zinc-700 text-zinc-300 w-full justify-center py-2 h-auto" asChild>
                  <Link to="/my-courses" onClick={() => setIsMenuOpen(false)}>
                    <span className="mr-2">{userName}</span>
                    <User className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-[#F2CA7E] hover:text-white hover:border-[#F2CA7E] w-full justify-center py-2 h-auto" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                    <img src="/lovable-uploads/Cópia de EJUP (5).png" alt="Login" className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
