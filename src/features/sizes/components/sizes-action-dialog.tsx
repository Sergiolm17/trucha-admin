import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Size, sizeSchema } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Size
}

export function SizesActionDialog({ open, onOpenChange, currentRow }: Props) {
  const form = useForm<Size>({
    resolver: zodResolver(sizeSchema),
    defaultValues: currentRow || {
      id: crypto.randomUUID(),
      name: '',
      commonName: '',
      grams: 0,
      type: 'Comercial',
    },
  })

  function onSubmit(data: Size) {
    console.log(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentRow ? 'Editar Talla' : 'Nueva Talla'}
          </DialogTitle>
          <DialogDescription>
            {currentRow
              ? 'Edita los datos de la talla aquí.'
              : 'Ingresa los datos de la nueva talla aquí.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder='Talla 1' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='commonName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Común</FormLabel>
                  <FormControl>
                    <Input placeholder='Extra Grande' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='grams'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gramos</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='250'
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona un tipo' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Comercial'>Comercial</SelectItem>
                      <SelectItem value='Grande'>Grande</SelectItem>
                      <SelectItem value='Tripas'>Tripas</SelectItem>
                      <SelectItem value='Bolas'>Bolas</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type='submit'>
                {currentRow ? 'Guardar Cambios' : 'Crear Talla'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
