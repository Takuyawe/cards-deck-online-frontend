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
import AccountSettingsComponent from "./AccountSettingsComponent";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

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
    "MultiPlayer Room",
    "Theme",
    "Account"
]

interface Props {
    roomId: string
}

export default function SettingsComponent (props: Props) {
    const [selectedSetting, setSelectedSetting] = useState<string | null>("Deck/Card")
    const router = useRouter()

    const handleChangeSettings = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSelectedSetting(event.currentTarget.textContent)
    }

    const handleSettingsCloseClick = () => {
        router.push(`/${props.roomId}`)
    }

    return (
        <Background>
            <SettingsContainer>
                <SettingsHeader>
                    <Box>
                        <Typography color="#ffffff" variant="h4">Settings</Typography>
                        <Typography color="#ffffff" variant="h6">Manage your settings</Typography>                                                
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
                                {selectedSetting === "MultiPlayer Room" && (
                                    <DeckSettingsComponent roomId={props.roomId} />    
                                )}
                                {selectedSetting === "Theme" && (
                                    <ThemeSettingsComponent />    
                                )}
                                {selectedSetting === "Account" && (
                                    <AccountSettingsComponent />   
                                )}
                                {selectedSetting !== "MultiPlayer Room" && (      
                                    <div className="flex flex-row items-center justify-end mt-8">
                                        <Button variant="contained" sx={{border: "1px solid rgba(255, 255, 255, .25)"}} className="border border-white border-opacity-25 mr-4 hover:bg-gray-800">Cancel</Button>
                                        <Button variant="contained" className="bg-blue-600 hover:bg-blue-500">Save</Button>
                                    </div>
                                )}
                            </SettingsContent>
                        </Grid>
                    </Grid>
                </SettingsMain>

            </SettingsContainer>
        </Background>
    )
}