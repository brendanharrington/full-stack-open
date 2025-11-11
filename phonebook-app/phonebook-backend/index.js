import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/', (req, res) => {
  res.send('got a post request at /');
});

app.get('/persons', (req, res) => {
  res.send('getting all persons');
});

app.post('/persons', (req, res) => {
  res.send('got a post request at /persons');
});

app.get('/persons/:id', (req, res) => {
  res.send(`getting person with id "${req.params.id}"`);
});

app.put('/persons/:id', (req, res) => {
  res.send(`updating entry with id "${req.params.id}"`)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
