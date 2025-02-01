import { LinkProps } from '@tanstack/react-router'

interface User {
  name: string
  email: string
  avatar: string
  hidden: boolean
}

interface Team {
  name: string
  logo: React.ElementType
  plan: string
  hidden?: boolean
}

interface BaseNavItem {
  title: string
  badge?: string
  icon?: React.ElementType
  hidden?: boolean
}

type NavLink = BaseNavItem & {
  url: LinkProps['to']
  items?: never
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] })[]
  url?: never
}

type NavItem = NavCollapsible | NavLink

interface NavGroup {
  title: string
  items: NavItem[]
  hidden?: boolean
}

interface SidebarData {
  user: User
  teams: Team[]
  navGroups: NavGroup[]
}

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink }
