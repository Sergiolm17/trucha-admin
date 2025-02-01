import { IconBuilding, IconUser } from '@tabler/icons-react'
import { ClientStatus } from './schema'

export const clientStatusTypes = new Map<ClientStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['pending', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'blocked',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const clientTypes = [
  {
    label: 'Individual',
    value: 'individual',
    icon: IconUser,
  },
  {
    label: 'Company',
    value: 'company',
    icon: IconBuilding,
  },
] as const
