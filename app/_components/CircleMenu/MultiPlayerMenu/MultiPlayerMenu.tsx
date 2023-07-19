import { Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRef, useState } from 'react';
import styled from "styled-components"

import { createConnection, joinConnection } from '@/app/_api/handleSocket';
import { useSocketContext } from '@/app/_context/socket';

const MainBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    /* border: 2px solid #000; */
    box-shadow: 0px 0px 24px 0px rgba(0,0,0,0.75);`

const MainButton = styled(Button)`
    font-size: 0.8rem;
    color: #FFFFFF;
    border: 2px solid #144D00;
    border-radius: 25px;
    width: 8rem;
    height: 2.5rem;
`

const MultiPlayerModeText = styled(Typography)`
    font-size: 1.75rem;
`

const MainTextField = styled(TextField)`
    border: 2px solid #144D00;
    .MuiInputBase-input {
        color: #FFFFFF;
    }
    .MuiOutlinedInput-root {
        &.Mui-focused fieldset {
            border-color: #FFFFFF;
        }
    }
`

export default function MultiPlayerComponent () {
    const roomIdRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const [createSuccess, setCreateSuccess] = useState<boolean>(false)
    const [roomIdTakenError, setRoomIdTakenError] = useState<boolean>(false)
    const [roomIdNotExistError, setRoomIdNotExistError] = useState<boolean>(false)
    const [passwordDoesNotMatchError, setPasswordDoesNotMatchError] = useState<boolean>(false)
    const [joinSuccess, setJoinSuccess] = useState<boolean>(false)
    const {socketRef, deck, setDeck, multiPlayerSettings} = useSocketContext()
    const router = useRouter()
    
    function handleCreateRoom () {
        const roomId = roomIdRef.current?.value
        const password = passwordRef.current?.value
        if (roomId && password) {
            createConnection(socketRef, deck, multiPlayerSettings, roomId, password, setRoomIdTakenError, setCreateSuccess, router)
        }
    }

    function handleJoinRoom () {
        const roomId = roomIdRef.current?.value
        const password = passwordRef.current?.value
        if (roomId && password) {
            joinConnection(socketRef, deck, setDeck, roomId, password, setRoomIdNotExistError, setPasswordDoesNotMatchError, setJoinSuccess, router)
        }
    }

    return (
        <MainBox>
            <Image src="/modal_image.png" alt="modal image" width={400} height={400} unoptimized />
            <div style={{position: "absolute", top: "7%", textAlign: "center", width: 400, height: 380}}>
                <Grid container>
                    <Grid item xs={12} sx={{marginBottom: "1.75rem"}}>
                        <MultiPlayerModeText>Multiplayer Mode</MultiPlayerModeText>
                    </Grid>
                    {roomIdTakenError && (
                        <Grid container alignItems="center" justifyContent="center">
                            <Grid item xs={8} sx={{marginBottom: "1.75rem"}}>
                                <Alert variant='standard' severity='error'>This room ID is already taken!</Alert>
                            </Grid>
                        </Grid>
                    )}
                    {roomIdNotExistError && (
                        <Grid container alignItems="center" justifyContent="center">
                            <Grid item xs={8} sx={{marginBottom: "1.75rem"}}>
                                <Alert variant='standard' severity='error'>Room ID does not exist!</Alert>
                            </Grid>
                        </Grid>
                    )}
                    {passwordDoesNotMatchError && (
                        <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={8} sx={{marginBottom: "1.75rem"}}>
                            <Alert variant='standard' severity='error'>Password does not match!</Alert>
                        </Grid>
                    </Grid>
                    )}
                    {createSuccess && (
                        <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={8} sx={{marginBottom: "1.75rem"}}>
                            <Alert variant='standard' severity='success'>Creating a room!</Alert>
                        </Grid>
                    </Grid>
                    )}
                    {joinSuccess && (
                        <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={8} sx={{marginBottom: "1.75rem"}}>
                            <Alert variant='standard' severity='success'>Joining a room!</Alert>
                        </Grid>
                    </Grid>
                    )}
                    <Grid item xs={12} sx={{marginBottom: "1.5rem"}}>
                        <MainTextField size='small' inputRef={roomIdRef} inputProps={{sx: { width: 180}}} InputLabelProps={{ style: { color: '#fff' } }} label="Room ID" variant='outlined' />
                    </Grid>
                    <Grid item xs={12} sx={{marginBottom: "1.75rem"}}>
                        <MainTextField size='small' inputRef={passwordRef} inputProps={{sx: { width: 180}}} InputLabelProps={{ style: { color: '#fff' } }} label="Password" variant='outlined' />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" spacing={4}>
                            <Grid item>
                                <MainButton onClick={handleJoinRoom} variant='outlined'>Join</MainButton>
                            </Grid>
                            <Grid item>
                                <MainButton onClick={handleCreateRoom} variant='outlined'>Create</MainButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </MainBox>
    )
}