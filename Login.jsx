import React, { useState, useEffect } from 'react';
import { User, Eye, Lock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// دالة لتحويل التاريخ الميلادي إلى هجري
const getHijriDate = () => {
  const today = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    calendar: 'islamic'
  };
  return today.toLocaleDateString('ar-SA-u-ca-islamic', options);
};

// دالة للحصول على الوقت بنظام 12 ساعة
const getTime12Hour = () => {
  const now = new Date();
  const options = { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true,
    timeZone: 'Asia/Riyadh'
  };
  return now.toLocaleTimeString('ar-SA', options);
};

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentTime, setCurrentTime] = useState(getTime12Hour());
  const [hijriDate, setHijriDate] = useState(getHijriDate());
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // تحديث الوقت كل دقيقة
    const timeInterval = setInterval(() => {
      setCurrentTime(getTime12Hour());
    }, 60000);

    // تحديث التاريخ كل ساعة
    const dateInterval = setInterval(() => {
      setHijriDate(getHijriDate());
    }, 3600000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(dateInterval);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (username.trim() && password.trim()) {
      const success = onLogin(username, password);
      if (!success) {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      } else {
        navigate('/'); // التوجيه إلى الصفحة الرئيسية بعد النجاح
      }
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-2"
      dir="rtl"
      style={{
        background: 'linear-gradient(135deg, #17643a 0%, #0d2e1c 100%)',
      }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 mx-auto">
        {/* الشعار */}
        <div className="flex justify-center mb-6">
          <img 
            src="/moi-logo.png" 
            alt="شعار الوزارة" 
            className="h-20 w-20 rounded-full shadow-lg border-4 border-white"
          />
        </div>

        {/* التاريخ الهجري والساعة */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="flex items-center gap-2 text-green-900 text-base md:text-lg font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>{hijriDate}</span>
          </div>
          <div className="flex items-center gap-2 text-blue-800 text-lg md:text-xl font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{currentTime}</span>
          </div>
        </div>

        {/* نموذج تسجيل الدخول */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 text-red-700 rounded p-2 text-center font-bold border border-red-300 mb-2">
              {error}
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              اسم المستخدم
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="أدخل اسم المستخدم"
                required
              />
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="أدخل كلمة المرور"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <Lock size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-green-700 transition duration-200 shadow-lg"
          >
            تسجيل الدخول
          </button>
        </form>

        {/* معلومات إضافية */}
      </div>
    </div>
  );
};

export default Login; 