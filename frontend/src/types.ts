// types.ts

export interface Clinician {
  id: number;
  name: string;
  speciality: string;
}

export interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
}

export interface Visit {
  id: number;
  clinician: number;
  patient: number;
  visitedAt: string;
  notes?: string;
}