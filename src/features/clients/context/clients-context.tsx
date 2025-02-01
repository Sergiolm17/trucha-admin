import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { clients as initialClients } from '../data/clients'
import { Client } from '../data/schema'

type ClientsDialogType = 'agregar' | 'editar' | 'eliminar'

interface ClientsContextType {
  open: ClientsDialogType | null
  setOpen: (str: ClientsDialogType | null) => void
  currentRow: Client | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Client | null>>
  clients: Client[]
  addClient: (client: Client) => void
  updateClient: (client: Client) => void
  deleteClient: (id: string) => void
}

const ClientsContext = React.createContext<ClientsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function ClientsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ClientsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Client | null>(null)
  const [clients, setClients] = useState<Client[]>(initialClients)

  const addClient = (client: Client) => {
    setClients((prev) => [...prev, client])
  }

  const updateClient = (client: Client) => {
    setClients((prev) =>
      prev.map((item) => (item.id === client.id ? client : item))
    )
  }

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <ClientsContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        clients,
        addClient,
        updateClient,
        deleteClient,
      }}
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
