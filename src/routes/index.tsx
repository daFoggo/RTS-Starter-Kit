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
  const description = "A modern and scalable React project base powered by TanStack tools (Query, Table, Router) and shadcn/ui. Designed to kickstart the development of clean, fast, and responsive  web applications with best practices built in (or not)."
  
  return (
    <div className="min-h-screen flex flex-col gap-6">
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

    </div>
  )
}
