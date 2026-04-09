import { useMobileMenuStore } from './MobileMenu.store';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetPortal,
  SheetTitle,
} from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import type { NavigationSettingsQueryResult } from '@/lib/sanity/queries';

type NavigationLink = NonNullable<NavigationSettingsQueryResult>['navigationLinks'][number];

export const MobileMenu = ({ links }: { links: NavigationLink[] }) => {
  const { isOpen, setIsOpen, closeMenu } = useMobileMenuStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };

    if (mediaQuery.matches) closeMenu();
    mediaQuery.addEventListener('change', handleBreakpointChange);

    return () => mediaQuery.removeEventListener('change', handleBreakpointChange);
  }, [closeMenu]);

  const portalTarget = mounted ? document.getElementById('mobile-menu-root') : null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <SheetPortal container={portalTarget}>
        {isOpen && (
          <div aria-hidden="true" className="fixed inset-0 z-40 bg-black/70" onClick={closeMenu} />
        )}
        <SheetContent
          side="top"
          showCloseButton={false}
          className="backdrop-blur-md bg-background/80 p-6 pt-2 absolute"
        >
          {/* Screen-reader-only title & description */}
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          <SheetDescription className="sr-only">Navigation links for mobile menu</SheetDescription>

          <nav id="mobile-navigation">
            <ul className="flex flex-col items-center gap-6">
              {links.map(({ _key, label, href }) => (
                <a
                  key={_key}
                  href={href}
                  className="text-foreground hover:text-brand"
                  onClick={closeMenu}
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
