import { Session } from "next-auth"
import UserInfo from "../auth/UserInfo"


interface Props {
    session: Session | null
}

export const DashboardTemplate = ({ session }: Props) => {
    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <UserInfo
                session={session}
                title="User Info (SS)"
            />
        </div>
    )
}
