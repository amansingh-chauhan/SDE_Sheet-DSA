export interface Lead {
  id: string;
  name: string;
  phone: string;
  city: string;
  bank: string;
  salary: number;
  status: 'hot' | 'warm' | 'cold';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  lastCallDate?: Date;
  followUpDate?: Date;
  dispositionHistory: Disposition[];
}

export interface Disposition {
  id: string;
  leadId: string;
  aroId: string;
  callDuration: number; // in seconds
  disposition: 'not_interested' | 'call_back' | 'ok_otp' | 'wrong_number' | 'not_eligible' | 'busy' | 'no_answer';
  notes?: string;
  followUpDate?: Date;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'aro' | 'team_leader' | 'super_admin';
  active: boolean;
  monthlyTarget?: number;
  loginTime?: Date;
  createdAt: Date;
}

export interface AROStats {
  userId: string;
  userName: string;
  leadsAssigned: number;
  callsMadeToday: number;
  okOtpCount: number;
  dailyTarget: number;
  monthlyTarget: number;
  loginTime?: Date;
  currentCallDuration?: number;
  isOnCall: boolean;
}

export interface Alert {
  id: string;
  type: 'long_call' | 'missed_target' | 'no_login' | 'lead_assignment';
  message: string;
  severity: 'low' | 'medium' | 'high';
  userId?: string;
  createdAt: Date;
  acknowledged: boolean;
}

export interface SystemSettings {
  autoAssignmentRules: {
    maxLeadsPerARO: number;
    assignmentBasedOnOkOtp: boolean;
    leadRecyclingDays: number;
  };
  targetSettings: {
    defaultMonthlyTarget: number;
    dailyTargetMultiplier: number;
  };
  alertSettings: {
    longCallThresholdMinutes: number;
    missedTargetAlertEnabled: boolean;
  };
}

export interface LeadFilter {
  bank?: string;
  city?: string;
  status?: 'hot' | 'warm' | 'cold';
  salaryRange?: {
    min: number;
    max: number;
  };
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface DashboardStats {
  totalLeads: number;
  totalUsers: number;
  todaysConversions: number;
  monthlyConversions: number;
  averageCallDuration: number;
  topPerformer: string;
}