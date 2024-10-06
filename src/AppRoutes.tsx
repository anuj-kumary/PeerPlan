import  { lazy } from 'react'
import {  Route, Routes } from 'react-router-dom';


const HomePage = lazy(async () => await import('../src/pages/homePage/HomePage'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    )
}

export default AppRoutes;
