import React from 'react';
import styled from 'styled-components';
import { AiFillHome, AiOutlineSearch, AiOutlineOrderedList } from 'react-icons/ai';

const SidebarContainer = styled.div`
  grid-area: sidebar;
  background-color: #000000;
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  color: #1DB954;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  padding: 0 12px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  color: #b3b3b3;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  
  &:hover {
    color: #ffffff;
  }
  
  svg {
    margin-right: 16px;
    font-size: 24px;
  }
`;

function Sidebar() {
  return (
    <SidebarContainer>
      <Logo>Spotify Clone</Logo>
      <MenuItem>
        <AiFillHome />
        Home
      </MenuItem>
      <MenuItem>
        <AiOutlineSearch />
        Search
      </MenuItem>
      <MenuItem>
        <AiOutlineOrderedList />
        Your Library
      </MenuItem>
    </SidebarContainer>
  );
}

export default Sidebar;
