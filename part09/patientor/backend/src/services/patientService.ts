import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';

import { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry } from '../types';

const getPatients = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: []
  };

  patientData.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patientData.find(p => p.id === id);
  return patient;
};

const getEntries = (id: string): Entry[] | undefined => {
  const patient = findById(id);

  if (patient) {
    return patient.entries;
  } else {
    return undefined;
  }
};

const addEntry = (id: string, entry: NewEntry): Entry | undefined => {
  const patient = findById(id);

  if (!patient) return undefined;

  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };

  patient.entries = patient.entries.concat(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findById,
  getEntries,
  addEntry
};