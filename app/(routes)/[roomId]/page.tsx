"use client"

import PlayBoard from "@/app/_components/PlayBoard"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSocketContext } from "@/app/_context/socket"


export default function UserRoom ({params}: {params: {roomId: string}}) {
    const router = useRouter()
    const {socketRef} = useSocketContext()

    useEffect(() => {
        if (!socketRef.current?.connected) {
            router.push("/");
        }
    }, [router, socketRef]);

    return (
        <PlayBoard />
    )
}