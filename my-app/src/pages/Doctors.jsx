// src/pages/Doctors.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Search, Edit2, Trash2, Stethoscope } from 'lucide-react';
import Modal from '../components/Modal';

const Doctors = () => {
  const { doctors, addDoctor, updateDoctor, deleteDoctor } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', specialty: '', crm: '', phone: ''
  });

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (doctor = null) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setFormData(doctor);
    } else {
      setEditingDoctor(null);
      setFormData({ name: '', specialty: '', crm: '', phone: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDoctor) {
      updateDoctor({ ...formData, id: editingDoctor.id });
    } else {
      addDoctor(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Médicos</h2>
          <p className="text-slate-500 dark:text-slate-400">Gerencie o corpo clínico da MedCore.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-success flex items-center gap-2 self-start"
        >
          <Plus size={20} />
          Adicionar Médico
        </button>
      </div>

      <div className="card">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou especialidade..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Médico</th>
                <th className="px-6 py-4">Especialidade</th>
                <th className="px-6 py-4">CRM</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(doctor => (
                  <tr key={doctor.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary dark:text-accent">
                          <Stethoscope size={16} />
                        </div>
                        <span className="font-medium text-slate-700 dark:text-slate-200">{doctor.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{doctor.specialty}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{doctor.crm}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleOpenModal(doctor)}
                        className="p-2 text-primary dark:text-accent hover:bg-primary/10 dark:hover:bg-accent/10 rounded-lg transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => deleteDoctor(doctor.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                    Nenhum médico encontrado.
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
        title={editingDoctor ? 'Editar Médico' : 'Novo Médico'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Nome Completo</label>
            <input 
              required
              className="input-field" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Especialidade</label>
            <input 
              required
              className="input-field" 
              value={formData.specialty} 
              onChange={e => setFormData({...formData, specialty: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">CRM</label>
              <input 
                required
                className="input-field" 
                value={formData.crm} 
                onChange={e => setFormData({...formData, crm: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Telefone</label>
              <input 
                required
                className="input-field" 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
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
              {editingDoctor ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Doctors;
