import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  BrainCircuit, 
  Activity, 
  BarChart3, 
  Heart, 
  Plus
} from 'lucide-react';

export const Sidebar = () => (
  <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-low p-8 flex flex-col z-50">
    <div className="mb-12">
      <h1 className="text-3xl font-serif italic text-on-background">Stitch</h1>
      <p className="font-mono text-[0.65rem] tracking-widest uppercase opacity-50 mt-1">Life OS</p>
    </div>

    <button className="mb-8 w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-xl font-mono text-xs tracking-wider transition-all hover:bg-primary-dim">
      <Plus size={16} />
      New Entry
    </button>

    <nav className="flex-1 space-y-2">
      {[
        { icon: Sparkles, label: 'AI Chat', active: true },
        { icon: Calendar, label: 'Plans' },
        { icon: BrainCircuit, label: 'Brainstorm' },
        { icon: Activity, label: 'Trackers' },
        { icon: BarChart3, label: 'Graphs' },
        { icon: Heart, label: 'Life State' },
        { icon: Calendar, label: 'Calendar' },
      ].map((item) => (
        <a
          key={item.label}
          href="#"
          className={`flex items-center gap-3 px-3 py-2 transition-all ${
            item.active 
              ? 'text-primary font-bold border-r-2 border-tertiary bg-surface-highest/50' 
              : 'text-secondary opacity-80 hover:bg-surface-highest/30'
          }`}
        >
          <item.icon size={18} />
          <span className="font-mono text-xs uppercase tracking-tight">{item.label}</span>
        </a>
      ))}
    </nav>

    <div className="mt-auto flex items-center gap-3 p-3 bg-surface-highest/30 rounded-xl">
      <div className="w-10 h-10 rounded-full bg-surface-highest flex items-center justify-center overflow-hidden">
        <img 
          src="https://picsum.photos/seed/julian/100/100" 
          alt="User Profile" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-mono text-[0.7rem] font-bold text-primary tracking-tight">Julian S.</span>
        <span className="font-mono text-[0.6rem] opacity-50 uppercase tracking-widest">Premium Tier</span>
      </div>
    </div>
  </aside>
);
