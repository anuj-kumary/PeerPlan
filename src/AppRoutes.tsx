import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PageNotFound } from "./components/PageNotFound";
import { Singup } from "./components/auth/Singup";
import PrivateRoute from "./components/PrivateRoute";

const LandingPage = lazy(
  async () => await import("./pages/landingPage/LandingPage")
);

const DashboardPage = lazy(
  async () => await import("./pages/dashboard/DashboardPage")
);

const LoginPage = lazy(
  async () => await import("../src/components/auth/login")
);

const ConnectionPage = lazy(
  async () => await import("../src/pages/connection/ConnectionPage")
);
const AuthCallback = lazy(
  async () => await import("../src/components/auth/AuthCallback")
);
const EmailVerification = lazy(
  async () => await import("../src/pages/emailVerification/EmailVerification")
);
const EmailVerified = lazy(
  async () => await import("../src/pages/emailVerified/EmailVerified")
);
const ContactUs = lazy(async () => await import("../src/components/ContactUs"));
const ProfilePage = lazy(
  async () => await import("../src/pages/profile/Profile")
);

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-600 text-lg">Loading...</div>
        </div>
      }
    >
      <Routes>
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route
          path="/connection"
          element={
            <PrivateRoute>
              <ConnectionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/verified-email" element={<EmailVerified />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
