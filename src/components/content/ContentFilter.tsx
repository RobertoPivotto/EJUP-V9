import { useState, useRef, useEffect } from 'react';
import { Check, Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ContentFilterProps {
  topics: string[];
  onFilterChange: (selectedTopics: string[]) => void;
  onSearchChange: (searchTerm: string) => void;
  accentColor: string; // 'ejup-orange' para podcast ou 'ejup-cyan' para artigos
}

const ContentFilter = ({ topics, onFilterChange, onSearchChange, accentColor }: ContentFilterProps) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [opDropdownOpen, setOpDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tipo de opinião (coluna ou artigo)
  const [opType, setOpType] = useState<'all' | 'coluna' | 'artigo'>('all');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTopicToggle = (topic: string) => {
    // Caso especial para "Todos"
    if (topic === "Todos") {
      setSelectedTopics([]);
      onFilterChange([]);
      return;
    }

    setSelectedTopics(prev => {
      const newSelection = prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic];
      
      onFilterChange(newSelection);
      return newSelection;
    });
  };

  const handleOpinionType = (type: 'all' | 'coluna' | 'artigo') => {
    setOpType(type);
    setOpDropdownOpen(false);
    
    // Lógica específica para filtrar por tipo de opinião
    if (type === 'all') {
      // Se já tinha Opinião e Análise selecionado, mantém, senão adiciona
      if (selectedTopics.includes('Opinião e Análise')) {
        // Não faz nada, já está selecionado
      } else {
        handleTopicToggle('Opinião e Análise');
      }
    } else {
      // Adiciona Opinião e Análise se não estiver selecionado
      let newTopics = [...selectedTopics];
      if (!newTopics.includes('Opinião e Análise')) {
        newTopics.push('Opinião e Análise');
      }
      
      setSelectedTopics(newTopics);
      onFilterChange(newTopics);
      // Aqui você pode implementar a lógica específica para filtrar por coluna ou artigo
      // Por exemplo, você pode passar um parâmetro adicional para onFilterChange
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  const clearFilters = () => {
    setSelectedTopics([]);
    setSearchTerm('');
    setOpType('all');
    onFilterChange([]);
    onSearchChange('');
  };
  
  // Configurar classes dinamicamente com base na cor de destaque
  const getButtonClass = (topic: string) => {
    const baseClass = "py-1 px-3 text-sm border-zinc-700 transition-colors ";
    
    if (selectedTopics.includes(topic) || (topic === "Todos" && selectedTopics.length === 0)) {
      // Sempre usar ejup-pink para botões selecionados, independente do accentColor
      return `${baseClass} bg-ejup-pink/10 text-ejup-pink border-ejup-pink/40`;
    } else {
      return `${baseClass} bg-zinc-800/70 text-zinc-400 hover:bg-zinc-800`;
    }
  };

  // Modificar a lista de tópicos para incluir "Todos" no início
  const allTopics = ["Todos", ...topics.filter(topic => topic !== "Opinião e Análise")];

  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-auto md:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            type="text"
            placeholder="Pesquisar por título ou conteúdo..."
            className="pl-10 bg-zinc-800/50 border-zinc-700 focus-visible:ring-1 focus-visible:ring-ejup-cyan"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        {(selectedTopics.length > 0 || searchTerm) && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearFilters}
            className="flex items-center gap-1 py-1 px-3 text-sm text-zinc-400 border-zinc-700 hover:bg-zinc-800"
          >
            <X className="h-3 w-3" />
            <span>Limpar filtros</span>
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {allTopics.map(topic => (
          <Button
            key={topic}
            variant="outline"
            size="sm"
            className={getButtonClass(topic)}
            onClick={() => handleTopicToggle(topic)}
          >
            {(selectedTopics.includes(topic) || (topic === "Todos" && selectedTopics.length === 0)) && 
              <Check className="mr-1 h-3 w-3" />}
            {topic}
          </Button>
        ))}
        
        {/* Dropdown especial para Opinião e Análise */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="outline"
            size="sm"
            className={`${getButtonClass('Opinião e Análise')} flex items-center gap-1`}
            onClick={() => setOpDropdownOpen(!opDropdownOpen)}
          >
            {selectedTopics.includes('Opinião e Análise') && <Check className="mr-1 h-3 w-3" />}
            Opinião e Análise
            {opDropdownOpen ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
          </Button>
          
          {opDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg z-10">
              <div className="p-1">
                <button
                  className={`w-full text-left px-3 py-2 text-sm rounded-md ${opType === 'all' ? 'bg-ejup-pink/10 text-ejup-pink' : 'text-zinc-300 hover:bg-zinc-700'}`}
                  onClick={() => handleOpinionType('all')}
                >
                  Todos
                </button>
                <button
                  className={`w-full text-left px-3 py-2 text-sm rounded-md ${opType === 'coluna' ? 'bg-ejup-pink/10 text-ejup-pink' : 'text-zinc-300 hover:bg-zinc-700'}`}
                  onClick={() => handleOpinionType('coluna')}
                >
                  Colunas
                </button>
                <button
                  className={`w-full text-left px-3 py-2 text-sm rounded-md ${opType === 'artigo' ? 'bg-ejup-pink/10 text-ejup-pink' : 'text-zinc-300 hover:bg-zinc-700'}`}
                  onClick={() => handleOpinionType('artigo')}
                >
                  Artigos
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentFilter; 