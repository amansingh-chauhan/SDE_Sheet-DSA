import { Lead, User, AROStats, Alert, Disposition } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'aro1',
    username: 'aro1',
    name: 'Rahul Sharma',
    email: 'rahul@creditmonks.com',
    role: 'aro',
    active: true,
    monthlyTarget: 300,
    loginTime: new Date('2024-01-15T09:03:00'),
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'aro2',
    username: 'aro2',
    name: 'Priya Singh',
    email: 'priya@creditmonks.com',
    role: 'aro',
    active: true,
    monthlyTarget: 300,
    loginTime: new Date('2024-01-15T09:15:00'),
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'aro3',
    username: 'aro3',
    name: 'Amit Kumar',
    email: 'amit@creditmonks.com',
    role: 'aro',
    active: false,
    monthlyTarget: 300,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'tl1',
    username: 'tl1',
    name: 'Sunita Verma',
    email: 'sunita@creditmonks.com',
    role: 'team_leader',
    active: true,
    loginTime: new Date('2024-01-15T08:45:00'),
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'admin1',
    username: 'admin',
    name: 'Rajesh Gupta',
    email: 'admin@creditmonks.com',
    role: 'super_admin',
    active: true,
    loginTime: new Date('2024-01-15T08:30:00'),
    createdAt: new Date('2024-01-01'),
  },
];

export const mockLeads: Lead[] = [
  {
    id: 'lead1',
    name: 'Rajesh Kumar',
    phone: '9876543210',
    city: 'Mumbai',
    bank: 'HDFC',
    salary: 35000,
    status: 'hot',
    assignedTo: 'aro1',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
    lastCallDate: new Date('2024-01-15T10:30:00'),
    followUpDate: new Date('2024-01-16T14:00:00'),
    dispositionHistory: [],
  },
  {
    id: 'lead2',
    name: 'Sneha Patel',
    phone: '9876543211',
    city: 'Delhi',
    bank: 'ICICI',
    salary: 28000,
    status: 'warm',
    assignedTo: 'aro1',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-15'),
    lastCallDate: new Date('2024-01-14T11:15:00'),
    dispositionHistory: [],
  },
  {
    id: 'lead3',
    name: 'Vikram Singh',
    phone: '9876543212',
    city: 'Bangalore',
    bank: 'SBI',
    salary: 42000,
    status: 'cold',
    assignedTo: 'aro2',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-13'),
    lastCallDate: new Date('2024-01-13T16:20:00'),
    dispositionHistory: [],
  },
  {
    id: 'lead4',
    name: 'Anita Sharma',
    phone: '9876543213',
    city: 'Chennai',
    bank: 'Axis',
    salary: 38000,
    status: 'hot',
    assignedTo: 'aro1',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-15'),
    lastCallDate: new Date('2024-01-15T09:45:00'),
    dispositionHistory: [],
  },
  {
    id: 'lead5',
    name: 'Manish Gupta',
    phone: '9876543214',
    city: 'Pune',
    bank: 'HDFC',
    salary: 45000,
    status: 'warm',
    assignedTo: 'aro2',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-15'),
    lastCallDate: new Date('2024-01-15T15:30:00'),
    dispositionHistory: [],
  },
  {
    id: 'lead6',
    name: 'Kavita Reddy',
    phone: '9876543215',
    city: 'Hyderabad',
    bank: 'ICICI',
    salary: 32000,
    status: 'cold',
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-12'),
    dispositionHistory: [],
  },
];

export const mockAROStats: AROStats[] = [
  {
    userId: 'aro1',
    userName: 'Rahul Sharma',
    leadsAssigned: 125,
    callsMadeToday: 40,
    okOtpCount: 8,
    dailyTarget: 50,
    monthlyTarget: 300,
    loginTime: new Date('2024-01-15T09:03:00'),
    currentCallDuration: 0,
    isOnCall: false,
  },
  {
    userId: 'aro2',
    userName: 'Priya Singh',
    leadsAssigned: 98,
    callsMadeToday: 35,
    okOtpCount: 6,
    dailyTarget: 50,
    monthlyTarget: 300,
    loginTime: new Date('2024-01-15T09:15:00'),
    currentCallDuration: 180, // 3 minutes
    isOnCall: true,
  },
  {
    userId: 'aro3',
    userName: 'Amit Kumar',
    leadsAssigned: 0,
    callsMadeToday: 0,
    okOtpCount: 0,
    dailyTarget: 50,
    monthlyTarget: 300,
    currentCallDuration: 0,
    isOnCall: false,
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert1',
    type: 'long_call',
    message: 'ARO Priya Singh call exceeds 3 minutes',
    severity: 'medium',
    userId: 'aro2',
    createdAt: new Date('2024-01-15T11:18:00'),
    acknowledged: false,
  },
  {
    id: 'alert2',
    type: 'no_login',
    message: 'ARO Amit Kumar hasn&apos;t logged in yet',
    severity: 'high',
    userId: 'aro3',
    createdAt: new Date('2024-01-15T10:00:00'),
    acknowledged: false,
  },
  {
    id: 'alert3',
    type: 'missed_target',
    message: 'ARO Rahul Sharma missed daily target yesterday',
    severity: 'low',
    userId: 'aro1',
    createdAt: new Date('2024-01-15T08:00:00'),
    acknowledged: true,
  },
];

export const mockDispositions: Disposition[] = [
  {
    id: 'disp1',
    leadId: 'lead1',
    aroId: 'aro1',
    callDuration: 120,
    disposition: 'ok_otp',
    notes: 'Customer agreed to proceed with loan application',
    createdAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: 'disp2',
    leadId: 'lead2',
    aroId: 'aro1',
    callDuration: 90,
    disposition: 'call_back',
    notes: 'Customer requested callback tomorrow at 2 PM',
    followUpDate: new Date('2024-01-16T14:00:00'),
    createdAt: new Date('2024-01-14T11:15:00'),
  },
  {
    id: 'disp3',
    leadId: 'lead3',
    aroId: 'aro2',
    callDuration: 45,
    disposition: 'not_interested',
    notes: 'Customer not interested in loan at the moment',
    createdAt: new Date('2024-01-13T16:20:00'),
  },
];

// Add disposition history to leads
mockLeads[0].dispositionHistory = [mockDispositions[0]];
mockLeads[1].dispositionHistory = [mockDispositions[1]];
mockLeads[2].dispositionHistory = [mockDispositions[2]];

let currentUserIndex = 0; // Start with ARO

export const getCurrentUser = (): User => {
  // For demo purposes, return ARO user by default
  // In real app, this would come from authentication
  return mockUsers[currentUserIndex];
};

export const setCurrentUser = (user: User): void => {
  const index = mockUsers.findIndex(u => u.id === user.id);
  if (index !== -1) {
    currentUserIndex = index;
  }
};

export const getUsersByRole = (role: 'aro' | 'team_leader' | 'super_admin'): User[] => {
  return mockUsers.filter(user => user.role === role);
};

export const getLeadsByARO = (aroId: string): Lead[] => {
  return mockLeads.filter(lead => lead.assignedTo === aroId);
};

export const getUnassignedLeads = (): Lead[] => {
  return mockLeads.filter(lead => !lead.assignedTo);
};