import { z } from 'zod'

export const productionDetailSchema = z.object({
  id: z.string(),
  size: z.string(),
  quantity: z.number().min(1, 'La cantidad debe ser mayor a 0'),
  error_margin: z.number().min(0, 'El margen de error no puede ser negativo'),
})

export const productionSchema = z.object({
  id: z.string(),
  date: z.date(),
  location: z.string().min(1, 'La sede es requerida'),
  details: z.array(productionDetailSchema),
  created_at: z.date(),
})

export type ProductionDetail = z.infer<typeof productionDetailSchema>
export type Production = z.infer<typeof productionSchema>
export const productionListSchema = z.array(productionSchema) 