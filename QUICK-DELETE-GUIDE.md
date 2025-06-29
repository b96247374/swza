# دليل سريع لحذف مشروع Firebase

## ⚠️ تحذير مهم
**حذف المشروع عملية لا يمكن التراجع عنها!**

## 🚀 خطوات سريعة

### 1. إيقاف السيرفر المحلي
```bash
# إذا كان السيرفر يعمل، اضغط Ctrl + C
# أو شغل ملف التنظيف
cleanup-project.bat
```

### 2. حذف مشروع Firebase من السحابة
1. **اذهب إلى:** [Firebase Console](https://console.firebase.google.com)
2. **اختر مشروعك:** `daily-receiving-report-system`
3. **اضغط على ⚙️** (إعدادات المشروع)
4. **اختر Project settings**
5. **اضغط Delete project**
6. **اكتب اسم المشروع:** `daily-receiving-report-system`
7. **اضغط Delete**

### 3. تنظيف المشروع المحلي (اختياري)
```bash
# شغل ملف التنظيف
cleanup-project.bat

# أو يدوياً:
rmdir /s /q node_modules
del package-lock.json
rmdir /s /q dist
```

## 📋 ما سيتم حذفه

### من Firebase:
- ✅ جميع المستخدمين
- ✅ جميع التقارير
- ✅ جميع الإجازات
- ✅ الموقع المنشور
- ✅ جميع البيانات

### من الكمبيوتر المحلي:
- ✅ مجلد node_modules
- ✅ ملفات التبعيات
- ✅ مجلد dist
- ✅ ملفات Firebase المحلية

## 🔄 بدائل الحذف

### بديل 1: تعطيل المشروع مؤقتاً
- اذهب إلى Project settings
- اضغط Disable project
- يمكنك إعادة تفعيله لاحقاً

### بديل 2: حذف البيانات فقط
- احتفظ بالمشروع
- احذف المستندات من Firestore فقط

## ✅ تأكيد الحذف
ستظهر رسالة: `Project "daily-receiving-report-system" has been deleted.`

## 🆘 إذا لم تتمكن من الحذف
1. تحقق من صلاحياتك
2. انتظر بضع ساعات
3. تواصل مع دعم Firebase

## 📞 للدعم
- [Firebase Support](https://firebase.google.com/support)
- [Firebase Documentation](https://firebase.google.com/docs)

---
**تأكد من أنك تريد حذف المشروع نهائياً قبل المتابعة!** 