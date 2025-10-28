import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Entry, Diagnosis } from "../../types";

interface HealthCheckEntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses }: HealthCheckEntryProps) => {
  return (
    <div style={{ padding: "0.5em", border: "solid"}}>
      <div style={{display: 'flex', alignItems: 'center' }} >
        <b>{entry.date}</b> <MedicalInformationIcon style={{ paddingLeft: '0.2em'}} />
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} aria-hidden={false}>
        {(() => {
          if (entry.type !== 'HealthCheck') return null;
          const rating = entry.healthCheckRating;
          const maxHearts = 3;
          if (typeof rating !== 'number' || Number.isNaN(rating)) return null;
          const filledCount = Math.max(0, Math.min(maxHearts, maxHearts - rating));
          return Array.from({ length: maxHearts }).map((_, i) =>
            i < filledCount ? (
              <FavoriteIcon key={i} titleAccess={`health ${i + 1} of ${maxHearts}`} style={{ color: '#e53935' }} />
            ) : (
              <FavoriteBorderIcon key={i} titleAccess={`health ${i + 1} of ${maxHearts} (empty)`} style={{ color: '#bbb' }} />
            )
          );
        })()}
      </div>

      <div>diagnosed by {entry.specialist}</div>
    </div>
  );
};

export default HealthCheckEntry;