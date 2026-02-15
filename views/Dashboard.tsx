
import React from 'react';
import { 
  Users, 
  Clock, 
  CalendarCheck, 
  AlertTriangle 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const data = [
  { name: 'Mon', attendance: 45, late: 5 },
  { name: 'Tue', attendance: 48, late: 2 },
  { name: 'Wed', attendance: 42, late: 8 },
  { name: 'Thu', attendance: 46, late: 4 },
  { name: 'Fri', attendance: 40, late: 10 },
  { name: 'Sat', attendance: 20, late: 1 },
];

const StatCard: React.FC<{ label: string, value: string | number, color: string, icon: React.ReactNode }> = ({ label, value, color, icon }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
      <div className={`p-2 rounded-lg ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Karyawan" 
          value="156" 
          color="bg-blue-50 text-blue-600" 
          icon={<Users size={20} />} 
        />
        <StatCard 
          label="Hadir Hari Ini" 
          value="142" 
          color="bg-emerald-50 text-emerald-600" 
          icon={<CalendarCheck size={20} />} 
        />
        <StatCard 
          label="Terlambat" 
          value="14" 
          color="bg-amber-50 text-amber-600" 
          icon={<Clock size={20} />} 
        />
        <StatCard 
          label="Tanpa Keterangan" 
          value="0" 
          color="bg-red-50 text-red-600" 
          icon={<AlertTriangle size={20} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Tren Kehadiran Mingguan</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="attendance" fill="#10b981" radius={[4, 4, 0, 0]} name="Hadir" />
                <Bar dataKey="late" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Terlambat" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Alokasi Gaji per Bulan (Miliar Rp)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { month: 'Jan', amount: 1.2 },
                { month: 'Feb', amount: 1.15 },
                { month: 'Mar', amount: 1.3 },
                { month: 'Apr', amount: 1.25 },
                { month: 'May', amount: 1.4 },
              ]}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
