
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { Appointment, ApptType } from '../types';

interface Props {
  appointments: Appointment[];
  onAdd: (appt: Appointment) => void;
}

const CalendarView: React.FC<Props> = ({ appointments, onAdd }) => {
  const [showAdd, setShowAdd] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newAppt: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      title: fd.get('title') as string,
      date: fd.get('date') as string,
      time: fd.get('time') as string,
      type: fd.get('type') as ApptType,
    };
    onAdd(newAppt);
    setShowAdd(false);
  };

  return (
    <div className="pb-24 pt-12 px-6">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-serif text-[#2C332E]">Agenda da Família</h2>
          <p className="text-sm text-gray-500">Compromissos e logística</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="bg-[#4A5D4E] text-white p-3 rounded-2xl shadow-lg"
        >
          {ICONS.Plus}
        </button>
      </header>

      <div className="space-y-4">
        {appointments.length > 0 ? appointments.sort((a,b) => a.date.localeCompare(b.date)).map(appt => (
          <div key={appt.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${
              appt.type === 'Crianças' ? 'bg-blue-50 text-blue-500' :
              appt.type === 'Casal' ? 'bg-pink-50 text-pink-500' :
              appt.type === 'Trabalho' ? 'bg-gray-100 text-gray-700' : 'bg-orange-50 text-orange-600'
            }`}>
              {appt.type === 'Crianças' ? ICONS.Family : appt.type === 'Casal' ? ICONS.Couple : ICONS.Calendar}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800">{appt.title}</p>
              <p className="text-xs text-gray-400">{appt.date} às {appt.time} • <span className="italic">{appt.type}</span></p>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 text-gray-400">Nenhum compromisso marcado.</div>
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-t-[3rem] p-8 animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Novo Compromisso</h3>
              <button onClick={() => setShowAdd(false)}>{ICONS.Close}</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="title" placeholder="O que vamos fazer?" required className="w-full bg-gray-50 border-0 rounded-2xl p-4" />
              <div className="grid grid-cols-2 gap-4">
                <input name="date" type="date" required className="w-full bg-gray-50 border-0 rounded-2xl p-4" />
                <input name="time" type="time" required className="w-full bg-gray-50 border-0 rounded-2xl p-4" />
              </div>
              <select name="type" className="w-full bg-gray-50 border-0 rounded-2xl p-4">
                <option value="Casal">Casal</option>
                <option value="Crianças">Crianças</option>
                <option value="Casa">Casa</option>
                <option value="Trabalho">Trabalho</option>
              </select>
              <button type="submit" className="w-full bg-[#4A5D4E] text-white py-4 rounded-3xl font-bold mt-4 shadow-xl">
                Agendar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
