// PrivateRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useIsLoggedIn from '../hooks/useIsLoggedIn';

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isLoggedIn, loading, userInfo } = useIsLoggedIn();
    if (loading) {
        return <div>Loading...</div>;
    }
     // If loading is complete but userInfo is not available, navigate to /login
     if (!userInfo) {
        return <Navigate to="/login" />;
    }

    return isLoggedIn ? (
        userInfo?.emailVerification ? (
            <>{children}</>
        ) : (
            <Navigate to="/verify-email" />
        )
    ) : (
        <Navigate to="/login" />
    );

};

export default PrivateRoute;
