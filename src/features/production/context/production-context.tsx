import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Production } from '../data/schema'

type ProductionDialogType = 'add' | 'edit' | 'delete' | 'view'

interface ProductionContextType {
  open: ProductionDialogType | null
  setOpen: (str: ProductionDialogType | null) => void
  currentRow: Production | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Production | null>>
}

const ProductionContext = React.createContext<ProductionContextType | null>(
  null
)

interface Props {
  children: React.ReactNode
}

export default function ProductionProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ProductionDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Production | null>(null)

  return (
    <ProductionContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </ProductionContext.Provider>
  )
}

export const useProduction = () => {
  const productionContext = React.useContext(ProductionContext)

  if (!productionContext) {
    throw new Error('useProduction has to be used within <ProductionContext>')
  }

  return productionContext
}
