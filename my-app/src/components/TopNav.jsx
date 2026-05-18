import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeartPulse, LayoutDashboard, Users, UserRound, CalendarDays, Bell, Search, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const TopNav = () => {
  const { isDark, toggleTheme } = useTheme();
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/pacientes', name: 'Pacientes', icon: <Users size={18} /> },
    { path: '/medicos', name: 'Médicos', icon: <UserRound size={18} /> },
    { path: '/consultas', name: 'Consultas', icon: <CalendarDays size={18} /> },
  ];

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-50 transition-all shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary rounded-xl shadow-md transition-colors">
          <HeartPulse className="text-accent" size={28} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-primary dark:text-accent transition-colors">
          MedCore
        </h1>
      </div>
      
      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 font-medium text-sm ${
                isActive 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Pesquisar..." 
            className="w-full bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-accent/20 focus:border-primary/30 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
        
        <button onClick={toggleTheme} className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-100 rounded-full transition-all">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-100 rounded-full transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
        
        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-1.5 pr-4 rounded-full transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
          <div className="w-9 h-9 bg-primary dark:bg-accent rounded-full flex items-center justify-center text-white dark:text-primary shadow-sm">
            <User size={18} />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-none">Admin</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Gestor</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
