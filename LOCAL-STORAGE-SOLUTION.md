# حل مشكلة إضافة المستخدمين بعد حذف Firebase

## 🎯 المشكلة
بعد حذف مشروع Firebase، النظام لا يستطيع إضافة مستخدمين جدد لأنه يحاول الاتصال بـ Firebase المحذوف.

## 🚀 الحلول المتاحة

### الحل 1: استخدام localStorage (سريع ومؤقت)

#### الخطوة 1: تعديل useUsers.js
```javascript
// استبدل محتوى src/hooks/useUsers.js بـ:
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // تحميل المستخدمين من localStorage
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // إضافة مستخدم افتراضي إذا لم يكن هناك مستخدمين
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

#### الخطوة 2: تعديل useAuth.js
```javascript
// استبدل محتوى src/hooks/useAuth.js بـ:
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
      // قراءة المستخدمين من localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // البحث عن المستخدم
      const foundUser = users.find(u => 
        u.username === username && u.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        toast({ title: 'تم تسجيل الدخول', description: `مرحباً ${foundUser.name}` });
        return true;
      } else {
        // فحص المستخدم الثابت في الكود
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

### الحل 2: إنشاء مشروع Firebase جديد

#### الخطوة 1: إنشاء مشروع جديد
1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. اضغط **Create a project**
3. اختر اسم جديد للمشروع
4. اتبع الخطوات لإنشاء المشروع

#### الخطوة 2: تحديث الإعدادات
```javascript
// عدّل src/lib/firebase.js بإعدادات المشروع الجديد
const firebaseConfig = {
  apiKey: "YOUR_NEW_API_KEY",
  authDomain: "YOUR_NEW_PROJECT.firebaseapp.com",
  projectId: "YOUR_NEW_PROJECT_ID",
  // ... باقي الإعدادات
};
```

### الحل 3: استخدام قاعدة بيانات محلية أخرى

#### خيارات متاحة:
- **SQLite** - قاعدة بيانات محلية
- **IndexedDB** - قاعدة بيانات متصفح متقدمة
- **JSON Server** - خادم محلي للبيانات

## 🚀 التطبيق السريع

### لتطبيق الحل الأول (localStorage):
```bash
# 1. عدّل الملفات كما هو موضح أعلاه
# 2. شغل السيرفر
npm run dev
# 3. جرب إضافة مستخدم جديد
```

### بيانات الدخول الافتراضية:
- **اسم المستخدم:** admin
- **كلمة المرور:** 123456

## ✅ بعد التطبيق

1. **اختبر إضافة المستخدمين** من واجهة النظام
2. **اختبر تسجيل الدخول** بالمستخدمين الجدد
3. **تحقق من جميع الوظائف** (التقارير، الإجازات، إلخ)

## 🔒 ملاحظات الأمان

### مع localStorage:
- البيانات محفوظة محلياً في المتصفح
- لا توجد مزامنة بين الأجهزة
- مناسبة للتطوير والاختبار

### للاستخدام الإنتاجي:
- استخدم قاعدة بيانات حقيقية
- أضف مصادقة قوية
- استخدم HTTPS

## 🆘 إذا واجهت مشاكل

1. **تحقق من Console المتصفح** (F12)
2. **تأكد من تعديل الملفات** بشكل صحيح
3. **اختبر البيانات المحفوظة** في localStorage
4. **راجع رسائل الخطأ** في Console 