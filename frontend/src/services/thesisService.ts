import { Thesis } from '../types/thesis';
import { apiClient } from './apiClient';

// Switch this to false when the FastAPI backend is ready
const USE_MOCK = true;

const MOCK_THESIS: Thesis = {
  id: '1',
  title: 'Mi Proyecto Innovador',
  sections: [
    {
      id: 'context',
      title: 'Contexto',
      placeholder: 'Describe el entorno y la situación inicial...',
      content: ''
    },
    {
      id: 'challenge',
      title: 'Desafío',
      placeholder: '¿Cuál era el problema técnico o de negocio principal?',
      content: ''
    },
    {
      id: 'solution',
      title: 'Solución',
      placeholder: 'Explica tu arquitectura y decisiones técnicas...',
      content: ''
    },
    {
      id: 'results',
      title: 'Resultados',
      placeholder: '¿Qué impacto tuvo tu solución? (Métricas, logros)',
      content: ''
    }
  ],
  updatedAt: new Date().toISOString()
};

export const thesisService = {
  getThesis: async (id: string): Promise<Thesis> => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_THESIS), 500);
      });
    }
    
    const response = await apiClient.get<Thesis>(`/theses/${id}`);
    return response.data;
  },

  saveThesis: async (thesis: Thesis): Promise<Thesis> => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Mock Save:', thesis);
          resolve(thesis);
        }, 500);
      });
    }

    const response = await apiClient.put<Thesis>(`/theses/${thesis.id}`, thesis);
    return response.data;
  }
};
