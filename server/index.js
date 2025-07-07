const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let userData = null;

app.post('/api/user', (req, res) => {
  const { firstName, lastName, dob } = req.body;
  if (!firstName || !lastName || !dob) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  userData = { firstName, lastName, dob };
  res.status(201).json({ message: 'User saved' });
});

app.get('/api/user', (req, res) => {
  if (!userData) return res.status(404).json({ error: 'No user found' });
  res.json(userData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
