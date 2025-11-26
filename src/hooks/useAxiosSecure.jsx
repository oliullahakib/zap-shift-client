import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
})

const useAxiosSecure = () => {
    const {user}=useAuth()
    useEffect(() => {
     const reqInterceptor= instance.interceptors.request.use((config) => {
           config.headers.Authorization=`Beare ${user.accessToken}`
        return config
        })

        return () => {
            instance.interceptors.request.eject(reqInterceptor)
        }
    }, [])

    return instance
};

export default useAxiosSecure;