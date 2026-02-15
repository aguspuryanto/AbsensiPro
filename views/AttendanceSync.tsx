
import React, { useState } from 'react';
import { Fingerprint, RefreshCcw, CheckCircle2, AlertCircle, History, Settings2 } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { MOCK_EMPLOYEES } from '../constants';

const AttendanceSync: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { addNotification } = useNotifications();
  const [logs, setLogs] = useState([
    { id: '1', time: '2024-05-20 08:00:12', machine: 'Front-Door-M1', count: 124, status: 'success' },
    { id: '2', time: '2024-05-19 17:30:45', machine: 'Back-Gate-M2', count: 89, status: 'success' },
    { id: '3', time: '2024-05-19 07:55:00', machine: 'Front-Door-M1', count: 0, status: 'error' },
  ]);

  const handleSync = () => {
    setIsSyncing(true);
    
    // Simulate pulling actual records and notifying
    setTimeout(() => {
      const recordCount = Math.floor(Math.random() * 3) + 1;
      const types = ['Clock In', 'Clock Out', 'Sick Leave', 'Alpha'];
      
      // Notify for each simulated high-priority event
      for (let i = 0; i < recordCount; i++) {
        const emp = MOCK_EMPLOYEES[Math.floor(Math.random() * MOCK_EMPLOYEES.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const timestamp = new Date().toLocaleTimeString();
        
        addNotification(
          `Update Kehadiran: ${type}`,
          `${emp.name} (${emp.id}) telah tercatat ${type.toLowerCase()} pada pukul ${timestamp}.`,
          'attendance'
        );
      }

      const newLog = {
        id: Date.now().toString(),
        time: new Date().toLocaleString(),
        machine: 'Front-Door-M1',
        count: recordCount + 20, // Total records
        status: 'success' as const
      };
      setLogs([newLog, ...logs]);
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Control Panel */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Fingerprint size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Sinkronisasi Mesin Absensi</h3>
            <p className="text-slate-500">Tarik data kehadiran langsung dari terminal biometrik.</p>
          </div>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className={`px-8 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${
            isSyncing 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200'
          }`}
        >
          <RefreshCcw size={20} className={isSyncing ? 'animate-spin' : ''} />
          {isSyncing ? 'Menghubungkan...' : 'Mulai Sinkronisasi'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Machine Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold flex items-center gap-2"><Settings2 size={18} /> Status Mesin</h4>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">2 Terhubung</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="font-medium">Front-Door-M1</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">192.168.1.101</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="font-medium">Back-Gate-M2</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">192.168.1.102</span>
            </div>
          </div>
        </div>

        {/* Sync History */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-bold flex items-center gap-2 mb-6"><History size={18} /> Riwayat Terakhir</h4>
          <div className="space-y-4">
            {logs.map(log => (
              <div key={log.id} className="flex items-start gap-3 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                {log.status === 'success' ? (
                  <CheckCircle2 size={18} className="text-emerald-500 mt-0.5" />
                ) : (
                  <AlertCircle size={18} className="text-red-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-slate-700">{log.machine}</p>
                    <p className="text-[10px] text-slate-400">{log.time}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {log.status === 'success' ? `Berhasil menarik ${log.count} data baru.` : 'Koneksi terputus ke mesin.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSync;
