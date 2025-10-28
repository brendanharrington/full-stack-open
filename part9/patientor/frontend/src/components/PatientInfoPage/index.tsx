import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { Patient } from "../../types";

import patientService from "../../services/patients";

interface PatientProps {
  patients: Patient[];
}

const PatientInfoPage = ({ patients } : PatientProps) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  
  
  useEffect(() => {
    if (!id) return;
    patientService.getById(id)
      .then(fetched => setPatient(fetched))
      .catch(() => {
      });
  }, [id, patients]);

  if (!patient) return <div>patient not found...</div>;

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

      <Typography variant="h5" style={{ margin: "0.5em 0"}}>
        <b>Entries</b>
      </Typography>

      {patient.entries.length === 0 
        ? <div>No entries to show...</div>
        : patient.entries.map((e, idx) => {
        return (
          <div key={`${e.id ?? idx}`}>
            <div><b>{e.date}:</b> <em>{e.description}</em></div>
            <ul>
              {e.diagnosisCodes?.map((c) => {
                return <li key={c}>{c}</li>;
              })}
            </ul>
            <div></div>
          </div>
        );
      })}
    </div>
  );
};

export default PatientInfoPage;