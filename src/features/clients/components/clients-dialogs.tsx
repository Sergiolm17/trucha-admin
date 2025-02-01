import { useClients } from '../context/clients-context'
import { ClientsActionDialog } from './clients-action-dialog'
import { ClientsDeleteDialog } from './clients-delete-dialog'

export function ClientsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useClients()
  return (
    <>
      <ClientsActionDialog
        key='client-agregar'
        open={open === 'agregar'}
        onOpenChange={() => setOpen('agregar')}
      />

      {currentRow && (
        <>
          <ClientsActionDialog
            key={`client-editar-${currentRow.id}`}
            open={open === 'editar'}
            onOpenChange={() => {
              setOpen('editar')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ClientsDeleteDialog
            key={`client-eliminar-${currentRow.id}`}
            open={open === 'eliminar'}
            onOpenChange={() => {
              setOpen('eliminar')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
