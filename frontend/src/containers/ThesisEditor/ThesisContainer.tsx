import React from 'react';
import { useThesis } from '../../hooks/useThesis';
import { ThesisPresenter } from '../../components/ThesisEditor/ThesisPresenter';
import { Target } from 'lucide-react';

export const ThesisContainer: React.FC = () => {
  const { thesis, loading, saving, error, updateSection, save } = useThesis('1');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500">Cargando tu tesis...</p>
        </div>
      </div>
    );
  }

  if (error && !thesis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-red-100 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error de Conexión</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-black text-white py-3 rounded-xl font-medium"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <ThesisPresenter
      thesis={thesis!}
      saving={saving}
      error={error}
      onUpdateSection={updateSection}
      onSave={save}
    />
  );
};
