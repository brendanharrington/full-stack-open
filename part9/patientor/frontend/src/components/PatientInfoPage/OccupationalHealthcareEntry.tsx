import WorkIcon from '@mui/icons-material/Work';

import type { OccupationalHealthcareEntry, Diagnosis } from "../../types";

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({ entry, diagnoses }: OccupationalHealthcareEntryProps) => {
  return (
    <div style={{ padding: "0.5em", border: "solid"}}>
      <div style={{display: 'flex', alignItems: 'center' }} >
        <b>{entry.date}</b> 
        <WorkIcon style={{ paddingLeft: '0.2em'}} /> 
        <i>{entry.employerName}</i>
      </div>
      
      <div><em>{entry.description}</em></div>

      <ul>
        {entry.diagnosisCodes?.map((c: string) => {
          const diagnosis = diagnoses.find(d => d.code === c);
          return (
            <li key={c}>{c} - {diagnosis ? diagnosis.name : 'Unknown'}</li>
          );
        })}
      </ul>
      
      <div>diagnosed by {entry.specialist}</div>
    </div>
  );
};

export default OccupationalHealthcareEntry;