import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography
} from "@mui/material";

import { HealthCheckRating, NewEntry, Entry } from "../../types";
import patientService from "../../services/patients";

interface AddEntryFormProps {
  id: string;
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  showNotification: (message: string) => void;
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const AddEntryForm = ({ id, setEntries, showNotification }: AddEntryFormProps) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');

  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

  // Hospital
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  // diagnosis codes input (as string) and parsed array
  const [codesInput, setCodesInput] = useState('');
  const [codes, setCodes] = useState<string[]>([]);

  const parseCodes = (value: string) =>
    value
      .split(',')
      .map(c => c.trim())
      .filter(c => c.length > 0);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    // ensure parsed codes are up-to-date
    const diagnosisCodes = codesInput ? parseCodes(codesInput) : codes.length > 0 ? codes : undefined;

    let newEntry: NewEntry | null = null;

    if (entryType === "HealthCheck") {
      newEntry = {
        type: "HealthCheck",
        description,
        date,
        specialist,
        ...(diagnosisCodes ? { diagnosisCodes } : {}),
        healthCheckRating: Number(healthCheckRating) as HealthCheckRating
      };
    } else if (entryType === "Hospital") {
      newEntry = {
        type: "Hospital",
        description,
        date,
        specialist,
        ...(diagnosisCodes ? { diagnosisCodes } : {}),
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
      };
    } else if (entryType === "OccupationalHealthcare") {
      const sickLeave =
        sickLeaveStart && sickLeaveEnd ? { startDate: sickLeaveStart, endDate: sickLeaveEnd } : undefined;

      newEntry = {
        type: "OccupationalHealthcare",
        description,
        date,
        specialist,
        ...(diagnosisCodes ? { diagnosisCodes } : {}),
        employerName,
        ...(sickLeave ? { sickLeave } : {})
      };
    }

    if (!newEntry) {
      showNotification('Invalid entry type');
      return;
    }

    try {
      const createdEntry = await patientService.createEntry(id, newEntry);
      setEntries(prev => [...prev, createdEntry]);
      showNotification('Entry added successfully');
    } catch (error) {
      showNotification('Failed to add entry');
      console.error('Failed to add entry:', error);
    }

    // reset form
    setEntryType("HealthCheck");
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating(0);
    setDischargeDate('');
    setDischargeCriteria('');
    setEmployerName('');
    setSickLeaveStart('');
    setSickLeaveEnd('');
    setCodesInput('');
    setCodes([]);
  };

  const requiredMissing = !description || !date || !specialist || (entryType === "Hospital" && (!dischargeDate || !dischargeCriteria)) || (entryType === "OccupationalHealthcare" && !employerName);

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="entry-type-label">Entry Type</InputLabel>
            <Select
              labelId="entry-type-label"
              value={entryType}
              label="Entry Type"
              onChange={(e) => setEntryType(e.target.value as EntryType)}
            >
              <MenuItem value="HealthCheck">Health Check</MenuItem>
              <MenuItem value="Hospital">Hospital</MenuItem>
              <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={({ target }) => setDate(target.value)}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            required
          />
        </Grid>

        {entryType === "HealthCheck" && (
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>
              Health Check Rating
            </Typography>
            <RadioGroup
              row
              value={String(healthCheckRating)}
              onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
            >
              <FormControlLabel value="0" control={<Radio />} label="Healthy (0)" />
              <FormControlLabel value="1" control={<Radio />} label="LowRisk (1)" />
              <FormControlLabel value="2" control={<Radio />} label="HighRisk (2)" />
              <FormControlLabel value="3" control={<Radio />} label="Critical (3)" />
            </RadioGroup>
          </Grid>
        )}

        {entryType === "Hospital" && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Discharge Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Discharge Criteria"
                fullWidth
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
                required
              />
            </Grid>
          </>
        )}

        {entryType === "OccupationalHealthcare" && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Employer Name"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Sick Leave Start"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={sickLeaveStart}
                onChange={({ target }) => setSickLeaveStart(target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Sick Leave End"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={sickLeaveEnd}
                onChange={({ target }) => setSickLeaveEnd(target.value)}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <TextField
            label="Diagnosis Codes (comma separated)"
            fullWidth
            value={codesInput}
            onChange={({ target }) => setCodesInput(target.value)}
            onBlur={({ target }) => setCodes(parseCodes(target.value))}
            placeholder="e.g. A1, B2, C3"
          />
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="contained" color="primary" type="submit" disabled={requiredMissing}>
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddEntryForm;