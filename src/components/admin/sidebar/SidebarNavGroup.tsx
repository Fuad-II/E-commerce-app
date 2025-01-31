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
}

export const SidebarNavGroup = ({ label, items }: SidebarNavGroupProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarNavItem key={item.url} {...item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}