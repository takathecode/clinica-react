// src/pages/Patients.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Search, Edit2, Trash2, UserPlus } from 'lucide-react';
import Modal from '../components/Modal';

const Patients = () => {
  const { patients, addPatient, updatePatient, deletePatient } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', cpf: '', birthDate: '', phone: '', email: ''
  });

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.cpf.includes(searchTerm)
  );

  const handleOpenModal = (patient = null) => {
    if (patient) {
      setEditingPatient(patient);
      setFormData(patient);
    } else {
      setEditingPatient(null);
      setFormData({ name: '', cpf: '', birthDate: '', phone: '', email: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPatient) {
      updatePatient({ ...formData, id: editingPatient.id });
    } else {
      addPatient(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Pacientes</h2>
          <p className="text-slate-500 dark:text-slate-400">Gerencie o cadastro de pacientes da clínica.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-success flex items-center gap-2 self-start"
        >
          <Plus size={20} />
          Cadastrar Paciente
        </button>
      </div>

      <div className="card">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou CPF..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">CPF</th>
                <th className="px-6 py-4">Telefone</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredPatients.length > 0 ? (
                filteredPatients.map(patient => (
                  <tr key={patient.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">{patient.name}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{patient.cpf}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{patient.phone}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleOpenModal(patient)}
                        className="p-2 text-primary dark:text-accent hover:bg-primary/10 dark:hover:bg-accent/10 rounded-lg transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => deletePatient(patient.id)}
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
                    Nenhum paciente encontrado.
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
        title={editingPatient ? 'Editar Paciente' : 'Novo Paciente'}
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">CPF</label>
              <input 
                required
                className="input-field" 
                value={formData.cpf} 
                onChange={e => setFormData({...formData, cpf: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Nascimento</label>
              <input 
                type="date"
                required
                className="input-field" 
                value={formData.birthDate} 
                onChange={e => setFormData({...formData, birthDate: e.target.value})}
              />
            </div>
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
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Email</label>
            <input 
              type="email"
              required
              className="input-field" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
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
              {editingPatient ? 'Salvar Alterações' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Patients;
