# Spotify Clone - Local Music Player

A React-based music player application that streams your local MP3 files with a Spotify-like interface.

## Features

- 🎵 Local MP3 file playback
- 🎨 Spotify-inspired UI design
- ⏯️ Full playback controls
  - Play/Pause
  - Skip forward/backward
  - Seek through tracks
  - Shuffle mode
  - Repeat mode
- 📱 Responsive design
- 🎯 Real-time progress tracking
- 🕒 Time display
- 📂 Automatic track discovery

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd SpotifyClone
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Create a music directory:
```bash
mkdir server/music
```

4. Add your MP3 files to the `server/music` directory

## Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. In a new terminal, start the frontend:
```bash
# From the root directory
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. Add MP3 files:
   - Place your MP3 files in the `server/music` directory
   - Restart the server to detect new files

2. Playback Controls:
   - Click on any track to play
   - Use the player controls at the bottom for:
     - Play/Pause
     - Skip forward/backward
     - Toggle shuffle mode
     - Toggle repeat mode
   - Click or drag the progress bar to seek within a track

## Project Structure

```
SpotifyClone/
├── src/
│   ├── components/
│   │   ├── Player.js        # Music player controls
│   │   ├── MainContent.js   # Track listing
│   │   └── Sidebar.js       # Navigation sidebar
│   ├── App.js
│   └── api.js              # API calls
├── server/
│   ├── music/              # MP3 files directory
│   └── server.js           # Express backend
└── package.json
```

## Technologies Used

- Frontend:
  - React
  - styled-components
  - react-icons
  - Axios

- Backend:
  - Node.js
  - Express
  - CORS

## Known Limitations

- Supports MP3 files only
- Local file system storage only
- No user authentication
- Limited metadata extraction

## Future Improvements

- [ ] Add volume controls
- [ ] Implement playlist management
- [ ] Add support for more audio formats
- [ ] Enhance metadata extraction
- [ ] Add drag-and-drop file upload
- [ ] Implement user preferences
- [ ] Add keyboard shortcuts

## Troubleshooting

1. No music playing:
   - Check if MP3 files are in `server/music`
   - Ensure both frontend and backend are running
   - Check browser console for errors

2. New tracks not showing:
   - Restart the server after adding new files
   - Check file format (must be MP3)

3. Playback issues:
   - Check browser console for errors
   - Verify file permissions
   - Ensure proper file encoding

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
