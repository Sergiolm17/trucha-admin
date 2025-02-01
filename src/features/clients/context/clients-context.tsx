import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Client } from '../data/schema'

type ClientsDialogType = 'add' | 'edit' | 'delete'

interface ClientsContextType {
  open: ClientsDialogType | null
  setOpen: (str: ClientsDialogType | null) => void
  currentRow: Client | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Client | null>>
}

const ClientsContext = React.createContext<ClientsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function ClientsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ClientsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Client | null>(null)

  return (
    <ClientsContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </ClientsContext.Provider>
  )
}

export const useClients = () => {
  const clientsContext = React.useContext(ClientsContext)

  if (!clientsContext) {
    throw new Error('useClients has to be used within <ClientsContext>')
  }

  return clientsContext
}
