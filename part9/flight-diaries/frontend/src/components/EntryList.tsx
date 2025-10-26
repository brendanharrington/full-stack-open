import type { NonSensitiveDiaryEntry } from "../types";

interface EntryListProps {
  diaries: NonSensitiveDiaryEntry[];
}

const EntryList = (props: EntryListProps) => {
  return (
    <div>
      {props.diaries.map(d => {
        return (
          <div key={`diary-${d.id}`}>
            <h3>{d.date}</h3>
            <div>visibility: {d.visibility}</div>
            <div>weather: {d.weather}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EntryList