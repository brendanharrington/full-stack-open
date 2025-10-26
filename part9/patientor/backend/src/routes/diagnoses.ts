import express from 'express';
import { Response } from 'express';
import { Diagnosis } from '../types';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  console.log('Fetching all diagnoses!');
  res.send(diagnosisService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default router;
