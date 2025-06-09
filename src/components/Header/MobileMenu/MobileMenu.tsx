import { useMobileMenuStore } from './MobileMenu.store';
import { Sheet, SheetContent, SheetOverlay, SheetPortal } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';

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
        <SheetContent
          side="top"
          showCloseButton={false}
          className="p-6 pt-0 absolute"
        ></SheetContent>
      </SheetPortal>
    </Sheet>
  );
};
