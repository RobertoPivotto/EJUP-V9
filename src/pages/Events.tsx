
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchAndFilter from '@/components/ui/SearchAndFilter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for events
const allEvents = [
  {
    id: 1,
    title: 'Seminário de Direito Empresarial',
    description: 'Discussões avançadas sobre os desafios jurídicos enfrentados pelas empresas no cenário atual.',
    date: '15 de Junho, 2025',
    time: '19:00 - 21:00',
    location: 'São Paulo, SP',
    isOnline: false,
    category: 'empresarial',
    speakerName: 'Dra. Juliana Mendes',
    speakerRole: 'Advogada Tributarista',
    speakerInitials: 'JM',
    price: 'R$ 150,00',
    priceValue: 150,
    isFree: false,
    isPast: false,
    image: '/lovable-uploads/events/seminario-empresarial.jpg',
    duration: '2 horas',
  },
  {
    id: 2,
    title: 'Workshop de Contratos Inteligentes',
    description: 'Aprenda sobre a aplicação de blockchain e smart contracts no universo jurídico.',
    date: '22 de Junho, 2025',
    time: '14:00 - 18:00',
    location: 'Online',
    isOnline: true,
    category: 'digital',
    speakerName: 'Dr. Marcos Oliveira',
    speakerRole: 'Especialista em Direito Digital',
    speakerInitials: 'MO',
    price: 'R$ 120,00',
    priceValue: 120,
    isFree: false,
    isPast: false,
    image: '/lovable-uploads/events/workshop-contratos.jpg',
    duration: '4 horas',
  },
  {
    id: 3,
    title: 'Fórum Jurídico 2025',
    description: 'O maior evento de atualização jurídica do ano, com palestrantes renomados do Brasil e do exterior.',
    date: '10 de Julho, 2025',
    time: '09:00 - 18:00',
    location: 'Rio de Janeiro, RJ',
    isOnline: false,
    category: 'diversos',
    speakerName: 'Múltiplos palestrantes',
    speakerRole: '',
    speakerInitials: '+',
    price: 'R$ 350,00',
    priceValue: 350,
    isFree: false,
    isPast: false,
    image: '/lovable-uploads/events/forum-juridico.jpg',
    duration: '9 horas',
  },
  {
    id: 4,
    title: 'Webinar: Atualidades em Direito do Trabalho',
    description: 'Discussão sobre recentes decisões dos tribunais superiores e seus impactos na prática trabalhista.',
    date: '5 de Junho, 2025',
    time: '19:00 - 20:30',
    location: 'Online',
    isOnline: true,
    category: 'trabalhista',
    speakerName: 'Dr. Roberto Gomes',
    speakerRole: 'Juiz do Trabalho',
    speakerInitials: 'RG',
    price: 'Gratuito',
    priceValue: 0,
    isFree: true,
    isPast: false,
    image: '/lovable-uploads/events/webinar-trabalho.jpg',
    duration: '1.5 horas',
  },
  {
    id: 5,
    title: 'Workshop de Oratória Jurídica',
    description: 'Técnicas avançadas para aprimorar sua comunicação verbal em audiências e sustentações orais.',
    date: '18 de Maio, 2025',
    time: '09:00 - 17:00',
    location: 'Belo Horizonte, MG',
    isOnline: false,
    category: 'habilidades',
    speakerName: 'Profa. Carla Ribeiro',
    speakerRole: 'Especialista em Comunicação Jurídica',
    speakerInitials: 'CR',
    price: 'R$ 220,00',
    priceValue: 220,
    isFree: false,
    isPast: true,
    image: '/lovable-uploads/events/workshop-oratoria.jpg',
    duration: '8 horas',
  },
  {
    id: 6,
    title: 'Encontro sobre Mediação e Arbitragem',
    description: 'Troca de experiências entre profissionais sobre métodos alternativos de resolução de conflitos.',
    date: '28 de Abril, 2025',
    time: '14:00 - 18:00',
    location: 'Curitiba, PR',
    isOnline: false,
    category: 'resolucao',
    speakerName: 'Dr. Paulo Martins',
    speakerRole: 'Árbitro e Mediador',
    speakerInitials: 'PM',
    price: 'R$ 180,00',
    priceValue: 180,
    isFree: false,
    isPast: true,
    image: '/lovable-uploads/events/mediacao-arbitragem.jpg',
    duration: '4 horas',
  },
];

const filters = [
  {
    id: 'category',
    name: 'Área',
    options: [
      { id: 'empresarial', name: 'Dir. Empresarial' },
      { id: 'digital', name: 'Dir. Digital' },
      { id: 'trabalhista', name: 'Dir. Trabalhista' },
      { id: 'resolucao', name: 'Resolução de Conflitos' },
      { id: 'habilidades', name: 'Habilidades Práticas' },
      { id: 'diversos', name: 'Diversos' },
    ],
  },
  {
    id: 'format',
    name: 'Formato',
    options: [
      { id: 'online', name: 'Online' },
      { id: 'presencial', name: 'Presencial' },
    ],
  },
];

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filteredEvents, setFilteredEvents] = useState(
    allEvents.filter(event => !event.isPast)
  );
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'upcoming') {
      setFilteredEvents(applyFilters(allEvents.filter(event => !event.isPast)));
    } else {
      setFilteredEvents(applyFilters(allEvents.filter(event => event.isPast)));
    }
  };
  
  const handleSearch = (query: string) => {
    const baseEvents = activeTab === 'upcoming' 
      ? allEvents.filter(event => !event.isPast)
      : allEvents.filter(event => event.isPast);
      
    if (!query) {
      setFilteredEvents(applyFilters(baseEvents));
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = baseEvents.filter(
      event => 
        event.title.toLowerCase().includes(lowerQuery) || 
        event.description.toLowerCase().includes(lowerQuery) ||
        event.speakerName.toLowerCase().includes(lowerQuery) ||
        event.location.toLowerCase().includes(lowerQuery)
    );
    
    setFilteredEvents(filtered);
  };
  
  const handleFilterChange = (filterId: string, value: string) => {
    const newFilters = { ...activeFilters };
    
    if (value && value !== 'all') {
      newFilters[filterId] = value;
    } else {
      delete newFilters[filterId];
    }
    
    setActiveFilters(newFilters);
    
    const baseEvents = activeTab === 'upcoming' 
      ? allEvents.filter(event => !event.isPast)
      : allEvents.filter(event => event.isPast);
      
    setFilteredEvents(applyFilters(baseEvents, newFilters));
  };
  
  const applyFilters = (events: typeof allEvents, filters = activeFilters) => {
    let filtered = [...events];
    
    Object.entries(filters).forEach(([key, value]) => {
      switch (key) {
        case 'category':
          filtered = filtered.filter(event => event.category === value);
          break;
        case 'format':
          if (value === 'online') {
            filtered = filtered.filter(event => event.isOnline);
          } else if (value === 'presencial') {
            filtered = filtered.filter(event => !event.isOnline);
          }
          break;
      }
    });
    
    return filtered;
  };
  
  return (
    <div className="min-h-screen bg-ejup-darkBg">
      <Navbar />
      <main className="pt-20">
        <div className="ejup-container py-12">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Eventos</h1>
            <p className="text-zinc-400">
              Participe dos nossos eventos exclusivos e expanda seu conhecimento jurídico
            </p>
          </div>
          
          <Tabs defaultValue="upcoming" onValueChange={handleTabChange} className="mb-8">
            <TabsList>
              <TabsTrigger value="upcoming">Próximos Eventos</TabsTrigger>
              <TabsTrigger value="past">Eventos Passados</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <SearchAndFilter 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            filters={filters}
          />
          
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div key={event.id} className="relative w-full group h-full">
                  {/* Efeito de brilho - atrás do card */}
                  <div className="absolute -inset-0.5 bg-[#be9e77] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  
                  <div className="relative bg-ejup-darkCard rounded-2xl border border-zinc-700/50 overflow-hidden h-full flex flex-col hover:scale-[1.02] transition-all duration-300">
                    {/* Imagem do evento */}
                    <Link to={`/events/${event.id}`} className="block">
                      <div className="relative h-64 overflow-hidden bg-zinc-800">
                        {event.image ? (
                          <>
                            <img 
                              src={event.image} 
                              alt={event.title}
                              className="w-full h-full object-cover object-center"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                            {/* Fallback caso a imagem não carregue */}
                            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800" style={{zIndex: -1}}>
                              <div className="w-16 h-16 rounded-full bg-ejup-cyan flex items-center justify-center text-xl font-medium text-black">
                                {event.speakerInitials}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="h-full w-full bg-zinc-800 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-ejup-cyan flex items-center justify-center text-xl font-medium text-black">
                              {event.speakerInitials}
                            </div>
                          </div>
                        )}
                        
                        {/* Badge de preço */}
                        <div className="absolute bottom-3 right-3 bg-black/70 px-3 py-1 rounded-full">
                          <span className="text-white font-semibold">
                            {event.isFree ? 'Gratuito' : event.price}
                          </span>
                        </div>
                        
                        {/* Badge de formato */}
                        <div className="absolute top-4 left-4">
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                            event.isOnline 
                              ? 'bg-ejup-cyan/90 text-black' 
                              : 'bg-ejup-orange/90 text-white'
                          }`}>
                            {event.isOnline ? 'Online' : 'Presencial'}
                          </span>
                        </div>
                      </div>
                    </Link>
                    
                    {/* Conteúdo do card */}
                    <div className="p-6 flex flex-col flex-1">
                      <Link to={`/events/${event.id}`} className="block">
                        {/* Data e duração com altura fixa */}
                        <div className="mb-4 h-6">
                          <div className="flex items-center text-sm text-zinc-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{event.date}</span>
                            <span className="mx-2">•</span>
                            <span>{event.duration}</span>
                          </div>
                        </div>
                        
                        {/* Título e descrição com altura fixa */}
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold mb-3 line-clamp-2 h-14">{event.title}</h3>
                          <p className="text-zinc-400 text-sm line-clamp-2 h-10">{event.description}</p>
                        </div>
                        
                        {/* Informações do palestrante com altura fixa */}
                        <div className="flex items-center mb-4 h-12">
                          <div className="w-10 h-10 rounded-full bg-ejup-orange flex items-center justify-center text-sm font-medium text-white mr-3">
                            {event.speakerInitials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium truncate">{event.speakerName}</div>
                            {event.speakerRole && (
                              <div className="text-xs text-zinc-500 truncate">{event.speakerRole}</div>
                            )}
                          </div>
                        </div>
                      </Link>
                      
                      {/* Detalhes do evento - sempre na mesma posição */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-zinc-800 p-3 rounded-lg h-16 flex flex-col justify-center">
                          <div className="text-xs text-zinc-500">Horário</div>
                          <div className="text-sm font-medium">{event.time}</div>
                        </div>
                        <div className="bg-zinc-800 p-3 rounded-lg h-16 flex flex-col justify-center">
                          <div className="text-xs text-zinc-500">Local</div>
                          <div className="text-sm font-medium truncate">{event.location}</div>
                        </div>
                      </div>
                      
                      {/* Seção de preço e botões - sempre no final */}
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-xs text-zinc-500">Investimento</div>
                            <div className="text-lg font-bold text-white">
                              {event.isFree ? 'Gratuito' : event.price}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          {!event.isPast ? (
                            <Button className="w-full bg-ejup-orange hover:bg-ejup-orange/90 text-white border-0 py-6">
                              <span className="text-base">
                                {event.isFree ? 'Inscrever-se Grátis' : 'Adquirir Ingresso'}
                              </span>
                            </Button>
                          ) : (
                            <Button className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 py-6" asChild>
                              <Link to={`/events/${event.id}`}>
                                <span className="text-base">Ver Detalhes</span>
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Nenhum evento encontrado</h3>
              <p className="text-zinc-400">Tente ajustar os filtros ou termos de busca</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
