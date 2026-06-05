import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,BookMarked,BookOpen,BrainCircuit,Check,ChevronDown,Compass,
  Edit,Feather,Plus,Search,SearchCode,Sparkles,Star,Trash2,X
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useApp } from '../App';
import { auraWaveSettings, dictionaryData, oracleCards } from '../data/dictionaryData';

function DynamicIcon({ name, className = '' }) {
  const pascal = name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  const Icon = LucideIcons[pascal] || LucideIcons.Star;
  return <Icon className={className} />;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 160 };
    const colors = [
      'rgba(224, 130, 149, 0.45)',
      'rgba(167, 139, 250, 0.45)',
      'rgba(110, 231, 183, 0.35)',
      'rgba(103, 232, 249, 0.35)',
    ];

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.originalSize = size;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;

        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += forceDirectionX * force * 1.5;
            this.y += forceDirectionY * force * 1.5;
            this.size = Math.min(this.originalSize * 2.2, 5);
          } else if (this.size > this.originalSize) {
            this.size -= 0.1;
          }
        } else if (this.size > this.originalSize) {
          this.size -= 0.1;
        }
        this.draw();
      }
    }

    const adjustSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      let count = Math.floor((canvas.width * canvas.height) / (isMobile ? 18000 : 11000));
      count = Math.min(Math.max(count, isMobile ? 25 : 40), isMobile ? 70 : 120);
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 0.8;
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 0.4 - 0.2,
            Math.random() * 0.4 - 0.2,
            size,
            colors[Math.floor(Math.random() * colors.length)]
          )
        );
      }
    };

    const connectParticles = () => {
      const maxDistance = 140;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            let opacity = (1 - distance / maxDistance) * 0.18;
            if (mouse.x != null && mouse.y != null) {
              const mouseToA = Math.hypot(mouse.x - particles[a].x, mouse.y - particles[a].y);
              if (mouseToA < mouse.radius) opacity *= 2.2;
            }
            ctx.strokeStyle = `rgba(224, 130, 149, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      connectParticles();
      animationId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };
    const onResize = () => {
      adjustSize();
      initParticles();
    };

    adjustSize();
    initParticles();
    animate();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseOut);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      id="cosmic-particle-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 dark:opacity-80 light:opacity-40"
    />
  );
}

function shootCosmicSparkles(originX, originY) {
  const colors = ['#e08295', '#a78bfa', '#f7ccd5', '#667eea', '#38bdf8'];
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'cosmic-particle';
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 120 + 40;
    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    Object.assign(particle.style, {
      left: `${originX}px`,
      top: `${originY}px`,
      width: `${size}px`,
      height: `${size}px`,
      background: color,
      borderRadius: '50%',
      boxShadow: `0 0 8px ${color}`,
      '--dx': `${Math.sin(angle) * distance}px`,
      '--dy': `${Math.cos(angle) * distance}px`,
      '--rot': `${Math.random() * 360 + 180}deg`,
    });
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1200);
  }
}

function FlipCard({ card }) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState('');

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const rotX = -((e.clientY - rect.top) / rect.height - 0.5) * 30;
    setTilt(`rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`);
  };

  const handleClick = (e) => {
    setFlipped((f) => !f);
    shootCosmicSparkles(e.clientX, e.clientY);
  };

  return (
    <div
      className={`flip-card-wrap ${flipped ? 'is-flipped' : ''}`}
      onClick={handleClick}
    >
      <div
        className="flip-card-front w-full h-full p-1 border border-cosmos-400/30 rounded-3xl bg-gradient-to-b from-indigo-950 to-cosmos-950 flex flex-col items-center justify-between text-center shadow-xl tilt-card"
        style={{ transform: tilt }}
        onMouseMove={handleMove}
        onMouseLeave={() => setTilt('')}
      >
        <div className="pt-6 opacity-30">
          <DynamicIcon name={card.topIcon} className="w-5 h-5 text-cosmos-400" />
        </div>
        <div className="tilt-card-inner flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-cosmos-400/10 flex items-center justify-center border border-cosmos-400/20 mb-4 text-cosmos-300">
            <DynamicIcon
              name={card.icon}
              className={`w-8 h-8 ${card.spinIcon ? 'animate-spin-slow' : ''}`}
            />
          </div>
          <h3 className="font-serif text-xl text-white">{card.title}</h3>
          <span className="text-[9px] tracking-widest uppercase text-cosmos-400 mt-2 font-semibold">
            {card.subtitle}
          </span>
        </div>
        <span className="pb-6 text-[10px] tracking-widest text-slate-500 uppercase font-bold hover:text-cosmos-400 transition-colors">
          Tap To Reveal
        </span>
      </div>
      <div className="flip-card-back w-full h-full p-6 border border-cosmos-400 rounded-3xl bg-cosmos-950 flex flex-col justify-between shadow-2xl">
        <div className="flex justify-between items-center border-b border-cosmos-400/20 pb-2">
          <span className="text-[10px] tracking-widest text-cosmos-400 font-bold">MANTRA</span>
          <Sparkles className="w-4 h-4 text-cosmos-400" />
        </div>
        <p className="font-serif text-base italic text-cosmos-100 text-center leading-relaxed">
          {card.mantra}
        </p>
        <div className="bg-cosmos-400/10 p-3 rounded-xl border border-cosmos-400/20 text-center">
          <span className="block text-[9px] uppercase tracking-widest font-bold text-cosmos-400">
            INTEGRATION TASK
          </span>
          <p className="text-[10px] text-slate-300 mt-1">{card.task}</p>
        </div>
      </div>
    </div>
  );
}

function InfoModal() {
  const { modal, closeModal } = useApp();
  if (!modal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
        onClick={closeModal}
        aria-hidden
      />
      <div className="info-modal-panel max-w-xl sm:rounded-3xl rounded-t-3xl w-full">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-cosmos-400/10 text-cosmos-400 flex items-center justify-center font-bold">
              {modal.icon ? (
                <DynamicIcon name={modal.icon} className="w-5 h-5" />
              ) : (
                <BookOpen className="w-5 h-5" />
              )}
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-white">
                {modal.title}
              </h2>
              <span className="inline-block mt-0.5 text-xs text-cosmos-400 font-semibold uppercase tracking-wider">
                {modal.meta}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-col gap-4 text-sm leading-relaxed border-t border-b border-cosmos-400/10 py-5">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5">
              Deep Interpretation
            </h4>
            <p className="text-slate-300 light:text-slate-700">{modal.description}</p>
          </div>
          <div className="info-modal-meta-grid">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5">
                {modal.freqLabel || 'Frequency Metrics'}
              </h4>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-xs text-cosmos-300 font-medium">
                {modal.frequency}
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1.5">
                {modal.symLabel || 'Associated Symbolism'}
              </h4>
              <span className="text-xs text-emerald-300 font-medium">{modal.symbolism}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="px-6 py-2.5 bg-cosmos-400 hover:bg-cosmos-300 text-cosmos-950 font-bold uppercase tracking-wide text-xs rounded-full transition-colors shadow cursor-pointer"
          >
            Integrate Guidance
          </button>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const { navigateTo, setDictSearch, setDictCategory, openModal } = useApp();
  const [quickSearch, setQuickSearch] = useState('');
  const [activeAura, setActiveAura] = useState('peaceful');
  const [openFaq, setOpenFaq] = useState(null);
  const aura = auraWaveSettings[activeAura];

  const handleQuickSearch = () => {
    if (quickSearch.trim()) {
      setDictCategory('all');
      setDictSearch(quickSearch);
      navigateTo('dictionary');
    }
  };

  const trending = dictionaryData.slice(0, 3);

  return (
    <section className="page-section page-section--loose">
      <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 justify-between relative">
        <div className="absolute -top-10 -left-10 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 morphing-aura opacity-30 pointer-events-none z-0" />
        <div className="w-full lg:w-6/12 flex flex-col gap-6 text-center lg:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cosmos-400/10 border border-cosmos-400/30 text-cosmos-400 text-xs font-semibold tracking-wide self-center lg:self-start">
            <span className="w-2 h-2 rounded-full bg-cosmos-400 animate-pulse" />
            Drink in the Divine Guidance of Your Soul
          </div>
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-tight text-white dark:text-white light:text-slate-900">
            Align with Your <br />
            <span className="italic font-normal text-cosmos-400">Cosmic Blueprint</span>
          </h1>
          <p className="text-base text-slate-400 light:text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Welcome to a sacred sanctuary where your nighttime visions match your cosmic map. We
            blend high-intelligence dream interpretation, lunar cycles, and ancient tarots to align
            your waking mind with structural soul-truths.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto lg:mx-0 w-full">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuickSearch()}
                placeholder="What did you dream of? (water, snakes...)"
                className="w-full pl-11 pr-4 py-3.5 bg-cosmos-950/40 border border-cosmos-400/20 rounded-full focus:border-cosmos-400 focus:ring-1 focus:ring-cosmos-400 text-slate-100 placeholder-slate-400 outline-none transition-all text-sm"
              />
            </div>
            <button
              type="button"
              onClick={handleQuickSearch}
              className="px-6 py-3.5 bg-cosmos-400 hover:bg-cosmos-300 text-cosmos-950 font-bold uppercase tracking-wider text-xs rounded-full transition-colors shrink-0 cursor-pointer"
            >
              Lookup Symbol
            </button>
          </div>
        </div>
        <div className="w-full lg:w-5/12 flex justify-center relative mt-4 lg:mt-0">
          <div className="hero-portal">
            <div className="absolute inset-0 archway-card p-2 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden">
              <div className="w-full flex justify-between px-6 pt-6 opacity-40">
                <Sparkles className="w-4 h-4 text-cosmos-400 animate-pulse" />
                <Compass className="w-4 h-4 text-cosmos-400 animate-spin-slow" />
              </div>
              <div className="flex flex-col items-center text-center px-4 my-auto">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cosmos-400 to-indigo-900 border border-cosmos-300/30 flex items-center justify-center mb-6 shadow-xl relative animate-subtle-float">
                  <div className="absolute inset-0.5 rounded-full border border-dashed border-cosmos-300/20 animate-spin-slow" />
                  <Star className="w-10 h-10 text-cosmos-200" />
                </div>
                <h3 className="font-serif text-2xl text-cosmos-100 italic mb-2">Lunar Notes</h3>
                <p className="text-xs text-slate-400 light:text-slate-600 px-2 leading-relaxed">
                  &quot;The dream you saw tonight corresponds to the Waxing Crescent phase — a
                  transition of active manifest desires and early courage.&quot;
                </p>
              </div>
              <div className="w-full flex items-center justify-center pb-6 gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cosmos-400" />
                <div className="h-[1px] w-12 bg-cosmos-400/20" />
                <span className="text-[10px] tracking-widest uppercase font-semibold text-cosmos-400">
                  Cosmic Map
                </span>
                <div className="h-[1px] w-12 bg-cosmos-400/20" />
                <span className="w-1.5 h-1.5 rounded-full bg-cosmos-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <span className="text-xs font-bold text-cosmos-400 uppercase tracking-widest">
            Draw Your Message
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white">The Subconscious Oracle</h2>
          <p className="text-sm text-slate-400 light:text-slate-600">
            Hover to feel the physical tilt depth. Click any cosmic card to flip it in 3D and
            unleash a burst of astral dust.
          </p>
        </div>
        <div className="perspective-container flex flex-col sm:flex-row flex-wrap justify-center items-stretch sm:items-center gap-6 sm:gap-8 py-6 sm:py-10 w-full max-w-5xl mx-auto">
          {oracleCards.map((card) => (
            <FlipCard key={card.id} card={card} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 sm:gap-10 glass-panel p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-cosmos-400/20 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 relative z-10">
          <div className="w-full lg:w-5/12 flex flex-col gap-6">
            <span className="text-xs font-bold text-cosmos-400 uppercase tracking-widest">
              Aura Wave Engine
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">Synthesize Your Dream Aura</h2>
            <p className="text-sm text-slate-400 light:text-slate-600">
              Select the residual emotional vibration of your sleep state. Watch the dynamic, fluid
              SVG aura transform color waves, pulse speeds, and gradients in real-time.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { key: 'peaceful', label: '😌 Peaceful & Restful', dot: 'bg-emerald-400' },
                { key: 'anxious', label: '😰 Anxiety & Chase Cycles', dot: 'bg-amber-400' },
                { key: 'mysterious', label: '✨ Mysterious & Esoteric', dot: 'bg-cosmos-400' },
                { key: 'lucid', label: '🌀 Lucid & Self-Sovereign', dot: 'bg-indigo-500' },
              ].map(({ key, label, dot }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveAura(key)}
                  className={`aura-selector-btn px-5 py-3.5 rounded-2xl flex items-center justify-between text-left group hover:border-cosmos-400 transition-all cursor-pointer border ${
                    activeAura === key
                      ? 'border-cosmos-400 bg-cosmos-900'
                      : 'border-cosmos-400/25 bg-cosmos-950'
                  }`}
                >
                  <span className="font-semibold text-slate-200 group-hover:text-white text-sm">
                    {label}
                  </span>
                  <span className={`w-3 h-3 rounded-full ${dot} animate-pulse`} />
                </button>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-6/12 flex items-center justify-center relative h-64 xs:h-72 sm:h-80 md:h-96 min-h-[16rem]">
            <div
              className="w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full transition-all duration-1000 ease-in-out morphing-aura relative flex items-center justify-center shadow-inner"
              style={{
                background: aura.background,
                filter: aura.blur,
                animationDuration: aura.speed,
              }}
            >
              <div className="absolute inset-10 rounded-full border border-dashed border-white/25 animate-spin-slow" />
            </div>
            <div className="absolute flex flex-col items-center text-center p-4">
              <span className="text-[10px] tracking-widest uppercase font-bold text-white opacity-60">
                FREQUENCY OUTPUT
              </span>
              <h3 className="font-serif text-2xl text-white mt-1 animate-pulse">{aura.label}</h3>
              <p className="text-xs text-cosmos-200 mt-1 font-mono">{aura.freq}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-cosmos-400/15 pb-4">
          <div>
            <h2 className="font-serif text-3xl text-white">How We Can Work Together</h2>
            <p className="text-slate-400 light:text-slate-600 text-sm mt-1">
              Navigate common dream manifestations through direct structural definitions.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('dictionary')}
            className="text-cosmos-400 hover:text-cosmos-300 text-xs tracking-widest uppercase font-bold flex items-center gap-1 group"
          >
            Explore Dictionary{' '}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trending.map((item, index) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() =>
                openModal({
                  title: item.title,
                  meta: `${item.category} Perspective`,
                  description: item.fullDesc,
                  frequency: item.frequency,
                  symbolism: item.symbolism,
                  icon: item.icon,
                })
              }
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                openModal({
                  title: item.title,
                  meta: `${item.category} Perspective`,
                  description: item.fullDesc,
                  frequency: item.frequency,
                  symbolism: item.symbolism,
                  icon: item.icon,
                })
              }
              className="archway-card p-6 flex flex-col justify-between gap-6 cursor-pointer relative"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-cosmos-400/20 to-transparent" />
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cosmos-400 tracking-widest uppercase">
                  0{index + 1} / Archetype
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-cosmos-400/10 text-cosmos-300 border border-cosmos-400/20">
                  {item.category}
                </span>
              </div>
              <div className="h-44 rounded-t-full bg-gradient-to-b from-indigo-950/40 to-cosmos-950/80 border border-cosmos-400/10 flex items-center justify-center p-4 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 border border-dashed border-cosmos-400/5 rounded-t-full m-1 animate-spin-slow" />
                <DynamicIcon name={item.icon} className="w-12 h-12 text-cosmos-400 animate-subtle-float" />
              </div>
              <div className="text-center">
                <h3 className="font-serif text-xl text-white mb-2 tracking-wide">{item.title}</h3>
                <p className="text-xs text-slate-400 light:text-slate-600 line-clamp-2 leading-relaxed px-2">
                  {item.shortDesc}
                </p>
              </div>
              <div className="flex justify-center border-t border-cosmos-400/10 pt-4">
                <span className="text-[10px] tracking-widest uppercase font-bold text-cosmos-400 hover:text-cosmos-300 flex items-center gap-1.5">
                  Decipher Path <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <span className="text-xs font-bold text-cosmos-400 uppercase tracking-widest">
            Aura Feedback
          </span>
          <h2 className="font-serif text-3xl text-white">Visions from Fellow Dreamers</h2>
          <p className="text-slate-400 light:text-slate-600 text-sm">
            Real reports from users aligning their waking self through our analysis systems.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                '"The recurring dental fallouts always scared me. Discovering the connection to my physical clenching and stress through the physical category changed my rest entirely."',
              initials: 'ER',
              name: 'Elena Rostova',
              role: 'Creative Director',
            },
            {
              quote:
                '"The Dream Journal with local browser encryption makes it so easy to write private dreams without fear. It feels like an intimate grimoire on my screen."',
              initials: 'JC',
              name: 'Jonathan Cole',
              role: 'Psychology Scholar',
            },
            {
              quote:
                '"Excellent UX! The simulated AI model parses my exact keywords and outputs actionable real-world integrations immediately. Beautiful custom layout design."',
              initials: 'MH',
              name: 'Maya Harris',
              role: 'Aura Therapist',
            },
          ].map((t) => (
            <div key={t.initials} className="glass-panel p-6 rounded-3xl flex flex-col justify-between gap-6">
              <p className="text-sm italic text-slate-300 light:text-slate-700 leading-relaxed">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cosmos-400 to-indigo-900 flex items-center justify-center font-bold text-white text-xs">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <span className="text-xs text-slate-400">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full">
        <div className="text-center flex flex-col gap-2">
          <h2 className="font-serif text-3xl text-white">Celestial Insights FAQ</h2>
          <p className="text-slate-400 light:text-slate-600 text-sm">
            Answering common mysteries about lunar alignment and dream decodes.
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {[
            {
              q: 'How do moon phases align with dream states?',
              a: 'Historically and biologically, your REM sleep cycles adjust with ambient light and magnetic fields. During full moons, dreams tend to be highly vivid and charged with shadow traits, while crescent phases assist with manifesting positive desires.',
            },
            {
              q: 'Is my local journal kept secure?',
              a: (
                <>
                  Yes. All your journal inputs are saved strictly to your local machine via{' '}
                  <code className="bg-cosmos-400/10 px-1 py-0.5 rounded text-cosmos-300">
                    localStorage
                  </code>
                  . No data is synchronized with corporate databases.
                </>
              ),
            },
          ].map((faq, i) => (
            <div key={i} className="faq-item glass-panel rounded-2xl overflow-hidden transition-all duration-300">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="faq-toggle w-full px-6 py-4 flex justify-between items-center text-left text-white font-semibold"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform text-cosmos-400 ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-slate-300 light:text-slate-700 text-sm leading-relaxed border-t border-cosmos-400/10 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DictionaryPage() {
  const { dictCategory, setDictCategory, dictSearch, setDictSearch, openModal } = useApp();
  const categories = ['all', 'Psychological', 'Spiritual', 'Emotional', 'Physical'];

  const filtered = useMemo(() => {
    let items = dictionaryData;
    if (dictCategory !== 'all') {
      items = items.filter((item) => item.category.toLowerCase() === dictCategory.toLowerCase());
    }
    if (dictSearch.trim()) {
      const q = dictSearch.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.shortDesc.toLowerCase().includes(q) ||
          item.fullDesc.toLowerCase().includes(q)
      );
    }
    return items;
  }, [dictCategory, dictSearch]);

  return (
    <section className="page-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
        <div className="min-w-0">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">Archetypal Dream Dictionary</h1>
          <p className="text-slate-400 light:text-slate-600 text-sm mt-1">
            Search or filter through deep psychological definitions of common dreams.
          </p>
        </div>
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={dictSearch}
            onChange={(e) => setDictSearch(e.target.value)}
            placeholder="Type a dream symbol..."
            className="w-full pl-11 pr-4 py-3 bg-cosmos-950/40 border border-cosmos-400/20 rounded-full focus:border-cosmos-400 focus:ring-1 focus:ring-cosmos-400 focus:outline-none text-slate-100 placeholder-slate-400 text-sm min-h-[44px]"
          />
        </div>
      </div>

      <div className="filter-pills filter-pills--scroll">
        <span className="text-xs font-semibold text-slate-400 mr-1 sm:mr-2 shrink-0">Filter Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setDictCategory(cat)}
            className={`filter-pill px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
              dictCategory === cat
                ? 'bg-cosmos-400 text-cosmos-950 shadow-md'
                : 'bg-cosmos-950 text-slate-300 hover:bg-cosmos-900 border border-cosmos-400/20'
            }`}
          >
            {cat === 'all' ? 'All Symbols' : cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-slate-400">
            <SearchCode className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">No Symbols Found</h3>
            <p className="text-slate-400 light:text-slate-600 text-sm mt-1">
              Try spelling differently or clearing search filters.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setDictSearch('');
              setDictCategory('all');
            }}
            className="px-4 py-2 bg-cosmos-400/20 text-cosmos-400 border border-cosmos-400/20 rounded-full text-sm font-semibold hover:bg-cosmos-400 hover:text-cosmos-950 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() =>
                openModal({
                  title: item.title,
                  meta: `${item.category} Perspective`,
                  description: item.fullDesc,
                  frequency: item.frequency,
                  symbolism: item.symbolism,
                  icon: item.icon,
                })
              }
              className="glass-panel rounded-3xl p-6 flex flex-col justify-between gap-5 cursor-pointer relative overflow-hidden border border-cosmos-400/10 hover:border-cosmos-400/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-full bg-cosmos-400/15 text-cosmos-400 flex items-center justify-center">
                  <DynamicIcon name={item.icon} className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full bg-cosmos-400/10 text-cosmos-300 border border-cosmos-400/20">
                  {item.category}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-lg text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">
                  {item.shortDesc}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-cosmos-400 font-bold border-t border-cosmos-400/10 pt-3">
                <span>Deep-dive Meaning</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function JournalPage() {
  const { journalEntries, setJournalEntries, openModal } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    entryId: '',
    title: '',
    date: '',
    mood: 'Peaceful',
    description: '',
  });

  useEffect(() => {
    const syncFormVisibility = () => {
      if (window.innerWidth >= 1024) setShowForm(true);
    };
    syncFormVisibility();
    window.addEventListener('resize', syncFormVisibility);
    return () => window.removeEventListener('resize', syncFormVisibility);
  }, []);

  const resetForm = () => {
    setForm({ entryId: '', title: '', date: '', mood: 'Peaceful', description: '' });
  };

  const openNewEntry = () => {
    resetForm();
    setForm((f) => ({ ...f, date: new Date().toISOString().split('T')[0] }));
    setShowForm(true);
  };

  const editEntry = (entry) => {
    setForm({
      entryId: entry.id,
      title: entry.title,
      date: entry.date,
      mood: entry.mood,
      description: entry.description,
    });
    setShowForm(true);
  };

  const deleteEntry = (id) => {
    setJournalEntries((entries) => entries.filter((e) => e.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { entryId, title, date, mood, description } = form;
    if (entryId) {
      setJournalEntries((entries) =>
        entries.map((entry) =>
          entry.id === entryId ? { ...entry, title, date, mood, description } : entry
        )
      );
    } else {
      setJournalEntries((entries) => [
        { id: `entry-${Date.now()}`, title, date, mood, description },
        ...entries,
      ]);
    }
    resetForm();
    if (window.innerWidth < 1024) setShowForm(false);
  };

  const moodBadge = (mood) => {
    if (mood === 'Anxious' || mood === 'Terrifying')
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    if (mood === 'Peaceful') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (mood === 'Lucid') return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    return 'bg-cosmos-400/10 text-cosmos-300 border-cosmos-400/20';
  };

  return (
    <section className="page-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-cosmos-400/10 pb-6">
        <div className="min-w-0">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">Your Sleep Grimoire</h1>
          <p className="text-slate-400 light:text-slate-600 text-sm mt-1">
            Log your nightly dream recollections locally and monitor subconscious states.
          </p>
        </div>
        <button
          type="button"
          onClick={openNewEntry}
          className="px-5 py-3 bg-cosmos-400 hover:bg-cosmos-300 text-cosmos-950 font-bold tracking-widest uppercase text-xs rounded-full transition-transform hover:-translate-y-0.5 flex items-center gap-2 self-start md:self-auto cursor-pointer shadow-lg shadow-cosmos-400/5"
        >
          <Plus className="w-5 h-5" /> Log New Memory
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6 order-2 lg:order-1">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="text-cosmos-400 w-5 h-5" /> Recorded Journeys
            <span className="text-xs bg-cosmos-400/20 text-cosmos-300 px-2.5 py-0.5 rounded-full font-bold">
              {journalEntries.length}
            </span>
          </h2>

          {journalEntries.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl text-center flex flex-col items-center justify-center gap-4 border border-cosmos-400/20">
              <div className="w-16 h-16 rounded-full bg-cosmos-400/10 text-cosmos-400 flex items-center justify-center">
                <Feather className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Your Sleep Log is Empty</h3>
                <p className="text-slate-400 light:text-slate-600 text-sm max-w-md mx-auto mt-2">
                  Begin transcription of your nighttime memories. Tracking recurring symbols helps
                  align waking action.
                </p>
              </div>
              <button
                type="button"
                onClick={openNewEntry}
                className="px-5 py-2.5 bg-cosmos-400 text-cosmos-950 rounded-full text-xs uppercase tracking-wider font-bold hover:bg-cosmos-300 transition-colors cursor-pointer"
              >
                Add First Log Entry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {journalEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="glass-panel p-5 rounded-3xl flex flex-col justify-between gap-5 border border-cosmos-400/10 relative"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">
                        {formatDate(entry.date)}
                      </span>
                      <h3 className="font-serif text-base font-bold text-white mt-1 line-clamp-1">
                        {entry.title}
                      </h3>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${moodBadge(entry.mood)}`}
                    >
                      {entry.mood}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 light:text-slate-700 leading-relaxed line-clamp-3">
                    {entry.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-cosmos-400/10 pt-3 mt-1">
                    <button
                      type="button"
                      onClick={() =>
                        openModal({
                          title: entry.title,
                          meta: `Logged on ${formatDate(entry.date)}`,
                          description: entry.description,
                          frequency: entry.mood,
                          symbolism: 'Personal Sleep Memory',
                          freqLabel: 'Dream Mood',
                          symLabel: 'Entry Type',
                        })
                      }
                      className="text-xs text-cosmos-400 hover:text-cosmos-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Read Log
                    </button>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => editEntry(entry)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                        title="Edit Log"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteEntry(entry.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Delete Log"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showForm && (
          <div className="lg:col-span-4 glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-cosmos-400/20 shadow-xl order-1 lg:order-2 lg:sticky lg:top-24">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-lg font-bold text-white">
                {form.entryId ? (
                  <>
                    <span className="text-cosmos-400 font-serif">Editing:</span> {form.title}
                  </>
                ) : (
                  'Log Sleep Memory'
                )}
              </h3>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  if (window.innerWidth < 1024) setShowForm(false);
                }}
                className="text-slate-400 hover:text-white lg:hidden cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Dream Title
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Flying through structural stars"
                  className="w-full px-4 py-3 bg-cosmos-950/40 border border-cosmos-400/20 rounded-xl focus:border-cosmos-400 focus:outline-none text-slate-100 placeholder-slate-500 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Sleep Date
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2.5 bg-cosmos-950/40 border border-cosmos-400/20 rounded-xl focus:border-cosmos-400 focus:outline-none text-slate-100 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Dream Mood
                  </label>
                  <select
                    required
                    value={form.mood}
                    onChange={(e) => setForm({ ...form, mood: e.target.value })}
                    className="w-full px-3 py-2.5 bg-cosmos-950/40 border border-cosmos-400/20 rounded-xl focus:border-cosmos-400 focus:outline-none text-slate-100 text-sm"
                  >
                    {['Peaceful', 'Anxious', 'Mysterious', 'Inspirational', 'Terrifying', 'Lucid'].map(
                      (m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Detailed Narrative Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe sequence of events, color themes, sounds, and active emotions..."
                  className="w-full px-4 py-3 bg-cosmos-950/40 border border-cosmos-400/20 rounded-xl focus:border-cosmos-400 focus:outline-none text-slate-100 placeholder-slate-500 text-sm resize-none"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-grow py-3 bg-cosmos-400 hover:bg-cosmos-300 text-cosmos-950 font-bold uppercase tracking-wider text-xs rounded-full shadow-lg transition-colors cursor-pointer"
                >
                  {form.entryId ? 'Save Changes' : 'Save Dream Card'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    if (window.innerWidth < 1024) setShowForm(false);
                  }}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-cosmos-400/20 text-slate-300 hover:text-white font-semibold text-sm rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

function ExplorePage() {
  const { journalEntries, setJournalEntries, navigateTo } = useApp();
  const [narrative, setNarrative] = useState('');
  const [vividness, setVividness] = useState('medium');
  const [feeling, setFeeling] = useState('neutral');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false);
  const resultRef = useRef(null);

  const runAnalysis = (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const lower = narrative.toLowerCase();
      let analysis;

      if (
        lower.includes('run') ||
        lower.includes('chase') ||
        lower.includes('behind')
      ) {
        analysis = {
          focus: 'Unconfronted Tension',
          archetype: 'The Shadow Self',
          charge: 'High-Stress Resistance',
          interpretation:
            'Your sleep vision heavily emphasizes evasion dynamics. The active pursuers are projection models for immediate physical stressors or moral duties currently neglected. The vividness index highlights this conflict is knocking closely on your daytime decisions.',
          action:
            'Confront the single hardest project task you have been postponing this week. Refuse to sweep difficult conversions under the carpet.',
        };
      } else if (
        lower.includes('fly') ||
        lower.includes('sky') ||
        lower.includes('float')
      ) {
        analysis = {
          focus: 'Creative Ascension',
          archetype: 'The Cosmic Child',
          charge: 'Positive Kinetic',
          interpretation:
            'Experiencing low-friction atmospheric flight indicates healthy personality integration. You are looking down at current operational struggles with broad clarity. It notes a robust spiritual capability to adapt to change without losing central equilibrium.',
          action:
            'Channel this confident state by designing fresh systems, creating blueprints, or pitching long-term goals to teams while your self-worth is charging high.',
        };
      } else if (
        lower.includes('fall') ||
        lower.includes('drop') ||
        lower.includes('sink')
      ) {
        analysis = {
          focus: 'Vulnerable Transition',
          archetype: 'The Fallen Ideal',
          charge: 'Structural Insecurity',
          interpretation:
            'The downward kinetic movement reveals intense stress over unpredictable life factors. You are currently gripping old constructs too tightly. The subconscious is seeking a structural collapse so that a healthier baseline can build up.',
          action:
            'Delegate minor tasks. Relinquish micro-control elements in your operational schedule to alleviate physical sleep anxiety.',
        };
      } else {
        analysis = {
          focus: 'Self-Evaluation Process',
          archetype: 'The Sovereign Guide',
          charge: 'Neutral-Balanced',
          interpretation:
            'Your dream sequence acts as a symbolic self-audit. Your mind is compiling residual sensory inputs to restructure creative memory blocks. This indicates active subconscious growth and deep emotional processing during REM cycles.',
          action:
            'Consider spending 10 minutes journaling your goals first thing in the morning to maintain optimal synchronization between your dreams and daily actions.',
        };
      }

      setResult(analysis);
      setLoading(false);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 2000);
  };

  const saveToJournal = () => {
    if (!result) return;
    let mood = 'Mysterious';
    if (feeling === 'positive') mood = 'Inspirational';
    else if (feeling === 'negative') mood = 'Anxious';

    setJournalEntries([
      {
        id: `entry-${Date.now()}`,
        title: `Insight: ${result.focus}`,
        date: new Date().toISOString().split('T')[0],
        mood,
        description: `Synthesis: ${result.interpretation}\n\nWakeup Action: ${result.action}\n\nOriginal Dream Description:\n${narrative}`,
      },
      ...journalEntries,
    ]);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigateTo('journal');
    }, 1500);
  };

  return (
    <section className="page-section">
      <div className="text-center max-w-xl mx-auto flex flex-col gap-2 px-1">
        <span className="text-xs font-bold text-cosmos-400 uppercase tracking-widest">
          Synthetic Heuristics
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">Dynamic Dream Decoder</h1>
        <p className="text-slate-400 light:text-slate-600 text-sm">
          Type any custom scenario description. Our mock AI system dynamically processes underlying
          archetype vectors.
        </p>
      </div>

      <div className="max-w-2xl mx-auto w-full glass-panel rounded-3xl p-6 sm:p-8 border border-cosmos-400/20 shadow-2xl relative overflow-hidden">
        <form onSubmit={runAnalysis} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Input Custom Sleep Narrative
            </label>
            <textarea
              required
              rows={5}
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              placeholder="e.g., I was running in deep snow being chased by an ancient clock with golden wings..."
              className="w-full p-4 bg-cosmos-950/40 border border-cosmos-400/20 rounded-xl focus:border-cosmos-400 focus:outline-none text-slate-100 placeholder-slate-500 text-sm leading-relaxed"
            />
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Vividness Factor
              </label>
              <select
                value={vividness}
                onChange={(e) => setVividness(e.target.value)}
                className="w-full px-3 py-2.5 bg-cosmos-950/40 border border-cosmos-400/20 rounded-xl focus:border-cosmos-400 focus:outline-none text-slate-100 text-sm"
              >
                <option value="low">Blurry & Soft (Low)</option>
                <option value="medium">Vibrant & Realistic (Medium)</option>
                <option value="high">Surreal & Hyper-detailed (High)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Residual Feeling
              </label>
              <select
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                className="w-full px-3 py-2.5 bg-cosmos-950/40 border border-cosmos-400/20 rounded-xl focus:border-cosmos-400 focus:outline-none text-slate-100 text-sm"
              >
                <option value="positive">Empowered & Peaceful</option>
                <option value="neutral">Bewildered but Calm</option>
                <option value="negative">Vulnerable & Exhausted</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-cosmos-400 text-cosmos-950 font-bold uppercase tracking-wider text-xs rounded-full shadow-lg hover:bg-cosmos-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 animate-pulse" /> Synthesize Analysis
          </button>
        </form>

        {loading && (
          <div className="absolute inset-0 bg-slate-950/90 rounded-2xl flex flex-col items-center justify-center gap-4 z-20">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-cosmos-400/20 border-t-cosmos-400 animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-white font-bold tracking-wide">Mapping Neuro-Symbolic Associations</p>
              <p className="text-xs text-slate-400 mt-1">Filtering collective Jungian memory indexes...</p>
            </div>
          </div>
        )}
      </div>

      {result && (
        <div
          ref={resultRef}
          className="max-w-2xl mx-auto w-full glass-panel border border-cosmos-400/30 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 animate-fade-in"
        >
          <div className="flex items-center gap-3 border-b border-cosmos-400/10 pb-4">
            <div className="w-10 h-10 rounded-xl bg-cosmos-400/10 flex items-center justify-center text-cosmos-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-white">Dynamic Reading Report</h3>
              <p className="text-xs text-slate-400">
                Heuristically Derived Spiritual & Psychological Profiles
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 sm:col-span-2 md:col-span-1">
              <span className="block text-[10px] uppercase font-bold text-slate-400">
                Primary Core Focus
              </span>
              <span className="block text-base font-bold text-cosmos-400 mt-1">{result.focus}</span>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <span className="block text-[10px] uppercase font-bold text-slate-400">
                Subconscious Charge
              </span>
              <span className="block text-base font-bold text-amber-400 mt-1">{result.charge}</span>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <span className="block text-[10px] uppercase font-bold text-slate-400">
                Jungian Archetype
              </span>
              <span className="block text-base font-bold text-emerald-400 mt-1">
                {result.archetype}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold text-white">Interpretation Synthesis</h4>
            <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed">
              {result.interpretation}
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-cosmos-400/5 border border-cosmos-400/10 p-4 rounded-xl">
            <h4 className="text-sm font-bold text-cosmos-400 flex items-center gap-2">
              <Compass className="w-4 h-4" /> Cosmic Wakeup Call Action
            </h4>
            <p className="text-xs text-slate-300 light:text-slate-700 leading-relaxed">
              {result.action}
            </p>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={saveToJournal}
              disabled={saved}
              className="px-5 py-2.5 bg-cosmos-400 text-cosmos-950 hover:bg-cosmos-300 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow cursor-pointer disabled:opacity-75"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" /> Saved Securely!
                </>
              ) : (
                <>
                  <BookMarked className="w-4 h-4" /> Save to Private Journal
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function AboutPage() {
  const team = [
    {
      initials: 'AM',
      name: 'Alistair Morehouse',
      role: 'Chief Executive / Psychology Lead',
      bio: "Dedicated his professional research toward finding logical digital models mapping Carl Jung's shadow integration archetypes.",
    },
    {
      initials: 'SK',
      name: 'Seraphina Kael',
      role: 'Design Architect / UI Specialist',
      bio: 'Developed the fluid visual languages and responsive dream-orbs ensuring visual interfaces reduce screen exhaustion.',
    },
    {
      initials: 'DZ',
      name: 'Devon Zhang',
      role: 'Senior Infrastructure Developer',
      bio: 'Built the clean modern SPA routing layer and local storage states ensuring responsive load optimizations.',
    },
  ];

  const stats = [
    { value: '100%', label: 'Private & Local', desc: 'Zero server data mining, keeping your vulnerabilities secured.', color: 'text-cosmos-400' },
    { value: '4+', label: 'Interpretive Dimensions', desc: 'Evaluated psychologically, spiritually, emotionally, and physically.', color: 'text-indigo-400' },
    { value: 'Interactive', label: 'Astral Oracle', desc: '3D physical tilt tracking with particle stellar explosions.', color: 'text-cosmos-300' },
    { value: 'Seamless', label: 'Pre-architected', desc: 'Modular blocks enable simple porting to modern React environments.', color: 'text-emerald-400' },
  ];

  return (
    <section className="page-section page-section--loose">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-6">
          <span className="text-xs font-bold text-cosmos-400 uppercase tracking-widest self-start">
            The Mission
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">Understanding Your Subconscious Ecosystem</h1>
          <p className="text-slate-400 light:text-slate-600 text-sm leading-relaxed">
            DreamDecode was founded under a simple, profound hypothesis: that dreams are not noisy
            random firings of a resting brain, but rather sophisticated, metaphor-rich biological
            feedback systems meant to realign our conscious directions.
          </p>
          <p className="text-slate-400 light:text-slate-600 text-sm leading-relaxed">
            We combine deep psychoanalytic tenets drawn from Jungian integration methodologies with
            lightweight modern client infrastructure. By utilizing local storage data layers, we
            guarantee absolutely secret access controls—empowering users to self-reflect fearlessly.
          </p>
        </div>
        <div className="lg:col-span-6 grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-cosmos-400/20">
              <span className={`block text-2xl font-extrabold ${s.color} mb-1`}>{s.value}</span>
              <span className="block text-sm font-bold text-white">{s.label}</span>
              <span className="block text-xs text-slate-400 mt-1">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <h2 className="font-serif text-3xl text-white">The Core Philosophy</h2>
          <p className="text-slate-400 light:text-slate-600 text-sm">
            Crafted by developers and designers passionate about mental health technologies.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.initials}
              className="glass-panel p-6 rounded-3xl border border-cosmos-400/20 flex flex-col items-center text-center gap-4"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cosmos-400 to-indigo-900 flex items-center justify-center font-extrabold text-2xl text-white shadow-lg">
                {member.initials}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{member.name}</h4>
                <span className="text-xs text-cosmos-400">{member.role}</span>
              </div>
              <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Content() {
  const { currentPage } = useApp();

  const pages = {
    home: HomePage,
    dictionary: DictionaryPage,
    journal: JournalPage,
    explore: ExplorePage,
    about: AboutPage,
  };

  const Page = pages[currentPage] || HomePage;

  return (
    <>
      <ParticleCanvas />
      <div className="nebula-bg--1" aria-hidden />
      <div className="nebula-bg--2" aria-hidden />
      <div className="nebula-bg--3" aria-hidden />

      <main className="flex-grow relative z-10">
        <Page />
      </main>
      <InfoModal />
    </>
  );
}
