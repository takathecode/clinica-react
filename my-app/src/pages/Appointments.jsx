// src/pages/Appointments.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Search, Edit2, Trash2, Calendar } from 'lucide-react';
import Modal from '../components/Modal';

const Appointments = () => {
  const { appointments, patients, doctors, addAppointment, updateAppointment, deleteAppointment } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  
  const [formData, setFormData] = useState({
    patientId: '', doctorId: '', date: '', time: '', observations: ''
  });

  const filteredApps = appointments.filter(app => {
    const patient = patients.find(p => String(p.id) === String(app.patientId));
    const doctor = doctors.find(d => String(d.id) === String(app.doctorId));
    const search = searchTerm.toLowerCase();
    return (
      patient?.name.toLowerCase().includes(search) || 
      doctor?.name.toLowerCase().includes(search)
    );
  });

  const handleOpenModal = (app = null) => {
    if (app) {
      setEditingApp(app);
      setFormData(app);
    } else {
      setEditingApp(null);
      setFormData({ patientId: '', doctorId: '', date: '', time: '', observations: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      patientId: formData.patientId,
      doctorId: formData.doctorId
    };
    if (editingApp) {
      updateAppointment({ ...data, id: editingApp.id });
    } else {
      addAppointment(data);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Consultas</h2>
          <p className="text-slate-500 dark:text-slate-400">Agende e gerencie as consultas da clínica.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-success flex items-center gap-2 self-start"
        >
          <Plus size={20} />
          Agendar Consulta
        </button>
      </div>

      <div className="card">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por paciente ou médico..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Paciente</th>
                <th className="px-6 py-4">Médico</th>
                <th className="px-6 py-4">Data/Hora</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredApps.length > 0 ? (
                filteredApps.map(app => {
                  const patient = patients.find(p => String(p.id) === String(app.patientId));
                  const doctor = doctors.find(d => String(d.id) === String(app.doctorId));
                  return (
                    <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">{patient?.name}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{doctor?.name}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                        <div className="flex flex-col">
                          <span className="font-bold">{app.date}</span>
                          <span className="text-xs">{app.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button 
                          onClick={() => handleOpenModal(app)}
                          className="p-2 text-primary dark:text-accent hover:bg-primary/10 dark:hover:bg-accent/10 rounded-lg transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => deleteAppointment(app.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                    Nenhuma consulta encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingApp ? 'Editar Agendamento' : 'Novo Agendamento'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Paciente</label>
            <select 
              required
              className="input-field"
              value={formData.patientId}
              onChange={e => setFormData({...formData, patientId: e.target.value})}
            >
              <option value="">Selecione o paciente</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Médico</label>
            <select 
              required
              className="input-field"
              value={formData.doctorId}
              onChange={e => setFormData({...formData, doctorId: e.target.value})}
            >
              <option value="">Selecione o médico</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Data</label>
              <input 
                type="date"
                required
                className="input-field" 
                value={formData.date} 
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Hora</label>
              <input 
                type="time"
                required
                className="input-field" 
                value={formData.time} 
                onChange={e => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Observações</label>
            <textarea 
              className="input-field" 
              rows="3"
              value={formData.observations} 
              onChange={e => setFormData({...formData, observations: e.target.value})}
            ></textarea>
          </div>
          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button type="submit" className="flex-1 btn-primary">
              {editingApp ? 'Confirmar' : 'Agendar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Appointments;
