import { useState, useEffect } from 'react';
import { Thesis, ThesisSection } from '../types/thesis';
import { thesisService } from '../services/thesisService';

export function useThesis(id: string) {
  const [thesis, setThesis] = useState<Thesis | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    thesisService.getThesis(id)
      .then((data) => {
        setThesis(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
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
    setError(null);
    try {
      const savedThesis = await thesisService.saveThesis(thesis);
      setThesis(savedThesis);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return { thesis, loading, saving, error, updateSection, save };
}
