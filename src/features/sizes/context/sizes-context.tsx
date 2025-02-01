import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Size } from '../data/schema'
import { sizes as initialSizes } from '../data/sizes'

type SizesDialogType = 'add' | 'edit' | 'delete'

interface SizesContextType {
  open: SizesDialogType | null
  setOpen: (str: SizesDialogType | null) => void
  currentRow: Size | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Size | null>>
  sizes: Size[]
  addSize: (size: Size) => void
  updateSize: (size: Size) => void
  deleteSize: (id: string) => void
}

const SizesContext = React.createContext<SizesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function SizesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<SizesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Size | null>(null)
  const [sizes, setSizes] = useState<Size[]>([...initialSizes])

  const addSize = (size: Size) => {
    setSizes((prev) => [...prev, size])
  }

  const updateSize = (updatedSize: Size) => {
    setSizes((prev) =>
      prev.map((size) => (size.id === updatedSize.id ? updatedSize : size))
    )
  }

  const deleteSize = (id: string) => {
    setSizes((prev) => prev.filter((size) => size.id !== id))
  }

  return (
    <SizesContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        sizes,
        addSize,
        updateSize,
        deleteSize,
      }}
    >
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
