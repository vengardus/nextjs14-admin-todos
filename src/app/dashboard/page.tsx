import { getSession } from "@/helpers/auth/session_server";
import { DashboardTemplate } from "../../components/dashboard/DashboardTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Page - User SS"
}

export default async function DashboardPage() {
  const session = await getSession()

  return (
    <DashboardTemplate session={session} />
  )
}
