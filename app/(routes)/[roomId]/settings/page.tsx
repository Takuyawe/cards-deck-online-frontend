"use client"

import { usePathname, useRouter } from "next/navigation"
import { useSocketContext } from "@/app/_context/socket"

import SettingsComponent from "@/app/_components/CircleMenu/Settings/SettingsComponent"

interface Props {
    params: {
        roomId: string
    }
}

export default function SettingsPage ({params: {roomId}}: Props) {
    const router = useRouter()
    const {socketRef} = useSocketContext()

    if (!socketRef.current?.connected) router.push("/")

    return (
        <SettingsComponent roomId={roomId} />
    )
}