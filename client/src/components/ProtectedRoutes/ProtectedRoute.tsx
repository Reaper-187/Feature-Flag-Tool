import { Spinner } from "@/components/Spinner/Spinner";
import { useAuth } from "@/hooks/authHooks/use.auth";
import { type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data, isLoading, error } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <Navigate to="/authentication" replace />;
  }

  if (data) {
    return children;
  }
  return null;
};
