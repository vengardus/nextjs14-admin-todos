import { ProfileTemplate } from '@/components/dashboard/profile/ProfileTemplate'
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: "Profile Page - User CS"
}

export default function ProfilePage() {
    return (
        <ProfileTemplate />
    )
}
