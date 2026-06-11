// types.ts

export interface Clinician {
  id: number;
  name: string;
  specialty: string;
}

export interface Patient {
  id: number;
  name: string;
  date_of_birth: string;
}

export interface Visit {
  id: number;
  clinician_name: string;
  patient_name: string;
  visited_at: string;
  notes?: string;
}