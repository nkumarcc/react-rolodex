import React, { FC, useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

interface AuthenticatedRouteProps {}

const AuthenticatedRoute: FC<AuthenticatedRouteProps> = () => {
   const { user } = useContext(AuthContext);
   return !user ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthenticatedRoute;