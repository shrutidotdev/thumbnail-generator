import { Home } from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

const items: MenuItem[] = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
]

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent className="bg-gradient-to-br from-orange-400 via-black to-black text-white font-bold">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white font-bold py-20 text-3xl">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        href={item.url}
                        aria-label={`Navigate to ${item.title}`}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <Icon className="w-5 h-5" aria-hidden />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}