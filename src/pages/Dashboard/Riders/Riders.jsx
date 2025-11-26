import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const Riders = () => {
    const axiosSecure = useAxiosSecure()
const {data:riders = [],refetch}=useQuery({
    queryKey:['rider','pending'],
    queryFn:async()=>{
      const res = await axiosSecure.get('/riders')

        return res.data
    }
})
const handleDeleteRider = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/rider/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Rider application has been deleted.",
                                icon: "success"
                            });
                        }

                    })

            }
        });
    }
    const updateStatus=(rider,statusValue)=>{
        // console.log(id,statusValue)
        const status = statusValue
        axiosSecure.patch(`/rider/${rider._id}`,{status,email:rider.email})
        .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount){
                toast.success(`Rider is ${statusValue}`)
                refetch()
            }
        })
        .catch(err=>console.log(err))
    }
    return (
        <div>
            <div>
                <h2 className='text-3xl'> Riders <span className='font-bold'>({riders.length})</span> </h2>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>SLNo</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>District</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    riders.map((rider, i) => <tr key={rider._id} className="bg-base-200">
                                        <th>{i + 1}</th>
                                        <td>{rider.name}</td>
                                        <td>{rider.email}</td>
                                        <td>{rider.district}</td>
                                        <td className={rider.status==="accepted"?'text-green-500':rider.status==="rejected"?"text-red-500":"text-black"}>{rider.status }</td>
                                        <td className='space-x-3'>
                                            <button disabled={rider.status==="accepted"?true:false} onClick={()=>updateStatus(rider,"accepted")} className="btn btn-primary text-black"><FaUserCheck /></button>
                                            <button disabled={rider.status==="rejected"?true:false}  onClick={()=>updateStatus(rider,"rejected")}   className="btn btn-error text-black"><FaUserTimes /></button>
                                            <button onClick={()=>handleDeleteRider(rider._id)} className="btn hover:btn-error"><FaTrashAlt /></button>
                                        </td>
                                    </tr>)
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
       
    );
};

export default Riders;