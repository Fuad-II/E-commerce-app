import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar"
import { SidebarNavItem } from "./SidebarNavItem"
import { LucideIcon } from "lucide-react"

interface NavItem {
  title: string
  icon: LucideIcon
  url: string
}

interface SidebarNavGroupProps {
  label: string
  items: NavItem[]
  currentPath: string
}

export const SidebarNavGroup = ({ label, items, currentPath }: SidebarNavGroupProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarNavItem 
              key={item.url} 
              {...item} 
              isActive={currentPath === item.url}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}