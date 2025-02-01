import { z } from 'zod'

export const ClientSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'El nombre es requerido'),
  ruc: z.string().min(11, 'El RUC debe tener 11 dígitos').max(11, 'El RUC debe tener 11 dígitos'),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type Client = z.infer<typeof ClientSchema>

export const CreateClientSchema = ClientSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

export const UpdateClientSchema = CreateClientSchema.partial()

export type CreateClient = z.infer<typeof CreateClientSchema>
export type UpdateClient = z.infer<typeof UpdateClientSchema> 