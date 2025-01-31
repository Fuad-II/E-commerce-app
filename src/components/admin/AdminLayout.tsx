import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Settings, Database, Users, Plus, BarChart3, Tags } from "lucide-react"
import { SidebarNavGroup } from "./sidebar/SidebarNavGroup"

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigationGroups = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        icon: BarChart3,
        url: "/admin"
      }
    ]
  },
  {
    label: "Products",
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
    label: "Users",
    items: [
      {
        title: "All Users",
        icon: Users,
        url: "/admin/users"
      }
    ]
  },
  {
    label: "Settings",
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
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200">
          <SidebarContent className="bg-white">
            {navigationGroups.map((group) => (
              <SidebarNavGroup
                key={group.label}
                label={group.label}
                items={group.items}
              />
            ))}
          </SidebarContent>
        </Sidebar>
        <main className="flex-1">
          <div className="container py-6">
            <SidebarTrigger className="mb-4" />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}