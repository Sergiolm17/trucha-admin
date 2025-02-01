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
import { useSale } from '../context/sales-context'
import { Sale } from '../data/schema'
import { SaleActionDialog } from './sales-action-dialog'
import { SaleViewDialog } from './sales-view-dialog'

export function SaleDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useSale()

  const handleClose = () => {
    setOpen(null)
    setCurrentRow(null)
  }

  const currentSale = currentRow as Sale | undefined

  return (
    <>
      <SaleActionDialog
        open={open === 'agregar' || open === 'editar'}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleClose()
        }}
        currentRow={currentSale}
      />

      <SaleViewDialog
        open={open === 'ver'}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleClose()
        }}
        currentRow={currentSale}
      />

      <AlertDialog
        open={open === 'eliminar'}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleClose()
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              la venta y eliminará los datos de nuestros servidores.
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
