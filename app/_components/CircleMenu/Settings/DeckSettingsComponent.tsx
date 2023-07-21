"use client"

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';

import { SettingsCard } from "./themes/SettingsCard";

import { useState } from "react";
import { useSocketContext } from "@/app/_context/socket";

interface Props {
    roomId: string
}

export default function DeckSettingsComponent (props: Props) {
    const {socketRef, multiPlayerSettings, setMultiPlayerSettings} = useSocketContext()
    const [isJokerIncluded, setIsJokerIncluded] = useState(multiPlayerSettings.game.isJokerIncluded)
    const [isShuffleEnabled, setIsShuffleEnabled] = useState(multiPlayerSettings.game.isShuffleEnabled)
    const [isSaveSuccess, setIsSaveSuccess] = useState(false)

    const handleJokerChange = () => {
        setIsJokerIncluded(!isJokerIncluded)
    }

    const handleShuffleChange = () => {
        setIsShuffleEnabled(!isShuffleEnabled)
    }

    const handleCancelClick = () => {
        setIsJokerIncluded(multiPlayerSettings.game.isJokerIncluded)
        setIsShuffleEnabled(multiPlayerSettings.game.isShuffleEnabled)
    }

    const handleSettingsSave = () => {
        if (!socketRef.current?.connected) return
        socketRef.current.emit("updateMultiPlayerSettings", {
            isJokerIncluded: isJokerIncluded,
            isShuffleEnabled: isShuffleEnabled
        })
        setMultiPlayerSettings({
            ...multiPlayerSettings,
            game: {
                isJokerIncluded: isJokerIncluded,
                isShuffleEnabled: isShuffleEnabled
            }
        })
        setIsSaveSuccess(true)
    }

    // todo: dialog to confirm game restart
 
    return (
        <Grid container>
            <Grid item xs={12} className="mb-4">
                <Typography color="#ffffff" variant="h6">MultiPlayer Room: {props.roomId}</Typography>
                <Typography color="#ffffff" variant="subtitle2">Manage this room's settings</Typography>
            </Grid>
            {isSaveSuccess && (
                <Grid item xs={12}>
                    <Alert severity="success">New settings have been successfully saved!</Alert>
                </Grid>
            )}
            <Grid item xs={12}>
                <SettingsCard className="flex flex-row items-center justify-between">
                    <div className="ml-4">
                        <Typography color="#ffffff" variant="subtitle1">Joker Included</Typography>
                        <Typography color="#ffffff" variant="caption">Turn on to include 2 jokers</Typography>
                    </div>
                    <Switch className="mr-4" checked={isJokerIncluded} onChange={handleJokerChange} color="primary" inputProps={{ 'aria-label': 'Switch joker settings' }} />
                </SettingsCard>
            </Grid>
            <Grid item xs={12}>
                <SettingsCard className="flex flex-row items-center justify-between">
                    <div className="ml-4">
                        <Typography color="#ffffff" variant="subtitle1">Shuffle Deck</Typography>
                        <Typography color="#ffffff" variant="caption">Turn on to shuffle the cards when loading</Typography>
                    </div>
                    <Switch className="mr-4" checked={isShuffleEnabled} onChange={handleShuffleChange} color="primary" inputProps={{ 'aria-label': 'Switch shuffle settings' }} />
                </SettingsCard>
            </Grid>
            <Grid item xs={12}>
                <div className="flex flex-row items-center justify-end mt-8">
                    <Button onClick={handleCancelClick} variant="contained" className="border border-white border-opacity-25 mr-4 hover:bg-gray-800">Cancel</Button>
                    <Button onClick={handleSettingsSave} variant="contained" className="bg-blue-600 hover:bg-blue-500">Save</Button>
                </div>
            </Grid>
        </Grid>
    )
}