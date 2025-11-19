import { useState, useEffect } from "react";
import axios from "axios";

import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";

import type { NonSensitiveDiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    void fetchDiaryList();
  }, []);

  const fetchDiaryList = async () => {
    try {
      const { data } = await axios.get<NonSensitiveDiaryEntry[]>('/api/diaries')
      setDiaries(data)
    } catch (error) {
      console.error('Failed to fetch diaries', error)
    }
  }

  return (
    <div>
      <h1>Flight Diaries App</h1>

      <h2>Add new entry</h2>
      <EntryForm setDiaries={setDiaries} diaries={diaries} />

      <h2>Diary Entries</h2>
      <EntryList diaries={diaries} />
    </div>
  );
};

export default App;
