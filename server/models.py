from pydantic import BaseModel, Field
from typing import List, Optional

class StudentModel(BaseModel):
    id: str
    name: str
    avatar: Optional[str] = None
    department: str
    semester: str
    phone: str
    email: str
    room: str
    block: str
    bedNo: str
    status: str = "Active"
    checkInDate: Optional[str] = "Today"
    guardianName: Optional[str] = None
    guardianPhone: Optional[str] = None

class StudentCreate(BaseModel):
    name: str
    department: str
    semester: str
    phone: str
    email: str
    room: str
    block: str
    bedNo: str
    avatar: Optional[str] = None
    guardianName: Optional[str] = None
    guardianPhone: Optional[str] = None

class BedModel(BaseModel):
    id: str
    roomId: str
    bedNumber: str
    status: str
    studentId: Optional[str] = None
    studentName: Optional[str] = None

class RoomModel(BaseModel):
    id: str
    roomNumber: str
    block: str
    floor: str
    capacity: int
    occupiedCount: int
    type: str
    status: str
    imageUrl: Optional[str] = None
    beds: List[BedModel] = []

class RoomAssignRequest(BaseModel):
    studentId: str
    roomId: str
    bedNumber: str

class ComplaintModel(BaseModel):
    id: str
    studentId: Optional[str] = None
    studentName: Optional[str] = None
    room: str
    category: str
    subject: str
    description: Optional[str] = ""
    priority: str = "Medium"
    status: str = "Pending"
    date: Optional[str] = "Today"

class ComplaintCreate(BaseModel):
    studentId: Optional[str] = None
    studentName: Optional[str] = None
    room: str
    category: str
    subject: str
    description: Optional[str] = ""
    priority: str = "Medium"

class ComplaintStatusUpdate(BaseModel):
    status: str

class PaymentModel(BaseModel):
    id: str
    studentId: str
    studentName: str
    room: str
    month: str
    amount: float
    status: str = "Paid"
    paidDate: Optional[str] = "Today"
    paymentMethod: Optional[str] = "bKash"
    transactionId: Optional[str] = None

class PaymentCreate(BaseModel):
    studentId: str
    studentName: str
    room: str
    month: str
    amount: float
    paymentMethod: Optional[str] = "bKash"

class MealItemModel(BaseModel):
    type: str
    time: str
    menu: List[str]
    taken: bool = False

class MealCreate(BaseModel):
    type: str
    time: str
    menu: List[str]

class MealUpdate(BaseModel):
    time: Optional[str] = None
    menu: Optional[List[str]] = None

class VisitorModel(BaseModel):
    id: str
    visitorName: str
    relation: str
    studentId: str
    studentName: str
    room: str
    date: str
    timeIn: str
    timeOut: Optional[str] = None
    status: str = "Inside"
    contact: str

class VisitorCreate(BaseModel):
    visitorName: str
    relation: str
    studentId: str
    studentName: str
    room: str
    date: Optional[str] = "Today"
    timeIn: Optional[str] = "02:30 PM"
    contact: str

class AttendanceRecordModel(BaseModel):
    date: str
    day: str
    dateNum: int
    status: str

class NoticeModel(BaseModel):
    id: str
    title: str
    description: str
    date: str
    type: str
    priority: str = "normal"

class ActivityModel(BaseModel):
    id: str
    type: str
    title: str
    time: str

class StatsOverview(BaseModel):
    totalStudents: int
    totalRooms: int
    occupiedBeds: int
    availableBeds: int
    pendingPaymentsAmount: float
    pendingPaymentsCount: int
    openComplaintsCount: int
    highPriorityComplaints: int
    occupancyRate: int
    totalVisitorsToday: int
    visitorsCurrentlyInside: int
