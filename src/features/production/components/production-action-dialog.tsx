import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconPlus, IconTrash } from '@tabler/icons-react'
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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Production, productionSchema, sizes } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Production
}

const locations = ['Sede A', 'Sede B', 'Sede C']

export function ProductionActionDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const form = useForm<Production>({
    resolver: zodResolver(productionSchema),
    defaultValues: currentRow || {
      id: crypto.randomUUID(),
      date: new Date(),
      location: '',
      details: [
        {
          id: crypto.randomUUID(),
          size: '600gr',
          quantity: 0,
          error_margin: 0,
        },
      ],
      created_at: new Date(),
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'details',
  })

  function onSubmit(data: Production) {
    console.log(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentRow ? 'Editar Producción' : 'Nueva Producción'}
          </DialogTitle>
          <DialogDescription>
            {currentRow
              ? 'Edita los datos de la producción aquí.'
              : 'Ingresa los datos de la nueva producción aquí.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl>
                    <Input
                      type='date'
                      {...field}
                      value={field.value.toISOString().split('T')[0]}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sede</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona una sede' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Label>Detalles</Label>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() =>
                    append({
                      id: crypto.randomUUID(),
                      size: '600gr',
                      quantity: 0,
                      error_margin: 0,
                    })
                  }
                >
                  <IconPlus className='mr-2 h-4 w-4' />
                  Agregar detalle
                </Button>
              </div>
              <div className='flex space-x-8 px-4'>
                <div className='flex-1'>Talla</div>
                <div className='flex-1'>Cantidad</div>
                <div className='flex-1'>Margen de error</div>
                <div className='w-10'></div>
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className='flex space-x-4'>
                  <FormField
                    control={form.control}
                    name={`details.${index}.size`}
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormLabel className='sr-only'>Talla</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Talla' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`details.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormLabel className='sr-only'>Cantidad</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Cantidad'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`details.${index}.error_margin`}
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormLabel className='sr-only'>
                          Margen de error
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Margen de error'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => remove(index)}
                    className='mt-2'
                  >
                    <IconTrash className='h-4 w-4' />
                  </Button>
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button type='submit'>
                {currentRow ? 'Guardar cambios' : 'Crear producción'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
