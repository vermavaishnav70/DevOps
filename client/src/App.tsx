import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Waves } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CurrentState } from './components/CurrentState';
import { DeepWorkStreak } from './components/DeepWorkStreak';
import { SystemConsciousness } from './components/SystemConsciousness';
import { Blueprint } from './components/Blueprint';
import { StatCard } from './components/StatCard';
import { LifeGraph } from './components/LifeGraph';
import { MarginNotes } from './components/MarginNotes';

interface Stats {
  vitality: number;
  focus: number;
  metabolicRate: string;
  sleepQuality: string;
  deepWorkStreak: number;
  consciousnessLevel: string;
}
const base_url = import.meta.env.VITE_API_URL;
const App = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [lastSync, setLastSync] = useState<string>('04:12 AM');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${base_url}/api/stats`);
        const data = await response.json();
        setStats(data);
        setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Header />

      <main className="ml-64 pt-24 pb-12 px-10">
        {/* Welcome Section */}
        <section className="mb-12 flex justify-between items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-6xl font-serif text-on-background leading-tight">
              Quiet morning,<br />Julian.
            </h2>
            <p className="font-mono text-[0.65rem] text-secondary mt-4 tracking-widest uppercase">
              System Status: Optimal / Last sync: {lastSync}
            </p>
          </motion.div>
          <div className="text-right">
            <p className="font-mono text-xl font-bold text-tertiary tracking-tighter">09:14</p>
            <p className="font-mono text-[0.65rem] text-secondary opacity-60 uppercase tracking-widest">
              Tuesday, Oct 24
            </p>
          </div>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          <CurrentState vitality={stats?.vitality} focus={stats?.focus} />
          <DeepWorkStreak streak={stats?.deepWorkStreak} />
          <SystemConsciousness level={stats?.consciousnessLevel} />
          <Blueprint />
          
          <StatCard 
            icon={Flame} 
            label="Metabolic Rate" 
            value={stats?.metabolicRate.split(' ')[0] || "1,840"} 
            subValue="kcal active" 
            colorClass="text-tertiary" 
            delay={0.5} 
          />
          
          <StatCard 
            icon={Waves} 
            label="Sleep Quality" 
            value={stats?.sleepQuality || "Excellent"} 
            subValue="8h 22m restorative" 
            colorClass="text-primary" 
            delay={0.6} 
          />

          <LifeGraph />
        </div>
      </main>

      <MarginNotes />
    </div>
  );
};

export default App;
