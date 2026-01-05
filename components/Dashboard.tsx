
import React from 'react';
import { ICONS, DAYS_PT } from '../constants';
import { Meal, Appointment, Agreement } from '../types';

interface Props {
  meals: Meal[];
  appointments: Appointment[];
  agreements: Agreement[];
  onNavigate: (screen: string) => void;
  isSharingLocation: boolean;
}

const Dashboard: React.FC<Props> = ({ meals, appointments, agreements, onNavigate, isSharingLocation }) => {
  const todayIdx = new Date().getDay();
  const todaysMeal = meals.find(m => m.day === todayIdx);
  const nextAppt = appointments.sort((a,b) => a.date.localeCompare(b.date))[0];
  const pendingAgreements = agreements.filter(a => a.status === 'pending');

  return (
    <div className="space-y-8 animate-slide-up">
      <header className="px-6 pt-16 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-serif text-sage-600 leading-tight italic">This is us</h1>
          <p className="text-sage-500/60 font-medium mt-1 uppercase tracking-widest text-[10px]">Hoje é {DAYS_PT[todayIdx]}</p>
        </div>
        <div className="bg-white p-3 rounded-full shadow-sm border border-gray-50 text-sage-500 relative">
          {ICONS.Bell}
          <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></div>
        </div>
      </header>

      {/* Card Principal: Jantar */}
      <section className="px-6">
        <div 
          onClick={() => onNavigate('meals')}
          className="bg-sage-500 rounded-[3rem] p-8 text-white shadow-xl relative overflow-hidden active:scale-95 transition-transform"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            {ICONS.Utensils}
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Sugestão de Jantar</span>
            <h2 className="text-2xl font-serif mt-2 mb-6">{todaysMeal?.title || 'O que vamos comer hoje?'}</h2>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-md border border-white/10">
                <span className="text-xs font-bold">{todaysMeal?.cook || 'Vago'} cozinha</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-md border border-white/10">
                <span className="text-xs font-bold">{todaysMeal?.type === 'homemade' ? 'Caseiro' : 'Delivery'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda e Combinados Grid */}
      <section className="px-6 grid grid-cols-1 gap-4">
        {nextAppt && (
          <div 
            onClick={() => onNavigate('calendar')}
            className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50 flex items-center gap-5 active:bg-gray-50 transition-colors"
          >
            <div className="bg-blue-50 text-blue-500 p-4 rounded-3xl">
              {nextAppt.type === 'Crianças' ? ICONS.Family : ICONS.Calendar}
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Próximo na Agenda</p>
              <p className="font-bold text-gray-800 leading-tight">{nextAppt.title}</p>
              <p className="text-xs text-gray-400 mt-1">{nextAppt.date} às {nextAppt.time}</p>
            </div>
            {ICONS.ChevronRight}
          </div>
        )}

        {pendingAgreements.length > 0 && (
          <div 
            onClick={() => onNavigate('agreements')}
            className="bg-[#FDF9F0] p-6 rounded-[2.5rem] border border-[#F5E6C8] flex items-center gap-5 active:scale-98 transition-all"
          >
            <div className="bg-orange-100 text-orange-600 p-4 rounded-3xl">
              {ICONS.Chat}
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">Lembrete do Casal</p>
              <p className="text-sm font-medium text-sage-600 italic">"{pendingAgreements[0].text}"</p>
            </div>
          </div>
        )}
      </section>

      {/* Acesso Rápido / Localização */}
      <section className="px-6 grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate('shopping')}
          className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col items-center gap-4 active:scale-95 transition-transform"
        >
          <div className="p-4 bg-sage-100 text-sage-500 rounded-2xl">{ICONS.Shopping}</div>
          <span className="text-xs font-bold text-sage-600">Lista Compras</span>
        </button>
        <button 
          onClick={() => onNavigate('location')}
          className={`p-8 rounded-[2.5rem] shadow-sm border transition-all active:scale-95 flex flex-col items-center gap-4 ${
            isSharingLocation ? 'bg-blue-500 text-white border-blue-600 animate-pulse' : 'bg-white border-gray-50 text-sage-500'
          }`}
        >
          <div className={`p-4 rounded-2xl ${isSharingLocation ? 'bg-white/20' : 'bg-blue-50 text-blue-500'}`}>
            {ICONS.Location}
          </div>
          <span className={`text-xs font-bold ${isSharingLocation ? 'text-white' : 'text-sage-600'}`}>
            {isSharingLocation ? 'Enviando...' : 'Onde estou?'}
          </span>
        </button>
      </section>
      
      <div className="h-4"></div>
    </div>
  );
};

export default Dashboard;
