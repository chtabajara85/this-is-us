
import React, { useState } from 'react';
import { ICONS, DAYS_PT } from '../constants';
import { Meal, Recipe } from '../types';

interface Props {
  meals: Meal[];
  recipes: Recipe[];
  onUpdateMeal: (meal: Meal) => void;
}

const MealPlanner: React.FC<Props> = ({ meals, recipes, onUpdateMeal }) => {
  const [editingDay, setEditingDay] = useState<number | null>(null);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const day = editingDay!;
    const existing = meals.find(m => m.day === day);
    
    const updated: Meal = {
      id: existing?.id || Math.random().toString(36).substr(2, 9),
      day,
      title: formData.get('title') as string,
      type: formData.get('type') as any,
      cook: formData.get('cook') as string,
      recipeId: formData.get('recipeId') as string || undefined,
      ingredientsReady: formData.get('ready') === 'on'
    };
    
    onUpdateMeal(updated);
    setEditingDay(null);
  };

  return (
    <div className="pb-24 pt-12">
      <header className="px-6 mb-8">
        <h2 className="text-2xl font-serif text-[#2C332E]">Jantares da Semana</h2>
        <p className="text-sm text-gray-500">Planejamento colaborativo</p>
      </header>

      <div className="px-4 space-y-4">
        {DAYS_PT.map((dayName, idx) => {
          const meal = meals.find(m => m.day === idx);
          const recipe = recipes.find(r => r.id === meal?.recipeId);
          
          return (
            <div 
              key={idx} 
              className={`p-6 rounded-[2.5rem] border transition-all ${
                meal ? 'bg-white border-gray-100 shadow-sm' : 'bg-gray-50 border-dashed border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E9775]">{dayName}</span>
                <button 
                  onClick={() => setEditingDay(idx)}
                  className="text-xs font-bold text-[#4A5D4E] bg-[#4A5D4E]/5 px-4 py-2 rounded-2xl"
                >
                  {meal ? 'Mudar' : 'Planejar'}
                </button>
              </div>

              {meal ? (
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{meal.title}</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-xl text-[10px] font-bold">{meal.cook} cozinha</span>
                    {recipe?.instagramUrl && (
                      <a 
                        href={recipe.instagramUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-pink-50 text-pink-600 px-3 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1"
                      >
                        {ICONS.Link} Ver Insta
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-300 italic">Vago...</p>
              )}
            </div>
          );
        })}
      </div>

      {editingDay !== null && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-t-[3rem] p-8 animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{DAYS_PT[editingDay]}</h3>
              <button onClick={() => setEditingDay(null)}>{ICONS.Close}</button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
              <input 
                name="title" 
                defaultValue={meals.find(m => m.day === editingDay)?.title}
                className="w-full bg-gray-50 border-0 rounded-2xl p-4"
                placeholder="Nome do Prato"
              />
              <div className="grid grid-cols-2 gap-4">
                <select name="type" className="bg-gray-50 border-0 rounded-2xl p-4">
                  <option value="homemade">Caseiro</option>
                  <option value="delivery">Delivery</option>
                  <option value="out">Comer fora</option>
                </select>
                <input name="cook" placeholder="Quem cozinha?" className="bg-gray-50 border-0 rounded-2xl p-4" />
              </div>
              <select name="recipeId" className="w-full bg-gray-50 border-0 rounded-2xl p-4">
                <option value="">Vincular Receita Salva</option>
                {recipes.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
              </select>
              <button type="submit" className="w-full bg-[#4A5D4E] text-white py-4 rounded-3xl font-bold shadow-xl mt-4">
                Confirmar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
