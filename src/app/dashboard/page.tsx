import { Metadata } from "next";
import { DashboardTemplate } from "../../components/dashboard/DashboardTemplate";
import { actionGetSessionServer } from "@/actions/auth.actions";

export const metadata: Metadata = {
  title: "Dashboard Page - User SS"
}

export default async function DashboardPage() {
  const session = await actionGetSessionServer()

  return (
    <DashboardTemplate session={session} />
  )
}
