import React, { FC, useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

interface ProtectedRouteProps {}

const ProtectedRoute: FC<ProtectedRouteProps> = () => {
   const { user } = useContext(AuthContext);
   return user ? <Outlet /> : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;