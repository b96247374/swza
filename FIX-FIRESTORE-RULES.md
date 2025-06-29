# حل مشكلة قواعد Firestore - خطوات مفصلة

## المشكلة
```
❌ فشل في اختبار Firestore: [FirebaseError: Missing or insufficient permissions.]
كود الخطأ: permission-denied
```

## الحل: تعديل قواعد Firestore

### الخطوة 1: الوصول إلى Firebase Console
1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. سجل دخولك بحساب Google
3. اختر مشروعك: **daily-receiving-report-system**

### الخطوة 2: الوصول إلى قواعد Firestore
1. من القائمة الجانبية، اضغط على **Firestore Database**
2. اضغط على تبويب **Rules** (في أعلى الصفحة)
3. ستجد قواعد Firestore الحالية

### الخطوة 3: تعديل القواعد
استبدل القواعد الحالية بـ:

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

### الخطوة 4: حفظ القواعد
1. اضغط على زر **Publish** (أزرق)
2. انتظر حتى تظهر رسالة "Rules published successfully"

### الخطوة 5: اختبار الحل
بعد تعديل القواعد، شغل السكريبت مرة أخرى:
```bash
node test-firestore-connection.js
```

## ملاحظات مهمة

### ⚠️ تحذير الأمان
القواعد الحالية تسمح بالقراءة والكتابة للجميع. هذا مناسب للتطوير فقط.

### 🔒 قواعد أكثر أماناً (لاحقاً)
بعد حل المشكلة، يمكنك استخدام قواعد أكثر أماناً:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if true;
      allow write: if true;
    }
    match /reports/{reportId} {
      allow read, write: if true;
    }
    match /leaves/{leaveId} {
      allow read, write: if true;
    }
  }
}
```

## إذا لم تعمل الخطوات

### 1. تحقق من الصلاحيات
- تأكد أن لديك صلاحية تعديل قواعد Firestore
- تأكد أنك مسجل دخول بالحساب الصحيح

### 2. تحقق من المشروع
- تأكد أنك في المشروع الصحيح: `daily-receiving-report-system`

### 3. تحقق من الاتصال
- تأكد من اتصال الإنترنت
- جرب تحديث الصفحة

## بعد حل المشكلة

1. **اختبر إضافة المستخدمين** من واجهة النظام
2. **اختبر السكريبتات**:
   ```bash
   node add-user-quick.js
   node add-users-batch.js
   ```
3. **تحقق من Console المتصفح** للأخطاء

## للدعم الفني
إذا استمرت المشكلة:
1. لقطة شاشة من Firebase Console
2. لقطة شاشة من قواعد Firestore
3. رسالة الخطأ الكاملة من السكريبت 