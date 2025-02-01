import { Column } from '@tanstack/react-table'
import {
  IconArrowsSort,
  IconSortAscending,
  IconSortDescending,
  IconFilter,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'

interface SortingLabels {
  asc: string
  desc: string
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  showFilterOption?: boolean
  filterOptions?: { label: string; value: string }[]
  sortingLabels?: SortingLabels
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  showFilterOption = false,
  filterOptions = [],
  sortingLabels,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !showFilterOption) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='-ml-3 h-8 data-[state=open]:bg-accent'
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <IconSortDescending className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === 'asc' ? (
              <IconSortAscending className='ml-2 h-4 w-4' />
            ) : showFilterOption ? (
              <IconFilter className='ml-2 h-4 w-4' />
            ) : (
              <IconArrowsSort className='ml-2 h-4 w-4' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          {column.getCanSort() && (
            <>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <IconSortAscending className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                {sortingLabels?.asc || 'Ascendente'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <IconSortDescending className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                {sortingLabels?.desc || 'Descendente'}
              </DropdownMenuItem>
            </>
          )}
          {showFilterOption && filterOptions.length > 0 && (
            <>
              {column.getCanSort() && <DropdownMenuSeparator />}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <IconFilter className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                  Filtrar
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => column.setFilterValue(undefined)}
                  >
                    Todos
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {filterOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => column.setFilterValue([option.value])}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
