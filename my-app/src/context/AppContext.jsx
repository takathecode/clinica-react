// src/context/AppContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../service/supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState(null);

  const showFeedback = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  };

  const fetchPatients = async () => {
    const { data, error } = await supabase.from('patients').select('*');
    if (error) console.error(error);
    else setPatients(data);
  };

  const fetchDoctors = async () => {
    const { data, error } = await supabase.from('doctors').select('*');
    if (error) console.error(error);
    else setDoctors(data);
  };

  const fetchAppointments = async () => {
    const { data, error } = await supabase.from('appointments').select('*');
    if (error) console.error(error);
    else {
      const mappedData = data.map(app => ({
        ...app,
        patientId: app.patient_id,
        doctorId: app.doctor_id
      }));
      setAppointments(mappedData);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, []);

  // CRUD Patients
  const addPatient = async (patient) => {
    const { error } = await supabase.from('patients').insert([patient]);
    if (error) {
      console.error(error);
      showFeedback('Erro ao cadastrar paciente.');
    } else {
      showFeedback('Paciente cadastrado com sucesso!');
      fetchPatients();
    }
  };

  const updatePatient = async (updatedPatient) => {
    const { id, ...updateData } = updatedPatient;
    const { error } = await supabase.from('patients').update(updateData).eq('id', id);
    if (error) {
      console.error(error);
      showFeedback('Erro ao atualizar paciente.');
    } else {
      showFeedback('Paciente atualizado com sucesso!');
      fetchPatients();
    }
  };

  const deletePatient = async (id) => {
    const { error } = await supabase.from('patients').delete().eq('id', id);
    if (error) {
      console.error(error);
      showFeedback('Erro ao excluir paciente.');
    } else {
      showFeedback('Paciente excluído com sucesso!');
      fetchPatients();
    }
  };

  // CRUD Doctors
  const addDoctor = async (doctor) => {
    const { error } = await supabase.from('doctors').insert([doctor]);
    if (error) {
      console.error(error);
      showFeedback('Erro ao cadastrar médico.');
    } else {
      showFeedback('Médico cadastrado com sucesso!');
      fetchDoctors();
    }
  };

  const updateDoctor = async (updatedDoctor) => {
    const { id, ...updateData } = updatedDoctor;
    const { error } = await supabase.from('doctors').update(updateData).eq('id', id);
    if (error) {
      console.error(error);
      showFeedback('Erro ao atualizar médico.');
    } else {
      showFeedback('Médico atualizado com sucesso!');
      fetchDoctors();
    }
  };

  const deleteDoctor = async (id) => {
    const { error } = await supabase.from('doctors').delete().eq('id', id);
    if (error) {
      console.error(error);
      showFeedback('Erro ao excluir médico.');
    } else {
      showFeedback('Médico excluído com sucesso!');
      fetchDoctors();
    }
  };

  // CRUD Appointments
  const addAppointment = async (appointment) => {
    const dbAppointment = {
      patient_id: appointment.patientId,
      doctor_id: appointment.doctorId,
      date: appointment.date,
      time: appointment.time,
      observations: appointment.observations
    };
    const { error } = await supabase.from('appointments').insert([dbAppointment]);
    if (error) {
      console.error(error);
      showFeedback('Erro ao agendar consulta.');
    } else {
      showFeedback('Consulta agendada com sucesso!');
      fetchAppointments();
    }
  };

  const updateAppointment = async (updatedAppointment) => {
    const { id, ...updateData } = updatedAppointment;
    const dbAppointment = {
      patient_id: updateData.patientId,
      doctor_id: updateData.doctorId,
      date: updateData.date,
      time: updateData.time,
      observations: updateData.observations
    };
    const { error } = await supabase.from('appointments').update(dbAppointment).eq('id', id);
    if (error) {
      console.error(error);
      showFeedback('Erro ao atualizar consulta.');
    } else {
      showFeedback('Consulta atualizada com sucesso!');
      fetchAppointments();
    }
  };

  const deleteAppointment = async (id) => {
    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) {
      console.error(error);
      showFeedback('Erro ao cancelar consulta.');
    } else {
      showFeedback('Consulta cancelada com sucesso!');
      fetchAppointments();
    }
  };

  return (
    <AppContext.Provider value={{
      patients, addPatient, updatePatient, deletePatient,
      doctors, addDoctor, updateDoctor, deleteDoctor,
      appointments, addAppointment, updateAppointment, deleteAppointment,
      message, showFeedback
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
