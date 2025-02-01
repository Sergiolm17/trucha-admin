import { z } from 'zod'

export const sizeSchema = z.object({
  id: z.string(),
  name: z.string(),
  commonName: z.string(),
  grams: z.number(),
  type: z.enum(['Comercial', 'Grande', 'Tripas', 'Bolas'])
})

export const sizeListSchema = z.array(sizeSchema)

export type Size = z.infer<typeof sizeSchema>
export type SizeList = z.infer<typeof sizeListSchema> 