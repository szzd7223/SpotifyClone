import React from 'react';
import styled from 'styled-components';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';

const MainContainer = styled.div`
  grid-area: main;
  background-color: #121212;
  padding: 24px;
  overflow-y: auto;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  color: white;
  font-size: 32px;
  margin-bottom: 16px;
`;

const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TrackItem = styled.div`
  background-color: ${props => props.isActive ? '#282828' : '#181818'};
  padding: 12px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #282828;
  }
`;

const TrackTitle = styled.div`
  color: ${props => props.isActive ? '#1db954' : 'white'};
  font-size: 16px;
  flex-grow: 1;
`;

const PlayIcon = styled.div`
  color: ${props => props.isActive ? '#1db954' : 'white'};
  font-size: 24px;
  opacity: ${props => props.showIcon ? 1 : 0};
  transition: opacity 0.2s ease;

  ${TrackItem}:hover & {
    opacity: 1;
  }
`;

function MainContent({ tracks, onTrackSelect, currentTrack, isPlaying }) {
  return (
    <MainContainer>
      <Header>
        <Title>Your Music</Title>
      </Header>
      <TrackList>
        {tracks.map((track) => {
          const isActive = currentTrack?.id === track.id;
          return (
            <TrackItem 
              key={track.id} 
              onClick={() => onTrackSelect(track)}
              isActive={isActive}
            >
              <TrackTitle isActive={isActive}>
                {track.title}
              </TrackTitle>
              <PlayIcon 
                isActive={isActive} 
                showIcon={isActive}
              >
                {isActive && isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
              </PlayIcon>
            </TrackItem>
          );
        })}
      </TrackList>
    </MainContainer>
  );
}

export default MainContent;
