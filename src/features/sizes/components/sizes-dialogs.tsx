import { useSizes } from '../context/sizes-context'
import { SizesActionDialog } from './sizes-action-dialog'

export function SizesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useSizes()
  return (
    <>
      <SizesActionDialog
        key='size-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <SizesActionDialog
            key={`size-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
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
