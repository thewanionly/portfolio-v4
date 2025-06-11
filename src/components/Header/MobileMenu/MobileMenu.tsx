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

interface NavigationLink {
  label: string;
  href: string;
}

const navigationLinks: NavigationLink[] = [
  {
    label: 'About',
    href: '#about',
  },
  {
    label: 'Skills',
    href: '#skills',
  },
  {
    label: 'Projects',
    href: '#projects',
  },
  {
    label: 'Contact',
    href: '#contact',
  },
];

export const MobileMenu = () => {
  const { isOpen, toggleIsOpen } = useMobileMenuStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const portalTarget = mounted ? document.getElementById('mobile-menu-root') : null;

  return (
    <Sheet open={isOpen} onOpenChange={toggleIsOpen}>
      <SheetPortal container={portalTarget}>
        <SheetOverlay className="z-40 absolute h-dvh" />
        <SheetContent side="top" showCloseButton={false} className="p-6 pt-2 absolute">
          {/* Screen-reader-only title & description */}
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          <SheetDescription className="sr-only">Navigation links for mobile menu</SheetDescription>

          <nav>
            <ul className="flex xs:gap-8 gap-6 xs:flex-row flex-col items-center">
              {navigationLinks.map(({ label, href }) => (
                <a
                  key={label}
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
