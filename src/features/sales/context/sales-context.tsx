import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Sale } from '../data/schema'

type SaleDialogType = 'add' | 'edit' | 'delete'

interface SaleContextType {
  open: SaleDialogType | null
  setOpen: (str: SaleDialogType | null) => void
  currentRow: Sale | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Sale | null>>
}

const SaleContext = React.createContext<SaleContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function SaleProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<SaleDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Sale | null>(null)

  return (
    <SaleContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </SaleContext.Provider>
  )
}

export const useSale = () => {
  const saleContext = React.useContext(SaleContext)

  if (!saleContext) {
    throw new Error('useSale has to be used within <SaleContext>')
  }

  return saleContext
}
