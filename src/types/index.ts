// Core data models for FertilityFlow IVF Support App

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  clinicId?: string;
  treatmentPhase: TreatmentPhase;
  preferences: UserPreferences;
  emergencyContact?: EmergencyContact;
}

export interface UserPreferences {
  notificationSettings: NotificationSettings;
  privacySettings: PrivacySettings;
  theme: 'light' | 'dark' | 'auto';
  language: string;
}

export interface NotificationSettings {
  medicationReminders: boolean;
  appointmentReminders: boolean;
  reminderTiming: number[]; // minutes before event
  quietHours: {
    start: string; // HH:MM format
    end: string;
  };
  pushEnabled: boolean;
  emailEnabled: boolean;
}

export interface PrivacySettings {
  shareDataWithClinic: boolean;
  includeInSummaries: boolean;
  allowAnalytics: boolean;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export type TreatmentPhase = 
  | 'consultation'
  | 'preparation'
  | 'stimulation'
  | 'monitoring'
  | 'retrieval'
  | 'transfer'
  | 'waiting'
  | 'pregnancy'
  | 'completed';

export type AppointmentType = 
  | 'consultation'
  | 'monitoring'
  | 'blood_work'
  | 'ultrasound'
  | 'egg_retrieval'
  | 'embryo_transfer'
  | 'follow_up';

export interface Appointment {
  id: string;
  userId: string;
  clinicId: string;
  type: AppointmentType;
  title: string;
  description?: string;
  dateTime: Date;
  duration: number; // minutes
  location: string;
  provider: string;
  instructions?: string;
  confirmed: boolean;
  reminders: Reminder[];
}

export interface Medication {
  id: string;
  name: string;
  genericName?: string;
  dosage: string;
  administrationMethod: AdministrationMethod;
  frequency: string;
  instructions: string;
  sideEffects: string[];
  storageInstructions: string;
  videoUrl?: string;
  imageUrl?: string;
}

export type AdministrationMethod = 
  | 'injection'
  | 'oral'
  | 'vaginal'
  | 'nasal'
  | 'patch'
  | 'other';

export interface MedicationSchedule {
  id: string;
  userId: string;
  medicationId: string;
  medication: Medication;
  startDate: Date;
  endDate?: Date;
  times: string[]; // HH:MM format
  specialInstructions?: string;
  reminders: Reminder[];
}

export interface Reminder {
  id: string;
  type: 'appointment' | 'medication';
  targetId: string; // appointment or medication schedule ID
  scheduledTime: Date;
  message: string;
  acknowledged: boolean;
  snoozedUntil?: Date;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: Date;
  moodScore: number; // 1-10
  physicalSymptoms: Symptom[];
  medicationSideEffects: SideEffect[];
  notes: string;
  voiceNote?: string; // URL to audio file
  photos: string[]; // URLs to images
  tags: string[];
  includeInSummary: boolean;
}

export interface Symptom {
  type: SymptomType;
  severity: number; // 1-10
  notes?: string;
}

export type SymptomType = 
  | 'bloating'
  | 'mood_swings'
  | 'injection_site_reaction'
  | 'headache'
  | 'nausea'
  | 'fatigue'
  | 'hot_flashes'
  | 'breast_tenderness'
  | 'abdominal_pain'
  | 'other';

export interface SideEffect {
  medicationId: string;
  effect: string;
  severity: number; // 1-10
  notes?: string;
}

export interface VisitSummary {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  generatedAt: Date;
  moodTrends: MoodTrend[];
  symptomSummary: SymptomSummary[];
  medicationAdherence: MedicationAdherence[];
  keyHighlights: string[];
  concerns: string[];
  pdfUrl?: string;
}

export interface MoodTrend {
  date: Date;
  score: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface SymptomSummary {
  symptom: SymptomType;
  frequency: number;
  averageSeverity: number;
  trending: 'up' | 'down' | 'stable';
}

export interface MedicationAdherence {
  medicationId: string;
  medicationName: string;
  adherenceRate: number; // percentage
  missedDoses: number;
  lateAdministrations: number;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  emergencyContact: string;
}

export interface CalendarEvent {
  id: string;
  type: 'appointment' | 'medication' | 'milestone';
  title: string;
  dateTime: Date;
  duration?: number;
  color: string;
  icon?: string;
  data: Appointment | MedicationSchedule | TreatmentMilestone;
}

export interface TreatmentMilestone {
  id: string;
  userId: string;
  phase: TreatmentPhase;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

export interface NotificationPermissions {
  granted: boolean;
  requestedAt?: Date;
  deniedAt?: Date;
}

export interface AppState {
  user: User | null;
  appointments: Appointment[];
  medicationSchedules: MedicationSchedule[];
  journalEntries: JournalEntry[];
  medications: Medication[];
  clinics: Clinic[];
  isLoading: boolean;
  error: string | null;
  notificationPermissions: NotificationPermissions;
}