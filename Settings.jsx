import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const defaultSettings = {
  commander: {
    name: '',
    rank: '',
    signature: '', // base64
  },
  header: {
    enabled: true,
    content: 'المملكة العربية السعودية\nوزارة الداخلية',
    logo: '/moi-logo.png',
  },
  footer: {
    enabled: true,
    content: 'مع أطيب التحيات',
  },
  signature: {
    showInDocuments: true,
    showInReports: true,
    showInLetters: true,
    showInDecisions: true,
    position: 'bottom', // 'top' or 'bottom'
  },
  printer: {
    defaultPrinter: '',
    options: '',
  },
  theme: {
    color: '#14532d',
    textColor: '#14532d',
    accentColor: '#FFD700',
    backgroundColor: '#ffffff',
    buttonColor: '#14532d',
    linkColor: '#FFD700',
  },
  fonts: {
    primaryFont: 'Cairo',
    secondaryFont: 'Tahoma',
    fontSize: '16px',
    headingColor: '#14532d',
    bodyTextColor: '#333333',
    linkColor: '#FFD700',
  },
};

const Settings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [signatureFile, setSignatureFile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('system_settings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSettings(prev => ({
        ...prev,
        commander: {
          ...prev.commander,
          signature: ev.target.result,
        },
      }));
      setSignatureFile(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem('system_settings', JSON.stringify(settings));
    alert('تم حفظ الإعدادات بنجاح!');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-lg mt-8 mb-8 text-green-900 space-y-8" style={{direction:'rtl'}}>
      <h1 className="text-2xl font-bold text-center mb-6">إعدادات النظام</h1>
      {/* بيانات القائد */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gold">بيانات القائد</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-bold">اسم القائد</label>
            <input type="text" className="input input-bordered w-full" value={settings.commander.name} onChange={e => handleChange('commander', 'name', e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 font-bold">الرتبة</label>
            <input type="text" className="input input-bordered w-full" value={settings.commander.rank} onChange={e => handleChange('commander', 'rank', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-bold">توقيع القائد (صورة PNG شفافة)</label>
            <input type="file" accept="image/png" onChange={handleSignatureUpload} />
            {settings.commander.signature && (
              <img src={settings.commander.signature} alt="توقيع القائد" className="h-16 mt-2" />
            )}
          </div>
        </div>
      </section>
      {/* إعدادات الترويسة العلوية */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gold">إعدادات الترويسة العلوية</h2>
        <label className="block mb-1 font-bold">النص</label>
        <textarea className="textarea textarea-bordered w-full" value={settings.header.content} onChange={e => handleChange('header', 'content', e.target.value)} />
        <label className="block mb-1 font-bold">شعار (رابط صورة)</label>
        <input type="text" className="input input-bordered w-full" value={settings.header.logo} onChange={e => handleChange('header', 'logo', e.target.value)} />
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={settings.header.enabled} onChange={e => handleChange('header', 'enabled', e.target.checked)} />
          <span>إظهار الترويسة العلوية</span>
        </div>
      </section>
      {/* إعدادات الترويسة السفلية */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gold">إعدادات الترويسة السفلية</h2>
        <label className="block mb-1 font-bold">النص</label>
        <textarea className="textarea textarea-bordered w-full" value={settings.footer.content} onChange={e => handleChange('footer', 'content', e.target.value)} />
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={settings.footer.enabled} onChange={e => handleChange('footer', 'enabled', e.target.checked)} />
          <span>إظهار الترويسة السفلية</span>
        </div>
      </section>
      {/* إعدادات التوقيع */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gold">إعدادات التوقيع</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={settings.signature.showInDocuments} onChange={e => handleChange('signature', 'showInDocuments', e.target.checked)} />
            <span>إظهار التوقيع في المستندات</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={settings.signature.showInReports} onChange={e => handleChange('signature', 'showInReports', e.target.checked)} />
            <span>إظهار التوقيع في التقارير</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={settings.signature.showInLetters} onChange={e => handleChange('signature', 'showInLetters', e.target.checked)} />
            <span>إظهار التوقيع في الخطابات</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={settings.signature.showInDecisions} onChange={e => handleChange('signature', 'showInDecisions', e.target.checked)} />
            <span>إظهار التوقيع في القرارات</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span>موقع التوقيع:</span>
          <select className="input input-bordered" value={settings.signature.position} onChange={e => handleChange('signature', 'position', e.target.value)}>
            <option value="top">أعلى الصفحة</option>
            <option value="bottom">أسفل الصفحة</option>
          </select>
        </div>
      </section>
      {/* إعدادات الطابعة */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gold">إعدادات الطابعة</h2>
        <label className="block mb-1 font-bold">اسم الطابعة الافتراضية</label>
        <input type="text" className="input input-bordered w-full" value={settings.printer.defaultPrinter} onChange={e => handleChange('printer', 'defaultPrinter', e.target.value)} />
        <label className="block mb-1 font-bold">خيارات إضافية للطباعة</label>
        <input type="text" className="input input-bordered w-full" value={settings.printer.options} onChange={e => handleChange('printer', 'options', e.target.value)} />
      </section>
      {/* إعدادات لون النظام */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gold">إعدادات لون النظام</h2>
        <input type="color" value={settings.theme.color} onChange={e => handleChange('theme', 'color', e.target.value)} className="w-16 h-10 border-2 border-gold rounded-lg" />
        <span className="ml-2">اختر اللون الرئيسي للنظام</span>
      </section>
      {/* إعدادات ألوان الخطوط */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gold">إعدادات ألوان الخطوط</h2>
        <label className="block mb-1 font-bold">لون النص</label>
        <input type="color" value={settings.theme.textColor} onChange={e => handleChange('theme', 'textColor', e.target.value)} className="w-16 h-10 border-2 border-gold rounded-lg" />
        <label className="block mb-1 font-bold">لون التأكيد</label>
        <input type="color" value={settings.theme.accentColor} onChange={e => handleChange('theme', 'accentColor', e.target.value)} className="w-16 h-10 border-2 border-gold rounded-lg" />
        <label className="block mb-1 font-bold">لون الخلفية</label>
        <input type="color" value={settings.theme.backgroundColor} onChange={e => handleChange('theme', 'backgroundColor', e.target.value)} className="w-16 h-10 border-2 border-gold rounded-lg" />
        <label className="block mb-1 font-bold">لون الزر</label>
        <input type="color" value={settings.theme.buttonColor} onChange={e => handleChange('theme', 'buttonColor', e.target.value)} className="w-16 h-10 border-2 border-gold rounded-lg" />
        <label className="block mb-1 font-bold">لون الرابط</label>
        <input type="color" value={settings.theme.linkColor} onChange={e => handleChange('theme', 'linkColor', e.target.value)} className="w-16 h-10 border-2 border-gold rounded-lg" />
      </section>
      {/* إعدادات الخطوط */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gold">إعدادات الخطوط</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-bold">نوع الخط الأساسي</label>
            <select 
              className="input input-bordered w-full" 
              value={settings.fonts.primaryFont} 
              onChange={e => handleChange('fonts', 'primaryFont', e.target.value)}
            >
              <option value="Cairo">Cairo</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-bold">نوع الخط الثانوي</label>
            <select 
              className="input input-bordered w-full" 
              value={settings.fonts.secondaryFont} 
              onChange={e => handleChange('fonts', 'secondaryFont', e.target.value)}
            >
              <option value="Tahoma">Tahoma</option>
              <option value="Cairo">Cairo</option>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-bold">حجم الخط الأساسي</label>
            <select 
              className="input input-bordered w-full" 
              value={settings.fonts.fontSize} 
              onChange={e => handleChange('fonts', 'fontSize', e.target.value)}
            >
              <option value="14px">صغير (14px)</option>
              <option value="16px">متوسط (16px)</option>
              <option value="18px">كبير (18px)</option>
              <option value="20px">كبير جداً (20px)</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-bold">لون العناوين</label>
            <input 
              type="color" 
              value={settings.fonts.headingColor} 
              onChange={e => handleChange('fonts', 'headingColor', e.target.value)} 
              className="w-full h-10 border-2 border-gold rounded-lg" 
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">لون النص الأساسي</label>
            <input 
              type="color" 
              value={settings.fonts.bodyTextColor} 
              onChange={e => handleChange('fonts', 'bodyTextColor', e.target.value)} 
              className="w-full h-10 border-2 border-gold rounded-lg" 
            />
          </div>
          <div>
            <label className="block mb-1 font-bold">لون الروابط</label>
            <input 
              type="color" 
              value={settings.fonts.linkColor} 
              onChange={e => handleChange('fonts', 'linkColor', e.target.value)} 
              className="w-full h-10 border-2 border-gold rounded-lg" 
            />
          </div>
        </div>
      </section>
      {/* زر الحفظ */}
      <div className="text-center mt-8">
        <Button onClick={handleSave} className="bg-gold text-green-900 font-bold px-8 py-3 rounded-lg shadow hover:bg-gold/80 transition">
          حفظ الإعدادات
        </Button>
      </div>
    </div>
  );
};

export default Settings; 