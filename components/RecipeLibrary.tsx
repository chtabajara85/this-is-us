
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { Recipe } from '../types';

interface Props {
  recipes: Recipe[];
  onAdd: (recipe: Recipe) => void;
}

const RecipeLibrary: React.FC<Props> = ({ recipes, onAdd }) => {
  const [showAdd, setShowAdd] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newRecipe: Recipe = {
      id: Math.random().toString(36).substr(2, 9),
      title: fd.get('title') as string,
      ingredients: (fd.get('ingredients') as string).split(',').map(i => i.trim()),
      instagramUrl: fd.get('instagramUrl') as string,
      notes: fd.get('notes') as string,
    };
    onAdd(newRecipe);
    setShowAdd(false);
  };

  return (
    <div className="pb-24 pt-12 px-6">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-serif text-[#2C332E]">Nossas Receitas</h2>
          <p className="text-sm text-gray-500">Inspirações para a semana</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="bg-[#4A5D4E] text-white p-3 rounded-2xl">
          {ICONS.Plus}
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {recipes.map(recipe => (
          <div key={recipe.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-gray-800">{recipe.title}</h4>
              {recipe.instagramUrl && (
                <a 
                  href={recipe.instagramUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-pink-50 text-pink-600 p-2 rounded-xl"
                >
                  {ICONS.Link}
                </a>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2 line-clamp-2">{recipe.ingredients.join(', ')}</p>
          </div>
        ))}
        {recipes.length === 0 && (
          <div className="text-center py-20 text-gray-400 italic">Nenhuma receita salva. Adicione uma ou linke um post do Instagram!</div>
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-t-[3rem] p-8 animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Nova Receita</h3>
              <button onClick={() => setShowAdd(false)}>{ICONS.Close}</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="title" placeholder="Nome da delícia" required className="w-full bg-gray-50 border-0 rounded-2xl p-4" />
              <input name="instagramUrl" placeholder="Link do Post (Instagram)" className="w-full bg-gray-50 border-0 rounded-2xl p-4" />
              <textarea name="ingredients" placeholder="Ingredientes (separados por vírgula)" className="w-full bg-gray-50 border-0 rounded-2xl p-4 h-24" />
              <button type="submit" className="w-full bg-[#4A5D4E] text-white py-4 rounded-3xl font-bold shadow-xl">
                Salvar na Biblioteca
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeLibrary;
