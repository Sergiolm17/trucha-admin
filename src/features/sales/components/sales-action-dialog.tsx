import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { clients, locations, sizes, statuses } from '../data/data'
import { Sale, saleSchema } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Sale
}

export function SaleActionDialog({ open, onOpenChange, currentRow }: Props) {
  const form = useForm<Sale>({
    resolver: zodResolver(saleSchema),
    defaultValues: currentRow || {
      id: crypto.randomUUID(),
      client: '',
      date: new Date(),
      location: '',
      total: 0,
      status: 'Pendiente',
      mortality: false,
      details: [
        {
          id: crypto.randomUUID(),
          size: '',
          quantity: 0,
          price: 0,
        },
      ],
      created_at: new Date(),
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'details',
  })

  function onSubmit(data: Sale) {
    console.log(data)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle>{currentRow ? 'Editar Venta' : 'Nueva Venta'}</SheetTitle>
          <SheetDescription>
            {currentRow
              ? 'Edita los datos de la venta aquí.'
              : 'Ingresa los datos de la nueva venta aquí.'}
            Haz clic en guardar cuando hayas terminado.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id='sales-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-6 overflow-y-auto'
          >
            <div className='space-y-6 pr-6'>
              <FormField
                control={form.control}
                name='client'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona un cliente' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client} value={client}>
                            {client}
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
                name='date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        {...field}
                        value={field.value.toISOString().split('T')[0]}
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
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

              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona un estado' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
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
                name='mortality'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Mortalidad</FormLabel>
                    </div>
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
                        size: '',
                        quantity: 0,
                        price: 0,
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
                  <div className='flex-1'>Precio</div>
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
                      name={`details.${index}.price`}
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <FormLabel className='sr-only'>Precio</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder='Precio'
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
            </div>
          </form>
        </Form>

        <SheetFooter className='gap-2 border-t pt-4'>
          <SheetClose asChild>
            <Button variant='outline'>Cancelar</Button>
          </SheetClose>
          <Button form='sales-form' type='submit'>
            {currentRow ? 'Guardar cambios' : 'Crear venta'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
