import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { LogOut, Settings } from 'lucide-react';

const InternalHeader = () => {
  // Mock logout function
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

  return (
    <header className="bg-zinc-900/95 backdrop-blur-lg border-b border-zinc-800 sticky top-0 z-50">
      <div className="flex items-center justify-between h-20 px-6">
        <Link to="/my-courses" className="flex items-center">
          <Logo className="h-12" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/my-courses" 
            className="text-sm font-medium text-zinc-200 hover:text-white transition-colors"
          >
            Meus Cursos
          </Link>
          <Link 
            to="/internal/courses" 
            className="text-sm font-medium text-zinc-200 hover:text-white transition-colors"
          >
            Todos os Cursos
          </Link>
          <Link 
            to="/write-article" 
            className="text-sm font-medium text-zinc-200 hover:text-white transition-colors"
          >
            Escrever Artigo
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-zinc-300"
            asChild
          >
            <Link to="/account-settings">
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Configurações</span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-zinc-700 text-zinc-300"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default InternalHeader;
