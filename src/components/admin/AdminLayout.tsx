import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Settings, Database, Users, Plus, Image, Text, Package, BarChart3, Tags } from "lucide-react"
import { Link } from "react-router-dom"

interface AdminLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    url: "/admin"
  },
  {
    group: "Products",
    items: [
      {
        title: "All Products",
        icon: Database,
        url: "/admin/products"
      },
      {
        title: "Add New",
        icon: Plus,
        url: "/admin/products/new"
      },
      {
        title: "Categories",
        icon: Tags,
        url: "/admin/products/categories"
      }
    ]
  },
  {
    group: "Users",
    items: [
      {
        title: "All Users",
        icon: Users,
        url: "/admin/users"
      }
    ]
  },
  {
    group: "Settings",
    items: [
      {
        title: "General",
        icon: Settings,
        url: "/admin/settings"
      }
    ]
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
                {menuItems.map((item, index) => (
                  item.group ? (
                    <div key={index} className="space-y-2">
                      <SidebarGroupLabel>{item.group}</SidebarGroupLabel>
                      <SidebarMenu>
                        {item.items?.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <Link to={subItem.url} className="flex items-center gap-2">
                                <subItem.icon className="h-4 w-4" />
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </div>
                  ) : (
                    <SidebarMenu key={index}>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link to={item.url} className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  )
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1">
          <div className="container py-6">
            <SidebarTrigger />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}