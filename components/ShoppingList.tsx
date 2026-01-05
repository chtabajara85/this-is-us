
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { ShoppingItem, Category } from '../types';

interface Props {
  items: ShoppingItem[];
  onToggle: (id: string) => void;
  onAdd: (name: string, category: Category) => void;
  onClear: () => void;
}

const ShoppingList: React.FC<Props> = ({ items, onToggle, onAdd, onClear }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedCat, setSelectedCat] = useState<Category>('Mercado');

  const categories: Category[] = ['Mercado', 'Açougue', 'Feira', 'Farmácia', 'Outros'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim(), selectedCat);
      setInputValue('');
    }
  };

  const pending = items.filter(i => !i.checked);
  const completed = items.filter(i => i.checked);

  return (
    <div className="pb-24 pt-12 flex flex-col h-full min-h-screen">
      <header className="px-6 mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif text-[#2C332E]">Compras</h2>
          <p className="text-sm text-gray-500">{pending.length} itens pendentes</p>
        </div>
        <button onClick={onClear} className="text-xs text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full">Limpar tudo</button>
      </header>

      {/* Add Item Form */}
      <div className="px-6 mb-8">
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="flex-1">
            <input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Adicionar item..."
              className="w-full border-0 focus:ring-0 text-sm p-1"
            />
            <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar py-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={`text-[10px] px-2 py-1 rounded-full border whitespace-nowrap transition-colors ${
                    selectedCat === cat ? 'bg-[#4A5D4E] text-white border-[#4A5D4E]' : 'bg-gray-50 text-gray-400 border-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="bg-[#4A5D4E] p-3 rounded-full text-white shadow-md">
            {ICONS.Plus}
          </button>
        </form>
      </div>

      {/* List Content */}
      <div className="px-6 flex-1 space-y-8">
        {categories.map(cat => {
          const catItems = pending.filter(i => i.category === cat);
          if (catItems.length === 0) return null;
          
          return (
            <div key={cat} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#8E9775]">{cat}</h3>
              <div className="space-y-2">
                {catItems.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => onToggle(item.id)}
                    className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-50 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center">
                      {item.checked && <div className="w-3 h-3 bg-[#4A5D4E] rounded-full" />}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {completed.length > 0 && (
          <div className="space-y-3 opacity-50 pb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Comprados</h3>
            <div className="space-y-2">
              {completed.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => onToggle(item.id)}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                    {ICONS.Check}
                  </div>
                  <span className="text-sm font-medium text-gray-500 line-through">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <div className="mb-4 opacity-20">{ICONS.Shopping}</div>
            <p className="text-sm">Sua lista está vazia</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
