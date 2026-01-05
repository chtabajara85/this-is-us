
import React from 'react';
import { ICONS, DAYS_PT } from '../constants';
import { Meal, Appointment, Agreement } from '../types';

interface Props {
  meals: Meal[];
  appointments: Appointment[];
  agreements: Agreement[];
  onNavigate: (screen: string) => void;
}

const Dashboard: React.FC<Props> = ({ meals, appointments, agreements, onNavigate }) => {
  const today = new Date().getDay();
  const todaysMeal = meals.find(m => m.day === today);
  const upcomingAppts = appointments.slice(0, 3);
  const pendingAgreements = agreements.filter(a => a.status === 'pending');

  return (
    <div className="space-y-8 pb-20 animate-fade-in">
      <header className="px-6 pt-12">
        <h2 className="text-3xl font-serif text-[#2C332E]">Olá, Família!</h2>
        <p className="text-gray-500 font-light mt-1">Hoje é {DAYS_PT[today]}</p>
      </header>

      {/* Jantar de Hoje */}
      <section className="px-6">
        <div 
          onClick={() => onNavigate('meals')}
          className="bg-[#4A5D4E] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden transition-all active:scale-[0.97] hover:brightness-110"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-70">Jantar de Hoje</span>
              <h3 className="text-2xl font-serif mt-2 leading-tight">{todaysMeal?.title || 'Definir cardápio'}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-xl">
              {ICONS.Utensils}
            </div>
          </div>
          <div className="flex items-center gap-3">
             <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full border border-white/10 font-medium">
               {todaysMeal?.cook || 'Vago'}
             </span>
             <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full border border-white/10 font-medium">
               {todaysMeal?.type === 'homemade' ? 'Caseiro' : 'Outro'}
             </span>
          </div>
        </div>
      </section>

      {/* Próximos Compromissos */}
      <section className="px-6 space-y-4">
        <div className="flex justify-between items-end px-2">
          <h4 className="text-lg font-bold text-[#2C332E]">Agenda</h4>
          <button onClick={() => onNavigate('calendar')} className="text-xs text-[#4A5D4E] font-bold uppercase tracking-widest">Ver mais</button>
        </div>
        <div className="space-y-3">
          {upcomingAppts.length > 0 ? upcomingAppts.map(appt => (
            <div key={appt.id} className="bg-white p-5 rounded-[2rem] shadow-sm flex items-center gap-4 border border-gray-50">
              <div className={`p-3 rounded-2xl ${
                appt.type === 'Crianças' ? 'bg-blue-50 text-blue-500' :
                appt.type === 'Casal' ? 'bg-pink-50 text-pink-500' :
                'bg-gray-50 text-gray-500'
              }`}>
                {appt.type === 'Crianças' ? ICONS.Family : appt.type === 'Casal' ? ICONS.Couple : ICONS.Calendar}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">{appt.title}</p>
                <p className="text-[11px] text-gray-400 font-medium">{appt.date} • {appt.time}</p>
              </div>
              <div className="text-gray-300">{ICONS.ChevronRight}</div>
            </div>
          )) : (
            <p className="text-center text-gray-400 py-6 text-xs font-medium italic">Sem compromissos em breve</p>
          )}
        </div>
      </section>

      {/* Acesso Rápido */}
      <section className="px-6 grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate('shopping')}
          className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col items-center gap-3 active:bg-gray-50 transition-colors"
        >
          <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl">{ICONS.Shopping}</div>
          <span className="text-xs font-bold text-gray-700">Mercado</span>
        </button>
        <button 
          onClick={() => onNavigate('location')}
          className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col items-center gap-3 active:bg-gray-50 transition-colors"
        >
          <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">{ICONS.Location}</div>
          <span className="text-xs font-bold text-gray-700">Localização</span>
        </button>
      </section>

      {/* Combinados */}
      {pendingAgreements.length > 0 && (
        <section className="px-6 pb-4">
          <div className="bg-[#8E9775]/10 rounded-[2.5rem] p-8 border border-[#8E9775]/20">
            <h4 className="text-xs font-bold text-[#8E9775] uppercase tracking-widest mb-4">Combinado do Casal</h4>
            <div className="space-y-4">
              {pendingAgreements.slice(0, 1).map(agreement => (
                <div key={agreement.id} className="flex gap-4 items-start">
                  <div className="text-[#8E9775] mt-1">{ICONS.Chat}</div>
                  <p className="text-sm text-[#4A5D4E] font-medium leading-relaxed italic">“{agreement.text}”</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
