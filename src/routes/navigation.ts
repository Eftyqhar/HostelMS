// Route and Tab Mapping configuration for HostelMS

export interface RouteMapping {
  path: string;
  tab: string;
  title: string;
  roleSpecificTab?: {
    admin: string;
    student: string;
  };
}

export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  ADMIN_PORTAL: '/admin',
  STUDENT_PORTAL: '/student',
  ROOMS: '/rooms',
  ROOM_ALIAS: '/room',
  MY_ROOM: '/my-room',
  NOTICES: '/notices',
  NOTICE_ALIAS: '/notice',
  MEALS: '/meals',
  MEAL_ALIAS: '/meal',
  COMPLAINTS: '/complaints',
  COMPLAINT_ALIAS: '/complaint',
  PAYMENTS: '/payments',
  PAYMENT_ALIAS: '/payment',
  ATTENDANCE: '/attendance',
  STUDENTS: '/students',
  BLOCKS: '/blocks',
  BLOCK_ALIAS: '/block',
  MAINTENANCE: '/maintenance',
  VISITORS: '/visitors',
  VISITOR_ALIAS: '/visitor',
  INVENTORY: '/inventory',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  LEAVE: '/leave',
  RULES: '/rules',
  CONTACT: '/contact',
  MORE: '/more'
} as const;

// Normalize any route path to a tab name
export function getTabFromPath(pathname: string, currentRole: 'admin' | 'student'): { tab: string; viewMode: 'home' | 'portal' | 'auth'; roleOverride?: 'admin' | 'student' } {
  const normalized = pathname.toLowerCase().replace(/\/+$/, '') || '/';

  switch (normalized) {
    case '/':
      return { tab: 'Home', viewMode: 'home' };

    case '/login':
    case '/register':
    case '/auth':
      return { tab: 'Auth', viewMode: 'auth' };

    case '/admin':
      return { tab: 'Dashboard', viewMode: 'portal', roleOverride: 'admin' };

    case '/student':
      return { tab: 'Dashboard', viewMode: 'portal', roleOverride: 'student' };

    case '/dashboard':
      return { tab: 'Dashboard', viewMode: 'portal' };

    case '/room':
    case '/rooms':
      return {
        tab: currentRole === 'admin' ? 'Rooms' : 'My Room',
        viewMode: 'portal'
      };

    case '/my-room':
      return { tab: 'My Room', viewMode: 'portal', roleOverride: 'student' };

    case '/notice':
    case '/notices':
      return { tab: 'Notices', viewMode: 'portal' };

    case '/meal':
    case '/meals':
      return {
        tab: currentRole === 'admin' ? 'Meals' : 'Meal Menu',
        viewMode: 'portal'
      };

    case '/complaint':
    case '/complaints':
      return { tab: 'Complaints', viewMode: 'portal' };

    case '/payment':
    case '/payments':
      return { tab: 'Payments', viewMode: 'portal' };

    case '/attendance':
      return { tab: 'Attendance', viewMode: 'portal' };

    case '/students':
      return { tab: 'Students', viewMode: 'portal', roleOverride: 'admin' };

    case '/block':
    case '/blocks':
      return { tab: 'Blocks', viewMode: 'portal', roleOverride: 'admin' };

    case '/maintenance':
      return { tab: 'Maintenance', viewMode: 'portal', roleOverride: 'admin' };

    case '/visitor':
    case '/visitors':
      return {
        tab: currentRole === 'admin' ? 'Visitors' : 'Visitor Request',
        viewMode: 'portal'
      };

    case '/inventory':
      return { tab: 'Inventory', viewMode: 'portal', roleOverride: 'admin' };

    case '/reports':
      return { tab: 'Reports', viewMode: 'portal', roleOverride: 'admin' };

    case '/settings':
      return { tab: 'Settings', viewMode: 'portal' };

    case '/profile':
      return { tab: 'My Profile', viewMode: 'portal', roleOverride: 'student' };

    case '/leave':
      return { tab: 'Leave Request', viewMode: 'portal', roleOverride: 'student' };

    case '/rules':
      return { tab: 'Hostel Rules', viewMode: 'portal' };

    case '/contact':
      return { tab: 'Contact', viewMode: 'portal' };

    case '/more':
      return { tab: 'More', viewMode: 'portal' };

    default:
      return { tab: 'Dashboard', viewMode: 'portal' };
  }
}

// Convert a Tab Name into its primary URL path
export function getPathFromTab(tab: string): string {
  switch (tab) {
    case 'Home':
      return APP_ROUTES.HOME;
    case 'Auth':
      return APP_ROUTES.LOGIN;
    case 'Dashboard':
      return APP_ROUTES.DASHBOARD;
    case 'Rooms':
    case 'My Room':
      return APP_ROUTES.ROOMS;
    case 'Notices':
      return APP_ROUTES.NOTICES;
    case 'Meals':
    case 'Meal Menu':
      return APP_ROUTES.MEALS;
    case 'Complaints':
      return APP_ROUTES.COMPLAINTS;
    case 'Payments':
      return APP_ROUTES.PAYMENTS;
    case 'Attendance':
      return APP_ROUTES.ATTENDANCE;
    case 'Students':
      return APP_ROUTES.STUDENTS;
    case 'Blocks':
      return APP_ROUTES.BLOCKS;
    case 'Maintenance':
      return APP_ROUTES.MAINTENANCE;
    case 'Visitors':
    case 'Visitor Request':
      return APP_ROUTES.VISITORS;
    case 'Inventory':
      return APP_ROUTES.INVENTORY;
    case 'Reports':
      return APP_ROUTES.REPORTS;
    case 'Settings':
    case 'Users & Roles':
      return APP_ROUTES.SETTINGS;
    case 'My Profile':
      return APP_ROUTES.PROFILE;
    case 'Leave Request':
      return APP_ROUTES.LEAVE;
    case 'Hostel Rules':
      return APP_ROUTES.RULES;
    case 'Contact':
      return APP_ROUTES.CONTACT;
    case 'More':
      return APP_ROUTES.MORE;
    default:
      return APP_ROUTES.DASHBOARD;
  }
}
