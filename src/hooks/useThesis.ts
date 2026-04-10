import { useState, useEffect } from 'react';
import { Thesis, ThesisSection } from '../types/thesis';
import { thesisService } from '../services/thesisService';

export function useThesis(id: string) {
  const [thesis, setThesis] = useState<Thesis | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    thesisService.getThesis(id).then((data) => {
      setThesis(data);
      setLoading(false);
    });
  }, [id]);

  const updateSection = (sectionId: string, content: string) => {
    if (!thesis) return;
    
    const newSections = thesis.sections.map((s) => 
      s.id === sectionId ? { ...s, content } : s
    );
    
    setThesis({ ...thesis, sections: newSections });
  };

  const save = async () => {
    if (!thesis) return;
    setSaving(true);
    try {
      await thesisService.saveThesis(thesis);
    } finally {
      setSaving(false);
    }
  };

  return { thesis, loading, saving, updateSection, save };
}
