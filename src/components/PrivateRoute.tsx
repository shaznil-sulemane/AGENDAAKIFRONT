// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, type JSX } from "react";
import { useData } from "@/hooks/useData";
import { ls } from "@/lib/axios";
import { toast } from "sonner";

type PrivateRouteProps = {
  children: JSX.Element;
  roles?: string[]; // roles permitidas
};

export default function PrivateRoute({ children, roles }: PrivateRouteProps) {
  const { auth, user, getAuth, getUser } = useAuth();
  // const { user } = useData();

  useEffect(() => {
    if (!auth) {
      getAuth();
      getUser();
    }
  }, []);
  if ((!ls.get("auth") || !ls.get("user"))) {
    const currentPath = window.location.pathname + window.location.search;
    return <Navigate to={`/login?next=${currentPath}`} replace />;
  }

  // if (roles && !roles.includes(user.role)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  // Logado → renderiza a página
  return children;
}
