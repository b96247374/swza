import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/hooks/useAuth';
import useThemeSettings from '@/hooks/useThemeSettings';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import AddUserOnce from './AddUserOnce';

function App() {
  const { user, login, logout } = useAuth();
  
  // تطبيق إعدادات الثيم
  useThemeSettings();

  return (
    <>
      <Helmet>
        <title>نظام تقرير الاستلام اليومي</title>
        <meta name="description" content="نظام متطور لإدارة تقارير الاستلام اليومية مع التوقيع الإلكتروني وإدارة المخالفات" />
      </Helmet>
      <AddUserOnce />
      {/* Global Alert Bar */}
      <div className="w-full bg-yellow-200 border-b-2 border-yellow-400 py-2 px-4 flex items-center gap-2 justify-center text-yellow-900 font-bold text-base shadow-md z-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-700 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" /></svg>
        تنبيه: النظام تحت المراقبة من قبل الإدارة
      </div>
      <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-green-900 via-green-800 to-green-950 p-2 md:p-6 pb-28 w-full">
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" /> : <Login onLogin={login} />} 
          />
          <Route 
            path="/*" 
            element={user ? <Dashboard user={user} onLogout={logout} /> : <Navigate to="/login" />} 
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
