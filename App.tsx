
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import MealPlanner from './components/MealPlanner';
import ShoppingList from './components/ShoppingList';
import CalendarView from './components/CalendarView';
import RecipeLibrary from './components/RecipeLibrary';
import AgreementsList from './components/AgreementsList';
import { Meal, ShoppingItem, Appointment, Recipe, Agreement, Category } from './types';
import { ICONS } from './constants';

const INITIAL_MEALS: Meal[] = [
  { id: '1', day: 1, title: 'Espaguete Carbonara', type: 'homemade', cook: 'João', ingredientsReady: true, recipeId: 'r1' },
];

const INITIAL_RECIPES: Recipe[] = [
  { id: 'r1', title: 'Carbonara do Insta', ingredients: ['Massa', 'Gema', 'Pancetta'], instagramUrl: 'https://instagram.com' }
];

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [meals, setMeals] = useState<Meal[]>(INITIAL_MEALS);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 'a1', title: 'Pediatra Lucas', date: '2025-05-20', time: '14:00', type: 'Crianças' },
  ]);
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [agreements, setAgreements] = useState<Agreement[]>([
    { id: 'ag1', text: 'Não esquecer de pagar o IPTU até dia 15', status: 'pending' },
  ]);

  const handleUpdateMeal = (updatedMeal: Meal) => {
    setMeals(prev => {
      const filtered = prev.filter(m => m.day !== updatedMeal.day);
      return [...filtered, updatedMeal].sort((a, b) => a.day - b.day);
    });
  };

  const handleAddShopping = (name: string, category: Category) => {
    setShoppingItems(prev => [{ id: Math.random().toString(), name, category, checked: false }, ...prev]);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F9F7F2] relative shadow-2xl overflow-hidden flex flex-col">
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {activeScreen === 'dashboard' && (
          <Dashboard 
            meals={meals} 
            appointments={appointments} 
            agreements={agreements}
            onNavigate={setActiveScreen} 
          />
        )}
        {activeScreen === 'meals' && (
          <MealPlanner 
            meals={meals} 
            recipes={recipes} 
            onUpdateMeal={handleUpdateMeal} 
          />
        )}
        {activeScreen === 'shopping' && (
          <ShoppingList 
            items={shoppingItems} 
            onToggle={(id) => setShoppingItems(s => s.map(i => i.id === id ? {...i, checked: !i.checked} : i))}
            onAdd={handleAddShopping}
            onClear={() => setShoppingItems([])}
          />
        )}
        {activeScreen === 'calendar' && (
          <CalendarView 
            appointments={appointments} 
            onAdd={(a) => setAppointments(prev => [...prev, a])} 
          />
        )}
        {activeScreen === 'recipes' && (
          <RecipeLibrary 
            recipes={recipes} 
            onAdd={(r) => setRecipes(prev => [...prev, r])} 
          />
        )}
        {activeScreen === 'agreements' && (
          <AgreementsList 
            agreements={agreements}
            onAdd={(t) => setAgreements(prev => [{id: Math.random().toString(), text: t, status: 'pending'}, ...prev])}
            onToggle={(id) => setAgreements(prev => prev.map(a => a.id === id ? {...a, status: a.status === 'pending' ? 'resolved' : 'pending'} : a))}
          />
        )}
        {activeScreen === 'more' && (
          <div className="pt-12 px-6 space-y-4">
            <h2 className="text-2xl font-serif mb-8 text-[#2C332E]">Central do Casal</h2>
            
            <button onClick={() => setActiveScreen('recipes')} className="w-full bg-white p-6 rounded-[2rem] flex items-center justify-between shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="bg-pink-50 text-pink-500 p-3 rounded-2xl">{ICONS.Utensils}</div>
                <div className="text-left">
                  <p className="font-bold text-gray-800">Biblioteca de Receitas</p>
                  <p className="text-xs text-gray-400">Posts do Insta e mais</p>
                </div>
              </div>
              {ICONS.ChevronRight}
            </button>

            <button onClick={() => setActiveScreen('agreements')} className="w-full bg-white p-6 rounded-[2rem] flex items-center justify-between shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-50 text-yellow-600 p-3 rounded-2xl">{ICONS.Chat}</div>
                <div className="text-left">
                  <p className="font-bold text-gray-800">Combinados do Casal</p>
                  <p className="text-xs text-gray-400">Nossos acordos</p>
                </div>
              </div>
              {ICONS.ChevronRight}
            </button>

            <div className="pt-8 opacity-40 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest">This Is Us - Ready to Export APK</p>
            </div>
          </div>
        )}
      </main>

      <Navigation activeScreen={['recipes', 'agreements'].includes(activeScreen) ? 'more' : activeScreen} onNavigate={setActiveScreen} />
    </div>
  );
};

export default App;
