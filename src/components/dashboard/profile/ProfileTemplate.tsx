"use client"

import UserInfo from "@/components/auth/UserInfo"
import { useSession } from "next-auth/react"

export const ProfileTemplate = () => {
  const session = useSession()

  if (session.status == 'loading')
    return <div>Cargando...</div>

  return (
    <UserInfo
      session={session.data}
      title="User Info CS"
    />
  )
}
