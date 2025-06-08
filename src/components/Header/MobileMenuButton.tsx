import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

export const MobileMenuButton = () => {
  return (
    <Button className="md:hidden" variant="ghost" size="icon">
      <Menu className="size-5 md:size-6" />
      <span className="sr-only">Open menu</span>
    </Button>
  );
};
