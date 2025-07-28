import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Interface para eventos
export interface Event {
  id: number;
  title: string;
  date: string;
  link: string;
}

interface UpcomingEventsProps {
  events: Event[];
  title?: string;
  viewAllLink?: string;
}

const UpcomingEvents = ({ 
  events, 
  title = "Próximos Eventos",
  viewAllLink = "/events"
}: UpcomingEventsProps) => {
  return (
    <div className="bg-zinc-800/30 rounded-lg border border-zinc-700/50 p-6">
      <h3 className="text-xl font-serif font-semibold mb-4 border-b border-zinc-700 pb-2">
        {title}
      </h3>
      <div className="space-y-4">
        {events.map(event => (
          <Link 
            key={event.id} 
            to={event.link}
            className="block hover:bg-zinc-800 p-3 rounded transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-base mb-1">{event.title}</h4>
                <p className="text-xs text-zinc-500">{event.date}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-ejup-cyan" />
            </div>
          </Link>
        ))}
        
        {viewAllLink && events.length > 0 && (
          <Button variant="outline" className="w-full border-zinc-700" asChild>
            <Link to={viewAllLink}>Ver todos os eventos</Link>
          </Button>
        )}
        
        {events.length === 0 && (
          <p className="text-sm text-zinc-500 text-center py-2">
            Nenhum evento programado no momento
          </p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents; 