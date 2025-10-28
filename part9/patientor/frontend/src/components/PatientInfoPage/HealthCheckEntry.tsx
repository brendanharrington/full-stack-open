import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Card, CardHeader, CardContent, Typography, Stack, Chip } from "@mui/material";

import { Entry, Diagnosis } from "../../types";

interface HealthCheckEntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses }: HealthCheckEntryProps) => {
  // healthCheckRating is defined only on HealthCheck entries
  const maxHearts = 3;
  let filledCount = 0;
  if (entry.type === "HealthCheck" && typeof entry.healthCheckRating === 'number' && !Number.isNaN(entry.healthCheckRating)) {
    const rating = entry.healthCheckRating;
    filledCount = Math.max(0, Math.min(maxHearts, maxHearts - rating));
  }

  return (
    <Card variant="outlined" sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <CardHeader
        avatar={<MedicalInformationIcon color="success" />}
        title={<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{entry.date}</Typography>}
        subheader={<Typography variant="caption" color="text.secondary">Health Check</Typography>}
      />
      <CardContent>
        <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
          {entry.description}
        </Typography>

        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
            {entry.diagnosisCodes.map((c) => {
              const diagnosis = diagnoses.find(d => d.code === c);
              const label = diagnosis ? `${c} — ${diagnosis.name}` : c;
              return <Chip key={c} label={label} size="small" />;
            })}
          </Stack>
        )}

        <Stack direction="row" spacing={0.5} alignItems="center" mb={1} aria-hidden={false}>
          {Array.from({ length: maxHearts }).map((_, i) =>
            i < filledCount ? (
              <FavoriteIcon key={i} titleAccess={`health ${i + 1} of ${maxHearts}`} sx={{ color: 'error.main' }} />
            ) : (
              <FavoriteBorderIcon key={i} titleAccess={`health ${i + 1} of ${maxHearts} (empty)`} sx={{ color: 'text.disabled' }} />
            )
          )}
        </Stack>

        <Typography variant="caption" color="text.secondary">
          diagnosed by {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HealthCheckEntry;