import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom';


const HomePage = lazy(async () => await import('../src/pages/homePage/HomePage'));

const LoginPage = lazy(async () => await import('../src/components/auth/login'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}

export default AppRoutes;
