
import React, { useState, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import MealPlanner from './components/MealPlanner';
import ShoppingList from './components/ShoppingList';
import CalendarView from './components/CalendarView';
import RecipeLibrary from './components/RecipeLibrary';
import AgreementsList from './components/AgreementsList';
import { Meal, ShoppingItem, Appointment, Recipe, Agreement } from './types';
import { ICONS, COLORS } from './constants';

const STORAGE_KEY = 'THIS_IS_US_APP_DATA';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  
  const [meals, setMeals] = useState<Meal[]>([]);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [agreements, setAgreements] = useState<Agreement[]>([]);

  // Carregamento de dados com tratamento de erro
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setMeals(data.meals || []);
        setShoppingItems(data.shoppingItems || []);
        setAppointments(data.appointments || []);
        setRecipes(data.recipes || []);
        setAgreements(data.agreements || []);
      } else {
        // Mock inicial para visualização
        setRecipes([{ id: '1', title: 'Risoto de Cogumelos', ingredients: ['Arroz arbóreo', 'Shitake', 'Vinho branco'] }]);
        setAgreements([{ id: '1', text: 'Sempre avisar quando estiver saindo do trabalho', status: 'pending' }]);
      }
    } catch (e) {
      console.error("Erro ao carregar dados:", e);
    }
  }, []);

  // Persistência automática (Debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSyncing(true);
      const data = { meals, shoppingItems, appointments, recipes, agreements };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setTimeout(() => setIsSyncing(false), 600);
    }, 1000);
    return () => clearTimeout(timer);
  }, [meals, shoppingItems, appointments, recipes, agreements]);

  const handleRequestLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setIsSharingLocation(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setTimeout(() => setIsSharingLocation(false), 3000); // Feedback visual temporário
      },
      () => setIsSharingLocation(false)
    );
  }, []);

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard 
          meals={meals} 
          appointments={appointments} 
          agreements={agreements} 
          onNavigate={(s) => s === 'location' ? handleRequestLocation() : setActiveScreen(s)}
          isSharingLocation={isSharingLocation}
        />;
      case 'meals':
        return <MealPlanner meals={meals} recipes={recipes} onUpdateMeal={(m) => setMeals(prev => [...prev.filter(x => x.day !== m.day), m].sort((a,b) => a.day - b.day))} />;
      case 'shopping':
        return <ShoppingList 
          items={shoppingItems} 
          onToggle={(id) => setShoppingItems(prev => prev.map(i => i.id === id ? {...i, checked: !i.checked} : i))}
          onAdd={(name, cat) => setShoppingItems(prev => [{id: Math.random().toString(36), name, category: cat, checked: false}, ...prev])}
          onClear={() => setShoppingItems([])}
        />;
      case 'calendar':
        return <CalendarView appointments={appointments} onAdd={(a) => setAppointments(prev => [...prev, a])} />;
      case 'recipes':
        return <RecipeLibrary recipes={recipes} onAdd={(r) => setRecipes(prev => [...prev, r])} />;
      case 'agreements':
        return <AgreementsList 
          agreements={agreements}
          onAdd={(t) => setAgreements(prev => [{id: Math.random().toString(36), text: t, status: 'pending'}, ...prev])}
          onToggle={(id) => setAgreements(prev => prev.map(a => a.id === id ? {...a, status: a.status === 'pending' ? 'resolved' : 'pending'} : a))}
        />;
      case 'more':
        return (
          <div className="pt-16 px-6 space-y-6 animate-slide-up">
            <h2 className="text-3xl font-serif text-sage-600">Configurações</h2>
            <div className="space-y-4">
              <button onClick={() => setActiveScreen('recipes')} className="w-full bg-white p-6 rounded-[2.5rem] flex items-center justify-between shadow-sm active:scale-95 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-50 text-orange-500 p-3 rounded-2xl">{ICONS.Utensils}</div>
                  <div className="text-left">
                    <p className="font-bold">Minha Biblioteca</p>
                    <p className="text-xs text-gray-400">Receitas salvas e links</p>
                  </div>
                </div>
                {ICONS.ChevronRight}
              </button>
              <button onClick={() => setActiveScreen('agreements')} className="w-full bg-white p-6 rounded-[2.5rem] flex items-center justify-between shadow-sm active:scale-95 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="bg-pink-50 text-pink-500 p-3 rounded-2xl">{ICONS.Couple}</div>
                  <div className="text-left">
                    <p className="font-bold">Combinados</p>
                    <p className="text-xs text-gray-400">Nossos acordos</p>
                  </div>
                </div>
                {ICONS.ChevronRight}
              </button>
            </div>
            
            <div className="p-6 bg-sage-50 rounded-[2.5rem] border border-sage-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-sage-500 uppercase tracking-widest">Sincronização</p>
                <p className="text-sm text-sage-600/70 font-medium">Backup automático ativo</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${isSyncing ? 'bg-orange-400 animate-pulse' : 'bg-green-500'}`} />
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F9F7F2] relative flex flex-col shadow-2xl overflow-hidden border-x border-gray-100">
      <main className="flex-1 overflow-y-auto no-scrollbar safe-pb">
        {renderActiveScreen()}
      </main>
      <Navigation 
        activeScreen={['recipes', 'agreements'].includes(activeScreen) ? 'more' : activeScreen} 
        onNavigate={setActiveScreen} 
      />
    </div>
  );
};

export default App;
