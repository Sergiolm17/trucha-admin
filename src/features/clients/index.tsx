import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ClientsDialogs } from './components/clients-dialogs'
import { ClientsPrimaryButtons } from './components/clients-primary-buttons'
import { ClientsTable } from './components/clients-table'
import { columns } from './components/columns'
import ClientsProvider from './context/clients-context'
import { clients } from './data/clients'
import { clientListSchema } from './data/schema'

export default function Clients() {
  // Parse client list
  const clientList = clientListSchema.parse(clients)

  return (
    <ClientsProvider>
      <>
        <Header fixed>
          <Search />
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>

        <Main>
          <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Lista de Clientes
              </h2>
              <p className='text-muted-foreground'>
                Administra tus clientes y su información aquí.
              </p>
            </div>
            <ClientsPrimaryButtons />
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <ClientsTable data={clientList} columns={columns} />
          </div>
        </Main>

        <ClientsDialogs />
      </>
    </ClientsProvider>
  )
}
