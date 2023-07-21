"use client"

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { useState } from 'react';

import ResetPopupComponent from "./ResetButton/ResetButton"


export default function TopRightButtonsComponent () {
    const [resetPopup, setResetPopup] = useState(false);
    const [pencilEnabled, setPencilEnabled] = useState(false)

    const handleResetPopupOpen = () => {
        setResetPopup(true);
    }

    const handlePencilClick = () => {
        setPencilEnabled(true)
    }

    const buttonList = {
        "pencil": {
            "tooltip": "Pencil",
            "onclick": handlePencilClick,
            "icon": <CreateRoundedIcon />
        },
        "reset": {
            "tooltip": "Reset",
            "onclick": handleResetPopupOpen,
            "icon": <RestartAltIcon />
        }
    }

    return (
        <>
            <Box position="absolute" top="1%" left="94%" zIndex="999">
                {/* todo: flex margin? and use tailwind */}
                <List className='flex' disablePadding>
                    {Object.entries(buttonList).map(button => (
                        <Tooltip title={button[1].tooltip} key={button[1].tooltip}>
                            <ListItem className='ml-2 bg-gray-100 hover:bg-gray-300 rounded-full' disablePadding>
                                <ListItemButton onClick={button[1].onclick} className='p-0 h-8 w-8 items-center justify-center'>
                                    <ListItemIcon className='min-w-0'>
                                        {button[1].icon}
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                        </Tooltip>       
                    ))}
                            
                </List>
            </Box>
            {resetPopup && (
                <ResetPopupComponent resetPopup={resetPopup} setResetPopup={setResetPopup}  />
            )}
        </>
        
    )
}