import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
        <div className="ejup-container flex items-center justify-center h-20">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/e5e6ce5d-0718-4a69-892b-3f9d0d68a7a1.png" 
              alt="EJUP Logo"
              className="h-28" 
            />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ejup-darkBg/95 backdrop-blur-lg border-b border-zinc-800">
      <div className="ejup-container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/e5e6ce5d-0718-4a69-892b-3f9d0d68a7a1.png" 
            alt="EJUP Logo"
            className="h-28" 
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors flex items-center ${
              isActive('/')
                ? 'text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Home
          </Link>
          
          {/* Dropdown de Escolas */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1 outline-none focus:outline-none">
                Escolas
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="bg-zinc-900 border-zinc-700 min-w-[280px] z-50 shadow-2xl" 
              align="start"
              sideOffset={8}
              collisionPadding={10}
            >
              {schools.map((school) => (
                <DropdownMenuItem key={school.id} asChild>
                  <Link 
                    to={`/schools/${school.id}`}
                    className="text-zinc-300 hover:text-white hover:bg-ejup-pink/20 focus:bg-ejup-pink/20 cursor-pointer px-3 py-3 rounded-md transition-all duration-200 flex items-center w-full group"
                  >
                    <span className="flex-1 group-hover:translate-x-1 transition-transform duration-200">{school.name}</span>
                    <ChevronDown className="h-4 w-4 -rotate-90 group-hover:translate-x-1 transition-all duration-200 opacity-0 group-hover:opacity-70" />
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link
            to="/content/articles"
            className={`text-sm font-medium transition-colors flex items-center ${
              isActive('/content/articles')
                ? 'text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Conteúdo
          </Link>
          
          <Link
            to="/creator"
            className={`text-sm font-medium transition-colors flex items-center ${
              isActive('/creator')
                ? 'text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Seja Creator
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Carrinho de compras - sempre visível */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-ejup-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
            <Button variant="outline" className="border-zinc-700 text-zinc-300" asChild>
              <Link to="/login">
                Login
                <User className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-ejup-darkBg border-t border-zinc-800 py-4">
          <div className="ejup-container flex flex-col gap-4">
            <Link
              to="/"
              className={`py-2 text-lg font-medium transition-colors flex items-center ${
                isActive('/')
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Escolas no mobile */}
            <div className="py-2">
              <span className="text-lg font-medium text-zinc-400 mb-2 block">Escolas</span>
              <div className="ml-4 flex flex-col gap-2">
                {schools.map((school) => (
                  <Link
                    key={school.id}
                    to={`/schools/${school.id}`}
                    className="text-base font-medium text-zinc-300 hover:text-white hover:bg-ejup-pink/20 px-3 py-2 rounded-md transition-all duration-200 group flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                                      >
                      <span className="flex-1 group-hover:translate-x-1 transition-transform duration-200">{school.name}</span>
                      <ChevronDown className="h-4 w-4 -rotate-90 group-hover:translate-x-1 transition-all duration-200 opacity-0 group-hover:opacity-70" />
                    </Link>
                ))}
              </div>
            </div>
            
            <Link
              to="/content/articles"
              className={`py-2 text-lg font-medium transition-colors flex items-center ${
                isActive('/content/articles')
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Conteúdo
            </Link>
            
            <Link
              to="/creator"
              className={`py-2 text-lg font-medium transition-colors flex items-center ${
                isActive('/creator')
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Seja Creator
            </Link>
            
            <div className="flex flex-col gap-3 mt-3 pt-4 border-t border-zinc-800">
              {/* Carrinho mobile */}
              <button
                onClick={() => {
                  toggleCart();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2 text-lg font-medium text-zinc-400 hover:text-white transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Carrinho</span>
                {totalItems > 0 && (
                  <span className="bg-ejup-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                    {totalItems}
                  </span>
                )}
              </button>
              
              {isLoggedIn ? (
                <Button variant="outline" className="border-zinc-700 text-zinc-300 w-full" asChild>
                  <Link to="/my-courses" onClick={() => setIsMenuOpen(false)}>
                    <span className="mr-2">{userName}</span>
                    <User className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="border-zinc-700 text-zinc-300 w-full" asChild>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      Login
                      <User className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
