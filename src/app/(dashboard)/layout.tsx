import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="w-full h-screen">
      <AppSidebar />
        <SidebarTrigger />
      <main className='flex flex-col items-center justify-center w-full h-screen'>
        {children}
      </main>
    </SidebarProvider>
  )
}