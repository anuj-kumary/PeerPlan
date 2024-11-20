// PrivateRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useIsLoggedIn from '../hooks/useIsLoggedIn';

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isLoggedIn, loading } = useIsLoggedIn();
    console.log(isLoggedIn)
    // Show a fallback UI while determining the login status
    if (loading) {
        return <div>Loading...</div>; // Replace with a spinner or skeleton if needed
    }
    return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
