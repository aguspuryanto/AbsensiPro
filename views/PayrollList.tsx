
import React, { useState, useMemo } from 'react';
import { MOCK_PAYROLL, MOCK_EMPLOYEES } from '../constants';
import { Search, Filter, FileDown, Eye, CheckCircle2, Clock } from 'lucide-react';

const PayrollList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [periodFilter, setPeriodFilter] = useState('');

  const filteredPayroll = useMemo(() => {
    return MOCK_PAYROLL.filter(item => {
      const employee = MOCK_EMPLOYEES.find(e => e.id === item.employeeId);
      const nameMatch = employee?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       item.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
      const periodMatch = periodFilter === '' || item.period === periodFilter;
      return nameMatch && periodMatch;
    });
  }, [searchTerm, periodFilter]);

  const periods = useMemo(() => {
    const uniquePeriods = Array.from(new Set(MOCK_PAYROLL.map(p => p.period)));
    return uniquePeriods.sort((a, b) => b.localeCompare(a));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama atau ID karyawan..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="relative">
            <select 
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-600 font-medium"
            >
              <option value="">Semua Periode</option>
              {periods.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors shadow-sm">
          <FileDown size={18} />
          <span>Export Laporan</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Karyawan</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Periode</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Gaji Pokok</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right text-emerald-600">Tunjangan</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right text-red-600">Potongan</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right font-bold">Gaji Bersih</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayroll.length > 0 ? (
                filteredPayroll.map((item) => {
                  const employee = MOCK_EMPLOYEES.find(e => e.id === item.employeeId);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                            {employee?.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">{employee?.name || 'N/A'}</p>
                            <p className="text-[10px] text-slate-400">{item.employeeId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        {item.period}
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-mono text-slate-600">
                        {item.baseSalary.toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-mono text-emerald-600">
                        +{item.allowances.toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-mono text-red-500">
                        -{item.deductions.toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-mono font-bold text-slate-800">
                        {item.netSalary.toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === 'Paid' 
                            ? 'bg-emerald-50 text-emerald-600' 
                            : 'bg-amber-50 text-amber-600'
                        }`}>
                          {item.status === 'Paid' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors" title="Lihat Slip Gaji">
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400 italic">
                    Data payroll tidak ditemukan untuk kriteria pencarian ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayrollList;
