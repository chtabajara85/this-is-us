
import React from 'react';
import { 
  Home, Utensils, ShoppingCart, Calendar, CheckSquare, 
  MapPin, Heart, Users, MessageCircle, MoreHorizontal,
  ChevronRight, Plus, ExternalLink, Trash2, Check, X
} from 'lucide-react';

export const ICONS = {
  Home: <Home size={20} />,
  Utensils: <Utensils size={20} />,
  Shopping: <ShoppingCart size={20} />,
  Calendar: <Calendar size={20} />,
  Tasks: <CheckSquare size={20} />,
  Location: <MapPin size={20} />,
  Couple: <Heart size={20} />,
  Family: <Users size={20} />,
  Chat: <MessageCircle size={20} />,
  More: <MoreHorizontal size={20} />,
  ChevronRight: <ChevronRight size={16} />,
  Plus: <Plus size={20} />,
  Link: <ExternalLink size={16} />,
  Delete: <Trash2 size={18} />,
  Check: <Check size={18} />,
  Close: <X size={20} />
};

export const COLORS = {
  primary: 'bg-[#4A5D4E]', // Deep sage green
  accent: 'text-[#8E9775]', // Lighter olive
  background: 'bg-[#F9F7F2]', // Soft cream
  card: 'bg-white',
  text: 'text-[#2C332E]'
};

export const DAYS_PT = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
