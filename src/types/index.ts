export type Role = 'admin' | 'student';

export interface Student {
  id: string; // e.g. "1021"
  name: string;
  avatar: string;
  department: string;
  semester: string;
  phone: string;
  email: string;
  room: string; // e.g. "B-203"
  block: string; // e.g. "Block B"
  bedNo: string; // e.g. "B-203-02"
  status: 'Active' | 'Checked-out' | 'Pending';
  checkInDate: string;
  guardianName?: string;
  guardianPhone?: string;
}

export interface Bed {
  id: string; // e.g. "1", "2", "3"
  bedNumber: string; // e.g. "B-203-01"
  status: 'occupied' | 'available' | 'reserved' | 'maintenance';
  studentId?: string;
  studentName?: string;
}

export interface Room {
  id: string; // e.g. "A-201"
  roomNumber: string;
  block: 'Block A' | 'Block B' | 'Block C';
  floor: '1st Floor' | '2nd Floor' | '3rd Floor' | '4th Floor';
  capacity: number;
  occupiedCount: number;
  type: string; // e.g. "3 Seater", "2 Seater"
  status: 'Occupied' | 'Available' | 'Reserved' | 'Maintenance';
  beds: Bed[];
  imageUrl?: string;
}

export interface Complaint {
  id: string; // e.g. "1024"
  studentId: string;
  studentName: string;
  room: string;
  category: 'Electrical' | 'Water' | 'Furniture' | 'Internet' | 'Cleaning' | 'Other';
  subject: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Resolved';
  date: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  room: string;
  month: string; // e.g. "September 2026"
  amount: number; // e.g. 2500
  status: 'Paid' | 'Pending' | 'Overdue';
  paidDate?: string;
  paymentMethod?: 'bKash' | 'Nagad' | 'Bank Transfer' | 'Cash' | 'Card';
  transactionId?: string;
}

export interface MealItem {
  type: string;
  time: string;
  menu: string[];
  taken?: boolean; // For student view
}

export interface Visitor {
  id: string;
  visitorName: string;
  relation: string;
  studentId: string;
  studentName: string;
  room: string;
  date: string;
  timeIn: string;
  timeOut?: string;
  status: 'Inside' | 'Exited' | 'Approved' | 'Pending' | 'Rejected';
  contact: string;
}

export interface AttendanceRecord {
  date: string;
  day: string; // "Mon", "Tue", etc.
  dateNum: number;
  status: 'present' | 'absent' | 'leave';
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'fee' | 'water' | 'clean' | 'timing' | 'general';
  priority?: 'normal' | 'important';
}

export interface Activity {
  id: string;
  type: 'assignment' | 'payment' | 'complaint' | 'checkout' | 'maintenance';
  title: string;
  time: string;
}
