import { Link } from 'react-router-dom';

// Componente simples para mostrar parceiros no final das páginas de conteúdo
const Partners = () => {
  return (
    <div className="border-t border-zinc-800 pt-8 mt-8">
      <h3 className="text-xl font-semibold mb-4">Parceiros EJUP</h3>
      <div className="flex flex-wrap gap-6 items-center justify-between">
        <Link to="/partners" className="opacity-60 hover:opacity-100 transition-opacity">
          <img 
            src="/lovable-uploads/partners/partner1.png" 
            alt="Logo parceiro" 
            className="h-12 grayscale hover:grayscale-0 transition-all"
          />
        </Link>
        <Link to="/partners" className="opacity-60 hover:opacity-100 transition-opacity">
          <img 
            src="/lovable-uploads/partners/partner2.png" 
            alt="Logo parceiro" 
            className="h-12 grayscale hover:grayscale-0 transition-all"
          />
        </Link>
        <Link to="/partners" className="opacity-60 hover:opacity-100 transition-opacity">
          <img 
            src="/lovable-uploads/partners/partner3.png" 
            alt="Logo parceiro" 
            className="h-12 grayscale hover:grayscale-0 transition-all"
          />
        </Link>
        <Link to="/partners" className="opacity-60 hover:opacity-100 transition-opacity">
          <img 
            src="/lovable-uploads/partners/partner4.png" 
            alt="Logo parceiro" 
            className="h-12 grayscale hover:grayscale-0 transition-all"
          />
        </Link>
      </div>
    </div>
  );
};

export default Partners; 