// src/components/utils/withAuth.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component: React.ComponentType, requireAdmin = false) {
  return function ProtectedRoute(props: React.ComponentProps<typeof Component>) {
    const { isAuthenticated, rol, loading } = useAuth(); // 👈 loading incluido
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!isAuthenticated) {
          router.push("/login");
        } else if (requireAdmin && rol !== "ADMIN") {
          router.push("/Unauthorized");
        }
      }
    }, [isAuthenticated, rol, loading, router]); // 👈 incluye loading

    if (loading) return null; // 👈 todavía leyendo el token
    if (!isAuthenticated || (requireAdmin && rol !== "ADMIN")) return null;

    return <Component {...props} />;
  };
}
