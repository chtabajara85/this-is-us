
export type MealType = 'homemade' | 'delivery' | 'out';
export type Category = 'Mercado' | 'Açougue' | 'Feira' | 'Farmácia' | 'Outros';
export type ApptType = 'Trabalho' | 'Casa' | 'Crianças' | 'Casal';

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instagramUrl?: string;
  notes?: string;
}

export interface Meal {
  id: string;
  day: number; // 0-6
  title: string;
  type: MealType;
  cook: string;
  recipeId?: string;
  ingredientsReady: boolean;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: Category;
  checked: boolean;
  recipeId?: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  title: string;
  type: ApptType;
  location?: string;
}

export interface Agreement {
  id: string;
  text: string;
  status: 'pending' | 'resolved';
}
