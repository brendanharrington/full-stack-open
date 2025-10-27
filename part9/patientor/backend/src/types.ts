import z from 'zod';
import { newPatientSchema } from './utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient extends NewPatient {
  id: string;
  entries: Entry[];
}



export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = z.infer<typeof newPatientSchema>;
