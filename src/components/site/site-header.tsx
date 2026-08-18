import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ArrowNE from "@/assets/svgs/doodle-icons/arrow-ne.svg?react";
import Menu from "@/assets/svgs/doodle-icons/menu.svg?react";
import LuxeVenturesFullLogo from "@/assets/svgs/luxe-ventures-full-logo.svg?react";
import LuxeVenturesWordmark from "@/assets/svgs/luxe-ventures-wordmark.svg?react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationLinks } from "@/data/content";
import { useIsMobile } from "@/lib/use-is-mobile";
import { ThemeToggle } from "./theme-toggle";

const linkClass =
  "font-body text-[10px] text-brand-text/75 uppercase tracking-[0.2em] transition-colors hover:text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-detail focus-visible:ring-offset-4 focus-visible:ring-offset-brand-bg";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const router = useRouter();

  useEffect(() => {
    // Subscribe to navigation resolution
    const unsubscribe = router.subscribe("onResolved", (event) => {
      // You have granular access to what changed:
      // event.hashChanged, event.pathChanged, event.hrefChanged
      if (event.hashChanged || event.hrefChanged || event.pathChanged) {
        setOpen(false); // Close the mobile menu when the route changes
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <header className="sticky top-0 z-40 border-brand-text/10 border-b bg-brand-bg/75 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-5 md:h-20 lg:h-16 xl:h-20 xl:px-10">
        <Link to="." hash="top" aria-label="Luxe Ventures home">
          <LuxeVenturesFullLogo className="w-20 text-brand-detail xl:w-24" />
        </Link>
        {!isMobile ? (
          <nav className="flex items-center gap-9" aria-label="Primary navigation">
            {navigationLinks.map((link) => (
              <Link to="." hash={link.href} className={linkClass} key={link.href}>
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <Button
              nativeButton={false}
              render={<Link to="." hash="contact" />}
              className="h-10 rounded-none border border-brand-text bg-transparent px-5 font-body text-[10px] text-brand-text uppercase tracking-[0.2em] shadow-none transition-all duration-500 hover:bg-brand-detail hover:text-brand-text"
            >
              Begin a brief <ArrowNE className="ml-2 w-3.5" />
            </Button>
          </nav>
        ) : (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-none"
                  aria-label="Open navigation"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(86vw,22rem)] border-brand-detail/60 bg-brand-bg px-6 pt-14"
            >
              <SheetHeader className="p-0">
                <Link to="." hash="top" aria-label="Luxe Ventures home">
                  <LuxeVenturesWordmark className="w-32 text-brand-detail" />
                </Link>
                <SheetDescription className="font-body text-brand-text/55 text-xs">
                  Event design, thoughtfully considered.
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-10 flex flex-col gap-6" aria-label="Mobile navigation">
                {navigationLinks.map((link) => (
                  <Link to="." hash={link.href} className={linkClass} key={link.href}>
                    {link.label}
                  </Link>
                ))}
                <ThemeToggle className="mt-2 self-start" />
                <Button
                  nativeButton={false}
                  render={<Link to="." hash="contact" />}
                  className="mt-3 h-12 w-full rounded-none border border-brand-text bg-brand-text font-body text-[10px] text-brand-bg uppercase tracking-[0.2em] shadow-none hover:bg-brand-detail hover:text-brand-text"
                >
                  Begin a brief <ArrowNE className="ml-2 w-3.5" />
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
}
