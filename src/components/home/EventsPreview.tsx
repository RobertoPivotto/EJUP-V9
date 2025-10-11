
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

// Mock data for events
const upcomingEvents = [
  {
    id: 1,
    title: 'Seminário de Direito Empresarial',
    date: '15 de Junho, 2025',
    time: '19:00 - 21:00',
    location: 'São Paulo, SP',
    isOnline: false,
    speakerName: 'Dra. Juliana Mendes',
    speakerRole: 'Advogada Tributarista',
    speakerInitials: 'JM',
  },
  {
    id: 2,
    title: 'Workshop de Contratos Inteligentes',
    date: '22 de Junho, 2025',
    time: '14:00 - 18:00',
    location: 'Online',
    isOnline: true,
    speakerName: 'Dr. Marcos Oliveira',
    speakerRole: 'Especialista em Direito Digital',
    speakerInitials: 'MO',
  },
  {
    id: 3,
    title: 'Fórum Jurídico 2025',
    date: '10 de Julho, 2025',
    time: '09:00 - 18:00',
    location: 'Rio de Janeiro, RJ',
    isOnline: false,
    speakerName: 'Múltiplos palestrantes',
    speakerRole: '',
    speakerInitials: '+',
  },
];

const EventsPreview = () => {
  return (
    <section className="ejup-section bg-zinc-900">
      <div className="ejup-container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Próximos Eventos</h2>
            <p className="text-zinc-400 mt-2">Participe de eventos exclusivos e atualize seus conhecimentos</p>
          </div>
          <Button className="mt-4 md:mt-0" variant="outline">Ver todos os eventos</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div className="relative group" key={event.id}>
              <div className="absolute -inset-0.5 bg-[#F2CA7E] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <Link to={`/events/${event.id}`} className="ejup-card hover:scale-[1.02] hover:shadow-lg hover:shadow-[#F2CA7E]/5 relative block group-hover:text-[#F2CA7E] transition-colors">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-[#F2CA7E] mr-2" />
                    <span className="text-sm text-zinc-300">{event.date}</span>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    event.isOnline 
                      ? 'bg-ejup-cyan/20 text-ejup-cyan' 
                      : 'bg-[#F2CA7E]/20 text-[#F2CA7E]'
                  }`}>
                    {event.isOnline ? 'Online' : 'Presencial'}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                
                <div className="flex items-center mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#F2CA7E] flex items-center justify-center text-xs font-medium text-white mr-2">
                    {event.speakerInitials}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{event.speakerName}</div>
                    {event.speakerRole && (
                      <div className="text-xs text-zinc-500">{event.speakerRole}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="text-zinc-400">{event.time}</div>
                    <div className="text-zinc-300">{event.location}</div>
                  </div>
                  <Button size="sm" variant="outline" className="border-[#F2CA7E]/30 hover:bg-[#F2CA7E]/10">
                    Inscrever-se
                  </Button>
                </div>
              </div>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
