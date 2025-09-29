import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router-dom"
import BrowserHeader from "@/components/browser/BrowserHeader"

export default function AppLayout() {//{ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex flex-col gap-4 w-full max-h-[100vh] overflow-y-auto">
        {/* <BrowserHeader /> */}
        <Outlet/>
      </main>
    </SidebarProvider>
  )
}