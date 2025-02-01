import { z } from 'zod'

const clientStatusSchema = z.union([
  z.literal('activo'),
  z.literal('inactivo'),
  z.literal('pendiente'),
  z.literal('bloqueado'),
])
export type ClientStatus = z.infer<typeof clientStatusSchema>

export const clientSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  company: z.string(),
  status: clientStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Client = z.infer<typeof clientSchema>
export const clientListSchema = z.array(clientSchema) 