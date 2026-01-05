
import React from 'react';
import { 
  Home, Utensils, ShoppingCart, Calendar, CheckSquare, 
  MapPin, Heart, Users, MessageCircle, MoreHorizontal,
  ChevronRight, Plus, ExternalLink, Trash2, Check, X,
  Clock, Sparkles, Map, Bell
} from 'lucide-react';

export const ICONS = {
  Home: <Home size={22} strokeWidth={2.2} />,
  Utensils: <Utensils size={22} strokeWidth={2.2} />,
  Shopping: <ShoppingCart size={22} strokeWidth={2.2} />,
  Calendar: <Calendar size={22} strokeWidth={2.2} />,
  Tasks: <CheckSquare size={22} strokeWidth={2.2} />,
  Location: <MapPin size={22} strokeWidth={2.2} />,
  Couple: <Heart size={22} strokeWidth={2.2} />,
  Family: <Users size={22} strokeWidth={2.2} />,
  Chat: <MessageCircle size={22} strokeWidth={2.2} />,
  More: <MoreHorizontal size={22} strokeWidth={2.2} />,
  ChevronRight: <ChevronRight size={18} />,
  Plus: <Plus size={22} />,
  Link: <ExternalLink size={16} />,
  Delete: <Trash2 size={18} />,
  Check: <Check size={20} />,
  Close: <X size={24} />,
  Clock: <Clock size={16} />,
  Sparkles: <Sparkles size={20} />,
  Map: <Map size={20} />,
  Bell: <Bell size={20} />
};

export const COLORS = {
  primary: '#4A5D4E',
  accent: '#8E9775',
  bg: '#F9F7F2',
  white: '#FFFFFF',
  text: '#2C332E',
  muted: '#8A928C'
};

export const DAYS_PT = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
