import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="w-full h-screen">
      <AppSidebar />
      <SidebarTrigger className="px-5 w-10 h-10 ml-2  text-2xl text-white bg-black hover:bg-black hover:text-white"/>
      <main className='flex flex-col items-center justify-center w-full h-screen'>
        {children}
      </main>
    </SidebarProvider>
  )
}