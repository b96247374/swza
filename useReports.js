import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export const useReports = (currentUser) => {
  const [reports, setReports] = useState([]);
  
  const getInitialReportState = () => {
    return {
      name: currentUser?.name || '',
      rank: currentUser?.rank || '',
      userId: currentUser?.id || null,
      date: new Date().toLocaleDateString('ar-SA'),
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      subject: '',
      acceptedViolations: 0,
      rejectedViolations: 0,
      total: 0,
      images: [],
      status: 'pending',
      commanderNotes: '',
      commanderSignature: null,
    };
  };

  const [reportData, setReportData] = useState(getInitialReportState());

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dailyReports');
      if (saved) {
        setReports(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load reports from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      resetReportForm();
    }
  }, [currentUser]);

  useEffect(() => {
    const total = Number(reportData.acceptedViolations) + Number(reportData.rejectedViolations);
    setReportData(prev => ({ ...prev, total: isNaN(total) ? 0 : total }));
  }, [reportData.acceptedViolations, reportData.rejectedViolations]);

  const updateReportList = (newReports) => {
    setReports(newReports);
    localStorage.setItem('dailyReports', JSON.stringify(newReports));
  };

  const handleInputChange = (field, value) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const resetReportForm = () => {
    setReportData(getInitialReportState());
  };

  const handleSubmitReport = () => {
    if (!reportData.subject.trim()) {
      toast({ title: "خطأ", description: "يرجى إدخال موضوع التقرير", variant: "destructive" });
      return false;
    }
    if (reportData.images.length === 0) {
      toast({ title: "خطأ", description: "إرفاق صورة واحدة على الأقل إلزامي", variant: "destructive" });
      return false;
    }

    const newReport = {
      ...reportData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'submitted'
    };

    updateReportList([...reports, newReport]);
    toast({ title: "تم الإرسال بنجاح", description: "تم إرسال التقرير للقائد للمراجعة" });
    resetReportForm();
    return true;
  };

  const handleCommanderAction = (reportId, action, notes = '', signature = null) => {
    const updatedReports = reports.map(report =>
      report.id === reportId
        ? { ...report, status: action, commanderNotes: notes, commanderSignature: signature, reviewedAt: new Date().toISOString() }
        : report
    );
    updateReportList(updatedReports);
    toast({
      title: action === 'approved' ? "تم قبول التقرير" : "تم رفض التقرير",
      description: `تم ${action === 'approved' ? 'قبول' : 'رفض'} التقرير بنجاح`
    });
  };

  return {
    reports,
    reportData,
    handleInputChange,
    handleSubmitReport,
    handleCommanderAction,
    resetReportForm,
  };
};