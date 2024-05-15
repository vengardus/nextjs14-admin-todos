"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
    title: string,
    path: string,
    icon: React.ReactNode
}


export const SidebarItem = ({ title, path, icon }: Props) => {
    const currentPath = usePathname()

    return (
        <>
            <li>
                <Link
                    href={path}
                    className={`
                        relative px-4 py-3 flex items-center space-x-4 rounded-xl hover:text-white hover:bg-sky-500
                        ${currentPath == path ? ' text-white bg-gradient-to-r from-sky-800 to-cyan-400' : ''}
                    `}
                >
                    {icon}
                    <span className="-mr-1 font-medium">{title}</span>
                </Link>
            </li>
        </>
    )
}
