import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Language {
  id: string;
  code: string;
  name: string;
  native_name: string;
  is_default: boolean;
  is_active: boolean;
}

interface LanguageContextType {
  currentLanguage: string;
  languages: Language[];
  setCurrentLanguage: (language: string) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .eq('is_active', true)
        .order('is_default', { ascending: false });

      if (error) throw error;
      return data as Language[];
    },
  });
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: languages = [], isLoading } = useLanguages();
  const [currentLanguage, setCurrentLanguageState] = useState<string>('en');

  // Initialize with default language or saved preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    const defaultLanguage = languages.find(lang => lang.is_default)?.code || 'en';
    
    setCurrentLanguageState(savedLanguage || defaultLanguage);
  }, [languages]);

  const setCurrentLanguage = (language: string) => {
    setCurrentLanguageState(language);
    localStorage.setItem('preferred-language', language);
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      languages,
      setCurrentLanguage,
      isLoading
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};