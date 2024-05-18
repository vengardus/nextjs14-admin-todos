import { cookies } from "next/headers"
import { TabBar } from "./tabbar/TabBar"

export const CookiesTemplate = () => {
  const cookieStore = cookies()
  const cookieTab = cookieStore.get('selectedTab')?.value ?? '1'

  return (
    <div className="w-full flex">

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 w-full">
        
        <div className="flex flex-col mb-3">
          <span className="text-3xl">TabBars</span>
          <TabBar currentTab={+cookieTab} />
        </div>

      </div>
    </div>
  )
}
