import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { docsConfig } from "@/config/docs"
import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"


export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const title = "React Starter Kit with TanStack & shadcn/ui"
  const description = "A modern and scalable React project base powered by TanStack tools and shadcn/ui. Designed to kickstart the development of clean, fast, and responsive  web applications with best practices built in (or not)."

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm" className="rounded-md">
            <Link to={docsConfig.mainNav[1].href}>
              Get Started
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </PageActions>
      </PageHeader>
      <div className="container-wrapper relative py-8 md:py-10 lg:py-12">
        <div
          aria-hidden
          className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35% rounded-2xl"
        />
        <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
          <img
            className="bg-background aspect-video relative hidden w-full rounded-2xl dark:block"
            src="https://tailark.com/_next/image?url=%2Fmail2.png&w=3840&q=75"
            alt="app screen"
            width="2700"
            height="1440"
          />
          <img
            className="z-2 border-border/25 aspect-video relative w-full rounded-2xl border dark:hidden"
            src="https://tailark.com/_next/image?url=%2Fmail2-light.png&w=3840&q=75"
            alt="app screen"
            width="2700"
            height="1440"
          />
        </div>
      </div>
    </div>
  )
}
