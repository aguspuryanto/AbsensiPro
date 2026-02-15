
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Layers, 
  UserCircle, 
  CalendarClock, 
  CalendarDays, 
  Banknote, 
  Fingerprint, 
  AlertCircle, 
  PieChart, 
  Settings 
} from 'lucide-react';
import { PayrollRecord } from './types';

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
  { id: 'karyawan', label: 'Karyawan', icon: <Users size={20} />, path: '/karyawan' },
  { id: 'bagian', label: 'Bagian', icon: <Building2 size={20} />, path: '/bagian' },
  { id: 'sub-bagian', label: 'Sub Bagian', icon: <Layers size={20} />, path: '/sub-bagian' },
  { id: 'user', label: 'User Management', icon: <UserCircle size={20} />, path: '/user' },
  { id: 'sia', label: 'Sakit/Izin/Cuti', icon: <CalendarDays size={20} />, path: '/sia' },
  { id: 'jadwal', label: 'Jadwal', icon: <CalendarClock size={20} />, path: '/jadwal' },
  { id: 'payroll', label: 'Payroll', icon: <Banknote size={20} />, path: '/payroll' },
  { id: 'tarik-data', label: 'Tarik Data', icon: <Fingerprint size={20} />, path: '/tarik-data' },
  { id: 'denda', label: 'Denda', icon: <AlertCircle size={20} />, path: '/denda' },
  { id: 'rencana-kerja', label: 'Rencana Kerja', icon: <PieChart size={20} />, path: '/rencana-kerja' },
  { id: 'settings', label: 'Pengaturan', icon: <Settings size={20} />, path: '/settings' },
];

export const MOCK_DEPARTMENTS = [
  { id: '1', name: 'Produksi', description: 'Main production floor' },
  { id: '2', name: 'Logistik', description: 'Warehouse and delivery' },
  { id: '3', name: 'Admin', description: 'Back office and HR' },
];

export const MOCK_SUB_DEPARTMENTS = [
  { id: 's1', departmentId: '1', name: 'Assembly Line A' },
  { id: 's2', departmentId: '1', name: 'Quality Control' },
  { id: 's3', departmentId: '2', name: 'Inventory' },
];

export const MOCK_EMPLOYEES = [
  { 
    id: 'E001', 
    name: 'Budi Santoso', 
    position: 'Operator', 
    departmentId: '1', 
    subDepartmentId: 's1', 
    salary: 5000000, 
    shiftType: 'Morning' as const,
    joinDate: '2022-01-15',
    status: 'Active' as const
  },
  { 
    id: 'E002', 
    name: 'Siti Aminah', 
    position: 'Supervisor', 
    departmentId: '1', 
    subDepartmentId: 's2', 
    salary: 7500000, 
    shiftType: 'Morning' as const,
    joinDate: '2021-06-10',
    status: 'Active' as const
  },
  { 
    id: 'E003', 
    name: 'Andi Wijaya', 
    position: 'Staff Logistik', 
    departmentId: '2', 
    subDepartmentId: 's3', 
    salary: 4500000, 
    shiftType: 'Afternoon' as const,
    joinDate: '2023-03-20',
    status: 'Active' as const
  },
];

export const MOCK_PAYROLL: PayrollRecord[] = [
  {
    id: 'P001',
    employeeId: 'E001',
    period: '2024-05',
    baseSalary: 5000000,
    allowances: 550000,
    deductions: 120000,
    netSalary: 5430000,
    status: 'Paid'
  },
  {
    id: 'P002',
    employeeId: 'E002',
    period: '2024-05',
    baseSalary: 7500000,
    allowances: 1200000,
    deductions: 450000,
    netSalary: 8250000,
    status: 'Paid'
  },
  {
    id: 'P003',
    employeeId: 'E003',
    period: '2024-05',
    baseSalary: 4500000,
    allowances: 300000,
    deductions: 50000,
    netSalary: 4750000,
    status: 'Pending'
  },
  {
    id: 'P004',
    employeeId: 'E001',
    period: '2024-04',
    baseSalary: 5000000,
    allowances: 400000,
    deductions: 100000,
    netSalary: 5300000,
    status: 'Paid'
  }
];
