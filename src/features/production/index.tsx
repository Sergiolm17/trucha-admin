import { useState } from 'react'
import { IconLayoutGrid, IconTable } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { ProductionDialogs } from './components/production-dialogs'
import { ProductionPrimaryButtons } from './components/production-primary-buttons'
import { ProductionSummary } from './components/production-summary'
import { ProductionTable } from './components/production-table'
import ProductionProvider, { useProduction } from './context/production-context'
import { productions } from './data/data'
import { productionListSchema } from './data/schema'

function ProductionContent() {
  const [viewMode, setViewMode] = useState<'table' | 'summary'>('table')
  const productionList = productionListSchema.parse(productions)

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
              Lista de Producción
            </h2>
            <p className='text-muted-foreground'>
              Administra tu producción y su información aquí.
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={() =>
                setViewMode(viewMode === 'table' ? 'summary' : 'table')
              }
            >
              {viewMode === 'table' ? (
                <IconLayoutGrid className='h-4 w-4' />
              ) : (
                <IconTable className='h-4 w-4' />
              )}
            </Button>
            <ProductionPrimaryButtons />
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {viewMode === 'table' ? (
            <ProductionTable data={productionList} columns={columns} />
          ) : (
            <ProductionSummary data={productionList} />
          )}
        </div>
      </Main>

      <ProductionDialogs />
    </>
  )
}

export default function Production() {
  return (
    <ProductionProvider>
      <ProductionContent />
    </ProductionProvider>
  )
}
