// src/pages/Dashboard.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, UserRound, CalendarDays, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon, color, trend }) => (
  <div className="card p-6 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1">{value}</h3>
      {trend && (
        <div className="flex items-center gap-1 mt-2 text-success text-xs font-bold">
          <TrendingUp size={14} />
          <span>+{trend}% este mês</span>
        </div>
      )}
    </div>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} text-white shadow-lg`}>
      {icon}
    </div>
  </div>
);

const Dashboard = () => {
  const { patients, doctors, appointments } = useApp();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Bem-vindo ao MedCore</h2>
        <p className="text-slate-500 dark:text-slate-400">Aqui está o resumo da sua clínica hoje.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total de Pacientes" 
          value={patients.length} 
          icon={<Users size={28} />} 
          color="bg-primary"
          trend={12}
        />
        <StatCard 
          title="Médicos Ativos" 
          value={doctors.length} 
          icon={<UserRound size={28} />} 
          color="bg-success"
          trend={5}
        />
        <StatCard 
          title="Consultas Marcadas" 
          value={appointments.length} 
          icon={<CalendarDays size={28} />} 
          color="bg-secondary"
          trend={8}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Próximas Consultas</h3>
          <div className="space-y-4">
            {appointments.slice(0, 5).map(app => {
              const patient = patients.find(p => p.id === app.patientId);
              const doctor = doctors.find(d => d.id === app.doctorId);
              return (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-primary dark:text-accent font-bold">
                      {patient?.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{patient?.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{doctor?.name} • {app.time}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Confirmada</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Atividade Recente</h3>
          <div className="relative pl-8 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-700">
            <div className="relative">
              <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-white dark:ring-slate-800"></div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Novo paciente cadastrado</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Há 10 minutos</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-success ring-4 ring-white dark:ring-slate-800"></div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Consulta realizada com sucesso</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Há 1 hora</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-secondary ring-4 ring-white dark:ring-slate-800"></div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Novo médico adicionado ao sistema</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ontem às 16:45</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
