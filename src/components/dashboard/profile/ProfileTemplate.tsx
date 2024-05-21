"use client"

import UserInfo from "@/components/auth/UserInfo"
import { useSession } from "next-auth/react"

export const ProfileTemplate = () => {
    const session = useSession()

  return (
    <UserInfo 
        session={session?.data}
        title="User Info CS"
    />
  )
}
