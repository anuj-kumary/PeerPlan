// PrivateRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useIsLoggedIn from '../hooks/useIsLoggedIn';

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isLoggedIn, loading, userInfo } = useIsLoggedIn();
    console.log(userInfo,"userInfo")
    if (loading || !userInfo) {
        return <div>Loading...</div>;
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
