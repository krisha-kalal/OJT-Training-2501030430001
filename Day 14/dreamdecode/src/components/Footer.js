import { Github, Instagram, MoonStar, Twitter } from 'lucide-react';
import { useApp } from '../App';

export default function Footer() {
  const { navigateTo } = useApp();

  return (
    <footer className="w-full glass-panel border-t border-cosmos-400/10 py-8 sm:py-12 mt-10 sm:mt-16 text-sm text-slate-400 light:text-slate-600 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 footer-grid">
        <div className="flex flex-col gap-4 footer-brand">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigateTo('home')}
            onKeyDown={(e) => e.key === 'Enter' && navigateTo('home')}
            role="button"
            tabIndex={0}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cosmos-500 to-dream-900 flex items-center justify-center shadow-lg shadow-cosmos-500/20 border border-cosmos-400/10">
              <MoonStar className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-xl tracking-tight bg-gradient-to-r from-white to-cosmos-200 bg-clip-text text-transparent">
              Moonmilk<span className="text-cosmos-400">Decode</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 light:text-slate-600 max-w-xs leading-relaxed">
            A modern psychological tool crafted to translate sleep symbols into actionable,
            life-affirming cosmic direction.
          </p>
        </div>

        <div className="flex flex-col gap-3 footer-col">
          <h4 className="text-xs uppercase font-extrabold tracking-wider text-white">Navigation</h4>
          {['home', 'dictionary', 'journal', 'explore'].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => navigateTo(page)}
              className="text-left hover:text-white transition-colors text-xs cursor-pointer capitalize"
            >
              {page === 'explore' ? 'AI Explore' : page === 'journal' ? 'Dream Journal' : page}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 footer-col">
          <h4 className="text-xs uppercase font-extrabold tracking-wider text-white">Dimensions</h4>
          {['Psychological', 'Spiritual', 'Emotional', 'Physical'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => navigateTo('dictionary', cat)}
              className="text-left hover:text-white transition-colors text-xs cursor-pointer"
            >
              {cat} Lens
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 footer-col sm:col-span-2 lg:col-span-1">
          <h4 className="text-xs uppercase font-extrabold tracking-wider text-white">Keep In Touch</h4>
          <div className="flex gap-3 justify-center sm:justify-start">
            {[Twitter, Github, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-full bg-white/5 border border-cosmos-400/20 hover:text-white hover:bg-white/10 transition-colors text-slate-400"
                aria-label={Icon.displayName}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <span className="text-[10px] text-slate-500">
            © 2026 DreamDecode. All sleep states reserved locally.
          </span>
        </div>
      </div>
    </footer>
  );
}
