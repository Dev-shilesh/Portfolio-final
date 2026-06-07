import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  activeSection: string;
  isSubmittingContact: boolean;
  contactSuccess: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setActiveSection: (section: string) => void;
  setSubmittingContact: (submitting: boolean) => void;
  setContactSuccess: (success: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  activeSection: 'about',
  isSubmittingContact: false,
  contactSuccess: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
  setSubmittingContact: (submitting) => set({ isSubmittingContact: submitting }),
  setContactSuccess: (success) => set({ contactSuccess: success }),
}));
