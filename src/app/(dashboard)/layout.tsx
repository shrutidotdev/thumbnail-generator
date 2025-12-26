import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="w-full min-h-screen" suppressHydrationWarning>
      <div className="flex w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <div className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4 sm:px-6 lg:px-8">
              <SidebarTrigger 
                className="px-3 h-9 text-base text-foreground bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md" 
                aria-label="Toggle sidebar"
              />
            </div>
          </div>
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}