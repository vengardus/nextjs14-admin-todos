import { auth } from "@/auth"
import { Session } from "next-auth"
import Image from "next/image"
import { redirect } from "next/navigation"
import { WidgetItem } from "../dashboard/widgets/WidgetItem"

interface Props {
    session: Session | null
    title?: string
}


export default async function UserInfo({ session, title = 'User Info' }: Props) {
    if (!session) redirect('/api/auth/signin')

    return (
        <WidgetItem title={title}>
            <div className="flex gap-5">
                {
                    session.user?.image
                    &&
                    <Image
                        src={session.user?.image}
                        alt="User Avatar"
                        width={100}
                        height={100}
                    />
                }
                <div className="flex flex-col gap-3">
                    <span>Nombre: {session.user?.name}</span>
                    <span>Email: {session.user?.email}</span>
                </div>
            </div>
        </WidgetItem>
    )
}