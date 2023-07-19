"use client";

import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from 'socket.io-client';

export default function Test () {
    // const [socker, setSocket] = useState(null)
    const socketRef = useRef<Socket | null>(null)
    useEffect(() => {
        socketRef.current = io("http://localhost:8000")
        // setSocket(socket)
        socketRef.current.on("connect", () => console.log("client connected!")) 
        
        socketRef.current.emit("myworld", "wow")

        return () => {
            if(socketRef.current) {
                socketRef.current.disconnect()
                console.log("Disconnecting from frontend")
            }
        }
    }, [])
};