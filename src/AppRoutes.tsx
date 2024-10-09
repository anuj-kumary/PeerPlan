import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound';


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
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>

    )
}

export default AppRoutes;
