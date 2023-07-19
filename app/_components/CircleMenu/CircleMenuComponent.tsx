"use client";

import { useState } from 'react';
import styled from 'styled-components';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import Modal from '@mui/material/Modal';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import MultiPlayerComponent from './MultiPlayerMenu/MultiPlayerMenu';
import { usePathname, useRouter } from 'next/navigation';

const MenuContainerBox = styled(Box)`
  position: absolute;
  top: 0.1%;
  left: 0.5%;
`

const AnimatedList = styled(List)`
  display: flex;
  transition: max-width 0.75s ease-in-out;
  overflow: hidden;

  &.closed {
    max-width: 2.5rem; 
  }

  &.open {
    max-width: 10rem;
  }
`;

const AnimatedListItemMenu = styled(ListItem)`
  &.closed {
    transition: border-radius 0.1s ease-in-out;
    transition-delay: 0.75s;
    border-radius: 50%;
  }

  &.open {
    border-radius: 50% 0 0 50%;
  }
`

const AnimatedListItem = styled(ListItem)`
  transition: opacity 0.75s ease-in-out, visibility 0.75s;
  &.closed {
    opacity: 0;
    visibility: hidden;
  }

  &.open {
    opacity: 1;
    visibility: visible;
  }
`;

export default function CicleMenuComponent () {
  const [openMultiPlayer, setOpenMultiPlayer] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)

  const handleMultiPlayerOpen = () => setOpenMultiPlayer(true)
  const handleMultiPlayerClose = () => setOpenMultiPlayer(false)

  const handleMenuClick = () => {
    setOpenSettings(!openSettings)
  }
  
  const router = useRouter()
  const pathname = usePathname()

  const handleSettingsClick = () => {
    router.push(`${pathname}/settings`)
  }

  const handleLogoutClick = () => {
    router.push("/")
  }

  return (
    <div>
      <MenuContainerBox>
        <AnimatedList className={openSettings ? 'open' : 'closed'}>
          <AnimatedListItemMenu disablePadding className={`bg-gray-100 hover:bg-gray-300 ${openSettings ? 'open' : 'closed'}`}>
            <ListItemButton onClick={handleMenuClick} className='p-0 h-10 w-10 items-center justify-center'>
              <ListItemIcon className='min-w-0'>
                {openSettings ? <CloseRoundedIcon  /> : <MenuRoundedIcon />}
              </ListItemIcon>
            </ListItemButton>
          </AnimatedListItemMenu>
          
          <Tooltip title="Account">
            <AnimatedListItem disablePadding className={`bg-gray-100 hover:bg-gray-300 ${openSettings ? 'open' : 'closed'}}`}>
              <ListItemButton className='p-0 h-10 w-10 items-center justify-center'>
                <ListItemIcon className='min-w-0'>
                  <AccountCircleIcon color='success' />
                </ListItemIcon>
              </ListItemButton>
            </AnimatedListItem> 
          </Tooltip>
          <Tooltip title="Settings">
            <AnimatedListItem disablePadding className={`bg-gray-100 hover:bg-gray-300 ${openSettings ? 'open' : 'closed'}}`}>
              <ListItemButton onClick={handleSettingsClick} className='p-0 h-10 w-10 items-center justify-center'>
                <ListItemIcon className='min-w-0'>
                  <SettingsIcon color='success' />
                </ListItemIcon>
              </ListItemButton>
            </AnimatedListItem> 
          </Tooltip>
          {pathname === "/" ? (
            <Tooltip title="MultiPlayer">
              <AnimatedListItem disablePadding className={`bg-gray-100 hover:bg-gray-300 rounded-r-full ${openSettings ? 'open' : 'closed'}}`}>
                <ListItemButton onClick={handleMultiPlayerOpen} className='p-0 h-10 w-10 items-center justify-center'>
                  <ListItemIcon className='min-w-0'>
                    <PeopleIcon color='success' />
                  </ListItemIcon>
                </ListItemButton>
              </AnimatedListItem> 
            </Tooltip>
          ) : (
            <Tooltip title="Leave">
              <AnimatedListItem disablePadding className={`bg-gray-100 hover:bg-gray-300 rounded-r-full ${openSettings ? 'open' : 'closed'}}`}>
                <ListItemButton onClick={handleLogoutClick} className='p-0 h-10 w-10 items-center justify-center'>
                  <ListItemIcon className='min-w-0'>
                    <LogoutIcon color='success' />
                  </ListItemIcon>
                </ListItemButton>
              </AnimatedListItem>
            </Tooltip>
          )}
            
        </AnimatedList>
      </MenuContainerBox>
      

      {openMultiPlayer && (
        <Modal open={openMultiPlayer} onClose={handleMultiPlayerClose}>
          <>
            <MultiPlayerComponent />
          </>
        </Modal>
      )}
    </div>
  );
};
