import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { 
  AiFillPlayCircle, 
  AiFillPauseCircle, 
  AiOutlineStepForward, 
  AiOutlineStepBackward,
  AiOutlineRedo,
  AiOutlineSwap
} from 'react-icons/ai';

const PlayerContainer = styled.div`
  grid-area: player;
  background-color: #181818;
  border-top: 1px solid #282828;
  padding: 0 16px;
  height: 90px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
`;

const PlayerLeftSection = styled.div`
  display: flex;
  align-items: center;
  min-width: 180px;
  width: 30%;
`;

const PlayerCenterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 722px;
  gap: 8px;
`;

const PlayerRightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 30%;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    color: #1db954;
  }

  &:disabled {
    color: #666;
    cursor: not-allowed;
    &:hover {
      transform: none;
    }
  }
`;

const PlayButton = styled(Button)`
  font-size: 40px;
`;

const SkipButton = styled(Button)`
  font-size: 24px;
`;

const ControlButton = styled(Button)`
  font-size: 16px;
  color: ${props => props.active ? '#1db954' : '#b3b3b3'};
  
  &:hover {
    color: ${props => props.active ? '#1db954' : '#fff'};
  }
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  margin-left: 16px;
`;

const TrackTitle = styled.div`
  color: white;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimeDisplay = styled.span`
  color: #a7a7a7;
  font-size: 11px;
  min-width: 40px;
  font-weight: 400;
  letter-spacing: 0.5px;
`;

const SliderContainer = styled.div`
  flex-grow: 1;
  height: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  
  &:hover {
    .progress-bar {
      &::before {
        background-color: #1db954;
      }
    }
    .progress-knob {
      display: block;
    }
  }
`;

const ProgressBarBackground = styled.div`
  width: 100%;
  height: 4px;
  background-color: #4f4f4f;
  border-radius: 2px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const ProgressBar = styled.div`
  height: 4px;
  background-color: #fff;
  border-radius: 2px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: ${props => props.progress}%;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 2px;
    transition: background-color 0.2s ease;
  }
`;

const ProgressKnob = styled.div`
  width: 12px;
  height: 12px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: ${props => props.progress}%;
  z-index: 2;
  display: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function Player({ currentTrack, isPlaying, onPlayPause, tracks, setCurrentTrack }) {
  const audioRef = useRef(null);
  const sliderRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [shuffledTracks, setShuffledTracks] = useState([]);

  const currentTrackIndex = tracks.findIndex(track => track.id === currentTrack?.id);
  const progress = duration ? (currentTime / duration) * 100 : 0;

  // Add back the missing audio effects
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Playback error:', err);
          onPlayPause(false);
        });
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Playback error:', err);
          onPlayPause(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Initialize shuffled tracks when tracks change or shuffle is enabled
  useEffect(() => {
    if (isShuffle) {
      const shuffled = [...tracks].sort(() => Math.random() - 0.5);
      setShuffledTracks(shuffled);
    }
  }, [tracks, isShuffle]);

  // Get the active track list based on shuffle state
  const activeTrackList = isShuffle ? shuffledTracks : tracks;

  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle) {
      // When enabling shuffle, start with current track and shuffle the rest
      const currentTrackObj = tracks[currentTrackIndex];
      const remainingTracks = tracks.filter(track => track.id !== currentTrackObj.id);
      const shuffled = [currentTrackObj, ...remainingTracks.sort(() => Math.random() - 0.5)];
      setShuffledTracks(shuffled);
    }
  };

  const handleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const handleSkipNext = () => {
    const trackList = activeTrackList;
    const currentIdx = trackList.findIndex(track => track.id === currentTrack?.id);
    
    if (currentIdx < trackList.length - 1) {
      setCurrentTrack(trackList[currentIdx + 1]);
    } else if (isRepeat) {
      // If repeat is on and we're at the end, go back to first track
      setCurrentTrack(trackList[0]);
    }
  };

  const handleSkipPrevious = () => {
    const trackList = activeTrackList;
    const currentIdx = trackList.findIndex(track => track.id === currentTrack?.id);
    
    if (currentIdx > 0) {
      setCurrentTrack(trackList[currentIdx - 1]);
    } else if (isRepeat) {
      // If repeat is on and we're at the start, go to last track
      setCurrentTrack(trackList[trackList.length - 1]);
    }
  };

  const handleTrackEnd = () => {
    const trackList = activeTrackList;
    const currentIdx = trackList.findIndex(track => track.id === currentTrack?.id);
    
    if (currentIdx < trackList.length - 1) {
      setCurrentTrack(trackList[currentIdx + 1]);
    } else if (isRepeat) {
      // If repeat is on and we're at the end, go back to first track
      setCurrentTrack(trackList[0]);
    } else {
      // If repeat is off and we're at the end, stop playing
      onPlayPause(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <PlayerContainer>
      <PlayerLeftSection>
        {currentTrack && (
          <TrackInfo>
            <TrackTitle>{currentTrack.title}</TrackTitle>
          </TrackInfo>
        )}
      </PlayerLeftSection>

      <PlayerCenterSection>
        <Controls>
          <ControlButton 
            onClick={handleShuffle}
            active={isShuffle}
            title="Shuffle"
          >
            <AiOutlineSwap />
          </ControlButton>

          <SkipButton 
            onClick={handleSkipPrevious}
            disabled={!currentTrack}
          >
            <AiOutlineStepBackward />
          </SkipButton>
          
          <PlayButton onClick={() => onPlayPause(!isPlaying)} disabled={!currentTrack}>
            {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
          </PlayButton>
          
          <SkipButton 
            onClick={handleSkipNext}
            disabled={!currentTrack}
          >
            <AiOutlineStepForward />
          </SkipButton>

          <ControlButton 
            onClick={handleRepeat}
            active={isRepeat}
            title="Repeat"
          >
            <AiOutlineRedo />
          </ControlButton>
        </Controls>

        {currentTrack && (
          <ProgressContainer>
            <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
            
            <SliderContainer
              ref={sliderRef}
              onClick={handleProgressClick}
            >
              <ProgressBarBackground />
              <ProgressBar 
                className="progress-bar"
                progress={progress}
              />
              <ProgressKnob 
                className="progress-knob"
                progress={progress}
              />
            </SliderContainer>

            <TimeDisplay>{formatTime(duration)}</TimeDisplay>
          </ProgressContainer>
        )}
      </PlayerCenterSection>

      <PlayerRightSection>
        {/* Volume controls can go here in the future */}
      </PlayerRightSection>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnd}
      />
    </PlayerContainer>
  );
}

export default Player;
