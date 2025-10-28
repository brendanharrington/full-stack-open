import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import { Entry, Diagnosis } from "../../types";

interface HospitalEntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: HospitalEntryProps) => {
  return (
    <div style={{ padding: "0.5em", border: "solid"}}>
      <div style={{display: 'flex', alignItems: 'center' }} >
        <b>{entry.date}</b> 
        <LocalHospitalIcon style={{ paddingLeft: '0.2em'}} />
      </div>

      <div><em>{entry.description}</em></div>

      <ul>
        {entry.diagnosisCodes?.map((c) => {
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

export default HospitalEntry;