// Utility functions for course management

export interface PurchasedCourse {
  id: number;
  title: string;
  purchaseDate: string;
  lastAccessDate?: string;
}

// Inicializar sistema de cursos comprados (vazio por padrão)
export const initializePurchasedCourses = () => {
  // Limpar dados antigos de demonstração
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.includes('course-') && key.includes('-purchased')) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  // Inicializar com array vazio - usuário deve comprar para ter acesso
  localStorage.setItem('purchased-courses', JSON.stringify([]));
};

// Verificar se um curso foi comprado
export const isCourseOwned = (courseId: number): boolean => {
  // Verificar se o usuário está logado
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (isLoggedIn) {
    // Para usuários logados, simular que os cursos 1, 2, 3 e 4 foram adquiridos
    // (correspondem aos cursos da seção "Continue Assistindo")
    const ownedCourseIds = [1, 2, 3, 4];
    if (ownedCourseIds.includes(courseId)) {
      return true;
    }
  }
  
  // Verificar compra real no localStorage
  return localStorage.getItem(`course-${courseId}-purchased`) === 'true';
};

// Obter lista de cursos comprados
export const getPurchasedCourses = (): PurchasedCourse[] => {
  try {
    const data = localStorage.getItem('purchased-courses');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error parsing purchased courses:', error);
    return [];
  }
};

// Adicionar curso comprado
export const addPurchasedCourse = (course: PurchasedCourse): void => {
  try {
    const existingCourses = getPurchasedCourses();
    const updatedCourses = [...existingCourses.filter(c => c.id !== course.id), course];
    localStorage.setItem('purchased-courses', JSON.stringify(updatedCourses));
    localStorage.setItem(`course-${course.id}-purchased`, 'true');
  } catch (error) {
    console.error('Error adding purchased course:', error);
  }
};

// Atualizar último acesso do curso
export const updateLastAccess = (courseId: number): void => {
  try {
    const courses = getPurchasedCourses();
    const updatedCourses = courses.map(course => 
      course.id === courseId 
        ? { ...course, lastAccessDate: new Date().toISOString().split('T')[0] }
        : course
    );
    localStorage.setItem('purchased-courses', JSON.stringify(updatedCourses));
  } catch (error) {
    console.error('Error updating last access:', error);
  }
};

export default {
  initializePurchasedCourses,
  isCourseOwned,
  getPurchasedCourses,
  addPurchasedCourse,
  updateLastAccess
}; 