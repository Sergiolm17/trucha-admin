import { prisma } from '@/lib/prisma'
import { Client } from '@prisma/client'

export async function getClients() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return { data: clients }
  } catch (error) {
    return { error: 'Error al obtener los clientes' }
  }
}

export async function getClientById(id: string) {
  try {
    const client = await prisma.client.findUnique({
      where: { id }
    })
    return { data: client }
  } catch (error) {
    return { error: 'Error al obtener el cliente' }
  }
}

export async function createClient(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const client = await prisma.client.create({
      data
    })
    return { data: client }
  } catch (error) {
    return { error: 'Error al crear el cliente' }
  }
}

export async function updateClient(id: string, data: Partial<Client>) {
  try {
    const client = await prisma.client.update({
      where: { id },
      data
    })
    return { data: client }
  } catch (error) {
    return { error: 'Error al actualizar el cliente' }
  }
}

export async function deleteClient(id: string) {
  try {
    const client = await prisma.client.delete({
      where: { id }
    })
    return { data: client }
  } catch (error) {
    return { error: 'Error al eliminar el cliente' }
  }
} 