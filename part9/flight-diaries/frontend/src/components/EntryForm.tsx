import { useState } from "react"
import axios from "axios";

import type {
  DiaryEntry,
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
  Weather,
  Visibility
} from "../types";

interface EntryFormPropTypes {
  diaries: NonSensitiveDiaryEntry[],
  setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>
}

const EntryForm = (props: EntryFormPropTypes) => {
  const [notification, setNotification] = useState('');
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility | ''>('');
  const [weather, setWeather] = useState<Weather | ''>('');
  const [comment, setComment] = useState('');

  const showNotification = (message: string) => {
    setNotification(message);

    setTimeout(() => {
      setNotification('');
    }, 5000);
  }

  const addDiary = async (diary: NewDiaryEntry) => {
    try {
      const { data } = await axios.post<DiaryEntry>('/api/diaries', diary);
      props.setDiaries(prev => 
        prev.concat({
          id: data.id,
          date: data.date,
          weather: data.weather,
          visibility: data.visibility
        })
      );

      showNotification('Diary added successfully!');
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data);
        showNotification(String(error.response.data));
      } else {
        console.error(error);
        showNotification('An unexpected error occurred');
      }
    }
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment
    };

    addDiary(newEntry);
  }

  return (
    <div>
      {notification && <p>{notification}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          date
          <input 
            type="date"
            name="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </label>
        <br />

        <label>
          visibility
          <input 
            type="text"
            name="visibility"
            value={visibility}
            onChange={({ target }) => setVisibility(target.value as Visibility)}
          />
        </label>
        <br />

        <label>
          weather
          <input 
            type="text"
            name="weather"
            value={weather}
            onChange={({ target }) => setWeather(target.value as Weather)}
          />
        </label>
        <br />

        <label>
          comment
          <input 
            type="text"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </label>
        <br />

        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default EntryForm