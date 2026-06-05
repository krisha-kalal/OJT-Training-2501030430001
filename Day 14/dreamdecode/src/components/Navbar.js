import { Menu, Moon, Sun } from 'lucide-react';
import { useApp } from '../App';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'dictionary', label: 'Dictionary' },
  { id: 'journal', label: 'Dream Journal' },
  { id: 'explore', label: 'Explore', badge: 'AI' },
  { id: 'about', label: 'Our Mission' },
];

export default function Navbar({ inline, drawer }) {
  const {
    currentPage,
    navigateTo,
    mobileMenuOpen,
    toggleMobileMenu,
    theme,
    toggleTheme,
  } = useApp();

  const navClass = (id) =>
    `nav-item py-2 h-full flex items-center border-b-2 transition-all ${
      currentPage === id
        ? 'active-nav-link text-cosmos-400 border-cosmos-400'
        : 'text-slate-400 hover:text-cosmos-300 border-transparent'
    }`;

  if (drawer) {
    if (!mobileMenuOpen) return null;
    return (
      <div className="md:hidden glass-panel border-b border-cosmos-400/20 absolute top-full left-0 w-full py-6 px-4 sm:px-6 flex flex-col gap-3 shadow-2xl z-50 max-h-[min(80dvh,520px)] overflow-y-auto">
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => navigateTo(id)}
            className="text-left py-3 px-4 rounded-xl text-slate-300 hover:text-cosmos-400 hover:bg-white/5 font-semibold text-sm transition-all"
          >
            {label === 'Explore' ? 'Explore AI' : label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => navigateTo('explore')}
          className="w-full text-center py-3.5 rounded-full bg-cosmos-400 text-cosmos-950 font-bold tracking-widest text-xs uppercase shadow-lg mt-2"
        >
          Book Analysis
        </button>
      </div>
    );
  }

  if (!inline) return null;

  return (
    <>
      <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase font-semibold h-full">
        {NAV_ITEMS.map(({ id, label, badge }) => (
          <button
            key={id}
            type="button"
            onClick={() => navigateTo(id)}
            className={`${navClass(id)} ${badge ? 'gap-1' : ''}`}
          >
            {label}
            {badge && (
              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-cosmos-400 text-cosmos-950 rounded tracking-tight">
                {badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="hidden md:flex items-center gap-4 shrink-0">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2.5 rounded-full glass-panel text-slate-300 hover:text-cosmos-400 transition-all border border-cosmos-400/20 flex items-center justify-center cursor-pointer"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-cosmos-400 animate-spin-slow" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
        <button
          type="button"
          onClick={() => navigateTo('explore')}
          className="px-6 py-2.5 rounded-full border border-cosmos-400 text-cosmos-400 hover:bg-cosmos-400 hover:text-cosmos-950 text-xs tracking-widest font-bold uppercase transition-all duration-300 cursor-pointer shadow-lg shadow-cosmos-400/5"
        >
          Book Analysis
        </button>
      </div>

      <div className="flex items-center gap-3 md:hidden shrink-0">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2.5 rounded-full glass-panel text-slate-300 hover:text-cosmos-400 flex items-center justify-center"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-cosmos-400" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="p-2.5 rounded-full glass-panel text-slate-300 hover:text-white flex items-center justify-center"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
