import { Link } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

interface SidebarNavItemProps {
  title: string
  icon: LucideIcon
  url: string
}

export const SidebarNavItem = ({ title, icon: Icon, url }: SidebarNavItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link to={url} className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}