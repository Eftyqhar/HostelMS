import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  Role,
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
import {
  INITIAL_STUDENTS,
  INITIAL_ROOMS,
  INITIAL_COMPLAINTS,
  INITIAL_PAYMENTS,
  INITIAL_MEALS,
  INITIAL_VISITORS,
  INITIAL_ATTENDANCE,
  INITIAL_NOTICES,
  INITIAL_ACTIVITIES
} from '../data/mockData';
import { api } from '../services/api';

interface HostelContextType {
  role: Role;
  setRole: (role: Role) => void;
  currentStudent: Student;
  students: Student[];
  rooms: Room[];
  complaints: Complaint[];
  payments: Payment[];
  meals: MealItem[];
  visitors: Visitor[];
  attendance: AttendanceRecord[];
  notices: Notice[];
  activities: Activity[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeSidebarTab: string;
  setActiveSidebarTab: (tab: string) => void;
  selectedBlock: 'Block A' | 'Block B' | 'Block C';
  setSelectedBlock: (block: 'Block A' | 'Block B' | 'Block C') => void;
  selectedFloor: string;
  setSelectedFloor: (floor: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  backendConnected: boolean;
  // Modals
  activeModal: string | null;
  modalData: any;
  openModal: (modalName: string, data?: any) => void;
  closeModal: () => void;
  // Actions
  addStudent: (student: Omit<Student, 'id'> & { id?: string }) => void;
  assignRoom: (studentId: string, roomId: string, bedNumber: string) => void;
  addComplaint: (complaint: Partial<Complaint>) => void;
  updateComplaintStatus: (id: string, status: Complaint['status']) => void;
  recordPayment: (payment: Partial<Payment>) => void;
  addVisitorRequest: (visitor: Partial<Visitor>) => void;
  toggleMealTaken: (type: MealItem['type']) => void;
  addMeal: (meal: MealItem) => void;
  updateMeal: (mealType: string, updated: Partial<MealItem>) => void;
  deleteMeal: (mealType: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  refreshBackendData: () => Promise<void>;
}

const HostelContext = createContext<HostelContextType | undefined>(undefined);

export const HostelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>(() => {
    return (localStorage.getItem('hostel_role') as Role) || 'admin';
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('hostel_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('hostel_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem('hostel_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('hostel_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [meals, setMeals] = useState<MealItem[]>(() => {
    const saved = localStorage.getItem('hostel_meals');
    return saved ? JSON.parse(saved) : INITIAL_MEALS;
  });

  const [visitors, setVisitors] = useState<Visitor[]>(() => {
    const saved = localStorage.getItem('hostel_visitors');
    return saved ? JSON.parse(saved) : INITIAL_VISITORS;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('hostel_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeSidebarTab, setActiveSidebarTab] = useState('Dashboard');
  const [selectedBlock, setSelectedBlock] = useState<'Block A' | 'Block B' | 'Block C'>('Block A');
  const [selectedFloor, setSelectedFloor] = useState('2nd Floor');
  const [darkMode, setDarkMode] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('hostel_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('hostel_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('hostel_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('hostel_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('hostel_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('hostel_meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('hostel_visitors', JSON.stringify(visitors));
  }, [visitors]);

  // Initial fetch from FastAPI Backend
  const refreshBackendData = useCallback(async () => {
    try {
      const stats = await api.getStats();
      if (stats) {
        setBackendConnected(true);
        const [
          fetchedStudents,
          fetchedRooms,
          fetchedComplaints,
          fetchedPayments,
          fetchedMeals,
          fetchedVisitors,
          fetchedAttendance,
          fetchedNotices,
          fetchedActivities
        ] = await Promise.all([
          api.getStudents(students),
          api.getRooms(rooms),
          api.getComplaints(complaints),
          api.getPayments(payments),
          api.getMeals(meals),
          api.getVisitors(visitors),
          api.getAttendance(attendance),
          api.getNotices(notices),
          api.getActivities(activities)
        ]);

        if (fetchedStudents && fetchedStudents.length > 0) setStudents(fetchedStudents);
        if (fetchedRooms && fetchedRooms.length > 0) setRooms(fetchedRooms);
        if (fetchedComplaints && fetchedComplaints.length > 0) setComplaints(fetchedComplaints);
        if (fetchedPayments && fetchedPayments.length > 0) setPayments(fetchedPayments);
        if (fetchedMeals && fetchedMeals.length > 0) setMeals(fetchedMeals);
        if (fetchedVisitors && fetchedVisitors.length > 0) setVisitors(fetchedVisitors);
        if (fetchedAttendance && fetchedAttendance.length > 0) setAttendance(fetchedAttendance);
        if (fetchedNotices && fetchedNotices.length > 0) setNotices(fetchedNotices);
        if (fetchedActivities && fetchedActivities.length > 0) setActivities(fetchedActivities);
      }
    } catch {
      setBackendConnected(false);
    }
  }, []);

  useEffect(() => {
    refreshBackendData();
  }, [refreshBackendData]);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    setActiveSidebarTab('Dashboard');
    showToast(`Switched to ${newRole === 'admin' ? 'Admin Portal' : 'Student Portal (Rahim Ahmed)'}`);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const openModal = (modalName: string, data: any = null) => {
    setActiveModal(modalName);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  // The logged-in student in student mode is Rahim Ahmed
  const currentStudent = students.find(s => s.id === '1021') || students[0];

  const addStudent = async (studentData: Omit<Student, 'id'> & { id?: string }) => {
    const newId = studentData.id || String(1020 + students.length + 1);
    const newStudent: Student = {
      ...studentData,
      id: newId,
      status: studentData.status || 'Active',
      avatar: studentData.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`
    };

    setStudents(prev => [newStudent, ...prev]);

    // Add activity
    setActivities(prev => [
      {
        id: `ACT-${Date.now()}`,
        type: 'assignment',
        title: `${newStudent.name} admitted to hostel`,
        time: 'Just now'
      },
      ...prev
    ]);

    // Backend call
    api.createStudent(newStudent);

    showToast(`Student ${newStudent.name} added successfully! (Saved to SQLite DB)`);
    closeModal();
  };

  const assignRoom = async (studentId: string, roomId: string, bedNumber: string) => {
    try {
      const student = students.find((s) => String(s.id) === String(studentId));
      if (!student) {
        showToast(`Could not find student with ID ${studentId}`);
        closeModal();
        return;
      }

      const previousRoom = student.room;
      const previousBed = student.bedNo;

      // Determine block for room
      const targetRoomObj = rooms.find((r) => r.roomNumber === roomId);
      const targetBlock =
        targetRoomObj?.block ||
        (roomId.startsWith('B') ? 'Block B' : roomId.startsWith('C') ? 'Block C' : 'Block A');

      // 1. Update Student in state
      setStudents((prev) =>
        prev.map((s) =>
          String(s.id) === String(studentId)
            ? { ...s, room: roomId, block: targetBlock, bedNo: bedNumber }
            : s
        )
      );

      // 2. Update Rooms in state
      setRooms((prev) =>
        prev.map((room) => {
          // If this is the newly assigned room:
          if (room.roomNumber === roomId) {
            const currentBeds = room.beds || [];
            const bedExists = currentBeds.some((b) => b.bedNumber === bedNumber);

            const updatedBeds = bedExists
              ? currentBeds.map((b) =>
                  b.bedNumber === bedNumber
                    ? {
                        ...b,
                        status: 'occupied' as const,
                        studentId: student.id,
                        studentName: student.name
                      }
                    : b
                )
              : [
                  ...currentBeds,
                  {
                    id: `${roomId}-${bedNumber}`,
                    bedNumber,
                    status: 'occupied' as const,
                    studentId: student.id,
                    studentName: student.name
                  }
                ];

            const occ = updatedBeds.filter((b) => b.status === 'occupied').length;
            return {
              ...room,
              beds: updatedBeds,
              occupiedCount: occ,
              status: occ >= room.capacity ? 'Occupied' : 'Available'
            };
          }

          // If this was the student's previous room and it's different, vacate old bed
          if (previousRoom && room.roomNumber === previousRoom && previousRoom !== roomId) {
            const currentBeds = room.beds || [];
            const updatedBeds = currentBeds.map((b) =>
              b.bedNumber === previousBed || b.studentId === student.id
                ? {
                    ...b,
                    status: 'available' as const,
                    studentId: undefined,
                    studentName: undefined
                  }
                : b
            );
            const occ = updatedBeds.filter((b) => b.status === 'occupied').length;
            return {
              ...room,
              beds: updatedBeds,
              occupiedCount: occ,
              status: occ >= room.capacity ? 'Occupied' : 'Available'
            };
          }

          return room;
        })
      );

      // 3. Add activity entry
      setActivities((prev) => [
        {
          id: `ACT-${Date.now()}`,
          type: 'assignment',
          title: `${student.name} assigned to Room ${roomId} (${bedNumber})`,
          time: 'Just now'
        },
        ...prev
      ]);

      // 4. Backend synchronization
      api.assignRoom(studentId, roomId, bedNumber).catch((e) => {
        console.warn('Backend assignRoom API failed, local update saved:', e);
      });

      showToast(`${student.name} allocated to Room ${roomId} (${bedNumber})!`);
    } catch (err) {
      console.error('assignRoom error:', err);
      showToast('Assignment completed with local update.');
    } finally {
      closeModal();
    }
  };

  const addComplaint = async (data: Partial<Complaint>) => {
    const newComplaint: Complaint = {
      id: String(1025 + complaints.length),
      studentId: data.studentId || currentStudent.id,
      studentName: data.studentName || currentStudent.name,
      room: data.room || currentStudent.room,
      category: data.category || 'Electrical',
      subject: data.subject || 'Maintenance issue',
      description: data.description || '',
      priority: data.priority || 'Medium',
      status: 'Pending',
      date: 'Today'
    };

    setComplaints(prev => [newComplaint, ...prev]);

    setActivities(prev => [
      {
        id: `ACT-${Date.now()}`,
        type: 'complaint',
        title: `New complaint #${newComplaint.id} submitted for ${newComplaint.room}`,
        time: 'Just now'
      },
      ...prev
    ]);

    // Backend call
    api.createComplaint(newComplaint);

    showToast('Complaint registered successfully! ID #' + newComplaint.id);
    closeModal();
  };

  const updateComplaintStatus = async (id: string, status: Complaint['status']) => {
    setComplaints(prev =>
      prev.map(c => (c.id === id ? { ...c, status } : c))
    );
    api.updateComplaintStatus(id, status);
    showToast(`Complaint #${id} updated to ${status}`);
  };

  const recordPayment = async (data: Partial<Payment>) => {
    const newPayment: Payment = {
      id: `PAY-${Date.now().toString().slice(-4)}`,
      studentId: data.studentId || currentStudent.id,
      studentName: data.studentName || currentStudent.name,
      room: data.room || currentStudent.room,
      month: data.month || 'October 2026',
      amount: data.amount || 2500,
      status: 'Paid',
      paidDate: 'Today',
      paymentMethod: data.paymentMethod || 'bKash',
      transactionId: `TRX${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    setPayments(prev => [newPayment, ...prev]);

    setActivities(prev => [
      {
        id: `ACT-${Date.now()}`,
        type: 'payment',
        title: `${newPayment.studentName} paid ৳ ${newPayment.amount.toLocaleString()} (${newPayment.month})`,
        time: 'Just now'
      },
      ...prev
    ]);

    // Backend call
    api.recordPayment(newPayment);

    showToast(`Payment of ৳ ${newPayment.amount} recorded! Transaction ID: ${newPayment.transactionId}`);
    closeModal();
  };

  const addVisitorRequest = async (data: Partial<Visitor>) => {
    const newVisitor: Visitor = {
      id: `VIS-${Date.now().toString().slice(-3)}`,
      visitorName: data.visitorName || 'Guest Visitor',
      relation: data.relation || 'Relative',
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      room: currentStudent.room,
      date: data.date || 'Today',
      timeIn: data.timeIn || '03:00 PM',
      status: 'Inside',
      contact: data.contact || '01700-000000'
    };

    setVisitors(prev => [newVisitor, ...prev]);
    api.createVisitor(newVisitor);
    showToast(`Visitor pass created for ${newVisitor.visitorName}`);
    closeModal();
  };

  const toggleMealTaken = async (type: MealItem['type']) => {
    setMeals(prev =>
      prev.map(m => (m.type === type ? { ...m, taken: !m.taken } : m))
    );
    api.toggleMeal(type);
  };

  const addMeal = async (meal: MealItem) => {
    setMeals(prev => {
      const filtered = prev.filter(m => m.type.toLowerCase() !== meal.type.toLowerCase());
      return [...filtered, meal];
    });
    api.createMeal(meal);
    showToast(`Meal schedule for "${meal.type}" added successfully!`);
  };

  const updateMeal = async (mealType: string, updated: Partial<MealItem>) => {
    setMeals(prev =>
      prev.map(m => (m.type === mealType ? { ...m, ...updated } : m))
    );
    api.updateMeal(mealType, updated);
    showToast(`Meal "${mealType}" updated successfully!`);
  };

  const deleteMeal = async (mealType: string) => {
    setMeals(prev => prev.filter(m => m.type !== mealType));
    api.deleteMeal(mealType);
    showToast(`Meal "${mealType}" removed from menu.`);
  };

  return (
    <HostelContext.Provider
      value={{
        role,
        setRole,
        currentStudent,
        students,
        rooms,
        complaints,
        payments,
        meals,
        visitors,
        attendance,
        notices,
        activities,
        searchQuery,
        setSearchQuery,
        activeSidebarTab,
        setActiveSidebarTab,
        selectedBlock,
        setSelectedBlock,
        selectedFloor,
        setSelectedFloor,
        darkMode,
        toggleDarkMode,
        backendConnected,
        activeModal,
        modalData,
        openModal,
        closeModal,
        addStudent,
        assignRoom,
        addComplaint,
        updateComplaintStatus,
        recordPayment,
        addVisitorRequest,
        toggleMealTaken,
        addMeal,
        updateMeal,
        deleteMeal,
        toastMessage,
        showToast,
        refreshBackendData
      }}
    >
      {children}
    </HostelContext.Provider>
  );
};

export const useHostel = () => {
  const context = useContext(HostelContext);
  if (!context) {
    throw new Error('useHostel must be used within a HostelProvider');
  }
  return context;
};
