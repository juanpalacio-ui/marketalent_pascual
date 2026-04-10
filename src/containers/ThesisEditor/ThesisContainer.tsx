import React from 'react';
import { useThesis } from '../../hooks/useThesis';
import { ThesisPresenter } from '../../components/ThesisEditor/ThesisPresenter';

export const ThesisContainer: React.FC = () => {
  const { thesis, loading, saving, updateSection, save } = useThesis('1');

  if (loading || !thesis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500">Cargando tu tesis...</p>
        </div>
      </div>
    );
  }

  return (
    <ThesisPresenter
      thesis={thesis}
      saving={saving}
      onUpdateSection={updateSection}
      onSave={save}
    />
  );
};
