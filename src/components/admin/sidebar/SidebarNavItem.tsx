import { Link } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

interface SidebarNavItemProps {
  title: string
  icon: LucideIcon
  url: string
  isActive: boolean
}

export const SidebarNavItem = ({ title, icon: Icon, url, isActive }: SidebarNavItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link 
          to={url} 
          className="flex items-center gap-2 w-full"
        >
          <Icon className="h-4 w-4" />
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}