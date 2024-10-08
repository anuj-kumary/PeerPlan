import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';


const HomePage = lazy(async () => await import('../src/pages/homePage/HomePage'));

const LoginPage = lazy(async () => await import('../src/components/auth/login'));

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
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Suspense>

    )
}

export default AppRoutes;
