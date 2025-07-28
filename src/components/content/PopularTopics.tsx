import { Badge } from '@/components/ui/badge';

interface PopularTopicsProps {
  topics: string[];
  onTopicClick?: (topic: string | string[]) => void;
  title?: string;
  selectedTopics?: string[];
  accentColor?: string;
}

const PopularTopics = ({ 
  topics, 
  onTopicClick, 
  title = "Tópicos Populares",
  selectedTopics = [],
  accentColor = 'ejup-cyan',
}: PopularTopicsProps) => {
  
  // Função auxiliar para lidar com o clique em um tópico
  const handleTopicClick = (topic: string) => {
    if (onTopicClick) {
      // Se já estiver selecionado, filtra para remover
      if (selectedTopics.includes(topic)) {
        const newTopics = selectedTopics.filter(t => t !== topic);
        onTopicClick(newTopics);
      } else {
        // Senão adiciona à seleção
        onTopicClick([...selectedTopics, topic]);
      }
    }
  };
  
  return (
    <div className="bg-zinc-800/30 rounded-lg border border-zinc-700/50 p-6">
      <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {topics.map(topic => (
          <Badge 
            key={topic} 
            variant={selectedTopics.includes(topic) ? "default" : "outline"}
            className={`cursor-pointer transition-colors ${
              selectedTopics.includes(topic)
                ? accentColor === 'ejup-pink'
                  ? 'bg-ejup-pink/10 text-ejup-pink border-ejup-pink/40 hover:bg-ejup-pink/20'
                  : accentColor === 'ejup-orange'
                    ? 'bg-ejup-orange/10 text-ejup-orange border-ejup-orange/40 hover:bg-ejup-orange/20'
                    : 'bg-ejup-cyan/10 text-ejup-cyan border-ejup-cyan/40 hover:bg-ejup-cyan/20'
                : 'border-zinc-700 hover:border-ejup-pink hover:text-ejup-pink hover:bg-ejup-pink/5'
            }`}
            onClick={() => handleTopicClick(topic)}
          >
            {topic}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default PopularTopics; 