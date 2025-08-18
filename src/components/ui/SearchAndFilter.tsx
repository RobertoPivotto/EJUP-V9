
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterOption {
  id: string;
  name: string;
}

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filterId: string, value: string) => void;
  filters: {
    id: string;
    name: string;
    options: FilterOption[];
  }[];
  activeFilters?: Record<string, string | string[]>;
}

const SearchAndFilter = ({ onSearch, onFilterChange, filters, activeFilters = {} }: SearchAndFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = () => {
    onSearch(searchQuery);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-zinc-800 border-zinc-700 focus:border-ejup-orange/50 pr-12"
            />
            <Button 
              size="sm" 
              className="absolute right-1 top-1 h-8 bg-ejup-orange hover:bg-ejup-orange/90 text-white"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <Select 
              key={filter.id} 
              value={activeFilters[filter.id] || ""}
              onValueChange={(value) => onFilterChange(filter.id, value)}
            >
              <SelectTrigger className="w-[200px] bg-zinc-800 border-zinc-700 [&>span]:text-left [&>span]:justify-start">
                <SelectValue placeholder={filter.name} />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 min-w-[200px] z-50">
                <SelectItem 
                  value="all"
                  className="text-zinc-300 hover:text-white hover:bg-ejup-orange/20 focus:bg-ejup-orange/20 cursor-pointer"
                >
                  Limpar filtros
                </SelectItem>
                {filter.options.map((option) => (
                  <SelectItem 
                    key={option.id} 
                    value={option.id}
                    className={`text-zinc-300 hover:text-white hover:bg-ejup-orange/20 focus:bg-ejup-orange/20 cursor-pointer ${
                      activeFilters[filter.id] === option.id
                        ? "bg-ejup-orange/20 text-ejup-orange"
                        : ""
                    }`}
                  >
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-10 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white"
            onClick={() => {
              Object.keys(activeFilters).forEach(filterId => {
                onFilterChange(filterId, "all");
              });
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
