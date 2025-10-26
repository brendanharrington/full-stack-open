import express, { Request, Response, NextFunction } from 'express';
import z from 'zod';
import { NonSensitivePatient, NewPatient, Patient } from '../types';
import patientService from '../services/patientService';
import { newPatientSchema } from '../utils';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  console.log('Fetching all patients!');
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  console.log(`Finding patient with id ${req.params.id}`);
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  console.log(`Saving patient!`);
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
