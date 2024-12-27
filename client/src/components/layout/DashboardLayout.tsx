import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Aside from "./Aside"

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = JSON.parse(localStorage.getItem("user") || '{}');

  return (
    <SidebarProvider>
      <Aside role={user?.role}/>
      <main className="w-full bg-gray-100">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
