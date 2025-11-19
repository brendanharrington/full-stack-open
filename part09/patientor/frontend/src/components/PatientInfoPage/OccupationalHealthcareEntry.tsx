import WorkIcon from '@mui/icons-material/Work';
import { Card, CardHeader, CardContent, Typography, Stack, Chip, Box } from "@mui/material";

import type { OccupationalHealthcareEntry, Diagnosis } from "../../types";

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({ entry, diagnoses }: OccupationalHealthcareEntryProps) => {
  const sickLeave = entry.sickLeave;

  return (
    <Card variant="outlined" sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <CardHeader
        avatar={<WorkIcon color="secondary" />}
        title={<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{entry.date}</Typography>}
        subheader={<Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>{entry.employerName}</Typography>}
      />
      <CardContent>
        <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
          {entry.description}
        </Typography>

        {sickLeave && (
          <Box mb={1}>
            <Chip
              color="warning"
              label={`Sick leave: ${sickLeave.startDate} → ${sickLeave.endDate}`}
              size="small"
            />
          </Box>
        )}

        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
            {entry.diagnosisCodes.map((c: string) => {
              const diagnosis = diagnoses.find(d => d.code === c);
              const label = diagnosis ? `${c} — ${diagnosis.name}` : c;
              return <Chip key={c} label={label} size="small" />;
            })}
          </Stack>
        )}

        <Typography variant="caption" color="text.secondary">
          diagnosed by {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcareEntry;