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
//   path: "/multifactor-authentication-oneTimer",
//   element: (
//     <PublicRoute>
//       <OneTimeOtp />
//     </PublicRoute>
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
  // {
  //   path: "/login",
  //   element: (
  //     <>
  //       <PublicRoute>
  //         <Login />
  //       </PublicRoute>
  //     </>
  //   ),
  // },
  // {
  //   path: "/register",
  //   element: (
  //     <>
  //       <PublicRoute>
  //         <Register />
  //       </PublicRoute>
  //     </>
  //   ),
  // },

  {
    element: (
      // <ProtectedRoute>
      // </ProtectedRoute>
      <App />
    ),
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
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
