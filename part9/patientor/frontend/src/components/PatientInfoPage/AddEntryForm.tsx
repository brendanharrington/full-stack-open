import React, { useState } from "react";

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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Entry Type
        <select value={entryType} onChange={(e) => setEntryType(e.target.value as EntryType)}>
          <option value="HealthCheck">Health Check</option>
          <option value="Hospital">Hospital</option>
          <option value="OccupationalHealthcare">Occupational Healthcare</option>
        </select>
      </label>
      <br />
      <label>
        Description
        <input
          type="text"
          name="description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          required
        />
      </label>
      <br />
      <label>
        Date
        <input
          type="date"
          name="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          required
        />
      </label>
      <br />
      <label>
        Specialist
        <input
          type="text"
          name="specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          required
        />
      </label>
      <br />

      {entryType === "HealthCheck" && (
        <>
          <label>
            Healthcheck Rating
            <input
              type="number"
              name="rating"
              value={String(healthCheckRating)}
              onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
              min={0}
              max={3}
              required
            />
          </label>
          <br />
        </>
      )}

      {entryType === "Hospital" && (
        <>
          <label>
            Discharge Date
            <input
              type="date"
              name="dischargeDate"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              required
            />
          </label>
          <br />
          <label>
            Discharge Criteria
            <input
              type="text"
              name="dischargeCriteria"
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              required
            />
          </label>
          <br />
        </>
      )}

      {entryType === "OccupationalHealthcare" && (
        <>
          <label>
            Employer Name
            <input
              type="text"
              name="employerName"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              required
            />
          </label>
          <br />
          <label>
            Sick Leave Start
            <input
              type="date"
              name="sickLeaveStart"
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
          </label>
          <br />
          <label>
            Sick Leave End
            <input
              type="date"
              name="sickLeaveEnd"
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </label>
          <br />
        </>
      )}

      <label>
        Diagnosis Codes
        <input
          type="text"
          name="codes"
          value={codesInput}
          onChange={({ target }) => setCodesInput(target.value)}
          onBlur={({ target }) => setCodes(parseCodes(target.value))}
          placeholder="e.g. A1, B2, C3"
        />
      </label>
      <button type="submit">add</button>
    </form>
  );
};

export default AddEntryForm;