import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import MainContent from './components/MainContent';
import { fetchTracks } from './api';

const AppContainer = styled.div`
  display: grid;
  grid-template-areas:
    'sidebar main'
    'player player';
  grid-template-columns: 240px 1fr;
  grid-template-rows: 1fr 90px;
  height: 100vh;
  background-color: #121212;
  color: white;
`;

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const data = await fetchTracks();
        setTracks(data);
      } catch (error) {
        console.error('Error loading tracks:', error);
      }
    };
    loadTracks();
  }, []);

  const handlePlayPause = (playState) => {
    if (playState !== undefined) {
      setIsPlaying(playState);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleTrackSelect = (track) => {
    if (currentTrack?.id === track.id) {
      // If clicking the same track, toggle play/pause
      handlePlayPause();
    } else {
      // If clicking a different track, play it
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <AppContainer>
      <Sidebar />
      <MainContent 
        tracks={tracks} 
        onTrackSelect={handleTrackSelect}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
      />
      <Player
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        tracks={tracks}
        setCurrentTrack={setCurrentTrack}
      />
    </AppContainer>
  );
}

export default App;
