import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useState } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gera URL segura para avatar com fallback
 */
export function getAvatarUrl(name: string, size: number = 256): string {
  try {
    // Limpar e validar o nome
    const cleanName = name?.trim();
    if (!cleanName || cleanName.length === 0) {
      return '/placeholder.svg';
    }
    
    // Remover caracteres especiais que podem causar problemas
    const safeName = cleanName.replace(/[<>]/g, '');
    const encodedName = encodeURIComponent(safeName);
    
    // Verificar se a codificação foi bem-sucedida
    if (!encodedName || encodedName === 'undefined' || encodedName === 'null') {
      return '/placeholder.svg';
    }
    
    return `https://ui-avatars.com/api/?name=${encodedName}&background=0D8ABC&color=fff&size=${size}`;
  } catch (error) {
    console.warn('Erro ao gerar URL do avatar para:', name, error);
    return '/placeholder.svg';
  }
}

/**
 * Hook para gerenciar estado de erro de imagens
 */
export function useImageError() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  
  const handleImageError = (key: string) => {
    setImageErrors(prev => new Set(prev).add(key));
  };
  
  const hasError = (key: string) => imageErrors.has(key);
  
  const getImageSrc = (src: string | undefined, fallback: string, key: string) => {
    if (hasError(key)) return fallback;
    return src || fallback;
  };
  
  return { handleImageError, hasError, getImageSrc };
}
