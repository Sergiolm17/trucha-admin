import { DataTable } from '@/components/ui/data-table'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { SizesDialogs } from './components/sizes-dialogs'
import { SizesPrimaryButtons } from './components/sizes-primary-buttons'
import SizesProvider, { useSizes } from './context/sizes-context'
import { sizeListSchema } from './data/schema'

function SizesContent() {
  const { sizes } = useSizes()
  const sizeList = sizeListSchema.parse(sizes)

  return (
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
              Lista de Tallas
            </h2>
            <p className='text-muted-foreground'>
              Administra las tallas y sus especificaciones aquí.
            </p>
          </div>
          <SizesPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={sizeList} columns={columns} />
        </div>
      </Main>

      <SizesDialogs />
    </>
  )
}

export default function Sizes() {
  return (
    <SizesProvider>
      <SizesContent />
    </SizesProvider>
  )
}
