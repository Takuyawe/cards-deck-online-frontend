// import { Grid, TextField } from '@mui/material';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { useRef, useState } from 'react';
// import styled from "styled-components"
// import { io, Socket } from 'socket.io-client';

// import { createConnection, joinConnection } from '@/app/_api/handleSocket';
// import { useSocketContext } from '@/app/_context/socket';

// const MainBox = styled(Box)`
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 400;
//     height: 300;
//     /* border: 2px solid #000; */
//     box-shadow: 24;
// `

// const MainButton = styled(Button)`
//     font-size: 0.8rem;
//     color: #FFFFFF;
//     border: 2px solid #144D00;
//     border-radius: 25px;
//     width: 9rem;
//     height: 2.5rem;
// `

// const MultiPlayerModeText = styled(Typography)`
//     font-size: 1.75rem;
// `

// const MainTextField = styled(TextField)`
//     border: 2px solid #144D00;
//     .MuiInputBase-input {
//         color: #FFFFFF;
//     }
//     .MuiOutlinedInput-root {
//         &.Mui-focused fieldset {
//             border-color: #FFFFFF;
//         }
//     }
// `

// export default function MultiPlayerComponent () {
//     const [isModeSelected, setIsModeSelected] = useState(false)
//     const [isJoinRoomSelected, setIsJoinRoomSelected] = useState(false)
//     const [isCreateRoomSelected, setIsCreateRoomSelected] = useState(false)
//     const roomIdRef = useRef<HTMLInputElement>()
//     const passwordRef = useRef<HTMLInputElement>()
//     const {socketRef, deck, setDeck, isRoomCreated, setIsRoomCreated, roomId, setRoomId, roomPassword, setRoomPassword} = useSocketContext()
//     const router = useRouter()

//     function handleCreateClick () {
//         setIsModeSelected(true)
//         setIsCreateRoomSelected(true)
//     }

//     function handleJoinClick () {
//         setIsModeSelected(true)
//         setIsJoinRoomSelected(true)
//     }
    
//     function handleCreateRoom () {
//         const roomId = roomIdRef.current?.value
//         const password = passwordRef.current?.value
//         if (roomId && password) {
//             // setRoomId(roomId)
//             // setRoomPassword(password)
//             createConnection(socketRef, deck, roomId, password, isRoomCreated, setIsRoomCreated)
//             router.push(roomId)
//         }
//     }

//     function handleJoinRoom () {
//         const roomId = roomIdRef.current?.value
//         const password = passwordRef.current?.value
//         if (roomId && password) {
//             joinConnection(socketRef, deck, setDeck, roomId, password)
//             router.push(roomId)
//         }
//     }

//     return (
//         <MainBox>
//             <Image src="/modal_image.png" alt="modal image" width={400} height={300} />
//             <div style={{position: "absolute", top: "7%", textAlign: "center", width: 400, height: 200}}>
//                 {!isModeSelected && (
//                     <Grid container>
//                         <Grid item xs={12} sx={{marginBottom: "3rem"}}>
//                             <MultiPlayerModeText>Multiplayer Mode</MultiPlayerModeText>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Grid container justifyContent="center" alignItems="center" spacing={4}>
//                                 <Grid item>
//                                     <MainButton onClick={handleJoinClick} variant='outlined'>Join a room</MainButton>
//                                 </Grid>
//                                 <Grid item>
//                                     <MainButton onClick={handleCreateClick} variant='outlined'>Create a room</MainButton>
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                     </Grid>           
//                 )}
//                 {isJoinRoomSelected && (
//                     <Grid container>
//                         <Grid item xs={12} sx={{marginBottom: "1.75rem"}}>
//                             <MultiPlayerModeText>Join a room</MultiPlayerModeText>
//                         </Grid>
//                         <Grid item xs={12} sx={{marginBottom: "1.75rem"}}>
//                             <Grid container justifyContent="center" alignItems="center" spacing={2}>
//                                 <Grid item>
//                                     <MainTextField inputRef={roomIdRef} inputProps={{sx: {height: 7, width: 130}}} label="Room ID" variant='outlined' />
//                                 </Grid>
//                                 <Grid item>
//                                     <MainTextField inputRef={passwordRef} inputProps={{sx: {height: 7, width: 130}}} label="Password" variant='outlined' />
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <MainButton onClick={handleJoinRoom} variant='outlined'>Join</MainButton>
//                         </Grid>
//                     </Grid>
//                 )}
//                 {isCreateRoomSelected && (
//                     <Grid container>
//                         <Grid item xs={12} sx={{marginBottom: "1.75rem"}}>
//                             <MultiPlayerModeText>Create a room</MultiPlayerModeText>
//                         </Grid>
//                         <Grid item xs={12} sx={{marginBottom: "1.75rem"}}>
//                             <Grid container justifyContent="center" alignItems="center" spacing={2}>
//                                 <Grid item>
//                                     <MainTextField inputRef={roomIdRef} inputProps={{sx: {height: 7, width: 130}}} label="Room ID" variant='outlined' />
//                                 </Grid>
//                                 <Grid item>
//                                     <MainTextField inputRef={passwordRef} inputProps={{sx: {height: 7, width: 130}}} label="Password" variant='outlined' />
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <MainButton onClick={handleCreateRoom} variant='outlined'>Create</MainButton>
//                         </Grid>
//                     </Grid>
//                 )}
//             </div>
//         </MainBox>
//     )
// }