# حل سريع لمشكلة إضافة المستخدمين

## المشكلة
لا يمكن إضافة مستخدم جديد من واجهة إدارة المستخدمين.

## الحلول السريعة

### 1. إصلاح قواعد Firestore (الأولوية الأولى)
1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. اختر مشروعك: `daily-receiving-report-system`
3. اذهب إلى **Firestore Database** > **Rules**
4. استبدل القواعد بـ:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
5. اضغط **Publish**

### 2. إضافة مستخدم من Firebase Console
1. في Firebase Console، اذهب إلى **Firestore Database**
2. اختر مجموعة **users**
3. اضغط **Add document**
4. أضف البيانات:
```json
{
  "name": "اسم المستخدم",
  "rank": "الرتبة", 
  "username": "اسم_المستخدم",
  "password": "123456",
  "role": "user",
  "permissions": {
    "canSubmitReports": true,
    "canRequestExcuse": true
  }
}
```

### 3. تشغيل سكريبت إضافة المستخدمين
```bash
# إضافة مستخدم واحد
node add-user-quick.js

# إضافة عدة مستخدمين
node add-users-batch.js
```

### 4. فحص الأخطاء في المتصفح
1. اضغط F12 في المتصفح
2. اذهب إلى Console
3. حاول إضافة مستخدم
4. راقب الأخطاء

## بيانات الدخول الافتراضية
- **اسم المستخدم:** admin
- **كلمة المرور:** 123456
- **الدور:** admin (مع جميع الصلاحيات)

## إذا استمرت المشكلة
1. تأكد من اتصال الإنترنت
2. تحقق من إعدادات Firebase
3. جرب إضافة مستخدم من Firebase Console مباشرة
4. راجع Console المتصفح للأخطاء

## للدعم الفني
إذا لم تحل المشكلة، قدم:
1. لقطة شاشة من Console المتصفح
2. رسالة الخطأ الكاملة
3. قواعد Firestore الحالية 