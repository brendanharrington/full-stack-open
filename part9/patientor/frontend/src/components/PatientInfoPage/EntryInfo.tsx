import { Entry, Diagnosis } from "../../types";

import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

interface EntryInfoProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryInfo = ({ entry, diagnoses }: EntryInfoProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry {...{ entry, diagnoses }} />;
    case 'HealthCheck':
      return <HealthCheckEntry {...{ entry, diagnoses }} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry {...{ entry, diagnoses }} />;
    default:
      return assertNever(entry);
  }
};

export default EntryInfo;