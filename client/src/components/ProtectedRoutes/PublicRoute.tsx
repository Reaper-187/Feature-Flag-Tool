import { Spinner } from "@/components/Spinner/Spinner";
import { useAuth } from "@/hooks/authHooks/use.auth";
import { type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

type PublicRouteProps = PropsWithChildren;

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { data, isLoading, hasToken } = useAuth();

  if (hasToken && isLoading) {
    return <Spinner />;
  }

  if (data) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
