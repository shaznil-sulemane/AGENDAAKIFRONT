import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar user={{email: "shaznilmussagysulemane@gmail.com", name: "Shaznil Mussagy Sulemane", avatar: "/favicon.png"}} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}