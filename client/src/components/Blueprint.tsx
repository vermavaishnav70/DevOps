import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, MoreVertical, Circle } from 'lucide-react';

export const Blueprint = () => (
  <motion.div 
    className="col-span-7 bg-white p-8 rounded-xl paper-shadow"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.4 }}
  >
    <div className="flex justify-between items-center mb-10">
      <h3 className="font-serif text-2xl">Today's Blueprint</h3>
      <div className="flex gap-2">
        <span className="w-2 h-2 rounded-full bg-tertiary"></span>
        <span className="w-2 h-2 rounded-full bg-surface-highest"></span>
        <span className="w-2 h-2 rounded-full bg-surface-highest"></span>
      </div>
    </div>
    <div className="space-y-2">
      {[
        { time: '08:00', title: 'Morning Reflection', sub: 'Mindfulness • 15min', status: 'done' },
        { time: '09:30', title: 'Deep Work: Strategy Alpha', sub: 'Focus Block • 120min', status: 'active' },
        { time: '12:00', title: 'Alimentation & Recovery', sub: 'Vitality • 60min', status: 'pending' },
      ].map((item, i) => (
        <div key={i} className="group flex items-center py-4 px-4 -mx-4 hover:bg-surface-low transition-all rounded-lg">
          <span className="font-mono text-xs w-20 text-secondary opacity-50">{item.time}</span>
          <div className="flex-1">
            <h4 className="font-mono text-sm font-bold tracking-tight">{item.title}</h4>
            <p className="font-mono text-[0.65rem] uppercase opacity-40 mt-0.5">{item.sub}</p>
          </div>
          <div className="flex items-center gap-3">
            {item.status === 'active' && (
              <span className="font-mono text-[0.6rem] px-2 py-0.5 bg-tertiary-container text-on-tertiary-container rounded">Active</span>
            )}
            {item.status === 'done' ? (
              <CheckCircle2 size={18} className="text-primary/40" />
            ) : item.status === 'active' ? (
              <MoreVertical size={18} className="text-outline-variant" />
            ) : (
              <Circle size={18} className="text-outline-variant" />
            )}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);
