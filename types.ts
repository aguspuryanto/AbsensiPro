
export interface Employee {
  id: string;
  name: string;
  position: string;
  departmentId: string;
  subDepartmentId: string;
  salary: number;
  shiftType: 'Morning' | 'Afternoon' | 'Night';
  joinDate: string;
  status: 'Active' | 'Inactive';
}

export interface Department {
  id: string;
  name: string;
  description: string;
}

export interface SubDepartment {
  id: string;
  departmentId: string;
  name: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  type: 'Present' | 'Sick' | 'Permission' | 'Leave' | 'Alpha';
  penalty: number;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  period: string; // YYYY-MM
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'Pending' | 'Paid';
}

export interface SyncLog {
  id: string;
  timestamp: string;
  machineName: string;
  recordsSynced: number;
  status: 'Success' | 'Error';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'attendance' | 'system' | 'payroll';
  read: boolean;
}
