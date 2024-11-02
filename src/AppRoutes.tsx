import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound';
import { Singup } from './components/auth/Singup';
import Profile from './pages/profile/Profile';


const HomePage = lazy(async () => await import('../src/pages/homePage/HomePage'));

const LoginPage = lazy(async () => await import('../src/components/auth/login'));

const ConnectionPage = lazy(async () => await import('../src/pages/connection/ConnectionPage'));
const AuthCallback = lazy(async () => await import('../src/components/auth/AuthCallback'));

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
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<Singup />} />
                <Route path="/connection" element={<ConnectionPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>

    )
}

export default AppRoutes;
