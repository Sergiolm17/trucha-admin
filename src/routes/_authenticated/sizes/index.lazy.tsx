import { createLazyFileRoute } from '@tanstack/react-router'
import Sizes from '@/features/sizes'

export const Route = createLazyFileRoute('/_authenticated/sizes/')({
  component: Sizes,
})
