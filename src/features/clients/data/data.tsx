import { IconBuilding, IconUser } from '@tabler/icons-react'
import { ClientStatus } from './schema'

export const clientStatusTypes = new Map<ClientStatus, string>([
  ['activo', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactivo', 'bg-neutral-300/40 border-neutral-300'],
  ['pendiente', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'bloqueado',
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
    label: 'Empresa',
    value: 'company',
    icon: IconBuilding,
  },
] as const
