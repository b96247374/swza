import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useUsers } from '@/hooks/useUsers';
import { useReports } from '@/hooks/useReports';
import { useLeaves } from '@/hooks/useLeaves';
import useAutoLogout from '@/hooks/useAutoLogout';
import Header from '@/components/shared/Header';
import UserView from '@/components/report/UserView';
import CommanderView from '@/components/report/CommanderView';

const Dashboard = ({ user, onLogout }) => {
  useAutoLogout(onLogout, 10);

  const { users, addUser, updateUser, deleteUser } = useUsers();
  const {
    reports,
    reportData,
    handleInputChange,
    handleSubmitReport,
    handleCommanderAction,
    resetReportForm,
  } = useReports(user);
  
  const {
    leaves,
    addLeave,
    updateLeave,
    deleteLeave,
    approveLeave,
    rejectLeave,
    getUserLeaves,
    getPendingLeaves,
    getApprovedLeaves,
    getRejectedLeaves
  } = useLeaves(user);

  if (!user || !user.role) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        background: '#14532d',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        لا يمكن تحميل بيانات المستخدم أو الصلاحيات غير معرفة.<br />
        يرجى تسجيل الخروج وإعادة الدخول أو التواصل مع الدعم الفني.
      </div>
    );
  }

  const isCommander = user.role === 'commander' || user.role === 'admin' || user.permissions?.isAdmin;

  return (
    <div className="max-w-7xl w-full mx-auto space-y-8 p-2 sm:p-4 md:p-8">
      <Header user={user} onLogout={onLogout} />

      <AnimatePresence mode="wait">
        {isCommander ? (
          <CommanderView
            key="commander"
            reports={reports}
            handleCommanderAction={handleCommanderAction}
            users={users}
            addUser={addUser}
            updateUser={updateUser}
            deleteUser={deleteUser}
            currentUser={user}
            leaves={leaves}
            addLeave={addLeave}
            updateLeave={updateLeave}
            deleteLeave={deleteLeave}
            approveLeave={approveLeave}
            rejectLeave={rejectLeave}
          />
        ) : (
          <UserView
            key="user"
            currentUser={user}
            reports={reports}
            reportData={reportData}
            handleInputChange={handleInputChange}
            handleSubmitReport={handleSubmitReport}
            resetReportForm={resetReportForm}
            leaves={leaves}
            addLeave={addLeave}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
