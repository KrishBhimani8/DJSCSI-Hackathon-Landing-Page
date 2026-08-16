const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Local JSON-file database — pure JS, no native build tools required.
const DB_FILE = path.join(__dirname, 'registrations.json');
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]');
const readDB = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

app.post('/api/register', (req, res) => {
  const { teamName, leaderName, email, phone, college, teamSize, track, idea } = req.body || {};
  if (!teamName || !leaderName || !email || !college) {
    return res.status(400).json({ error: 'teamName, leaderName, email, and college are required.' });
  }
  try {
    const data = readDB();
    data.push({
      id: Date.now(), teamName, leaderName, email, phone: phone || '', college,
      teamSize: teamSize || null, track: track || '', idea: idea || '',
      createdAt: new Date().toISOString(),
    });
    writeDB(data);
    res.status(201).json({ message: 'Registration successful. Confirmation email coming soon.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.get('/api/registrations', (req, res) => {
  res.json(readDB().reverse());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`HACKDJSCE server running on http://localhost:${PORT}`));
