import { createContext, useContext, useState } from 'react'
import { Table } from '@tanstack/react-table'
import { Sale } from '../data/schema'

type OpenType = 'agregar' | 'editar' | 'eliminar' | 'ver' | null

interface SaleContextType {
  open: OpenType
  setOpen: (open: OpenType) => void
  currentRow: Sale | null
  setCurrentRow: (row: Sale | null) => void
  table: Table<Sale> | null
  setTable: (table: Table<Sale>) => void
}

interface Props {
  children: React.ReactNode
}

const SaleContext = createContext<SaleContextType | undefined>(undefined)

export default function SaleProvider({ children }: Props) {
  const [open, setOpen] = useState<OpenType>(null)
  const [currentRow, setCurrentRow] = useState<Sale | null>(null)
  const [table, setTable] = useState<Table<Sale> | null>(null)

  return (
    <SaleContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        table,
        setTable,
      }}
    >
      {children}
    </SaleContext.Provider>
  )
}

export function useSale() {
  const context = useContext(SaleContext)
  if (context === undefined) {
    throw new Error('useSale must be used within a SaleProvider')
  }
  return context
}
