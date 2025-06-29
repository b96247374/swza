import React from 'react';
import { useUsers } from '@/hooks/useUsers';
import { Shield, User, KeyRound, Crown } from 'lucide-react';

const LoginCredentials = () => {
  const { users } = useUsers();

  return (
    <div className="mt-8 p-6 glass-effect rounded-lg border border-gold/20">
      <h3 className="text-lg font-bold text-gold mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5" />
        بيانات الدخول التجريبية
      </h3>
      <ul className="space-y-3">
        {users.map(user => (
          <li key={user.id} className="p-3 bg-black/20 rounded-md text-sm">
            <div className="flex justify-between items-center">
              <p className="flex items-center gap-2 font-semibold text-white">
                <User className="w-4 h-4 text-gray-400" />
                {user.username}
              </p>
              {user.role === 'commander' && (
                <span className="flex items-center gap-1 text-xs font-bold text-gold bg-yellow-500/10 px-2 py-1 rounded-full">
                  <Crown className="w-3 h-3" />
                  قائد
                </span>
              )}
            </div>
            <p className="flex items-center gap-2 mt-1 text-gray-300">
              <KeyRound className="w-4 h-4 text-gray-400" />
              {user.password}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoginCredentials;