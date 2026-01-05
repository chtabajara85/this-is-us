
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { Agreement } from '../types';

interface Props {
  agreements: Agreement[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
}

const AgreementsList: React.FC<Props> = ({ agreements, onAdd, onToggle }) => {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <div className="pb-24 pt-12 px-6">
      <header className="mb-8">
        <h2 className="text-2xl font-serif text-[#2C332E]">Combinados do Casal</h2>
        <p className="text-sm text-gray-500">Nossos acordos e lembretes gentis</p>
      </header>

      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex gap-2 mb-8">
        <input 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Novo combinado..."
          className="flex-1 border-0 focus:ring-0 text-sm"
        />
        <button onClick={handleAdd} className="bg-[#4A5D4E] text-white p-3 rounded-2xl">
          {ICONS.Plus}
        </button>
      </div>

      <div className="space-y-4">
        {agreements.map(item => (
          <div 
            key={item.id} 
            onClick={() => onToggle(item.id)}
            className={`p-5 rounded-[2rem] border transition-all cursor-pointer flex items-start gap-4 ${
              item.status === 'resolved' ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-yellow-50/30 border-yellow-100'
            }`}
          >
            <div className={`mt-1 p-1 rounded-full ${item.status === 'resolved' ? 'bg-green-500 text-white' : 'text-yellow-600'}`}>
              {item.status === 'resolved' ? ICONS.Check : ICONS.Chat}
            </div>
            <p className={`text-sm flex-1 ${item.status === 'resolved' ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgreementsList;
