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

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Helper for fetch with timeout and fallback
async function fetchWithFallback<T>(url: string, fallbackData: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE_URL}${url}`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`API call ${url} failed or offline, using fallback:`, err);
    return fallbackData;
  }
}

export const api = {
  // Stats
  async getStats() {
    return fetchWithFallback('/stats', null);
  },

  // Students
  async getStudents(fallback: Student[]): Promise<Student[]> {
    return fetchWithFallback<Student[]>('/students', fallback);
  },

  async createStudent(student: Partial<Student>): Promise<Student | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error createStudent:', e);
    }
    return null;
  },

  // Rooms
  async getRooms(fallback: Room[]): Promise<Room[]> {
    return fetchWithFallback<Room[]>('/rooms', fallback);
  },

  async assignRoom(studentId: string, roomId: string, bedNumber: string) {
    try {
      await fetch(`${API_BASE_URL}/rooms/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, roomId, bedNumber })
      });
    } catch (e) {
      console.warn('API error assignRoom:', e);
    }
  },

  // Complaints
  async getComplaints(fallback: Complaint[]): Promise<Complaint[]> {
    return fetchWithFallback<Complaint[]>('/complaints', fallback);
  },

  async createComplaint(complaint: Partial<Complaint>): Promise<Complaint | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/complaints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(complaint)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error createComplaint:', e);
    }
    return null;
  },

  async updateComplaintStatus(complaintId: string, status: string) {
    try {
      await fetch(`${API_BASE_URL}/complaints/${complaintId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (e) {
      console.warn('API error updateComplaintStatus:', e);
    }
  },

  // Payments
  async getPayments(fallback: Payment[]): Promise<Payment[]> {
    return fetchWithFallback<Payment[]>('/payments', fallback);
  },

  async recordPayment(payment: Partial<Payment>): Promise<Payment | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error recordPayment:', e);
    }
    return null;
  },

  // Meals
  async getMeals(fallback: MealItem[]): Promise<MealItem[]> {
    return fetchWithFallback<MealItem[]>('/meals', fallback);
  },

  async createMeal(meal: MealItem): Promise<MealItem | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/meals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meal)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error createMeal:', e);
    }
    return null;
  },

  async updateMeal(mealType: string, data: Partial<MealItem>): Promise<MealItem | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/meals/${mealType}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error updateMeal:', e);
    }
    return null;
  },

  async deleteMeal(mealType: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/meals/${mealType}`, {
        method: 'DELETE'
      });
      return res.ok;
    } catch (e) {
      console.warn('API error deleteMeal:', e);
      return false;
    }
  },

  async toggleMeal(mealType: string) {
    try {
      await fetch(`${API_BASE_URL}/meals/${mealType}/toggle`, {
        method: 'PATCH'
      });
    } catch (e) {
      console.warn('API error toggleMeal:', e);
    }
  },

  // Visitors
  async getVisitors(fallback: Visitor[]): Promise<Visitor[]> {
    return fetchWithFallback<Visitor[]>('/visitors', fallback);
  },

  async createVisitor(visitor: Partial<Visitor>): Promise<Visitor | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/visitors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitor)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error createVisitor:', e);
    }
    return null;
  },

  // Attendance
  async getAttendance(fallback: AttendanceRecord[]): Promise<AttendanceRecord[]> {
    return fetchWithFallback<AttendanceRecord[]>('/attendance', fallback);
  },

  // Notices
  async getNotices(fallback: Notice[]): Promise<Notice[]> {
    return fetchWithFallback<Notice[]>('/notices', fallback);
  },

  // Activities
  async getActivities(fallback: Activity[]): Promise<Activity[]> {
    return fetchWithFallback<Activity[]>('/activities', fallback);
  }
};
