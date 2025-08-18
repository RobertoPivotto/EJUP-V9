import { X } from 'lucide-react';

interface FilteredTagsProps {
  selectedTopics: string[];
  onRemoveTopic: (topic: string) => void;
  onClearAll: () => void;
}

const FilteredTags = ({ selectedTopics, onRemoveTopic, onClearAll }: FilteredTagsProps) => {
  if (selectedTopics.length === 0) {
    return null;
  }

  return (
    <div className="md:hidden mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-zinc-300">Filtros ativos:</h3>
        <button
          onClick={onClearAll}
          className="text-xs text-zinc-400 hover:text-white transition-colors"
        >
          Limpar todos
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedTopics.map((topic) => (
          <div
            key={topic}
            className="flex items-center gap-1 bg-ejup-orange/10 text-ejup-orange border border-ejup-orange/30 px-3 py-1.5 rounded-md text-sm"
          >
            <span>{topic}</span>
            <button
              onClick={() => onRemoveTopic(topic)}
              className="hover:bg-ejup-orange/20 rounded-full p-0.5 transition-colors ml-1"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilteredTags;

