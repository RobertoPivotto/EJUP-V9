import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckIcon, ShoppingCart, MapPin, Clock, Calendar, Users, Award } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useState } from 'react';

interface AgendaItem {
  time: string;
  activity: string;
}

interface Speaker {
  name: string;
  role: string;
  bio: string;
  initials: string;
  image?: string;
}

interface EventDetailProps {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  time: string;
  location: string;
  address: string;
  isOnline: boolean;
  category: string;
  price: number;
  isFree: boolean;
  maxParticipants: number;
  currentRegistrations: number;
  speaker: Speaker;
  agenda: AgendaItem[];
  topics: string[];
  certificate: boolean;
  caaP: boolean;
  organizedBy: {
    name: string;
    logo?: string;
  };
  image?: string;
  videoUrl?: string;
}

const EventDetail = ({
  id,
  title,
  description,
  longDescription,
  date,
  time,
  location,
  address,
  isOnline,
  category,
  price,
  isFree,
  maxParticipants,
  currentRegistrations,
  speaker,
  agenda,
  topics,
  certificate,
  caaP,
  organizedBy,
  image,
  videoUrl,
}: EventDetailProps) => {
  const { addItem, items, openCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    oab: '',
    motivation: ''
  });
  const [speakerImageErrors, setSpeakerImageErrors] = useState<Set<number>>(new Set());
  
  // Verificar se o evento já está no carrinho
  const isInCart = items.some(item => item.id === id && item.type === 'event');
  
  // Calcular vagas disponíveis
  const availableSpots = maxParticipants - currentRegistrations;
  const isFullyBooked = availableSpots <= 0;

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

  const handleSpeakerImageError = (index: number) => {
    setSpeakerImageErrors(prev => new Set(prev).add(index));
  };

  const handleAddToCart = () => {
    if (!isInCart && !isFree) {
      addItem({
        id,
        title,
        price,
        image: speakerImageErrors.has(0) ? '/placeholder.svg' : (speaker.image || getAvatarUrl(speaker.name)),
        type: 'event'
      });
    }
    
    if (!isFree) {
      // Redirecionar diretamente para o checkout
      window.location.href = '/checkout';
    }
  };

  const handleFreeRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria o envio dos dados para o backend
    console.log('Dados de inscrição:', formData);
    alert('Inscrição realizada com sucesso! Você receberá um email de confirmação.');
    setShowRegistrationForm(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="ejup-container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                    {isOnline ? 'Online' : 'Presencial'}
                  </span>
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                  {caaP && (
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-ejup-cyan/20 text-ejup-cyan border border-ejup-cyan/50">
                      CAAP
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
              </div>
            </div>
            
            <p className="text-lg text-zinc-300">{description}</p>
            
            {/* Event Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-ejup-orange mr-2" />
                  <span className="text-sm font-medium">Data</span>
                </div>
                <p className="text-zinc-300">{date}</p>
              </div>
              
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-ejup-cyan mr-2" />
                  <span className="text-sm font-medium">Horário</span>
                </div>
                <p className="text-zinc-300">{time}</p>
              </div>
              
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-ejup-orange mr-2" />
                  <span className="text-sm font-medium">Local</span>
                </div>
                <p className="text-zinc-300">{location}</p>
              </div>
              
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="text-sm font-medium">Vagas</span>
                </div>
                <p className="text-zinc-300">{availableSpots} disponíveis</p>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="agenda">Programação</TabsTrigger>
              <TabsTrigger value="speaker">Palestrante</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="animate-fade-in">
              <div className="ejup-card p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Sobre o Evento</h3>
                <p className="text-zinc-300 mb-6">{longDescription}</p>
                
                <h4 className="text-lg font-semibold mb-3">Temas Abordados</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {topics.map((topic, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-0.5 bg-ejup-orange/20 rounded-full p-0.5">
                        <CheckIcon className="h-4 w-4 text-ejup-orange" />
                      </div>
                      <span className="text-zinc-300 text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
                
                {certificate && (
                  <div className="flex items-center text-sm text-zinc-400 mb-2">
                    <Award className="h-4 w-4 mr-2 text-ejup-cyan" />
                    <span>Certificado de participação incluso</span>
                  </div>
                )}
                
                {caaP && (
                  <div className="flex items-center text-sm text-zinc-400">
                    <Award className="h-4 w-4 mr-2 text-ejup-orange" />
                    <span>Pontuação CAAP válida</span>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="agenda" className="animate-fade-in">
              <div className="ejup-card p-6">
                <h3 className="text-xl font-semibold mb-4">Programação do Evento</h3>
                
                <div className="space-y-4">
                  {agenda.map((item, index) => (
                    <div key={index} className="flex items-start border-l-2 border-ejup-orange/30 pl-4 pb-4">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-ejup-orange mb-1">{item.time}</div>
                        <div className="text-zinc-300">{item.activity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="speaker" className="animate-fade-in">
              <div className="ejup-card p-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-ejup-cyan flex items-center justify-center text-lg font-medium text-black mr-4">
                    {speaker.initials}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{speaker.name}</h3>
                    <p className="text-zinc-400">{speaker.role}</p>
                  </div>
                </div>
                <p className="text-zinc-300">{speaker.bio}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar com informações de compra/inscrição */}
        <div className="lg:col-span-1">
          <div className="ejup-card sticky top-8">
            {/* Imagem/Vídeo de divulgação */}
            <div className="aspect-video bg-zinc-900 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Fallback para caso o vídeo não carregue */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-ejup-orange/30 via-ejup-cyan/20 to-ejup-orange/30 z-0">
                  <div className="w-24 h-24 rounded-full bg-ejup-cyan flex items-center justify-center text-2xl font-medium text-black mb-3">
                    {speaker.initials}
                  </div>
                  <p className="text-white text-center font-medium">Vídeo de apresentação do evento</p>
                  <p className="text-zinc-300 text-sm text-center mt-1">Com {speaker.name}, {speaker.role}</p>
                </div>
                
                {/* Vídeo do YouTube ou imagem */}
                {videoUrl ? (
                  <iframe 
                    className="w-full h-full relative z-10"
                    src={videoUrl} 
                    title={`Vídeo de apresentação: ${title}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    onError={(e) => {
                      // Esconder o iframe em caso de erro
                      (e.target as HTMLIFrameElement).style.display = 'none';
                    }}
                  ></iframe>
                ) : image ? (
                  <img 
                    src={image} 
                    alt={title}
                    className="w-full h-full object-cover relative z-10"
                    onError={(e) => {
                      // Esconder a imagem em caso de erro
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : null}
              </div>
            </div>
            <div className="p-6">
              {/* Preço */}
              <div className="text-3xl font-bold mb-4">
                {isFree ? 'Gratuito' : `R$ ${price.toFixed(2).replace('.', ',')}`}
              </div>
              
              {/* Botão principal */}
              <Button 
                className={`w-full mb-4 ${
                  isInCart || showSuccess
                    ? 'bg-ejup-cyan hover:bg-ejup-cyan/90'
                    : 'bg-ejup-orange hover:bg-ejup-orange/90'
                } text-white`}
                onClick={isFree ? () => setShowRegistrationForm(true) : handleAddToCart}
              >
                {isFree ? (
                  'Inscrever-se Gratuitamente'
                ) : isInCart ? (
                  <>
                    <CheckIcon className="w-4 h-4 mr-2" />
                    No carrinho
                  </>
                ) : showSuccess ? (
                  <>
                    <CheckIcon className="w-4 h-4 mr-2" />
                    Adicionado!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Comprar agora
                  </>
                )}
              </Button>
              
              {/* Informações do evento */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-zinc-300">
                  <Calendar className="h-4 w-4 mr-3 text-ejup-orange" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center text-zinc-300">
                  <Clock className="h-4 w-4 mr-3 text-ejup-cyan" />
                  <span>{time}</span>
                </div>
                <div className="flex items-center text-zinc-300">
                  <MapPin className="h-4 w-4 mr-3 text-ejup-orange" />
                  <span>{isOnline ? 'Acesso online' : location}</span>
                </div>
                {certificate && (
                  <div className="flex items-center text-zinc-300">
                    <Award className="h-4 w-4 mr-3 text-ejup-cyan" />
                    <span>Certificado de participação</span>
                  </div>
                )}
              </div>
              
              {/* Informações do organizador */}
              <div className="mt-6 pt-6 border-t border-zinc-700">
                <div className="text-sm text-zinc-400 mb-2">Organizado por</div>
                <div className="flex items-center">
                  {organizedBy.logo && (
                    <img src={organizedBy.logo} alt={organizedBy.name} className="h-8 w-auto mr-3" />
                  )}
                  <span className="text-zinc-300 font-medium">{organizedBy.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de inscrição gratuita */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Inscrição Gratuita</h3>
            <p className="text-zinc-400 text-sm mb-6">Preencha os dados abaixo para confirmar sua participação no evento.</p>
            
            <form onSubmit={handleFreeRegistration} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-zinc-900 border-zinc-600"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-zinc-900 border-zinc-600"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-zinc-900 border-zinc-600"
                />
              </div>
              
              <div>
                <Label htmlFor="oab">Número da OAB (se aplicável)</Label>
                <Input
                  id="oab"
                  value={formData.oab}
                  onChange={(e) => handleInputChange('oab', e.target.value)}
                  className="bg-zinc-900 border-zinc-600"
                />
              </div>
              
              <div>
                <Label htmlFor="motivation">Por que deseja participar?</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  className="bg-zinc-900 border-zinc-600"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowRegistrationForm(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 bg-ejup-cyan hover:bg-ejup-cyan/90 text-black">
                  Confirmar Inscrição
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail; 