import type {
  Student,
  Room,
  Complaint,
  Payment,
  MealItem,
  Visitor,
  AttendanceRecord,
  Notice,
  Activity
} from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: '1021',
    name: 'Rahim Ahmed',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    department: 'Computer Science & Technology',
    semester: '5th',
    phone: '01712-345678',
    email: 'rahim1021@student.edu.bd',
    room: 'B-203',
    block: 'Block B',
    bedNo: 'B-203-02',
    status: 'Active',
    checkInDate: '12 Jan 2026',
    guardianName: 'Abdul Karim',
    guardianPhone: '01811-987654'
  },
  {
    id: '1022',
    name: 'Karim Hasan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'EEE',
    semester: '4th',
    phone: '01819-456123',
    email: 'karim1022@student.edu.bd',
    room: 'A-102',
    block: 'Block A',
    bedNo: 'A-102-01',
    status: 'Active',
    checkInDate: '15 Feb 2026',
    guardianName: 'Hasan Ali',
    guardianPhone: '01711-223344'
  },
  {
    id: '1023',
    name: 'Fahim Islam',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    department: 'Civil',
    semester: '6th',
    phone: '01914-789012',
    email: 'fahim1023@student.edu.bd',
    room: 'C-301',
    block: 'Block C',
    bedNo: 'C-301-03',
    status: 'Checked-out',
    checkInDate: '10 Aug 2025',
    guardianName: 'Rafiqul Islam',
    guardianPhone: '01611-334455'
  },
  {
    id: '1024',
    name: 'Nusrat Jahan',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    department: 'CSE',
    semester: '3rd',
    phone: '01515-678901',
    email: 'nusrat1024@student.edu.bd',
    room: 'B-201',
    block: 'Block B',
    bedNo: 'B-201-01',
    status: 'Active',
    checkInDate: '01 Sep 2026',
    guardianName: 'Mahbubur Rahman',
    guardianPhone: '01911-556677'
  },
  {
    id: '1025',
    name: 'Tanvir Hossain',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    department: 'Mechanical',
    semester: '7th',
    phone: '01733-112233',
    email: 'tanvir1025@student.edu.bd',
    room: 'A-201',
    block: 'Block A',
    bedNo: 'A-201-01',
    status: 'Active',
    checkInDate: '05 Jan 2025'
  },
  {
    id: '1026',
    name: 'Sadia Sultana',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Architecture',
    semester: '2nd',
    phone: '01677-889900',
    email: 'sadia1026@student.edu.bd',
    room: 'A-204',
    block: 'Block A',
    bedNo: 'A-204-02',
    status: 'Active',
    checkInDate: '10 Jan 2026'
  }
];

export const INITIAL_ROOMS: Room[] = [
  // Block A - 2nd Floor
  {
    id: 'A-201',
    roomNumber: 'A-201',
    block: 'Block A',
    floor: '2nd Floor',
    capacity: 3,
    occupiedCount: 3,
    type: '3 Seater',
    status: 'Occupied',
    beds: [
      { id: '1', bedNumber: 'A-201-01', status: 'occupied', studentId: '1025', studentName: 'Tanvir Hossain' },
      { id: '2', bedNumber: 'A-201-02', status: 'occupied', studentId: '1030', studentName: 'Samiul Haque' },
      { id: '3', bedNumber: 'A-201-03', status: 'occupied', studentId: '1031', studentName: 'Arif Chowdhury' }
    ]
  },
  {
    id: 'A-202',
    roomNumber: 'A-202',
    block: 'Block A',
    floor: '2nd Floor',
    capacity: 3,
    occupiedCount: 2,
    type: '3 Seater',
    status: 'Occupied',
    beds: [
      { id: '1', bedNumber: 'A-202-01', status: 'occupied', studentId: '1032', studentName: 'Imran Khan' },
      { id: '2', bedNumber: 'A-202-02', status: 'occupied', studentId: '1033', studentName: 'Saad Ahmed' },
      { id: '3', bedNumber: 'A-202-03', status: 'available' }
    ]
  },
  {
    id: 'A-203',
    roomNumber: 'A-203',
    block: 'Block A',
    floor: '2nd Floor',
    capacity: 3,
    occupiedCount: 1,
    type: '3 Seater',
    status: 'Occupied',
    beds: [
      { id: '1', bedNumber: 'A-203-01', status: 'occupied', studentId: '1034', studentName: 'Mahinur Rahman' },
      { id: '2', bedNumber: 'A-203-02', status: 'available' },
      { id: '3', bedNumber: 'A-203-03', status: 'available' }
    ]
  },
  {
    id: 'A-204',
    roomNumber: 'A-204',
    block: 'Block A',
    floor: '2nd Floor',
    capacity: 3,
    occupiedCount: 3,
    type: '3 Seater',
    status: 'Occupied',
    beds: [
      { id: '1', bedNumber: 'A-204-01', status: 'occupied', studentId: '1035', studentName: 'Rashedul Karim' },
      { id: '2', bedNumber: 'A-204-02', status: 'occupied', studentId: '1026', studentName: 'Sadia Sultana' },
      { id: '3', bedNumber: 'A-204-03', status: 'occupied', studentId: '1036', studentName: 'Tamim Iqbal' }
    ]
  },
  {
    id: 'A-205',
    roomNumber: 'A-205',
    block: 'Block A',
    floor: '2nd Floor',
    capacity: 3,
    occupiedCount: 2,
    type: '3 Seater',
    status: 'Occupied',
    beds: [
      { id: '1', bedNumber: 'A-205-01', status: 'occupied', studentId: '1037', studentName: 'Zubair Al Mamun' },
      { id: '2', bedNumber: 'A-205-02', status: 'occupied', studentId: '1038', studentName: 'Mustafa Kamal' },
      { id: '3', bedNumber: 'A-205-03', status: 'available' }
    ]
  },
  {
    id: 'A-206',
    roomNumber: 'A-206',
    block: 'Block A',
    floor: '2nd Floor',
    capacity: 3,
    occupiedCount: 0,
    type: '3 Seater',
    status: 'Available',
    beds: [
      { id: '1', bedNumber: 'A-206-01', status: 'available' },
      { id: '2', bedNumber: 'A-206-02', status: 'available' },
      { id: '3', bedNumber: 'A-206-03', status: 'available' }
    ]
  },
  {
    id: 'A-207',
    roomNumber: 'A-207',
    block: 'Block A',
    floor: '2nd Floor',
    capacity: 3,
    occupiedCount: 2,
    type: '3 Seater',
    status: 'Occupied',
    beds: [
      { id: '1', bedNumber: 'A-207-01', status: 'occupied', studentId: '1039', studentName: 'Farhan Akhtar' },
      { id: '2', bedNumber: 'A-207-02', status: 'occupied', studentId: '1040', studentName: 'Shakil Anwar' },
      { id: '3', bedNumber: 'A-207-03', status: 'available' }
    ]
  },
  {
    id: 'A-208',
    roomNumber: 'A-208',
    block: 'Block A',
    floor: '2nd Floor',
    capacity: 3,
    occupiedCount: 1,
    type: '3 Seater',
    status: 'Occupied',
    beds: [
      { id: '1', bedNumber: 'A-208-01', status: 'occupied', studentId: '1041', studentName: 'Rayhan Uddin' },
      { id: '2', bedNumber: 'A-208-02', status: 'available' },
      { id: '3', bedNumber: 'A-208-03', status: 'available' }
    ]
  },
  // Block B - 2nd Floor (Rahim Ahmed's Room)
  {
    id: 'B-203',
    roomNumber: 'B-203',
    block: 'Block B',
    floor: '2nd Floor',
    capacity: 3,
    occupiedCount: 3,
    type: '3 Seater',
    status: 'Occupied',
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&auto=format&fit=crop&q=80',
    beds: [
      { id: '1', bedNumber: 'B-203-01', status: 'occupied', studentId: '1042', studentName: 'Shanto Roy' },
      { id: '2', bedNumber: 'B-203-02', status: 'occupied', studentId: '1021', studentName: 'Rahim Ahmed' },
      { id: '3', bedNumber: 'B-203-03', status: 'occupied', studentId: '1043', studentName: 'Aman Ullah' }
    ]
  },
  {
    id: 'B-201',
    roomNumber: 'B-201',
    block: 'Block B',
    floor: '2nd Floor',
    capacity: 3,
    occupiedCount: 2,
    type: '3 Seater',
    status: 'Occupied',
    beds: [
      { id: '1', bedNumber: 'B-201-01', status: 'occupied', studentId: '1024', studentName: 'Nusrat Jahan' },
      { id: '2', bedNumber: 'B-201-02', status: 'occupied', studentId: '1044', studentName: 'Fatima Zohra' },
      { id: '3', bedNumber: 'B-201-03', status: 'maintenance' }
    ]
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: '1024',
    studentId: '1021',
    studentName: 'Rahim Ahmed',
    room: 'B-203',
    category: 'Electrical',
    subject: 'Fan not working',
    description: 'Ceiling fan makes a loud grinding noise and runs at very slow speed.',
    priority: 'High',
    status: 'Pending',
    date: '28 Sep'
  },
  {
    id: '1023',
    studentId: '1022',
    studentName: 'Karim Hasan',
    room: 'A-102',
    category: 'Water',
    subject: 'Low water supply',
    description: 'Bathroom tap water pressure is very low during morning hours.',
    priority: 'Medium',
    status: 'In Progress',
    date: '12 Sep'
  },
  {
    id: '1022',
    studentId: '1023',
    studentName: 'Fahim Islam',
    room: 'C-301',
    category: 'Furniture',
    subject: 'Broken chair',
    description: 'Study chair leg is cracked and unstable.',
    priority: 'Low',
    status: 'Pending',
    date: '02 Sep'
  },
  {
    id: '1021',
    studentId: '1024',
    studentName: 'Nusrat Jahan',
    room: 'B-201',
    category: 'Internet',
    subject: 'WiFi disconnects frequently',
    description: 'High packet loss on 2nd floor access point.',
    priority: 'High',
    status: 'In Progress',
    date: '29 Sep'
  },
  {
    id: '1018',
    studentId: '1021',
    studentName: 'Rahim Ahmed',
    room: 'B-203',
    category: 'Water',
    subject: 'Low water supply',
    description: 'Water faucet filter was clogged.',
    priority: 'Medium',
    status: 'Resolved',
    date: '12 Sep'
  },
  {
    id: '1005',
    studentId: '1021',
    studentName: 'Rahim Ahmed',
    room: 'B-203',
    category: 'Furniture',
    subject: 'Broken chair',
    description: 'Replaced with new ergonomic wooden study chair.',
    priority: 'Low',
    status: 'Resolved',
    date: '02 Sep'
  }
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'PAY-1001',
    studentId: '1021',
    studentName: 'Rahim Ahmed',
    room: 'B-203',
    month: 'September 2026',
    amount: 2500,
    status: 'Paid',
    paidDate: '05 Sep 2026',
    paymentMethod: 'bKash',
    transactionId: 'TRX98273641'
  },
  {
    id: 'PAY-1002',
    studentId: '1021',
    studentName: 'Rahim Ahmed',
    room: 'B-203',
    month: 'August 2026',
    amount: 2500,
    status: 'Paid',
    paidDate: '03 Aug 2026',
    paymentMethod: 'Nagad',
    transactionId: 'TRX88471203'
  },
  {
    id: 'PAY-1003',
    studentId: '1021',
    studentName: 'Rahim Ahmed',
    room: 'B-203',
    month: 'July 2026',
    amount: 2500,
    status: 'Paid',
    paidDate: '05 Jul 2026',
    paymentMethod: 'Bank Transfer',
    transactionId: 'TRX77361922'
  },
  {
    id: 'PAY-1004',
    studentId: '1021',
    studentName: 'Rahim Ahmed',
    room: 'B-203',
    month: 'June 2026',
    amount: 2500,
    status: 'Paid',
    paidDate: '04 Jun 2026',
    paymentMethod: 'Card',
    transactionId: 'TRX66281900'
  },
  {
    id: 'PAY-1005',
    studentId: '1022',
    studentName: 'Karim Hasan',
    room: 'A-102',
    month: 'September 2026',
    amount: 2500,
    status: 'Paid',
    paidDate: '30 Sep 2026',
    paymentMethod: 'bKash',
    transactionId: 'TRX99281745'
  },
  {
    id: 'PAY-1006',
    studentId: '1024',
    studentName: 'Nusrat Jahan',
    room: 'B-201',
    month: 'September 2026',
    amount: 2500,
    status: 'Pending',
    paymentMethod: 'bKash'
  }
];

export const INITIAL_MEALS: MealItem[] = [
  {
    type: 'Breakfast',
    time: '7:00 AM - 9:00 AM',
    menu: ['Bread', 'Egg', 'Tea', 'Banana'],
    taken: true
  },
  {
    type: 'Lunch',
    time: '12:00 PM - 2:00 PM',
    menu: ['Rice', 'Fish Curry', 'Vegetable', 'Lentil'],
    taken: true
  },
  {
    type: 'Dinner',
    time: '7:00 PM - 9:00 PM',
    menu: ['Rice', 'Chicken', 'Salad', 'Dessert'],
    taken: false
  }
];

export const INITIAL_VISITORS: Visitor[] = [
  {
    id: 'VIS-01',
    visitorName: 'Abdul Karim',
    relation: 'Father',
    studentId: '1021',
    studentName: 'Rahim Ahmed',
    room: 'B-203',
    date: '28 Sep 2026',
    timeIn: '02:15 PM',
    status: 'Inside',
    contact: '01811-987654'
  },
  {
    id: 'VIS-02',
    visitorName: 'Nusrat Jahan',
    relation: 'Sister',
    studentId: '1022',
    studentName: 'Karim Hasan',
    room: 'A-102',
    date: '15 Sep 2026',
    timeIn: '01:40 PM',
    timeOut: '03:10 PM',
    status: 'Exited',
    contact: '01711-223344'
  },
  {
    id: 'VIS-03',
    visitorName: 'Samiul Islam',
    relation: 'Friend',
    studentId: '1023',
    studentName: 'Fahim Islam',
    room: 'C-301',
    date: '02 Sep 2026',
    timeIn: '11:20 AM',
    timeOut: '12:45 PM',
    status: 'Exited',
    contact: '01911-334455'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { date: '2026-09-23', day: 'Mon', dateNum: 23, status: 'present' },
  { date: '2026-09-24', day: 'Tue', dateNum: 24, status: 'present' },
  { date: '2026-09-25', day: 'Wed', dateNum: 25, status: 'present' },
  { date: '2026-09-26', day: 'Thu', dateNum: 26, status: 'present' },
  { date: '2026-09-27', day: 'Fri', dateNum: 27, status: 'absent' },
  { date: '2026-09-28', day: 'Sat', dateNum: 28, status: 'present' },
  { date: '2026-09-29', day: 'Sun', dateNum: 29, status: 'present' }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'NTC-01',
    title: 'Hostel fee for October 2026',
    description: 'Last date of payment without late fee is 10 Oct 2026. Please pay via student portal or hostel office.',
    date: '28 Sep',
    type: 'fee',
    priority: 'important'
  },
  {
    id: 'NTC-02',
    title: 'Water supply interruption',
    description: 'Maintenance work will take place tomorrow (10 AM - 2 PM). Water tanks will be cleaned.',
    date: '27 Sep',
    type: 'water',
    priority: 'important'
  },
  {
    id: 'NTC-03',
    title: 'Hostel cleanliness drive',
    description: 'Join us this Saturday for our monthly campus cleanliness drive. Refreshments provided!',
    date: '25 Sep',
    type: 'clean',
    priority: 'normal'
  },
  {
    id: 'NTC-04',
    title: 'Guest/Visitor timing updated',
    description: 'New visitor hours are 10:00 AM - 8:00 PM on weekdays and weekends. Strictly register at entry.',
    date: '22 Sep',
    type: 'timing',
    priority: 'normal'
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'ACT-01',
    type: 'assignment',
    title: 'Rahim Ahmed assigned to Room B-203',
    time: '10:24 AM'
  },
  {
    id: 'ACT-02',
    type: 'payment',
    title: 'Karim Hasan paid hostel fee (Sep 2026)',
    time: '09:15 AM'
  },
  {
    id: 'ACT-03',
    type: 'complaint',
    title: 'New complaint submitted in A-102',
    time: '08:42 AM'
  },
  {
    id: 'ACT-04',
    type: 'checkout',
    title: 'Student ID 204 checked out',
    time: 'Yesterday'
  },
  {
    id: 'ACT-05',
    type: 'maintenance',
    title: 'Maintenance task completed (B-201)',
    time: 'Yesterday'
  }
];

export const MONTHLY_PAYMENTS_2026 = [
  { month: 'Jan', collected: 85, pending: 15 },
  { month: 'Feb', collected: 72, pending: 18 },
  { month: 'Mar', collected: 88, pending: 12 },
  { month: 'Apr', collected: 94, pending: 16 },
  { month: 'May', collected: 70, pending: 20 },
  { month: 'Jun', collected: 125, pending: 25 },
  { month: 'Jul', collected: 140, pending: 20 },
  { month: 'Aug', collected: 115, pending: 30 },
  { month: 'Sep', collected: 175, pending: 42.5 }
];
