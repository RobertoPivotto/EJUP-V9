
import { Link } from 'react-router-dom';

const InternalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-3">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-zinc-500 text-xs">
            © {currentYear} EJUP - Escola Jurídica para Profissionais
          </p>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <Link 
              to="/terms" 
              className="text-zinc-500 hover:text-white text-xs transition-colors"
            >
              Termos de Uso
            </Link>
            <Link 
              to="/privacy" 
              className="text-zinc-500 hover:text-white text-xs transition-colors"
            >
              Privacidade
            </Link>
            <Link 
              to="/contact" 
              className="text-zinc-500 hover:text-white text-xs transition-colors"
            >
              Suporte
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default InternalFooter;
