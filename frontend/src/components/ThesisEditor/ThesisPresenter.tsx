import React, { useState } from 'react';
import { Thesis, ThesisSection } from '../../types/thesis';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Eye, Edit3, ChevronRight, Layout, Code, Target, BarChart3 } from 'lucide-react';

interface ThesisPresenterProps {
  thesis: Thesis;
  saving: boolean;
  error: string | null;
  onUpdateSection: (sectionId: string, content: string) => void;
  onSave: () => void;
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  context: <Layout className="w-5 h-5" />,
  challenge: <Target className="w-5 h-5" />,
  solution: <Code className="w-5 h-5" />,
  results: <BarChart3 className="w-5 h-5" />
};

export const ThesisPresenter: React.FC<ThesisPresenterProps> = ({
  thesis,
  saving,
  error,
  onUpdateSection,
  onSave
}) => {
  const [activeSection, setActiveSection] = useState<string>(thesis.sections[0].id);
  const [isPreview, setIsPreview] = useState(false);

  const currentSection = thesis.sections.find(s => s.id === activeSection)!;

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#141414] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-black text-white p-2 rounded-lg">
            <Edit3 className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">{thesis.title}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            {isPreview ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {isPreview ? 'Editar' : 'Vista Previa'}
          </button>
          
          <button
            onClick={onSave}
            disabled={saving}
            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all text-sm font-medium shadow-sm ${
              error ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-black text-white hover:bg-gray-800'
            } disabled:opacity-50`}
          >
            <Save className="w-4 h-4" />
            {saving ? 'Guardando...' : error ? 'Error (Reintentar)' : 'Publicar Tesis'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Secciones Guiadas</p>
          {thesis.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                activeSection === section.id
                  ? 'bg-white shadow-md border-l-4 border-black'
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={activeSection === section.id ? 'text-black' : 'text-gray-400'}>
                  {SECTION_ICONS[section.id]}
                </span>
                <span className="font-medium text-sm">{section.title}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${activeSection === section.id ? 'rotate-90' : ''}`} />
            </button>
          ))}
        </aside>

        {/* Editor/Preview Area */}
        <section className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={isPreview ? 'preview' : 'edit'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  {SECTION_ICONS[activeSection]}
                  {currentSection.title}
                </h2>
                {!isPreview && (
                  <span className="text-xs font-mono text-gray-400">Markdown Soportado</span>
                )}
              </div>

              <div className="flex-1 flex flex-col">
                {isPreview ? (
                  <div className="p-8 prose prose-slate max-w-none">
                    {currentSection.content ? (
                      <div className="markdown-body">
                        <Markdown remarkPlugins={[remarkGfm]}>
                          {currentSection.content}
                        </Markdown>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
                        <Eye className="w-12 h-12 mb-4 opacity-20" />
                        <p>No hay contenido para previsualizar en esta sección.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <textarea
                    value={currentSection.content}
                    onChange={(e) => onUpdateSection(activeSection, e.target.value)}
                    placeholder={currentSection.placeholder}
                    className="w-full h-full p-8 focus:outline-none resize-none text-lg leading-relaxed font-mono"
                    spellCheck={false}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Tips / Guidance */}
          {!isPreview && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
              <div className="text-blue-500 mt-1">
                <Layout className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-blue-900">Tip de Storytelling</p>
                <p className="text-sm text-blue-700">
                  {activeSection === 'context' && 'Empieza por el "por qué". ¿Qué te motivó a crear esto?'}
                  {activeSection === 'challenge' && 'Sé específico con los problemas técnicos. Las empresas buscan resolutores.'}
                  {activeSection === 'solution' && 'Usa bloques de código para mostrar tu elegancia técnica.'}
                  {activeSection === 'results' && 'Habla de impacto real. ¿Es más rápido? ¿Más eficiente?'}
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
