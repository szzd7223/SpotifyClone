const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Create music directory if it doesn't exist
const musicDir = path.join(__dirname, 'music');
if (!fs.existsSync(musicDir)) {
  fs.mkdirSync(musicDir, { recursive: true });
}

// Store tracks in memory
let tracks = [];

// Function to load tracks from music directory
function loadTracks() {
  tracks = [];
  const files = fs.readdirSync(musicDir);
  console.log('Found music files:', files);
  
  files.forEach((file, index) => {
    if (path.extname(file).toLowerCase() === '.mp3') {
      const track = {
        id: index + 1,
        title: path.parse(file).name,
        artist: 'Unknown Artist',
        audioUrl: `http://localhost:${port}/music/${encodeURIComponent(file)}`
      };
      console.log('Added track:', track);
      tracks.push(track);
    }
  });
}

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files from music directory with proper headers
app.use('/music', (req, res, next) => {
  res.set({
    'Accept-Ranges': 'bytes',
    'Content-Type': 'audio/mpeg',
  });
  next();
}, express.static(musicDir));

// Get all tracks
app.get('/api/tracks', (req, res) => {
  try {
    loadTracks(); // Reload tracks before sending
    console.log('Sending tracks:', tracks);
    res.json(tracks);
  } catch (error) {
    console.error('Error loading tracks:', error);
    res.status(500).json({ error: 'Error loading tracks' });
  }
});

// Search tracks
app.get('/api/search', (req, res) => {
  try {
    const query = req.query.q.toLowerCase();
    const results = tracks.filter(track => 
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query)
    );
    res.json(results);
  } catch (error) {
    console.error('Error searching tracks:', error);
    res.status(500).json({ error: 'Error searching tracks' });
  }
});

// Get track by ID
app.get('/api/tracks/:id', (req, res) => {
  try {
    const track = tracks.find(t => t.id === parseInt(req.params.id));
    if (!track) {
      console.log('Track not found:', req.params.id);
      return res.status(404).json({ error: 'Track not found' });
    }
    console.log('Sending track:', track);
    res.json(track);
  } catch (error) {
    console.error('Error getting track:', error);
    res.status(500).json({ error: 'Error getting track' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  loadTracks(); // Load tracks on server start
});
