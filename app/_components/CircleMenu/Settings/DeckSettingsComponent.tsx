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
    roomId?: string,
    isJokerIncluded: boolean,
    setIsJokerIncluded: React.Dispatch<React.SetStateAction<boolean>>,
    isShuffleEnabled: boolean,
    setIsShuffleEnabled: React.Dispatch<React.SetStateAction<boolean>>,
    isSaveSuccess: boolean,
}

export default function DeckSettingsComponent (props: Props) {

    const handleJokerChange = () => {
        props.setIsJokerIncluded(!props.isJokerIncluded)
    }

    const handleShuffleChange = () => {
        props.setIsShuffleEnabled(!props.isShuffleEnabled)
    }

    
 
    return (
        <Grid container>
            <Grid item xs={12} className="mb-4">
                <Typography color="#ffffff" variant="h6">Game</Typography>
                <Typography color="#ffffff" variant="subtitle2">Manage this room's game settings</Typography>
            </Grid>
            {props.isSaveSuccess && (
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
                    <Switch className="mr-4" checked={props.isJokerIncluded} onChange={handleJokerChange} color="primary" inputProps={{ 'aria-label': 'Switch joker settings' }} />
                </SettingsCard>
            </Grid>
            <Grid item xs={12}>
                <SettingsCard className="flex flex-row items-center justify-between">
                    <div className="ml-4">
                        <Typography color="#ffffff" variant="subtitle1">Shuffle Deck</Typography>
                        <Typography color="#ffffff" variant="caption">Turn on to shuffle the cards when loading</Typography>
                    </div>
                    <Switch className="mr-4" checked={props.isShuffleEnabled} onChange={handleShuffleChange} color="primary" inputProps={{ 'aria-label': 'Switch shuffle settings' }} />
                </SettingsCard>
            </Grid>
        </Grid>
    )
}