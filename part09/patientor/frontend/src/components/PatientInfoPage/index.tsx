import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Box, Paper, Grid, Typography, Divider, Alert } from '@mui/material';
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
    <Container maxWidth="md" style={{ marginTop: 24 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {patient.name}
            </Typography>
            <Box mt={1} display="flex" gap={1} alignItems="center" flexWrap="wrap">
              <Typography variant="body2" color="text.secondary">
                <b>SSN:</b> {patient.ssn ? patient.ssn : 'N/A'}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2" color="text.secondary">
                <b>Occupation:</b> {patient.occupation}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" justifyContent="flex-end">
              {patient.gender === 'male' && <MaleIcon fontSize="large" />}
              {patient.gender === 'female' && <FemaleIcon fontSize="large" />}
            </Box>
          </Grid>
        </Grid>

        {notification && (
          <Box mt={2}>
            <Alert severity="info">{notification}</Alert>
          </Box>
        )}

        <Box mt={3}>
          <Paper elevation={1} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Add New Entry
            </Typography>
            {id ? <AddEntryForm {...{ id, setEntries, showNotification }} /> : null}
          </Paper>
        </Box>

        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Entries
          </Typography>
          <EntryList {...{ entries, diagnoses }} />
        </Box>
      </Paper>
    </Container>
  );
};

export default PatientInfoPage;