import { create } from "zustand";
import { Tables } from "@/database.types";

type UserStore = {
  profile: Tables<"profiles"> | null;
  setProfile: (profile: Tables<"profiles"> | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
