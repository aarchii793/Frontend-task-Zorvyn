import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Role } from '../types/finance';

interface RoleState {
  activeRole: Role;
  /** Switch between admin and viewer roles */
  switchRole: (role: Role) => void;
}

/** Zustand store for role management with localStorage persistence */
export const useRoleStore = create<RoleState>()(
  persist(
    (set) => ({
      activeRole: 'admin',
      switchRole: (role: Role) => set({ activeRole: role }),
    }),
    { name: 'fin-role' }
  )
);
