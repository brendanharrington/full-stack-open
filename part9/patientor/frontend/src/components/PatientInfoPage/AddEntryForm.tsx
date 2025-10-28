import { useState } from "react";

import { HealthCheckRating, NewEntry, Entry } from "../../types";
import patientService from "../../services/patients";

interface AddEntryFormProps {
  id: string;
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  showNotification: (message: string) => void;
}

const AddEntryForm = ({ id, setEntries, showNotification }: AddEntryFormProps) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');
  const [codes, setCodes] = useState<string[]>([]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: NewEntry = { 
      type: "HealthCheck",
      description,
      date,
      specialist,
      diagnosisCodes: codes,
      healthCheckRating: Number(rating) as HealthCheckRating
    };

    try {
      const createdEntry = await patientService.createEntry(id, newEntry);
      setEntries(prev => [...prev, createdEntry]);
    } catch (error) {
      showNotification('Failed to add entry');
      console.error('Failed to add entry:', error);
    }

    setDescription('');
    setDate('');
    setSpecialist('');
    setRating('');
    setCodes([]);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <label>
        Healthcheck Rating
        <input
          type="number"
          name="rating"
          value={rating}
          onChange={({ target }) => setRating(target.value)}
          required
        />
      </label>
      <br />
      <label>
        Diagnosis Codes
        <input
          type="text"
          name="codes"
          defaultValue={codes.join(', ')}
          onBlur={({ target }) =>
            setCodes(
              target.value
                ? target.value.split(',').map(c => c.trim()).filter(c => c.length > 0)
                : []
            )
          }
          placeholder="e.g. A1, B2, C3"
        />
      </label>
      <button type="submit">add</button>
    </form>
  );
};

export default AddEntryForm;