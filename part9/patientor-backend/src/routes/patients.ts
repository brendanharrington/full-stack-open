import express from 'express';
import { Response } from 'express';
import { NonSensitivePatient } from '../types';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  console.log('Fetching all patients!');
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;
