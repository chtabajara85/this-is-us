
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
    <div className="space-y-8 pb-20">
      <header className="px-6 pt-12">
        <h2 className="text-3xl font-serif text-[#2C332E]">Olá, Família!</h2>
        <p className="text-gray-500 font-light mt-1">Hoje é {DAYS_PT[today]}</p>
      </header>

      {/* Jantar de Hoje */}
      <section className="px-6">
        <div 
          onClick={() => onNavigate('meals')}
          className="bg-[#4A5D4E] rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden transition-transform active:scale-[0.98]"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest opacity-80">Jantar de Hoje</span>
              <h3 className="text-2xl font-serif mt-1">{todaysMeal?.title || 'Sem plano definido'}</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
              {ICONS.Utensils}
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="bg-white/10 px-3 py-1 rounded-full border border-white/20">
              {todaysMeal?.cook || 'Vago'} cozinha
            </div>
            <div className="bg-white/10 px-3 py-1 rounded-full border border-white/20">
              {todaysMeal?.type === 'homemade' ? 'Caseiro' : todaysMeal?.type === 'delivery' ? 'Delivery' : 'Fora'}
            </div>
          </div>
        </div>
      </section>

      {/* Próximos Compromissos */}
      <section className="px-6 space-y-4">
        <div className="flex justify-between items-end px-1">
          <h4 className="text-lg font-medium text-[#2C332E]">Próximos Compromissos</h4>
          <button onClick={() => onNavigate('calendar')} className="text-sm text-[#4A5D4E] font-semibold">Ver todos</button>
        </div>
        <div className="space-y-3">
          {upcomingAppts.length > 0 ? upcomingAppts.map(appt => (
            <div key={appt.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 border border-gray-100">
              <div className={`p-3 rounded-xl ${
                appt.type === 'Crianças' ? 'bg-blue-50 text-blue-500' :
                appt.type === 'Casal' ? 'bg-pink-50 text-pink-500' :
                'bg-gray-50 text-gray-500'
              }`}>
                {appt.type === 'Crianças' ? ICONS.Family : appt.type === 'Casal' ? ICONS.Couple : ICONS.Calendar}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{appt.title}</p>
                <p className="text-xs text-gray-400">{appt.date} • {appt.time}</p>
              </div>
              {ICONS.ChevronRight}
            </div>
          )) : (
            <p className="text-center text-gray-400 py-4 text-sm">Sem compromissos marcados</p>
          )}
        </div>
      </section>

      {/* Combinados Pendentes */}
      {pendingAgreements.length > 0 && (
        <section className="px-6 space-y-4">
          <h4 className="text-lg font-medium text-[#2C332E]">Combinados do Casal</h4>
          <div className="bg-yellow-50/50 rounded-2xl p-5 border border-yellow-100">
            {pendingAgreements.map(agreement => (
              <div key={agreement.id} className="flex gap-3 items-start mb-3 last:mb-0">
                <div className="mt-1 text-yellow-600">{ICONS.Chat}</div>
                <p className="text-sm text-yellow-800 font-medium italic">“{agreement.text}”</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Acesso Rápido */}
      <section className="px-6 grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate('shopping')}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:bg-gray-50"
        >
          <div className="text-orange-500">{ICONS.Shopping}</div>
          <span className="text-sm font-medium">Lista de Compras</span>
        </button>
        <button 
          onClick={() => onNavigate('location')}
          className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:bg-gray-50"
        >
          <div className="text-blue-500">{ICONS.Location}</div>
          <span className="text-sm font-medium">Onde estamos?</span>
        </button>
      </section>
    </div>
  );
};

export default Dashboard;
