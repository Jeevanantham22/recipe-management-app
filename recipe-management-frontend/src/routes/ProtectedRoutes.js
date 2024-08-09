import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../services/context/authContext';

const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuthContext();    
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }   
    return <Outlet />;
};

export default ProtectedRoutes;
