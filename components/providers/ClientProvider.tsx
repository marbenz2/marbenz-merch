"use client";

import { useUserStore } from "@/app/stores/userStore";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/utils/supabase/client-queries";
import { User } from "@supabase/supabase-js";
import Spinner from "../ui/Spinner";

interface ClientProviderProps {
  children: React.ReactNode;
  initialUser: User | null;
}

export default function ClientProvider({
  children,
  initialUser,
}: ClientProviderProps) {
  const { setProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  // Entwicklungs-Logging mit process.env.NODE_ENV
  /*   if (process.env.NODE_ENV === "development") {
    console.log("ClientProvider rendering, initialUser:", initialUser);
  } */

  useEffect(() => {
    async function fetchUserProfile() {
      if (!initialUser) {
        setProfile(null);
        return;
      }

      setIsLoading(true);
      try {
        const result = await getUserProfile(initialUser.id);
        if (result.error) {
          throw new Error(result.error.message);
        }
        setProfile(result.data);
      } catch (error) {
        console.error("Fehler beim Laden des Benutzerprofils:", error);
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, [initialUser, setProfile]);

  if (isLoading) {
    return <Spinner />;
  }

  return <>{children}</>;
}
