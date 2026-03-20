import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

export const Header = () => (
  <header className="fixed top-0 left-64 right-0 h-16 bg-background/80 backdrop-blur-md flex items-center justify-between px-10 z-40">
    <div className="flex items-center gap-8">
      <span className="text-xl font-serif text-on-background">Dashboard</span>
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant" />
        <input 
          type="text" 
          placeholder="Search consciousness..." 
          className="pl-9 pr-4 py-1.5 bg-surface-highest/50 border-none rounded-full font-mono text-xs focus:ring-1 focus:ring-primary w-64 transition-all"
        />
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button className="text-secondary hover:text-primary transition-colors">
        <Bell size={20} />
      </button>
      <button className="text-secondary hover:text-primary transition-colors">
        <Settings size={20} />
      </button>
    </div>
  </header>
);
