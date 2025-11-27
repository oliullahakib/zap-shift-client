import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
})

const useAxiosSecure = () => {
    const {user,logOutUser}=useAuth()
    const navigate = useNavigate()
    useEffect(() => {
     const reqInterceptor= instance.interceptors.request.use((config) => {
           config.headers.Authorization=`Beare ${user.accessToken}`
        return config
        })
        const resInterceptor = instance.interceptors.response.use((response)=>{
            return response
        },(error)=>{
            const status = error.status
            if(status===401 || status===403){
                logOutUser()
                .then(()=>{
                    navigate('/login')
                })
            }
        })
        return () => {
            instance.interceptors.request.eject(reqInterceptor)
            instance.interceptors.response.eject(resInterceptor)
        }
    }, [user])

    return instance
};

export default useAxiosSecure;