import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Card, CardHeader, CardContent, Typography, Stack, Chip, Box } from "@mui/material";

import type { HospitalEntry, Diagnosis } from "../../types";

interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: HospitalEntryProps) => {
  const discharge = entry.discharge;

  return (
    <Card variant="outlined" sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <CardHeader
        avatar={<LocalHospitalIcon color="primary" />}
        title={<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{entry.date}</Typography>}
        subheader={<Typography variant="caption" color="text.secondary">Hospital</Typography>}
      />
      <CardContent>
        <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
          {entry.description}
        </Typography>

        {discharge && (
          <Box mb={1}>
            <Chip
              color="info"
              label={`Discharge: ${discharge.date} — ${discharge.criteria}`}
              size="small"
            />
          </Box>
        )}

        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
            {entry.diagnosisCodes.map((c) => {
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

export default HospitalEntry;