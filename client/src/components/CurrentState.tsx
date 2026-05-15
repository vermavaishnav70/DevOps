import React from 'react';
import { motion } from 'motion/react';
import { StateSlider } from './StateSlider';

export const CurrentState = () => (
  <motion.div 
    className="col-span-8 bg-surface-low p-8 rounded-xl flex flex-col justify-between paper-shadow"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.1 }}
  >
    <div className="flex justify-between items-start mb-12">
      <h3 className="font-serif text-2xl">Current State</h3>
      <span className="font-mono text-[0.6rem] uppercase tracking-widest px-2 py-1 bg-surface-highest rounded-full">
        Updated 2h ago
      </span>
    </div>
    <div className="grid grid-cols-2 gap-x-12 gap-y-10">
      <StateSlider label="Vitality" value={84} colorClass="bg-primary" />
      <StateSlider label="Focus" value={92} colorClass="bg-tertiary" />
      <StateSlider label="Presence" value={68} colorClass="bg-primary" />
      <StateSlider label="Clarity" value={75} colorClass="bg-secondary" />
    </div>
  </motion.div>
);
