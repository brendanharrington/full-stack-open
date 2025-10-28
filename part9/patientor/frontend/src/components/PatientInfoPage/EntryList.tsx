import { Patient, Diagnosis } from "../../types";

import EntryInfo from "./EntryInfo";

interface EntryListProps {
  patient: Patient;
  diagnoses: Diagnosis[];
}

const EntryList = ({ patient, diagnoses }: EntryListProps) => {
  if (!patient.entries.length) return <div>No entries found...</div>;

  return (
    <div>
      {patient.entries.map((entry, idx) => {
        return <EntryInfo key={`entry-${idx}`} {...{ entry, diagnoses }} />;
      })}
    </div>
  );
};

export default EntryList;