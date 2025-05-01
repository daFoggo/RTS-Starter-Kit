import { Link } from "@tanstack/react-router"

import { siteConfig } from "@/config/site"
import { Icons } from "../common/Icons"
import { ThemeToggle } from "../common/ThemeToggle"
import { Button } from "../ui/button"
import { CommandMenu } from "../ui/command-menu"
import MainNav from "./MainNav"
import MobileNav from "./MobileNav"

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center px-4 md:px-6">
          <MainNav />
          <MobileNav />
          <div className="ml-auto flex items-center justify-end gap-2 flex-1">
            <div className="flex-1 sm:flex-none">
              <CommandMenu />
            </div>
            <nav className="flex items-center gap-0.5">
              <Button asChild variant="ghost" size="icon" className="h-8 w-8 px-0">
                <Link to={siteConfig.links.github} target="_blank" rel="noreferrer">
                  <Icons.gitHub className="size-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
