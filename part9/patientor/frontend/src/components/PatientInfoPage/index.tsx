import { useParams } from "react-router-dom";
import { useState, useEffect, SetStateAction } from "react";
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
  const [patient, setPatient] = useState<Patient | undefined>(
    patients.find(p => p.id === id)
  );

  useEffect(() => {
    if (!id) return;
    patientService.getById(id)
      .then((fetched: SetStateAction<Patient | undefined>) => setPatient(fetched))
      .catch(() => {
      });
  }, [id]);

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
    </div>
  );
};

export default PatientInfoPage;