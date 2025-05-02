
import SiteFooter from '@/components/layout/SiteFooter'
import SiteHeader from '@/components/layout/SiteHeader'
import { Toaster } from '@/components/ui/sonner'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const queryClient = new QueryClient()


export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
      <Toaster richColors />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
})
