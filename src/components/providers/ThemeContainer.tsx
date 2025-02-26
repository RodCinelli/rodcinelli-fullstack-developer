'use client'

import { createContext, useState, useEffect, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../../styles/global-styles'
import { lightTheme, darkTheme, Theme } from '../../styles/theme'

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: Theme;
};

// Inicie com um valor padrão para o tema
export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
  theme: lightTheme, // Tema padrão para SSR
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeContainer({ children }: { children: React.ReactNode }) {
  // Importante: Comece sempre com um valor padrão definido para SSR
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Define o tema inicial com o lightTheme
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);
  
  useEffect(() => {
    setMounted(true);
    try {
      // Acesse localStorage apenas no lado do cliente
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
        const newIsDarkMode = savedTheme === 'dark';
        setIsDarkMode(newIsDarkMode);
        setCurrentTheme(newIsDarkMode ? darkTheme : lightTheme);
      } else if (typeof window !== 'undefined') {
        // Verifica preferência do sistema apenas no cliente
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
        setCurrentTheme(prefersDark ? darkTheme : lightTheme);
        localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
      }
    } catch (error) {
      // Captura erros de localStorage (ex: em navegadores com cookies desativados)
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  const toggleTheme = () => {
    const newThemeValue = !isDarkMode;
    setIsDarkMode(newThemeValue);
    setCurrentTheme(newThemeValue ? darkTheme : lightTheme);
    
    try {
      localStorage.setItem('theme', newThemeValue ? 'dark' : 'light');
      
      // Adicionar ou remover classe no body para estilos globais
      if (typeof document !== 'undefined') {
        if (newThemeValue) {
          document.body.classList.add('dark-theme');
        } else {
          document.body.classList.remove('dark-theme');
        }
      }
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };

  // Aplicar classe ao body no carregamento inicial
  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      if (isDarkMode) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }
  }, [isDarkMode, mounted]);
  
  // Sempre disponibilize o tema no contexto
  const contextValue = { isDarkMode, toggleTheme, theme: currentTheme };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
} 