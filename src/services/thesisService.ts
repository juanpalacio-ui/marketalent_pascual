import { Thesis } from '../types/thesis';

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
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_THESIS), 500);
    });
  },
  saveThesis: async (thesis: Thesis): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Thesis saved:', thesis);
        resolve();
      }, 500);
    });
  }
};
