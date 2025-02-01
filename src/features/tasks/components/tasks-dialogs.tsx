import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useTasks } from '../context/tasks-context'
import { TasksImportDialog } from './tasks-import-dialog'
import { TasksMutateDrawer } from './tasks-mutate-drawer'

export function TasksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTasks()
  return (
    <>
      <TasksMutateDrawer
        key='task-crear'
        open={open === 'crear'}
        onOpenChange={() => setOpen('crear')}
      />

      <TasksImportDialog
        key='tasks-importar'
        open={open === 'importar'}
        onOpenChange={() => setOpen('importar')}
      />

      {currentRow && (
        <>
          <TasksMutateDrawer
            key={`task-actualizar-${currentRow.id}`}
            open={open === 'actualizar'}
            onOpenChange={() => {
              setOpen('actualizar')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key='task-eliminar'
            destructive
            open={open === 'eliminar'}
            onOpenChange={() => {
              setOpen('eliminar')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
              toast({
                title: 'La siguiente tarea ha sido eliminada:',
                description: (
                  <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                    <code className='text-white'>
                      {JSON.stringify(currentRow, null, 2)}
                    </code>
                  </pre>
                ),
              })
            }}
            className='max-w-md'
            title={`¿Eliminar esta tarea: ${currentRow.id}?`}
            desc={
              <>
                Estás a punto de eliminar una tarea con el ID{' '}
                <strong>{currentRow.id}</strong>. <br />
                Esta acción no se puede deshacer.
              </>
            }
            confirmText='Eliminar'
          />
        </>
      )}
    </>
  )
}
