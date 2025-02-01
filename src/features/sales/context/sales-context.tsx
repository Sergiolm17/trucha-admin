import React, { useState } from 'react'
import { createContext, useContext } from 'react'
import { Table } from '@tanstack/react-table'
import useDialogState from '@/hooks/use-dialog-state'
import { Sale } from '../data/schema'

type OpenType = 'agregar' | 'editar' | 'eliminar' | null

interface SaleContextType {
  open: OpenType
  setOpen: (open: OpenType) => void
  currentRow: Sale | null
  setCurrentRow: (row: Sale | null) => void
  table: Table<Sale> | null
  setTable: (table: Table<Sale>) => void
}

const SaleContext = createContext<SaleContextType | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

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
