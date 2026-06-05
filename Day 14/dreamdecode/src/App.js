import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

export const AppContext = createContext(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within App');
  return ctx;
}

const MOCK_JOURNAL = [
  {
    id: 'mock-1',
    title: 'Running Down Marble Halls',
    date: '2026-05-24',
    mood: 'Anxious',
    description:
      'I was running down an endless hallway lined with cosmic marble pillars. A massive golden clock with angel wings was slowly ticking behind me, flying and making everything dark.',
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [dictCategory, setDictCategory] = useState('all');
  const [dictSearch, setDictSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [journalEntries, setJournalEntries] = useState(() => {
    try {
      const stored = localStorage.getItem('dreamdecode_journal');
      if (stored) return JSON.parse(stored);
    } catch {
      /* ignore corrupt storage */
    }
    return MOCK_JOURNAL;
  });
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('dreamdecode_journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  const navigateTo = useCallback((pageId, categoryFilter = null) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    if (pageId === 'dictionary' && categoryFilter) {
      setDictCategory(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((open) => !open);
  }, []);

  const openModal = useCallback((data) => setModal(data), []);
  const closeModal = useCallback(() => setModal(null), []);

  const value = {
    currentPage,
    navigateTo,
    dictCategory,
    setDictCategory,
    dictSearch,
    setDictSearch,
    mobileMenuOpen,
    toggleMobileMenu,
    theme,
    toggleTheme,
    journalEntries,
    setJournalEntries,
    modal,
    openModal,
    closeModal,
  };

  return (
    <AppContext.Provider value={value}>
      <div className="app-shell bg-cosmos-950 text-slate-100 transition-colors duration-300 font-sans relative min-h-screen overflow-x-hidden light:bg-amber-50/30 light:text-slate-900 flex flex-col">
        <div className="relative z-10 flex flex-col flex-grow min-h-screen w-full">
          <Header />
          <Content />
          <Footer />
        </div>
      </div>
    </AppContext.Provider>
  );
}
