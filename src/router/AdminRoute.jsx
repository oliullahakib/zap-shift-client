import React from 'react';
import useRole from '../hooks/useRole';
import Loading from '../pages/Shared/Loading';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
    const {role,isLoading} = useRole()
    if(isLoading) return <Loading/>
    return (
        <div>
            {role==="admin"?children:<Navigate to={'/forbidden'} replace />}
        </div>
    );
};

export default AdminRoute;