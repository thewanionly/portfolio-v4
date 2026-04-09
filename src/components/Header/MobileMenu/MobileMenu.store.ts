import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MobileMenuStore {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  closeMenu: () => void;
  toggleIsOpen: () => void;
}

export const useMobileMenuStore = create<MobileMenuStore>()(
  devtools((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
    closeMenu: () => set({ isOpen: false }),
    toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  }))
);
