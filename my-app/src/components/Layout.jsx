// src/components/Layout.jsx
import React from 'react';
import TopNav from './TopNav';
import { useApp } from '../context/AppContext';

const Layout = ({ children }) => {
  const { message } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300">
      <TopNav />
      
      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto w-full">
        {/* Page Content */}
        <div className="p-6 md:p-8 animate-fade-in">
          {children}
        </div>

        {/* Feedback Toast */}
        {message && (
          <div className="fixed bottom-8 right-8 bg-slate-800 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce-in flex items-center gap-3 z-50">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="font-medium text-sm">{message}</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default Layout;

