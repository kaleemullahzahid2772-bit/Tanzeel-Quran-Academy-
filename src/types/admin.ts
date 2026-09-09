export type RegistrationStatus =
  | "New"
  | "Contacted"
  | "Demo Scheduled"
  | "Enrolled"
  | "Rejected";

export interface TrialRegistration {
  id: string | number;
  full_name: string;
  phone: string;
  email: string;
  country: string;
  course: string;
  preferred_time: string;
  created_at: string;
  status?: RegistrationStatus | string;
  notes?: string;
}

export interface DashboardStats {
  total: number;
  newCount: number;
  todayCount: number;
  weekCount: number;
}
