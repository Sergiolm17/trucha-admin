import { z } from 'zod'

export const saleDetailSchema = z.object({
  id: z.string(),
  size: z.string(),
  quantity: z.number().min(1, 'La cantidad debe ser mayor a 0'),
  price: z.number().min(0, 'El precio no puede ser negativo'),
})

export const saleSchema = z.object({
  id: z.string(),
  client: z.string().min(1, 'El cliente es requerido'),
  date: z.date(),
  location: z.string().min(1, 'La sede es requerida'),
  total: z.number(),
  status: z.enum(['Pendiente', 'Completado', 'Cancelado']),
  mortality: z.boolean(),
  details: z.array(saleDetailSchema),
  created_at: z.date(),
})

export type SaleDetail = z.infer<typeof saleDetailSchema>
export type Sale = z.infer<typeof saleSchema>
export const saleListSchema = z.array(saleSchema) 