"use client"

import {useState} from "react"
import { useRouter } from "next/navigation";

import styled from "styled-components"
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeckSettingsComponent from "./DeckSettingsComponent";
import ThemeSettingsComponent from "./ThemeSettingsComponent";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSocketContext } from "@/app/_context/socket";

const Background = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: end;
    height: 100vh;
    width: 100%;
    background-color: black;
`

const SettingsContainer = styled(Box)`
    height: 95vh;
    width: 95vw;
    background-color: black;
    border: 1px solid rgba(255, 255, 255, .25);
    border-radius: 5px;
    border-bottom: 0px;
`

const SettingsHeader = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 15vh;
    margin-left: 2.5vw;
`

const SettingsMain = styled(Box)`
    height: 80vh;
    width: 100%;
`

const SettingsMenu = styled(Box)`
    height: 100%;
    margin-left: 2.5vw;
    margin-top: 2.5vh;
`

const SettingsContent = styled(Box)`
    height: 100%;
    margin-left: 2.5vw;
    margin-top: 2.5vh;
`

const settingsList = [
    "Game",
    "Theme"
]

export default function SingleSettingsComponent () {
    const {socketRef, singleModeSettings, setSingleModeSettings} = useSocketContext()
    const [selectedSetting, setSelectedSetting] = useState<string | null>("Game")
    const [isJokerIncluded, setIsJokerIncluded] = useState(singleModeSettings.game.isJokerIncluded)
    const [isShuffleEnabled, setIsShuffleEnabled] = useState(singleModeSettings.game.isShuffleEnabled)
    const [isSaveSuccess, setIsSaveSuccess] = useState(false)
    const router = useRouter()

    const handleChangeSettings = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSelectedSetting(event.currentTarget.textContent)
    }

    const handleSettingsCloseClick = () => {
        router.push("/")
    }

    const handleCancelClick = () => {
        setIsJokerIncluded(singleModeSettings.game.isJokerIncluded)
        setIsShuffleEnabled(singleModeSettings.game.isShuffleEnabled)
    }

    const handleSettingsSave = () => {
        // todo: dialog to confirm game restart
        if (!socketRef.current?.connected) return
        socketRef.current.emit("updateMultiPlayerSettings", {
            isJokerIncluded: isJokerIncluded,
            isShuffleEnabled: isShuffleEnabled
        })
        setSingleModeSettings({
            ...singleModeSettings,
            game: {
                isJokerIncluded: isJokerIncluded,
                isShuffleEnabled: isShuffleEnabled
            }
        })
        setIsSaveSuccess(true)
    }

    return (
        <Background>
            <SettingsContainer>
                <SettingsHeader>
                    <Box>
                        <Typography color="#ffffff" variant="h4">Settings</Typography>
                        <Typography color="#ffffff" variant="h6">Manage your game settings</Typography>                                                
                    </Box>
                    <IconButton onClick={handleSettingsCloseClick} className="rounded-sm bg-red-600 hover:bg-red-800 mr-6 mb-8" sx={{color: "white"}}>
                        <CloseRoundedIcon fontSize="medium"/>
                    </IconButton>                   
                </SettingsHeader>
                <Divider className="bg-white opacity-25" />
                <SettingsMain>
                    <Grid container>
                        <Grid item xs={2.5}>
                            <SettingsMenu>
                                <List>
                                    {settingsList.map((text, index) => (
                                        <ListItem className={selectedSetting === text ? "bg-gray-800" : ""} disablePadding key={text}>
                                            <ListItemButton onClick={handleChangeSettings}>
                                                <ListItemText primary={text} primaryTypographyProps={{ color: "#ffffff" }} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </SettingsMenu>
                        </Grid>
                        <Grid item xs={9}>
                            <SettingsContent>
                                {selectedSetting === "Game" && (
                                    <DeckSettingsComponent isJokerIncluded={isJokerIncluded} setIsJokerIncluded={setIsJokerIncluded} isShuffleEnabled={isShuffleEnabled} setIsShuffleEnabled={setIsShuffleEnabled} isSaveSuccess={isSaveSuccess} />    
                                )}
                                {selectedSetting === "Theme" && (
                                    <ThemeSettingsComponent />    
                                )}      
                                <div className="flex flex-row items-center justify-end mt-8">
                                    <Button onClick={handleCancelClick} variant="contained" className="border border-white border-opacity-25 mr-4 bg-gray-900 hover:bg-gray-800">Cancel</Button>
                                    <Button onClick={handleSettingsSave} variant="contained" className="bg-blue-600 hover:bg-blue-500">Save</Button>
                                </div>
                            </SettingsContent>
                        </Grid>
                    </Grid>
                </SettingsMain>

            </SettingsContainer>
        </Background>
    )
}