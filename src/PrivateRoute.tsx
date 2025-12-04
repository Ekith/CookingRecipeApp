// File: src/PrivateRoute.tsx
import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

interface PrivateRouteProps {
    children: ReactNode;
    redirectTo?: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, redirectTo = '/login' }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                Chargement de l'authentification...
            </div>
        );
    }

    if (!user) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;