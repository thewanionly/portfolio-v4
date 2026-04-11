import { Menu, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { useMobileMenuStore } from './MobileMenu.store';

export const MobileMenuButton = () => {
  const { isOpen, toggleIsOpen } = useMobileMenuStore();

  return (
    <Button
      className="relative md:hidden"
      variant="ghost"
      size="icon"
      onClick={toggleIsOpen}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
    >
      <span className="relative flex size-5 items-center justify-center md:size-6">
        <Menu
          className={`absolute size-5 transition-all duration-200 ease-out md:size-6 ${
            isOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <X
          className={`absolute size-5 transition-all duration-200 ease-out md:size-6 ${
            isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'
          }`}
        />
      </span>
      <span className="sr-only">{!isOpen ? 'Open' : 'Close'} menu</span>
    </Button>
  );
};
