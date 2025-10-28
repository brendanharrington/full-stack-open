import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import EntryList from "./EntryList";
import AddEntryForm from "./AddEntryForm";

import { Diagnosis, Patient, Entry } from "../../types";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";

interface PatientProps {
  patients: Patient[];
}

const PatientInfoPage = ({ patients } : PatientProps) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | undefined>(undefined);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [notification, setNotification] = useState<string>('');

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 5000);
  };
  
  const fetchEntries = async (patientId: string) => {
    try {
      const fetched = await patientService.getEntries(patientId);
      setEntries(fetched);
    } catch {
      // ignore fetch errors for now
    }
  };

  useEffect(() => {
    if (!id) return;

    patientService.getById(id)
      .then(fetched => setPatient(fetched))
      .catch(() => {
      });

    diagnosisService.getAll()
      .then(fetched => setDiagnoses(fetched))
      .catch(() => {
      });

    fetchEntries(id);
    
  }, [id, patients]);

  if (!patient) return <div>patient not found...</div>;

  if (!diagnoses) return <div>diagnoses not found...</div>;

  return (
    <div>
      <Typography variant="h4" style={{ margin: "0.5em 0", fontWeight: 'bold' }}>
        {patient.name}
        {patient.gender === 'male' && <MaleIcon fontSize="large" />}
        {patient.gender === 'female' && <FemaleIcon fontSize="large" />}
      </Typography>

      <Typography variant="body1">
        <b>SSN:</b> {patient.ssn ? patient.ssn : 'N/A'} 
      </Typography>

      <Typography variant="body1">
        <b>Occupation:</b> {patient.occupation}
      </Typography>

      {notification && <p>{notification}</p>}

      <Typography variant="h5" style={{ margin: "0.5em 0"}}>
        <b>New HealthCheck Entry</b>
      </Typography>

      {id ? <AddEntryForm {...{ id, setEntries, showNotification }} /> : null}

      <Typography variant="h5" style={{ margin: "0.5em 0"}}>
        <b>Entries</b>
      </Typography>

      <EntryList {...{ entries, diagnoses }} />
    </div>
  );
};

export default PatientInfoPage;