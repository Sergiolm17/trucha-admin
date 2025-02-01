import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSizes } from '../context/sizes-context'
import { SizesActionDialog } from './sizes-action-dialog'

export function SizesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, deleteSize } = useSizes()

  const handleDelete = () => {
    if (currentRow) {
      deleteSize(currentRow.id)
      setOpen(null)
      setCurrentRow(null)
    }
  }

  return (
    <>
      <SizesActionDialog
        key='size-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => {
          setOpen(isOpen ? 'add' : null)
          if (!isOpen) setCurrentRow(null)
        }}
      />

      {currentRow && (
        <>
          <SizesActionDialog
            key={`size-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'edit' : null)
              if (!isOpen) setCurrentRow(null)
            }}
            currentRow={currentRow}
          />

          <Dialog
            open={open === 'delete'}
            onOpenChange={(isOpen) => setOpen(isOpen ? 'delete' : null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Eliminar Talla</DialogTitle>
                <DialogDescription>
                  ¿Estás seguro de que deseas eliminar esta talla? Esta acción
                  no se puede deshacer.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant='outline' onClick={() => setOpen(null)}>
                  Cancelar
                </Button>
                <Button variant='destructive' onClick={handleDelete}>
                  Eliminar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  )
}
