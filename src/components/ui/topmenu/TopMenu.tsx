import Link from "next/link"
import { getCookiesCart } from "@/helpers/cookies/cookies_server"
import type { ICart } from "@/interface/shopping_cart.interface"
import { CiChat1, CiMenuBurger, CiSearch, CiShoppingBasket } from "react-icons/ci"


const getTotalCookieCart = () => {
    const cookieCart: ICart = getCookiesCart()
    const itemCount = Object.values(cookieCart).reduce((acumuladr, actual) => acumuladr + actual, 0)

    return itemCount
}

export const TopMenu = () => {
    const totalItems = getTotalCookieCart()

    return (
        <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">

            <div className="px-6 flex items-center justify-between space-x-4">
                <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>
                <button className="w-12 h-16 -mr-2 border-r lg:hidden">
                    <CiMenuBurger size={30} />
                </button>
                <div className="flex space-x-2">

                    <div hidden className="md:block">
                        <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                            <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                <CiSearch />
                            </span>
                            <input type="search" name="leadingIcon" id="leadingIcon" placeholder="Search here" className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
                        </div>
                    </div>

                    <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
                        <CiSearch />
                    </button>
                    <Link href={'/dashboard/cart'} className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                        <CiChat1 size={25} />
                    </Link>
                    <button className="flex gap-2 px-1 items-center justify-center w-15 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                        {
                            totalItems > 0
                            && <span className="text-sm font-bold text-blue-700">{totalItems}</span>
                        }
                        <CiShoppingBasket size={25} />
                    </button>
                </div>
            </div>
        </div>
    )
}
