import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) => {
    const {user,loading}=useAuth()
    const location = useLocation()
    if(loading) return <p>Loading..</p>
    return (
        <div>
            {user?children:<Navigate state={location.pathname} to={"/login"} replace />}
        </div>
    );
};

export default PrivateRoute;