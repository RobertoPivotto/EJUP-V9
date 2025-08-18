
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

type MaterialType = {
  id: number;
  title: string;
  type: string;
  size: string;
  url: string;
};

type CourseMaterialsProps = {
  materials: MaterialType[];
};

const CourseMaterials = ({ materials }: CourseMaterialsProps) => {
  if (!materials || materials.length === 0) {
    return (
      <p className="text-zinc-400">
        Não há materiais complementares disponíveis para esta aula.
      </p>
    );
  }

  return (
    <div>
      <p className="text-zinc-300 mb-6">
        Acesse recursos adicionais para aprofundar seu conhecimento.
      </p>
      
      <div className="space-y-4">
        {materials.map((material) => (
          <div 
            key={material.id} 
            className="flex items-center p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <div className="p-2 bg-ejup-orange/20 rounded mr-3">
              <BookOpen className="h-5 w-5 text-ejup-orange" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{material.title}</div>
              <div className="text-xs text-zinc-400">
                {material.type.toUpperCase()}, {material.size}
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <a href={material.url} target="_blank" rel="noopener noreferrer">
                Baixar
              </a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseMaterials;
