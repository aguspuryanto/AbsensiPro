
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import EmployeeList from './views/EmployeeList';
import AttendanceSync from './views/AttendanceSync';
import WorkPlan from './views/WorkPlan';
import PayrollList from './views/PayrollList';

const PlaceholderView: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
       <span className="text-4xl">🏗️</span>
    </div>
    <h2 className="text-xl font-medium">Modul {name} Sedang Dikembangkan</h2>
    <p className="text-sm">Fitur ini akan segera tersedia pada rilis mendatang.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/karyawan" element={<EmployeeList />} />
        <Route path="/bagian" element={<PlaceholderView name="Bagian" />} />
        <Route path="/sub-bagian" element={<PlaceholderView name="Sub Bagian" />} />
        <Route path="/user" element={<PlaceholderView name="User Management" />} />
        <Route path="/sia" element={<PlaceholderView name="Sakit/Izin/Cuti" />} />
        <Route path="/jadwal" element={<PlaceholderView name="Jadwal" />} />
        <Route path="/payroll" element={<PayrollList />} />
        <Route path="/tarik-data" element={<AttendanceSync />} />
        <Route path="/denda" element={<PlaceholderView name="Denda" />} />
        <Route path="/rencana-kerja" element={<WorkPlan />} />
        <Route path="/settings" element={<PlaceholderView name="Pengaturan" />} />
      </Routes>
    </Layout>
  );
};

export default App;
