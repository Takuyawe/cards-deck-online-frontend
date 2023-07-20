"use client"

import React, { useState, ReactNode, createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from 'socket.io-client';

import { Deck } from "../_components/Card/card";

interface MultiPlayerSettings {
    game: {
        isJokerIncluded: boolean,
        isShuffleEnabled: boolean
    }
}

interface SingleModeSettings {
    theme: {
        tableColor: string,
        cardColor: string
    },
    account: {
        userName: string,
        password: string,
        createdRooms: string[]
    }
}

const defaultMultiPlayerSettings: MultiPlayerSettings = {
    game: {
        isJokerIncluded: false,
        isShuffleEnabled: true
    }
}

const defaultSingleModeSettings: SingleModeSettings = {
    theme: {
        tableColor: "green",
        cardColor: "blue"
    },
    account: {
        userName: "",
        password: "",
        createdRooms: []
    }
}

interface ContextProps {
    socketRef: React.MutableRefObject<Socket | null>
    deck: Deck
    setDeck: React.Dispatch<React.SetStateAction<Deck>>
    multiPlayerSettings: MultiPlayerSettings
    setMultiPlayerSettings: React.Dispatch<React.SetStateAction<MultiPlayerSettings>>
    singleModeSettings: SingleModeSettings
    setSingleModeSettings: React.Dispatch<React.SetStateAction<SingleModeSettings>>
    isDeckBoxVisible: boolean
    setIsDeckBoxVisible: React.Dispatch<React.SetStateAction<boolean>>
    
}

const SocketContext = createContext<ContextProps | undefined>(undefined)

export const SocketContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const socketRef = useRef<Socket | null>(null)
    const [multiPlayerSettings, setMultiPlayerSettings] = useState(defaultMultiPlayerSettings)
    const [singleModeSettings, setSingleModeSettings] = useState(defaultSingleModeSettings)
    const [deck, setDeck] = useState(new Deck().shuffle());
    const [isDeckBoxVisible, setIsDeckBoxVisible] = useState(true)


    useEffect(() => {
        socketRef.current = io("https://cards-deck-online-8a294773806f.herokuapp.com", {autoConnect: false})
        // socketRef.current = io("http://localhost:8000", {autoConnect: false})

        return () => {
            socketRef.current?.disconnect()
            console.log("disconnected")
        }
    }, [])

    return (
        <SocketContext.Provider value={{socketRef, deck, setDeck, multiPlayerSettings, setMultiPlayerSettings, singleModeSettings, setSingleModeSettings, isDeckBoxVisible, setIsDeckBoxVisible}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = () => {
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error("useSocketContext must be used within a SocketContextProvider")
    }
    return context
}