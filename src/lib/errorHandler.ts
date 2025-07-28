// Sistema de tratamento de erros global
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorCounts: Map<string, number> = new Map();
  private maxRetries = 3;

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // Interceptar erros de imagem
  handleImageError(url: string, element?: HTMLImageElement): void {
    const errorCount = this.errorCounts.get(url) || 0;
    
    if (errorCount < this.maxRetries) {
      this.errorCounts.set(url, errorCount + 1);
      console.warn(`Erro ao carregar imagem (tentativa ${errorCount + 1}):`, url);
      
      // Tentar novamente após um delay
      setTimeout(() => {
        if (element) {
          element.src = url;
        }
      }, 1000 * (errorCount + 1));
    } else {
      console.error(`Falha definitiva ao carregar imagem após ${this.maxRetries} tentativas:`, url);
      
      // Usar placeholder
      if (element) {
        element.src = '/placeholder.svg';
      }
    }
  }

  // Interceptar erros de fetch/API
  handleFetchError(url: string, error: Error): void {
    console.error('Erro de fetch:', {
      url,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    // Se for um bad request, logar detalhes específicos
    if (error.message.includes('400') || error.message.includes('Bad Request')) {
      console.error('Bad Request detectado:', {
        url,
        possibleCauses: [
          'URL malformada',
          'Parâmetros inválidos',
          'Caracteres especiais não codificados',
          'Problema de CORS',
          'Servidor indisponível'
        ]
      });
    }
  }

  // Limpar contadores de erro
  clearErrorCounts(): void {
    this.errorCounts.clear();
  }

  // Obter estatísticas de erro
  getErrorStats(): { url: string; count: number }[] {
    return Array.from(this.errorCounts.entries()).map(([url, count]) => ({
      url,
      count
    }));
  }
}

// Instância global
export const errorHandler = ErrorHandler.getInstance();

// Interceptar erros globais
window.addEventListener('error', (event) => {
  if (event.target instanceof HTMLImageElement) {
    errorHandler.handleImageError(event.target.src, event.target);
  }
});

// Interceptar erros de fetch não capturados
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  try {
    const response = await originalFetch(...args);
    
    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
      errorHandler.handleFetchError(args[0]?.toString() || 'unknown', error);
    }
    
    return response;
  } catch (error) {
    errorHandler.handleFetchError(args[0]?.toString() || 'unknown', error as Error);
    throw error;
  }
}; 