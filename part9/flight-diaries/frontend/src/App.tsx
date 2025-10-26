import { useState, useEffect } from "react";
import axios from "axios";

type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

type Visibility = 'great' | 'good' | 'ok' | 'poor';

interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}
type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

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
      <form>
        <label>
          date
          <input type='date' name='date' />
        </label>
        <br />

        <label>
          visibility
          <input type='text' name='visibility' />
        </label>
        <br />

        <label>
          weather
          <input type='text' name='weather' />
        </label>
        <br />

        <label>
          comment
          <input type='text' name='comment' />
        </label>
        <br />

        <button>add</button>
      </form>
      <h2>Diary Entries</h2>
      {diaries.map(d => {
        return (
          <div key={`diary-${d.id}`}>
            <h3>{d.date}</h3>
            <div>visibility: {d.visibility}</div>
            <div>weather: {d.weather}</div>
          </div>
        )
      })}
    </div>
  );
};

export default App;
