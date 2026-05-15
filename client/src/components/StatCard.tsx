import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subValue: string;
  colorClass: string;
  delay: number;
}

export const StatCard = ({ icon: Icon, label, value, subValue, colorClass, delay }: StatCardProps) => (
  <motion.div 
    className="col-span-3 bg-surface-low p-6 rounded-xl flex flex-col items-center justify-center text-center paper-shadow"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <Icon size={28} className={`${colorClass} mb-4`} />
    <span className="font-mono text-[0.7rem] uppercase tracking-widest text-secondary mb-1">{label}</span>
    <span className="font-serif text-4xl italic">{value}</span>
    <span className="font-mono text-[0.6rem] opacity-40 mt-1 uppercase">{subValue}</span>
  </motion.div>
);
