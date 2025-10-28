import { Entry, Diagnosis } from "../../types";

import EntryInfo from "./EntryInfo";

interface EntryListProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const EntryList = ({ entries, diagnoses }: EntryListProps) => {
  if (!entries.length) return <div>No entries found...</div>;

  return (
    <div>
      {entries.map((entry, idx) => {
        return <EntryInfo key={`entry-${idx}`} {...{ entry, diagnoses }} />;
      })}
    </div>
  );
};

export default EntryList;