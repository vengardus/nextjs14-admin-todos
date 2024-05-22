import Image from "next/image"
import Link from "next/link"
import { User } from "@prisma/client"
import { SidebarItem } from "./SidebarItem"
import {
    IoBasketOutline,
    IoBookmarkOutline,
    IoCheckboxOutline, IoCodeOutline, IoListOutline, 
    IoSquareSharp
} from "react-icons/io5"
import { getSession } from "@/helpers/auth/session_server"
import { LogoutButtonCS } from "./LogoutButtonCS"


const menuItems = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <IoBookmarkOutline size={30} />
    },
    {
        title: 'Rest TODOS',
        path: '/dashboard/rest-todos',
        icon: <IoCheckboxOutline size={30} />
    },
    {
        title: 'Server TODOS',
        path: '/dashboard/server-todos',
        icon: <IoListOutline size={30} />
    },
    {
        title: 'Cookies',
        path: '/dashboard/cookies',
        icon: <IoCodeOutline size={30} />
    },
    {
        title: 'Products',
        path: '/dashboard/products',
        icon: <IoBasketOutline size={30} />
    },
    {
        title: 'Profile CS',
        path: '/dashboard/profile',
        icon: <IoSquareSharp size={30} />
    }
]

export const Sidebar = async () => {
    const session = await getSession()
    //const user = session?.user as User
    
    
    const userImage = session
        ? session.user?.image?? ''
        : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
    const userRoles = (session?.user as User).roles?? 'client'

    return (
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] overflow-x-scroll">
            <div>
                <div className="-mx-6 px-6 py-4">
                    {/* TODO: Next/Link hacia dashboard */}
                    <Link href="/dashboard" title="home">
                        {/* Next/Image */}
                        <Image
                            src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
                            className="w-32" alt="tailus logo"
                            width={50}
                            height={50}
                        />
                    </Link>
                </div>

                <div className="mt-8 text-center">
                    {/* Next/Image */}
                    <Image
                        src={userImage}
                        alt="user image"
                        className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                        width={50}
                        height={50}
                        priority={true}
                    />
                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
                        {session?.user?.name}
                    </h5>
                    <span className="hidden text-gray-400 lg:block">{userRoles}</span>
                </div>

                <ul className="space-y-2 tracking-wide mt-8">
                    {
                        menuItems.map(item => (
                            <SidebarItem key={item.title} {...item} />
                        ))
                    }
                </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <LogoutButtonCS />
            </div>
        </aside>
    )
}
