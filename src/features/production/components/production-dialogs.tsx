import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useProduction } from '../context/production-context'
import { Production } from '../data/schema'
import { ProductionActionDialog } from './production-action-dialog'
import { ProductionViewDialog } from './production-view-dialog'

export function ProductionDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProduction()

  const handleClose = () => {
    setOpen(null)
    setCurrentRow(null)
  }

  const currentProduction = currentRow as Production | undefined

  return (
    <>
      <ProductionViewDialog
        open={open === 'view'}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleClose()
        }}
        currentRow={currentProduction}
      />

      <ProductionActionDialog
        open={open === 'add' || open === 'edit'}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleClose()
        }}
        currentRow={currentProduction}
      />

      <AlertDialog
        open={open === 'delete'}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleClose()
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              la producción y eliminará los datos de nuestros servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                console.log('delete', currentRow)
                handleClose()
              }}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
