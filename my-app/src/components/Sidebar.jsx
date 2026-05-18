// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserRound, CalendarDays, Activity } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/pacientes', name: 'Pacientes', icon: <Users size={20} /> },
    { path: '/medicos', name: 'Médicos', icon: <UserRound size={20} /> },
    { path: '/consultas', name: 'Consultas', icon: <CalendarDays size={20} /> },
  ];

  return (
    <div className="w-64 bg-primary text-white h-screen flex flex-col fixed left-0 top-0 shadow-xl">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <Activity className="text-success" size={32} />
        <h1 className="text-2xl font-bold tracking-tight">MedCore</h1>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                ? 'bg-white/20 text-white shadow-inner' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-6 text-sm text-white/40 border-t border-white/10">
        &copy; 2024 MedCore v1.0
      </div>
    </div>
  );
};

export default Sidebar;
