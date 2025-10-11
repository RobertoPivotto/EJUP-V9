// Utility functions for scroll behavior

export const scrollToTop = (behavior: 'smooth' | 'instant' = 'smooth') => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior
  });
};

export const scrollToElement = (elementId: string, behavior: 'smooth' | 'instant' = 'smooth') => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior,
      block: 'start'
    });
  }
};

// Function to handle anchor clicks
export const handleAnchorClick = (href: string) => {
  if (href.startsWith('#')) {
    const elementId = href.substring(1);
    scrollToElement(elementId);
    return true; // Indica que foi tratado como âncora
  }
  return false; // Não é uma âncora, deixa o comportamento padrão
};



