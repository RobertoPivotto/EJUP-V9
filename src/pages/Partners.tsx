import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchAndFilter from '@/components/ui/SearchAndFilter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for partners
const allPartners = [
  {
    id: 1,
    name: 'Almeida & Associados',
    description: 'Escritório especializado em direito empresarial, com foco em contratos e negociações.',
    type: 'content',
    logo: '',
    initialsColor: 'bg-ejup-orange',
    courses: 2,
    events: 1,
  },
  {
    id: 2,
    name: 'Instituto Jurídico Brasileiro',
    description: 'Organização dedicada à pesquisa e desenvolvimento jurídico no Brasil.',
    type: 'supporter',
    logo: '',
    initialsColor: 'bg-ejup-cyan',
    courses: 0,
    events: 3,
  },
  {
    id: 3,
    name: 'Mendes & Pacheco Advocacia',
    description: 'Escritório com atuação em direito tributário e planejamento sucessório.',
    type: 'promoter',
    logo: '',
    initialsColor: 'bg-ejup-orange',
    courses: 1,
    events: 2,
  },
  {
    id: 4,
    name: 'Legal Tech Solutions',
    description: 'Empresa de tecnologia focada em soluções para o mercado jurídico.',
    type: 'content',
    logo: '',
    initialsColor: 'bg-ejup-orange',
    courses: 3,
    events: 1,
  },
  {
    id: 5,
    name: 'DataLaw',
    description: 'Consultoria especializada em proteção de dados e direito digital.',
    type: 'supporter',
    logo: '',
    initialsColor: 'bg-ejup-cyan',
    courses: 1,
    events: 0,
  },
  {
    id: 6,
    name: 'Jurídico na Prática',
    description: 'Plataforma de conteúdo e networking para profissionais do direito.',
    type: 'promoter',
    logo: '',
    initialsColor: 'bg-ejup-orange',
    courses: 0,
    events: 4,
  },
];

const filters = [
  {
    id: 'type',
    name: 'Tipo',
    options: [
      { id: 'content', name: 'Fornecedor de Conteúdo' },
      { id: 'supporter', name: 'Apoiador' },
      { id: 'promoter', name: 'Promotor' },
    ],
  },
];

const Partners = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filteredPartners, setFilteredPartners] = useState(allPartners);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'all') {
      setFilteredPartners(allPartners);
    } else if (value === 'content') {
      setFilteredPartners(allPartners.filter(partner => partner.type === 'content'));
    } else if (value === 'supporter') {
      setFilteredPartners(allPartners.filter(partner => partner.type === 'supporter'));
    } else if (value === 'promoter') {
      setFilteredPartners(allPartners.filter(partner => partner.type === 'promoter'));
    }
  };
  
  const handleSearch = (query: string) => {
    if (!query) {
      handleTabChange(activeTab); // Reset to current tab filter
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = allPartners.filter(
      partner => 
        partner.name.toLowerCase().includes(lowerQuery) || 
        partner.description.toLowerCase().includes(lowerQuery)
    );
    
    setFilteredPartners(filtered);
  };
  
  const handleFilterChange = (filterId: string, value: string) => {
    if (filterId === 'type') {
      if (value === 'all') {
        // Reset to current tab filter
        handleTabChange(activeTab);
      } else {
        setFilteredPartners(allPartners.filter(partner => partner.type === value));
      }
    }
  };
  
  const getPartnerInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2);
  };
  
  const getPartnerTypeLabel = (type: string) => {
    switch (type) {
      case 'content':
        return 'Fornecedor de Conteúdo';
      case 'supporter':
        return 'Apoiador';
      case 'promoter':
        return 'Promotor';
      default:
        return '';
    }
  };
  
  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <Navbar />
      <main className="pt-20">
        <div className="ejup-container py-12">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Parceiros</h1>
            <p className="text-zinc-400">
              Conheça as organizações que contribuem para o sucesso da EJUP
            </p>
          </div>
          
          <Tabs defaultValue="all" onValueChange={handleTabChange} className="mb-8">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="content">Fornecedores de Conteúdo</TabsTrigger>
              <TabsTrigger value="supporter">Apoiadores</TabsTrigger>
              <TabsTrigger value="promoter">Promotores</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar parceiros..."
                className="w-full bg-zinc-800 border border-zinc-700 focus:border-ejup-orange/50 text-white px-4 py-2 rounded-lg"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button className="absolute right-2 top-[6px] bg-ejup-orange text-white px-4 py-1 rounded-md">
                Buscar
              </button>
            </div>
          </div>
          
          {filteredPartners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPartners.map((partner) => (
                <Link to={`/partners/${partner.id}`} key={partner.id} className="ejup-card hover:scale-[1.02] hover:shadow-lg hover:shadow-ejup-orange/5">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${partner.initialsColor} rounded-lg flex items-center justify-center text-base font-bold text-white mr-4`}>
                        {getPartnerInitials(partner.name)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{partner.name}</h3>
                        <span className="text-xs text-zinc-400">
                          {getPartnerTypeLabel(partner.type)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-zinc-400 text-sm mb-6">{partner.description}</p>
                    
                    <div className="flex space-x-4">
                      <div className="flex-1 bg-zinc-800 rounded-lg p-3 text-center">
                        <div className="text-xl font-medium">{partner.courses}</div>
                        <div className="text-xs text-zinc-400">Cursos</div>
                      </div>
                      <div className="flex-1 bg-zinc-800 rounded-lg p-3 text-center">
                        <div className="text-xl font-medium">{partner.events}</div>
                        <div className="text-xs text-zinc-400">Eventos</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Nenhum parceiro encontrado</h3>
              <p className="text-zinc-400">Tente ajustar os filtros ou termos de busca</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
