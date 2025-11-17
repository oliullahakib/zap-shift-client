import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContex';

const useAuth = () => {
    const authValue = use(AuthContext)
    return authValue
};

export default useAuth;