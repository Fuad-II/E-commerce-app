import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Settings, Database, Users } from "lucide-react"
import { Link } from "react-router-dom"

interface AdminLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  {
    title: "Products",
    icon: Database,
    url: "/admin"
  },
  {
    title: "Users",
    icon: Users,
    url: "/admin/users"
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/admin/settings"
  }
]

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1">
          <div className="container">
            <SidebarTrigger />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}