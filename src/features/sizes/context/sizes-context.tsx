import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Size } from '../data/schema'

type SizesDialogType = 'add' | 'edit' | 'delete'

interface SizesContextType {
  open: SizesDialogType | null
  setOpen: (str: SizesDialogType | null) => void
  currentRow: Size | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Size | null>>
}

const SizesContext = React.createContext<SizesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function SizesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<SizesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Size | null>(null)

  return (
    <SizesContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </SizesContext.Provider>
  )
}

export const useSizes = () => {
  const sizesContext = React.useContext(SizesContext)

  if (!sizesContext) {
    throw new Error('useSizes has to be used within <SizesContext.Provider>')
  }

  return sizesContext
}
