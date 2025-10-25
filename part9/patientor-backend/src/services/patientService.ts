import patientData from '../../data/patients';

import { Patient, NonSensitivePatient } from '../types';

const getPatients = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};