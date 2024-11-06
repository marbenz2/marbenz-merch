"use client";

import { useUserStore } from "@/app/stores/userStore";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/utils/supabase/client-queries";
import { User } from "@supabase/supabase-js";

interface ClientProviderProps {
  children: React.ReactNode;
  initialUser: User | null;
}

export default function ClientProvider({
  children,
  initialUser,
}: ClientProviderProps) {
  const { setProfile, setIsLoading } = useUserStore();

  useEffect(() => {
    async function fetchUserProfile() {
      setIsLoading(true);
      if (!initialUser) {
        setProfile(null);
        setIsLoading(false);
        return;
      }

      try {
        const result = await getUserProfile(initialUser.id);
        if (result.error) {
          throw new Error(result.error.message);
        }
        setProfile(result.data);
      } catch (error) {
        console.error("Fehler beim Laden des Benutzerprofils:", error);
        setProfile(null);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, [initialUser, setProfile]);

  return <>{children}</>;
}
