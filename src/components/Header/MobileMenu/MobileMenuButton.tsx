import { Menu, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { useMobileMenuStore } from './MobileMenu.store';

export const MobileMenuButton = () => {
  const { isOpen, toggleIsOpen } = useMobileMenuStore();

  return (
    <Button className="md:hidden" variant="ghost" size="icon" onClick={toggleIsOpen}>
      {!isOpen ? <Menu className="size-5 md:size-6" /> : <X className="size-5 md:size-6" />}
      <span className="sr-only">{!isOpen ? 'Open' : 'Close'} menu</span>
    </Button>
  );
};
