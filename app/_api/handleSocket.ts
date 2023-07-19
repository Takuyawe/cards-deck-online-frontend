import { MutableRefObject } from 'react';
import { io, Socket } from 'socket.io-client';
import { Deck } from '../_components/Card/card';

export function createConnection (socketRef: MutableRefObject<Socket | null>, deck: Deck, multiPlayerSettings: Object, roomId: string, roomPassword: string, setRoomIdTakenError: (error: boolean) => void, setCreateSuccess: (error: boolean) => void, router: any) {
    // socketRef.current = io(`http://localhost:8000`)
    // socketRef.current.on("connect", () => console.log("client connected!")) 
    // socketRef.current.emit("roomInfo", {roomId: roomId, password: password})
    if (socketRef.current) {
        socketRef.current?.connect()
        socketRef.current?.emit("createRoom", {roomId: roomId, roomPassword: roomPassword, deck: deck, multiPlayerSettings: multiPlayerSettings}, (error: string | null) => {
            if (error == "This room Id is already taken!") {
                setRoomIdTakenError(true)
            } else {
                setCreateSuccess(true)
                setTimeout(() => {
                    router.push(roomId)
                }, 2000)
            }
        })
        console.log(socketRef.current)
    }
}

export function joinConnection (socketRef: MutableRefObject<Socket | null>, deck: Deck, setDeck: (deck: Deck) => void, roomId: string, roomPassword: string, setRoomIdNotExistError: (error: boolean) => void, setPasswordDoesNotMatchError: (error: boolean) => void, setJoinSuccess: (success: boolean) => void, router: any) {
    if (socketRef.current) {
        socketRef.current?.connect()
        socketRef.current.emit("join", {roomId: roomId, roomPassword: roomPassword}, (error: string | null) => {
            if (error == "Room does not exist!") {
                setPasswordDoesNotMatchError(false)
                setRoomIdNotExistError(true)
            } else if (error == "Password does not match!") {
                setRoomIdNotExistError(false)
                setPasswordDoesNotMatchError(true)
            } else {
                setJoinSuccess(true)
                setTimeout(() => {
                    router.push(roomId)
                }, 2000)
            }
        })
        console.log(socketRef.current)
    }
}