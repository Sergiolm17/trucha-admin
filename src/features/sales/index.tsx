import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { SaleDialogs } from './components/sales-dialogs'
import { SalePrimaryButtons } from './components/sales-primary-buttons'
import { SaleTable } from './components/sales-table'
import SaleProvider from './context/sales-context'
import { sales } from './data/data'
import { saleListSchema } from './data/schema'

export default function Sales() {
  // Parse sale list
  const saleList = saleListSchema.parse(sales)

  return (
    <SaleProvider>
      <>
        <Header fixed>
          <Search />
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown hidden={true} />
          </div>
        </Header>

        <Main>
          <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Lista de Ventas
              </h2>
              <p className='text-muted-foreground'>
                Administra tus ventas y su información aquí.
              </p>
            </div>
            <SalePrimaryButtons />
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <SaleTable data={saleList} columns={columns} />
          </div>
        </Main>

        <SaleDialogs />
      </>
    </SaleProvider>
  )
}
