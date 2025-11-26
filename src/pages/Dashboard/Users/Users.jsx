import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { GiShieldDisabled } from "react-icons/gi";
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const Users = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    const {data:users = [],refetch}= useQuery({
        queryKey:['user',user?.email],
        queryFn:async()=>{
          const res= await axiosSecure.get('/users')
          return res.data
        }
    })

    const updateRole = async(id,role)=>{
       const res = await axiosSecure.patch(`/user/${id}/role`,{role})
       console.log(res.data)
       if(res.data.modifiedCount){
        refetch()
        toast.success(`${user.displayName} is made to ${role}`)
       }

    }

    return (
        <div>
            <h2>Users({users.length})</h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Admin Action</th>
                                <th>Other Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user,i)=><tr key={user._id}>
                                <td>
                                    {i+1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName}</div>
                                            <div className="text-sm opacity-50">{user.createdAt}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.email}      
                                </td>
                                <td>{user.role}</td>
                                <th>
                                    <button disabled={user.role==="admin"?true:false} onClick={()=>updateRole(user._id,"admin")} className="btn hover:btn-success mr-2"><FaUserShield /></button>
                                    <button disabled={user.role==="user"?true:false} onClick={()=>updateRole(user._id,"user")} className="btn hover:btn-error"><GiShieldDisabled /></button>
                                </th>
                                <td>Action</td>
                            </tr>)}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;