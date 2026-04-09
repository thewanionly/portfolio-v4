import { useMobileMenuStore } from './MobileMenu.store';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
} from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import type { NavigationSettingsQueryResult } from '@/lib/sanity/queries';

type NavigationLink = NonNullable<NavigationSettingsQueryResult>['navigationLinks'][number];

export const MobileMenu = ({ links }: { links: NavigationLink[] }) => {
  const { isOpen, toggleIsOpen } = useMobileMenuStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const portalTarget = mounted ? document.getElementById('mobile-menu-root') : null;

  return (
    <Sheet open={isOpen} onOpenChange={toggleIsOpen}>
      <SheetPortal container={portalTarget}>
        <SheetOverlay className="z-40 fixed h-dvh" />
        <SheetContent
          side="top"
          showCloseButton={false}
          className="backdrop-blur-md bg-background/80 p-6 pt-2 absolute"
        >
          {/* Screen-reader-only title & description */}
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          <SheetDescription className="sr-only">Navigation links for mobile menu</SheetDescription>

          <nav>
            <ul className="flex xs:gap-8 gap-6 xs:flex-row flex-col items-center">
              {links.map(({ _key, label, href }) => (
                <a
                  key={_key}
                  href={href}
                  className="text-foreground hover:text-brand"
                  onClick={toggleIsOpen}
                >
                  {label}
                </a>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
};
