import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileFilterDropdownProps {
  topics: string[];
  selectedTopics: string[];
  onFilterChange: (topics: string[]) => void;
  accentColor?: 'ejup-orange' | 'ejup-cyan';
}

const MobileFilterDropdown = ({ 
  topics, 
  selectedTopics, 
  onFilterChange, 
  accentColor = 'ejup-orange' 
}: MobileFilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
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
      onFilterChange([]);
      setIsOpen(false); // Fechar apenas quando selecionar "Todos"
      return;
    }

    const newSelection = selectedTopics.includes(topic)
      ? selectedTopics.filter(t => t !== topic)
      : [...selectedTopics, topic];
    
    onFilterChange(newSelection);
    // Não fechar o dropdown para permitir seleção múltipla
  };

  const clearFilters = () => {
    onFilterChange([]);
  };

  const removeSelectedTopic = (topicToRemove: string) => {
    const newSelection = selectedTopics.filter(topic => topic !== topicToRemove);
    onFilterChange(newSelection);
  };

  // Preparar lista de tópicos com "Todos" no início
  const allTopics = ["Todos", ...topics.filter(topic => topic !== "Opinião e Análise")];

  // Texto do botão baseado na seleção
  const getButtonText = () => {
    if (selectedTopics.length === 0) {
      return "Todas as áreas";
    } else if (selectedTopics.length === 1) {
      return selectedTopics[0];
    } else {
      return `${selectedTopics.length} áreas selecionadas`;
    }
  };

  return (
    <div className="md:hidden relative" ref={dropdownRef}>
      {/* Botão do Dropdown */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm"
      >
        <div className="flex items-center gap-2">
          <Filter className="h-3 w-3" />
          <span>{getButtonText()}</span>
        </div>
        <div className="flex items-center gap-2">
          {selectedTopics.length > 0 && (
            <span className="bg-ejup-orange text-white text-xs px-2 py-1 rounded-full">
              {selectedTopics.length}
            </span>
          )}
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </Button>

      {/* Tags das áreas selecionadas */}
      {selectedTopics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedTopics.map((topic) => (
            <div
              key={topic}
              className="flex items-center gap-1 bg-ejup-orange/10 text-ejup-orange border border-ejup-orange/30 px-2 py-1 rounded-md text-xs"
            >
              <span>{topic}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelectedTopic(topic);
                }}
                className="hover:bg-ejup-orange/20 rounded-full p-0.5 transition-colors"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute left-0 right-0 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
          style={{
            top: selectedTopics.length > 0 ? 'calc(100% + 3rem)' : 'calc(100% + 0.5rem)'
          }}
        >
          {/* Header do Dropdown */}
          <div className="sticky top-0 bg-zinc-900 border-b border-zinc-700 p-3 flex items-center justify-between">
            <h3 className="font-medium text-white">Filtrar por área</h3>
            {selectedTopics.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs text-zinc-400 hover:text-white"
              >
                <X className="h-3 w-3 mr-1" />
                Limpar
              </Button>
            )}
          </div>

          {/* Lista de Tópicos */}
          <div className="p-1">
            {allTopics.map((topic) => {
              // Apenas áreas específicas ficam laranjas, nunca "Todos"
              const isSelected = topic !== "Todos" && selectedTopics && selectedTopics.includes(topic);
              
              // Usar sempre ejup-orange para mobile
              const selectedClasses = 'bg-ejup-orange/10 text-ejup-orange border border-ejup-orange/30';
              const dotClasses = 'bg-ejup-orange';
              
              return (
                <button
                  key={topic}
                  onClick={() => handleTopicToggle(topic)}
                  data-selected={isSelected}
                  data-topic={topic}
                  className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 flex items-center justify-between group ${
                    isSelected
                      ? selectedClasses
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <span className="font-medium">{topic}</span>
                  {isSelected && (
                    <div className={`w-1.5 h-1.5 rounded-full ${dotClasses}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer com contador e botão concluído */}
          <div className="sticky bottom-0 bg-zinc-900 border-t border-zinc-700 p-3">
            <div className="flex items-center justify-between">
              <div className="text-xs text-zinc-400">
                {selectedTopics.length > 0 && (
                  `${selectedTopics.length} ${selectedTopics.length === 1 ? 'área selecionada' : 'áreas selecionadas'}`
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-xs text-ejup-orange hover:text-ejup-orange/80 hover:bg-ejup-orange/10 ml-auto"
              >
                Concluído
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFilterDropdown;
