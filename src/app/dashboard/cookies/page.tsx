import { Metadata } from "next";
import { CookiesTemplate } from "@/components/dashboard/cookies/CookiesTemplate";


export const metadata:Metadata = {
    title: 'Cookies Page'
}

export default function CookiesPage() {
  return (
    <CookiesTemplate />
  )
}
