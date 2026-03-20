import React from 'react';

interface StateSliderProps {
  label: string;
  value: number;
  colorClass: string;
}

export const StateSlider = ({ label, value, colorClass }: StateSliderProps) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <label className="font-mono text-[0.7rem] uppercase tracking-widest text-secondary">{label}</label>
      <span className="font-mono text-[0.7rem] text-primary">{value}%</span>
    </div>
    <div className="h-[2px] w-full bg-surface-highest relative">
      <div className={`absolute top-0 left-0 h-full ${colorClass}`} style={{ width: `${value}%` }}></div>
      <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${colorClass} shadow-sm`} style={{ left: `${value}%` }}></div>
    </div>
  </div>
);
