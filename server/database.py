import sqlite3
import json
import os
from typing import List, Dict, Any, Optional

DB_FILE = os.path.join(os.path.dirname(__file__), "hostel.db")

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Students table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        avatar TEXT,
        department TEXT,
        semester TEXT,
        phone TEXT,
        email TEXT,
        room TEXT,
        block TEXT,
        bedNo TEXT,
        status TEXT DEFAULT 'Active',
        checkInDate TEXT,
        guardianName TEXT,
        guardianPhone TEXT
    )
    """)

    # Rooms table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS rooms (
        id TEXT PRIMARY KEY,
        roomNumber TEXT NOT NULL,
        block TEXT NOT NULL,
        floor TEXT NOT NULL,
        capacity INTEGER NOT NULL,
        occupiedCount INTEGER NOT NULL,
        type TEXT NOT NULL,
        status TEXT NOT NULL,
        imageUrl TEXT
    )
    """)

    # Beds table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS beds (
        id TEXT PRIMARY KEY,
        roomId TEXT NOT NULL,
        bedNumber TEXT NOT NULL,
        status TEXT NOT NULL,
        studentId TEXT,
        studentName TEXT,
        FOREIGN KEY (roomId) REFERENCES rooms (id)
    )
    """)

    # Complaints table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS complaints (
        id TEXT PRIMARY KEY,
        studentId TEXT,
        studentName TEXT,
        room TEXT,
        category TEXT,
        subject TEXT NOT NULL,
        description TEXT,
        priority TEXT,
        status TEXT DEFAULT 'Pending',
        date TEXT
    )
    """)

    # Payments table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS payments (
        id TEXT PRIMARY KEY,
        studentId TEXT,
        studentName TEXT,
        room TEXT,
        month TEXT NOT NULL,
        amount REAL NOT NULL,
        status TEXT DEFAULT 'Paid',
        paidDate TEXT,
        paymentMethod TEXT,
        transactionId TEXT
    )
    """)

    # Meals table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS meals (
        type TEXT PRIMARY KEY,
        time TEXT NOT NULL,
        menu TEXT NOT NULL, -- JSON array
        taken INTEGER DEFAULT 0
    )
    """)

    # Visitors table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS visitors (
        id TEXT PRIMARY KEY,
        visitorName TEXT NOT NULL,
        relation TEXT,
        studentId TEXT,
        studentName TEXT,
        room TEXT,
        date TEXT,
        timeIn TEXT,
        timeOut TEXT,
        status TEXT DEFAULT 'Inside',
        contact TEXT
    )
    """)

    # Attendance table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS attendance (
        date TEXT PRIMARY KEY,
        day TEXT NOT NULL,
        dateNum INTEGER NOT NULL,
        status TEXT NOT NULL
    )
    """)

    # Notices table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS notices (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        date TEXT,
        type TEXT,
        priority TEXT DEFAULT 'normal'
    )
    """)

    # Activities table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS activities (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        time TEXT NOT NULL
    )
    """)

    conn.commit()

    # Seed initial data if empty
    cursor.execute("SELECT COUNT(*) as count FROM students")
    count = cursor.fetchone()["count"]
    if count == 0:
        seed_initial_data(conn)

    conn.close()

def seed_initial_data(conn):
    cursor = conn.cursor()

    # Initial Students
    students_data = [
        ("1021", "Rahim Ahmed", "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
         "Computer Science & Technology", "5th", "01712-345678", "rahim1021@student.edu.bd", "B-203", "Block B", "B-203-02", "Active", "12 Jan 2026", "Abdul Karim", "01811-987654"),
        ("1022", "Karim Hasan", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
         "EEE", "4th", "01819-456123", "karim1022@student.edu.bd", "A-102", "Block A", "A-102-01", "Active", "15 Feb 2026", "Hasan Ali", "01711-223344"),
        ("1023", "Fahim Islam", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
         "Civil", "6th", "01914-789012", "fahim1023@student.edu.bd", "C-301", "Block C", "C-301-03", "Checked-out", "10 Aug 2025", "Rafiqul Islam", "01611-334455"),
        ("1024", "Nusrat Jahan", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
         "CSE", "3rd", "01515-678901", "nusrat1024@student.edu.bd", "B-201", "Block B", "B-201-01", "Active", "01 Sep 2026", "Mahbubur Rahman", "01911-556677"),
        ("1025", "Tanvir Hossain", "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
         "Mechanical", "7th", "01733-112233", "tanvir1025@student.edu.bd", "A-201", "Block A", "A-201-01", "Active", "05 Jan 2025", "", ""),
        ("1026", "Sadia Sultana", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
         "Architecture", "2nd", "01677-889900", "sadia1026@student.edu.bd", "A-204", "Block A", "A-204-02", "Active", "10 Jan 2026", "", "")
    ]
    cursor.executemany("""
    INSERT INTO students (id, name, avatar, department, semester, phone, email, room, block, bedNo, status, checkInDate, guardianName, guardianPhone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, students_data)

    # Initial Rooms & Beds
    rooms_seed = [
        ("A-201", "A-201", "Block A", "2nd Floor", 3, 3, "3 Seater", "Occupied", None),
        ("A-202", "A-202", "Block A", "2nd Floor", 3, 2, "3 Seater", "Occupied", None),
        ("A-203", "A-203", "Block A", "2nd Floor", 3, 1, "3 Seater", "Occupied", None),
        ("A-204", "A-204", "Block A", "2nd Floor", 3, 3, "3 Seater", "Occupied", None),
        ("A-205", "A-205", "Block A", "2nd Floor", 3, 2, "3 Seater", "Occupied", None),
        ("A-206", "A-206", "Block A", "2nd Floor", 3, 0, "3 Seater", "Available", None),
        ("A-207", "A-207", "Block A", "2nd Floor", 3, 2, "3 Seater", "Occupied", None),
        ("A-208", "A-208", "Block A", "2nd Floor", 3, 1, "3 Seater", "Occupied", None),
        ("B-203", "B-203", "Block B", "2nd Floor", 3, 3, "3 Seater", "Occupied", "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&auto=format&fit=crop&q=80"),
        ("B-201", "B-201", "Block B", "2nd Floor", 3, 2, "3 Seater", "Occupied", None)
    ]
    cursor.executemany("""
    INSERT INTO rooms (id, roomNumber, block, floor, capacity, occupiedCount, type, status, imageUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, rooms_seed)

    # Beds for B-203 (Rahim's Room)
    beds_seed = [
        ("B-203-1", "B-203", "B-203-01", "occupied", "1042", "Shanto Roy"),
        ("B-203-2", "B-203", "B-203-02", "occupied", "1021", "Rahim Ahmed"),
        ("B-203-3", "B-203", "B-203-03", "occupied", "1043", "Aman Ullah"),
        ("A-206-1", "A-206", "A-206-01", "available", None, None),
        ("A-206-2", "A-206", "A-206-02", "available", None, None),
        ("A-206-3", "A-206", "A-206-03", "available", None, None)
    ]
    cursor.executemany("""
    INSERT INTO beds (id, roomId, bedNumber, status, studentId, studentName)
    VALUES (?, ?, ?, ?, ?, ?)
    """, beds_seed)

    # Complaints
    complaints_seed = [
        ("1024", "1021", "Rahim Ahmed", "B-203", "Electrical", "Fan not working", "Ceiling fan makes a loud grinding noise and runs at very slow speed.", "High", "Pending", "28 Sep"),
        ("1023", "1022", "Karim Hasan", "A-102", "Water", "Low water supply", "Bathroom tap water pressure is very low during morning hours.", "Medium", "In Progress", "12 Sep"),
        ("1022", "1023", "Fahim Islam", "C-301", "Furniture", "Broken chair", "Study chair leg is cracked and unstable.", "Low", "Pending", "02 Sep"),
        ("1021", "1024", "Nusrat Jahan", "B-201", "Internet", "WiFi disconnects frequently", "High packet loss on 2nd floor access point.", "High", "In Progress", "29 Sep"),
        ("1018", "1021", "Rahim Ahmed", "B-203", "Water", "Low water supply", "Water faucet filter was clogged.", "Medium", "Resolved", "12 Sep"),
        ("1005", "1021", "Rahim Ahmed", "B-203", "Furniture", "Broken chair", "Replaced with new ergonomic wooden study chair.", "Low", "Resolved", "02 Sep")
    ]
    cursor.executemany("""
    INSERT INTO complaints (id, studentId, studentName, room, category, subject, description, priority, status, date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, complaints_seed)

    # Payments
    payments_seed = [
        ("PAY-1001", "1021", "Rahim Ahmed", "B-203", "September 2026", 2500, "Paid", "05 Sep 2026", "bKash", "TRX98273641"),
        ("PAY-1002", "1021", "Rahim Ahmed", "B-203", "August 2026", 2500, "Paid", "03 Aug 2026", "Nagad", "TRX88471203"),
        ("PAY-1003", "1021", "Rahim Ahmed", "B-203", "July 2026", 2500, "Paid", "05 Jul 2026", "Bank Transfer", "TRX77361922"),
        ("PAY-1004", "1021", "Rahim Ahmed", "B-203", "June 2026", 2500, "Paid", "04 Jun 2026", "Card", "TRX66281900"),
        ("PAY-1005", "1022", "Karim Hasan", "A-102", "September 2026", 2500, "Paid", "30 Sep 2026", "bKash", "TRX99281745"),
        ("PAY-1006", "1024", "Nusrat Jahan", "B-201", "September 2026", 2500, "Pending", None, "bKash", None)
    ]
    cursor.executemany("""
    INSERT INTO payments (id, studentId, studentName, room, month, amount, status, paidDate, paymentMethod, transactionId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, payments_seed)

    # Meals
    meals_seed = [
        ("Breakfast", "7:00 AM - 9:00 AM", json.dumps(["Bread", "Egg", "Tea", "Banana"]), 1),
        ("Lunch", "12:00 PM - 2:00 PM", json.dumps(["Rice", "Fish Curry", "Vegetable", "Lentil"]), 1),
        ("Dinner", "7:00 PM - 9:00 PM", json.dumps(["Rice", "Chicken", "Salad", "Dessert"]), 0)
    ]
    cursor.executemany("""
    INSERT INTO meals (type, time, menu, taken)
    VALUES (?, ?, ?, ?)
    """, meals_seed)

    # Visitors
    visitors_seed = [
        ("VIS-01", "Abdul Karim", "Father", "1021", "Rahim Ahmed", "B-203", "28 Sep 2026", "02:15 PM", None, "Inside", "01811-987654"),
        ("VIS-02", "Nusrat Jahan", "Sister", "1022", "Karim Hasan", "A-102", "15 Sep 2026", "01:40 PM", "03:10 PM", "Exited", "01711-223344"),
        ("VIS-03", "Samiul Islam", "Friend", "1023", "Fahim Islam", "C-301", "02 Sep 2026", "11:20 AM", "12:45 PM", "Exited", "01911-334455")
    ]
    cursor.executemany("""
    INSERT INTO visitors (id, visitorName, relation, studentId, studentName, room, date, timeIn, timeOut, status, contact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, visitors_seed)

    # Attendance
    attendance_seed = [
        ("2026-09-23", "Mon", 23, "present"),
        ("2026-09-24", "Tue", 24, "present"),
        ("2026-09-25", "Wed", 25, "present"),
        ("2026-09-26", "Thu", 26, "present"),
        ("2026-09-27", "Fri", 27, "absent"),
        ("2026-09-28", "Sat", 28, "present"),
        ("2026-09-29", "Sun", 29, "present")
    ]
    cursor.executemany("""
    INSERT INTO attendance (date, day, dateNum, status)
    VALUES (?, ?, ?, ?)
    """, attendance_seed)

    # Notices
    notices_seed = [
        ("NTC-01", "Hostel fee for October 2026", "Last date of payment without late fee is 10 Oct 2026. Please pay via student portal or hostel office.", "28 Sep", "fee", "important"),
        ("NTC-02", "Water supply interruption", "Maintenance work will take place tomorrow (10 AM - 2 PM). Water tanks will be cleaned.", "27 Sep", "water", "important"),
        ("NTC-03", "Hostel cleanliness drive", "Join us this Saturday for our monthly campus cleanliness drive. Refreshments provided!", "25 Sep", "clean", "normal"),
        ("NTC-04", "Guest/Visitor timing updated", "New visitor hours are 10:00 AM - 8:00 PM on weekdays and weekends. Strictly register at entry.", "22 Sep", "timing", "normal")
    ]
    cursor.executemany("""
    INSERT INTO notices (id, title, description, date, type, priority)
    VALUES (?, ?, ?, ?, ?, ?)
    """, notices_seed)

    # Activities
    activities_seed = [
        ("ACT-01", "assignment", "Rahim Ahmed assigned to Room B-203", "10:24 AM"),
        ("ACT-02", "payment", "Karim Hasan paid hostel fee (Sep 2026)", "09:15 AM"),
        ("ACT-03", "complaint", "New complaint submitted in A-102", "08:42 AM"),
        ("ACT-04", "checkout", "Student ID 204 checked out", "Yesterday"),
        ("ACT-05", "maintenance", "Maintenance task completed (B-201)", "Yesterday")
    ]
    cursor.executemany("""
    INSERT INTO activities (id, type, title, time)
    VALUES (?, ?, ?, ?)
    """, activities_seed)

    conn.commit()
