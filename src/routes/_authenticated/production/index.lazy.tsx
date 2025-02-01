import { createLazyFileRoute } from '@tanstack/react-router'
import Production from '@/features/production'

export const Route = createLazyFileRoute('/_authenticated/production/')({
  component: Production,
})
