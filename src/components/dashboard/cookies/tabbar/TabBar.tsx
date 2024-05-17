"use client"

import { useState } from "react"
import {setCookie} from "cookies-next"
import { useRouter } from "next/navigation"


interface Props {
    currentTab?: number,
    tabOptions?: number[]
}

export const TabBar = ({ currentTab = 1, tabOptions = [1, 2, 3, 4] }: Props) => {
    const router = useRouter()    
    const [selected, setSelected] = useState(currentTab)

    const onTabSelected = (tab: number) => {
        setSelected(tab)
        setCookie('selectedTab', tab.toString())
        router.refresh()
    }

    return (
        <div
            className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${'grid-cols-' + tabOptions.length}`}
        >
            {
                tabOptions.map(tab => (
                    <div key={tab}>
                        <input
                            type="radio"
                            id={`${tab}`}
                            checked={selected == tab}
                            onChange={() => { }}
                            className="peer hidden"
                        />
                        <label
                            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                            onClick={() => onTabSelected(tab)}
                        >
                            {tab}
                        </label>
                    </div>
                ))
            }

        </div>
    )
}
