import express, { Request, Response, NextFunction } from 'express';
import z from 'zod';
import { NonSensitivePatient, NewPatient, Patient, NewEntry, Diagnosis } from '../types';
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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> | undefined =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return undefined;
  }

  return (object as { diagnosisCodes?: Array<Diagnosis['code']> }).diagnosisCodes;
};

const asRecord = (obj: unknown): Record<string, unknown> => {
  return (obj && typeof obj === 'object') ? obj as Record<string, unknown> : {};
};

const parseStringField = (obj: Record<string, unknown>, key: string): string => {
  const val = obj[key];
  if (!val || typeof val !== 'string') throw new Error(`Missing or invalid field: ${key}`);
  return val;
};

const parseNumberField = (obj: Record<string, unknown>, key: string): number => {
  const val = obj[key];
  if (typeof val !== 'number') throw new Error(`Missing or invalid numeric field: ${key}`);
  return val;
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

router.get('/:id/entries', (req, res) => {
  console.log(`Getting entries for patient with id ${req.params.id}`);
  const entries = patientService.getEntries(req.params.id);

  if (entries) {
    res.send(entries);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  console.log(`Adding entry for patient with id ${req.params.id}`);
  try {
  const body = req.body as unknown;
  const diagnosisCodes = parseDiagnosisCodes(body);

  // Build NewEntry variant based on provided type
  const plain = body as { type?: string } & Record<string, unknown>;
  const b = asRecord(body);
    if (!plain.type || typeof plain.type !== 'string') throw new Error('Missing or invalid entry type');

    let newEntry: NewEntry;

    switch (plain.type) {
      case 'HealthCheck':
        newEntry = {
          type: 'HealthCheck',
          description: parseStringField(b, 'description'),
          date: parseStringField(b, 'date'),
          specialist: parseStringField(b, 'specialist'),
          diagnosisCodes,
          healthCheckRating: parseNumberField(b, 'healthCheckRating'),
        };
        break;
      case 'Hospital': {
        const discharge = b['discharge'];
        if (!discharge || typeof discharge !== 'object') throw new Error('Missing or invalid discharge');
        newEntry = {
          type: 'Hospital',
          description: parseStringField(b, 'description'),
          date: parseStringField(b, 'date'),
          specialist: parseStringField(b, 'specialist'),
          diagnosisCodes,
          discharge: discharge as { date: string; criteria: string },
        };
        break;
      }
      case 'OccupationalHealthcare': {
        const sickLeave = b['sickLeave'];
        newEntry = {
          type: 'OccupationalHealthcare',
          description: parseStringField(b, 'description'),
          date: parseStringField(b, 'date'),
          specialist: parseStringField(b, 'specialist'),
          diagnosisCodes,
          employerName: parseStringField(b, 'employerName'),
          sickLeave: sickLeave && typeof sickLeave === 'object' ? sickLeave as { startDate: string; endDate: string } : undefined,
        };
        break;
      }
      default:
        throw new Error('Invalid entry type');
    }

    const added = patientService.addEntry(req.params.id, newEntry);

    if (added) {
      res.json(added);
    } else {
      res.sendStatus(404);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.use(errorMiddleware);

export default router;
