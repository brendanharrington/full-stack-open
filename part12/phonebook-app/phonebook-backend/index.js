import express from 'express';
import mongoose from 'mongoose';
import { PORT, MONGO_URL } from './util/config.js';
import Person from './mongo/models/Person.js';

const app = express();

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Connect to MongoDB
console.log('Connecting to MongoDB...');
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
const isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

// Routes
app.get('/', (req, res) => {
  res.send('Phonebook API');
});

// Get all persons
app.get('/persons', async (req, res) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Failed to fetch persons' });
  }
});

// Get single person
app.get('/persons/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ error: 'Person not found' });
    }
  } catch (error) {
    console.error('Error fetching person:', error);
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

// Create new person
app.post('/persons', async (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  try {
    const person = new Person({
      name,
      number,
    });

    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(500).json({ error: 'Failed to create person' });
  }
});

// Update person
app.put('/persons/:id', async (req, res) => {
  const { name, number } = req.body;

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { name, number },
      { new: true, runValidators: true }
    );

    if (updatedPerson) {
      res.json(updatedPerson);
    } else {
      res.status(404).json({ error: 'Person not found' });
    }
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(400).json({ error: 'Failed to update person' });
  }
});

// Delete person
app.delete('/persons/:id', async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (deletedPerson) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Person not found' });
    }
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(400).json({ error: 'Failed to delete person' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});