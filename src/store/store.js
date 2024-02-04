import { create } from "zustand";

export const useZustandStore = create()((set) => ({
  excelData: [],
  campaigns: [],
  user: {},
  refetch: true,
  isSignedIn: false,
  setUser: (user) => set({ user }),
  setRefetch: (refetch) => set({ refetch }),
  setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
  setExcelData: (excelData) => set({ excelData }),
  setCampaigns: (campaigns) => set({ campaigns }),
}));
