
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

type ExerciseType = {
  id: number;
  question: string;
  type: 'essay' | 'multiple-choice';
  options?: string[];
  answer?: string;
};

type CourseExercisesProps = {
  exercises: ExerciseType[];
};

const CourseExercises = ({ exercises }: CourseExercisesProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  
  if (!exercises || exercises.length === 0) {
    return (
      <p className="text-zinc-400">
        Não há exercícios disponíveis para esta aula.
      </p>
    );
  }
  
  const handleRadioChange = (exerciseId: number, option: string) => {
    setAnswers({
      ...answers,
      [exerciseId]: option
    });
  };
  
  const handleTextChange = (exerciseId: number, text: string) => {
    setAnswers({
      ...answers,
      [exerciseId]: text
    });
  };
  
  const handleSubmit = (exerciseId: number) => {
    setSubmitted({
      ...submitted,
      [exerciseId]: true
    });
  };
  
  return (
    <div>
      <p className="text-zinc-300 mb-6">
        Aplique os conceitos aprendidos nesta aula através dos exercícios abaixo.
      </p>
      
      <div className="space-y-6">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="p-4 border border-zinc-800 rounded-lg">
            <h4 className="font-medium mb-2">Exercício {exercise.id}</h4>
            <p className="text-zinc-400 text-sm mb-4">
              {exercise.question}
            </p>
            
            {exercise.type === 'multiple-choice' && exercise.options && (
              <div className="space-y-2 mb-4">
                {exercise.options.map((option, idx) => (
                  <div key={idx} className="flex items-center">
                    <input 
                      type="radio" 
                      id={`option-${exercise.id}-${idx}`} 
                      name={`exercise-${exercise.id}`}
                      value={option}
                      onChange={() => handleRadioChange(exercise.id, option)}
                      className="mr-2"
                      disabled={submitted[exercise.id]}
                    />
                    <label 
                      htmlFor={`option-${exercise.id}-${idx}`}
                      className={`
                        ${submitted[exercise.id] && exercise.answer === option ? 'text-green-500' : ''}
                        ${submitted[exercise.id] && answers[exercise.id] === option && exercise.answer !== option ? 'text-red-500' : ''}
                      `}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
            
            {exercise.type === 'essay' && (
              <div className="mb-4">
                <textarea 
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg p-2 text-sm"
                  rows={4}
                  onChange={(e) => handleTextChange(exercise.id, e.target.value)}
                  disabled={submitted[exercise.id]}
                ></textarea>
              </div>
            )}
            
            <div className="flex items-center">
              {!submitted[exercise.id] ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleSubmit(exercise.id)}
                  disabled={!answers[exercise.id]}
                >
                  Responder
                </Button>
              ) : (
                <div className="flex items-center text-green-500">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Resposta enviada</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseExercises;
