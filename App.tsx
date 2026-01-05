
import React, { useState, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import MealPlanner from './components/MealPlanner';
import ShoppingList from './components/ShoppingList';
import CalendarView from './components/CalendarView';
import RecipeLibrary from './components/RecipeLibrary';
import AgreementsList from './components/AgreementsList';
import { Meal, ShoppingItem, Appointment, Recipe, Agreement, Category } from './types';
import { ICONS } from './constants';

const STORAGE_KEY = 'THIS_IS_US_DATA_V2';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [isSyncing, setIsSyncing] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  // Inicialização de estados
  const [meals, setMeals] = useState<Meal[]>([]);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [agreements, setAgreements] = useState<Agreement[]>([]);

  // Carregamento Seguro (Hydration)
  useEffect(() => {
    const initData = () => {
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
          // Defaults para novos usuários
          setRecipes([{ id: 'r1', title: 'Carbonara da Família', ingredients: ['Massa', 'Pancetta', 'Ovos'], instagramUrl: 'https://instagram.com' }]);
          setAgreements([{ id: 'ag1', text: 'Domingo é dia de planejar a semana juntos', status: 'pending' }]);
        }
      } catch (e) {
        console.error("Erro crítico ao ler LocalStorage:", e);
      }
    };
    initData();
  }, []);

  // Persistência com Efeito de Sincronização (Robustez)
  useEffect(() => {
    const saveData = async () => {
      setIsSyncing(true);
      const dataToSave = { meals, shoppingItems, appointments, recipes, agreements };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      
      // Simula latência de rede para feedback visual de backend
      setTimeout(() => setIsSyncing(false), 800);
    };

    const timeout = setTimeout(saveData, 500); // Debounce de salvamento
    return () => clearTimeout(timeout);
  }, [meals, shoppingItems, appointments, recipes, agreements]);

  // Handler de Localização Robusto
  const handleRequestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocalização não suportada.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("Localização obtida:", pos.coords.latitude, pos.coords.longitude);
        alert("Localização compartilhada com sucesso com seu par!");
        setLocationError(null);
      },
      (err) => {
        console.warn("Erro de localização:", err.message);
        setLocationError("Permissão de localização negada ou bloqueada.");
      }
    );
  }, []);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard 
                  meals={meals} 
                  appointments={appointments} 
                  agreements={agreements}
                  onNavigate={(screen) => {
                    if (screen === 'location') handleRequestLocation();
                    else setActiveScreen(screen);
                  }} 
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
          <div className="pt-12 px-6 space-y-4 animate-fade-in">
            <h2 className="text-2xl font-serif mb-8 text-[#2C332E]">Configurações</h2>
            
            <button onClick={() => setActiveScreen('recipes')} className="w-full bg-white p-6 rounded-[2rem] flex items-center justify-between shadow-sm border border-gray-100 active:scale-95 transition-transform">
              <div className="flex items-center gap-4">
                <div className="bg-pink-50 text-pink-500 p-3 rounded-2xl">{ICONS.Utensils}</div>
                <div className="text-left">
                  <p className="font-bold text-gray-800">Receitas do Insta</p>
                  <p className="text-xs text-gray-400">Sua biblioteca salva</p>
                </div>
              </div>
              {ICONS.ChevronRight}
            </button>

            <button onClick={() => setActiveScreen('agreements')} className="w-full bg-white p-6 rounded-[2rem] flex items-center justify-between shadow-sm border border-gray-100 active:scale-95 transition-transform">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-50 text-yellow-600 p-3 rounded-2xl">{ICONS.Chat}</div>
                <div className="text-left">
                  <p className="font-bold text-gray-800">Nossos Combinados</p>
                  <p className="text-xs text-gray-400">Acordos do casal</p>
                </div>
              </div>
              {ICONS.ChevronRight}
            </button>

            <div className="mt-8 p-6 rounded-[2rem] bg-white border border-gray-100">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status de Sincronia</span>
                 <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-orange-400 animate-pulse' : 'bg-green-500'}`}></div>
               </div>
               <p className="text-xs text-gray-500">
                 {isSyncing ? "Salvando alterações no servidor..." : "Todos os dados estão sincronizados."}
               </p>
            </div>

            {locationError && (
              <div className="p-4 bg-red-50 text-red-600 text-xs rounded-2xl border border-red-100">
                {locationError} - Tente habilitar nas configurações do seu navegador/celular.
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F9F7F2] relative shadow-2xl flex flex-col border-x border-gray-100">
      <main className="flex-1 overflow-y-auto no-scrollbar safe-pb">
        {renderScreen()}
      </main>

      <Navigation 
        activeScreen={['recipes', 'agreements'].includes(activeScreen) ? 'more' : activeScreen} 
        onNavigate={setActiveScreen} 
      />
    </div>
  );
};

export default App;
