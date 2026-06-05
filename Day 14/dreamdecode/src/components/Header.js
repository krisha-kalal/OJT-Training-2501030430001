import { MoonStar } from 'lucide-react';
import { useApp } from '../App';
import Navbar from './Navbar';

export default function Header() {
  const { navigateTo } = useApp();

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-cosmos-400/10 transition-all duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div
            className="flex items-center gap-2.5 cursor-pointer transition-transform hover:scale-[1.02] shrink-0"
            onClick={() => navigateTo('home')}
            onKeyDown={(e) => e.key === 'Enter' && navigateTo('home')}
            role="button"
            tabIndex={0}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-cosmos-500 to-dream-900 flex items-center justify-center border border-cosmos-300/30 shadow-lg shadow-cosmos-500/10 shrink-0">
              <MoonStar className="w-4 h-4 sm:w-5 sm:h-5 text-cosmos-100" />
            </div>
            <span className="brand-lockup brand-title hidden xs:inline">
              Moonmilk<span className="text-cosmos-400 font-semibold italic">Decode</span>
            </span>
          </div>

          <Navbar inline />
        </div>
      </div>
      <Navbar drawer />
    </header>
  );
}
