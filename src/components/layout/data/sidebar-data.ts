import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
  IconPackageImport,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd, LayoutDashboard, Ruler } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
    hidden: true,
  },
  teams: [
    {
      name: 'Trucha Admin',
      logo: Command,
      plan: 'Vite + TruchaUI',
      hidden: true,
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
      hidden: true,
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
      hidden: true,
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Panel',
          url: '/',
          icon: IconLayoutDashboard,
          hidden: true,
        },
        {
          title: 'Tareas',
          url: '/tasks',
          icon: IconChecklist,
          hidden: true,
        },
        {
          title: 'Clientes',
          url: '/clients',
          icon: IconUsers,
        },
        {
          title: 'Usuarios',
          url: '/users',
          icon: IconUsers,
          hidden: true,
        },
        {
          title: 'Aplicaciones',
          url: '/apps',
          icon: IconPackages,
          hidden: true,
        },
        {
          title: 'Mensajes',
          url: '/chats',
          badge: '3',
          icon: IconMessages,
          hidden: true,
        },
        {
          title: 'Tallas',
          url: '/sizes',
          icon: Ruler,
        },
        {
          title: 'Producción',
          url: '/production',
          icon: IconPackageImport,
        },
        {
          title: 'Ventas',
          url: '/sales',
          icon: IconPackageImport,
        },
      ],
    },
    {
      title: 'Páginas',
      hidden: true,
      items: [
        {
          title: 'Autenticación',
          icon: IconLockAccess,
          items: [
            {
              title: 'Iniciar Sesión',
              url: '/sign-in',
            },
            {
              title: 'Iniciar Sesión (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Registrarse',
              url: '/sign-up',
            },
            {
              title: 'Olvidé mi Contraseña',
              url: '/forgot-password',
            },
            {
              title: 'Código OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errores',
          icon: IconBug,
          items: [
            {
              title: 'No Autorizado',
              url: '/401',
              icon: IconLock,
            },
            {
              title: 'Prohibido',
              url: '/403',
              icon: IconUserOff,
            },
            {
              title: 'No Encontrado',
              url: '/404',
              icon: IconError404,
            },
            {
              title: 'Error del Servidor',
              url: '/500',
              icon: IconServerOff,
            },
            {
              title: 'Error de Mantenimiento',
              url: '/503',
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      title: 'Otros',
      items: [
        {
          title: 'Configuración',
          icon: IconSettings,
          items: [
            {
              title: 'Perfil',
              url: '/settings/profile',
              icon: IconUserCog,
            },
            {
              title: 'Notificaciones',
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'Apariencia',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'Pantalla',
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: 'Centro de Ayuda',
          url: '/help-center',
          icon: IconHelp,
          hidden: true,
        },
      ],
    },
  ],
}
