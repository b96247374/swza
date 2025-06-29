# حل مشكلة إضافة المستخدمين بعد حذف Firebase

## المشكلة
بعد حذف مشروع Firebase، النظام لا يستطيع إضافة مستخدمين جدد.

## الحل السريع: استخدام localStorage

### الخطوة 1: تعديل useUsers.js
استبدل محتوى `src/hooks/useUsers.js` بـ:

```javascript
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (savedUsers.length === 0) {
      const defaultUser = {
        id: 'admin',
        name: 'مدير النظام',
        rank: 'مدير',
        username: 'admin',
        password: '123456',
        role: 'admin',
        permissions: {
          canManageUsers: true,
          canSubmitReports: true,
          canReview: true,
          canDeleteReports: true,
          canManageLeaves: true,
          canViewLeaves: true,
          canRequestExcuse: true
        },
        createdAt: new Date().toISOString()
      };
      savedUsers.push(defaultUser);
      localStorage.setItem('users', JSON.stringify(savedUsers));
    }
    
    setUsers(savedUsers);
    setLoading(false);
  }, []);

  const handleAddUser = async (user) => {
    try {
      const newUser = {
        ...user,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      toast({ title: 'تمت الإضافة', description: 'تمت إضافة المستخدم بنجاح' });
    } catch (error) {
      toast({ title: 'خطأ', description: 'تعذر إضافة المستخدم', variant: 'destructive' });
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const updatedUsers = users.map(user => 
        user.id === userData.id ? { ...user, ...userData } : user
      );
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      toast({ title: 'تم التحديث', description: 'تم تحديث المستخدم بنجاح' });
    } catch (error) {
      toast({ title: 'خطأ', description: 'تعذر تحديث المستخدم', variant: 'destructive' });
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      toast({ title: 'تم الحذف', description: 'تم حذف المستخدم بنجاح' });
    } catch (error) {
      toast({ title: 'خطأ', description: 'تعذر حذف المستخدم', variant: 'destructive' });
    }
  };

  return {
    users,
    addUser: handleAddUser,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
    loading,
  };
};
```

### الخطوة 2: تعديل useAuth.js
استبدل محتوى `src/hooks/useAuth.js` بـ:

```javascript
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      const foundUser = users.find(u => 
        u.username === username && u.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        toast({ title: 'تم تسجيل الدخول', description: `مرحباً ${foundUser.name}` });
        return true;
      } else {
        if (username === 'admin' && password === '123456') {
          const adminUser = {
            id: 'admin',
            name: 'مدير النظام',
            rank: 'مدير',
            username: 'admin',
            role: 'admin',
            permissions: {
              canManageUsers: true,
              canSubmitReports: true,
              canReview: true,
              canDeleteReports: true,
              canManageLeaves: true,
              canViewLeaves: true,
              canRequestExcuse: true
            }
          };
          setUser(adminUser);
          localStorage.setItem('currentUser', JSON.stringify(adminUser));
          toast({ title: 'تم تسجيل الدخول', description: 'مرحباً مدير النظام' });
          return true;
        }
        
        toast({ title: 'خطأ', description: 'اسم المستخدم أو كلمة المرور غير صحيحة', variant: 'destructive' });
        return false;
      }
    } catch (error) {
      toast({ title: 'خطأ', description: 'حدث خطأ أثناء تسجيل الدخول', variant: 'destructive' });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast({ title: 'تم تسجيل الخروج', description: 'تم تسجيل الخروج بنجاح' });
  };

  return {
    user,
    login,
    logout,
    loading
  };
};
```

## التطبيق

1. عدّل الملفين كما هو موضح أعلاه
2. شغل السيرفر: `npm run dev`
3. جرب إضافة مستخدم جديد

## بيانات الدخول
- اسم المستخدم: admin
- كلمة المرور: 123456 