import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard } from "./pages/Dashboard.tsx";
import { NewFlag } from "./pages/NewFlag.tsx";
import { AuthPage } from "./pages/AuthPage.tsx";
import { ProtectedRoute } from "./components/ProtectedRoutes/ProtectedRoute.tsx";
import { PublicRoute } from "./components/ProtectedRoutes/PublicRoute.tsx";
import { EmailVerificationPage } from "./pages/auth-pages/EmailVerificationPage.tsx";
import { EmailConfirmPage } from "./pages/auth-pages/EmailConfirmPage.tsx";

const queryClient = new QueryClient();

// {
//   path: "/reset-password-authentication",
//   element: (
//     <>
//       <PublicRoute>
//         <ForgotPw />
//       </PublicRoute>
//     </>
//   ),
// },
// {
//   path: "/new-password-authentication",
//   element: (
//     <PublicRoute>
//       <NewPwPage />
//     </PublicRoute>
//   ),
// },
// {
//   path: "/verifyUser",
//   element: (
//     <VerificationRoute>
//       <Verification />
//     </VerificationRoute>
//   ),
// },
const router = createBrowserRouter([
  {
    path: "/verify-email",
    element: (
      <>
        <EmailVerificationPage />
      </>
    ),
  },
  {
    path: "/verify-email/confirm",
    element: (
      <>
        <EmailConfirmPage />
      </>
    ),
  },
  {
    path: "/authentication",
    element: (
      <>
        <PublicRoute>
          <AuthPage />
        </PublicRoute>
      </>
    ),
  },

  {
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Navigate to="/authentication" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "create-new-feature-flag", element: <NewFlag /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
