import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const {user}=useAuth()
    const {data:role,isLoading}=useQuery({
        queryKey:["role"],
        queryFn:async()=>{
          const res = await axiosSecure.get(`/user/${user.email}/role`)
          return res.data.role

        }
    })
    return{role,isLoading}
};

export default useRole;