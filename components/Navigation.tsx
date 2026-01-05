
import React from 'react';
import { ICONS } from '../constants';

interface Props {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

const Navigation: React.FC<Props> = ({ activeScreen, onNavigate }) => {
  const items = [
    { id: 'dashboard', icon: ICONS.Home, label: 'Início' },
    { id: 'meals', icon: ICONS.Utensils, label: 'Jantares' },
    { id: 'shopping', icon: ICONS.Shopping, label: 'Lista' },
    { id: 'calendar', icon: ICONS.Calendar, label: 'Agenda' },
    { id: 'more', icon: ICONS.More, label: 'Mais' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-4 flex justify-between items-center z-50">
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeScreen === item.id ? 'text-[#4A5D4E] scale-110' : 'text-gray-400'
          }`}
        >
          <div className={activeScreen === item.id ? 'bg-[#4A5D4E]/10 p-2 rounded-2xl' : ''}>
            {item.icon}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
