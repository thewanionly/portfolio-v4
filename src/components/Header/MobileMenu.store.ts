import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MobileMenuStore {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

export const useMobileMenuStore = create<MobileMenuStore>()(
  devtools((set) => ({
    isOpen: false,
    toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  }))
);
