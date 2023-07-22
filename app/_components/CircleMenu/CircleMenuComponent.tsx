"use client";

import { useState } from 'react';

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
import { useSocketContext } from '@/app/_context/socket';

const menuList = "flex transition-max-x duration-700 ease-in-out overflow-hidden"

const parentListItem = "max-w-[2.5rem] bg-gray-100 hover:bg-gray-300"
const parentListItemOpen = "rounded-l-full rounded-r-none"
const parentListItemClosed = "rounded-full transition-border-radius duration-100 ease-in-out delay-300"

const childListItem = "max-w-[2.5rem] bg-gray-100 hover:bg-gray-300 transition-all duration-700 ease-in-out"
const childListItemOpen = "opacity-100 visible"
const childListItemClosed = "opacity-0 invisible"

const itemButton = "p-0 h-10 w-10 items-center justify-center"

export default function CicleMenuComponent () {
  const [openMultiPlayer, setOpenMultiPlayer] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const {socketRef} = useSocketContext()
  const router = useRouter()
  const pathname = usePathname()

  const handleMultiPlayerOpen = () => setOpenMultiPlayer(true)
  const handleMultiPlayerClose = () => setOpenMultiPlayer(false)

  const handleMenuClick = () => {
    setOpenSettings(!openSettings)
  }

  const handleSettingsClick = () => {
    if (pathname === "/"){
      router.push("/settings")
    } else {
      router.push(`${pathname}/settings`)
    }
  }

  const handleLogoutClick = () => {
    router.push("/")
    socketRef.current?.disconnect()
  }

  return (
    <>
      <Box className='absolute top-[0.1%] left-[0.5%]'>
        <List className={`${menuList} ${openSettings ? 'max-w-[10rem]' : 'max-w-[2.5rem]'}`}>
          <ListItem disablePadding className={`${parentListItem} ${openSettings ? parentListItemOpen : parentListItemClosed}`}>
            <ListItemButton onClick={handleMenuClick} className={itemButton}>
              <ListItemIcon className='min-w-0'>
                {openSettings ? <CloseRoundedIcon  /> : <MenuRoundedIcon />}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          
          <Tooltip title="Account">
            <ListItem disablePadding className={`${childListItem} ${openSettings ? childListItemOpen : childListItemClosed}`}>
              <ListItemButton className={itemButton}>
                <ListItemIcon className='min-w-0'>
                  <AccountCircleIcon color='success' />
                </ListItemIcon>
              </ListItemButton>
            </ListItem> 
          </Tooltip>
          <Tooltip title="Settings">
            <ListItem disablePadding className={`${childListItem} ${openSettings ? childListItemOpen : childListItemClosed}`}>
              <ListItemButton onClick={handleSettingsClick} className={itemButton}>
                <ListItemIcon className='min-w-0'>
                  <SettingsIcon color='success' />
                </ListItemIcon>
              </ListItemButton>
            </ListItem> 
          </Tooltip>
          {pathname === "/" ? (
            <Tooltip title="MultiPlayer">
              <ListItem disablePadding className={`rounded-r-full ${childListItem} ${openSettings ? childListItemOpen : childListItemClosed}`}>
                <ListItemButton onClick={handleMultiPlayerOpen} className={itemButton}>
                  <ListItemIcon className='min-w-0'>
                    <PeopleIcon color='success' />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem> 
            </Tooltip>
          ) : (
            <Tooltip title="Leave">
              <ListItem disablePadding className={`rounded-r-full ${childListItem} ${openSettings ? childListItemOpen : childListItemClosed}`}>
                <ListItemButton onClick={handleLogoutClick} className={itemButton}>
                  <ListItemIcon className='min-w-0'>
                    <LogoutIcon color='success' />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Tooltip>
          )}
            
        </List>
      </Box>
      

      {openMultiPlayer && (
        <Modal open={openMultiPlayer} onClose={handleMultiPlayerClose}>
          <>
            <MultiPlayerComponent />
          </>
        </Modal>
      )}
    </>
  );
};
