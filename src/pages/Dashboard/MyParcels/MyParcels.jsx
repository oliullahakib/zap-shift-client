import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyParcels = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-parcels?email=${user?.email}`)
            return res.data

        }
    })
    const handleDelete = (id) => {


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
                axiosSecure.delete(`parcel/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your order has been deleted.",
                                icon: "success"
                            });
                        }

                    })

            }
        });
    }
    const handlePayment = async(parcel) => {
        
        const parcelInfo =
        {
            email: parcel.senderEmail,
            name: parcel.parcelName,
            parcelId: parcel._id,
            cost: parcel.cost
        }
     const res= await axiosSecure.post('/payment-checkout-session',parcelInfo)
     console.log(res.data)
     window.location.assign(res.data.url)
      

    }
    return (
        <div>
            parcels({parcels.length})
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SLNo</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                parcels.map((parcel, i) => <tr key={parcel._id} className="bg-base-200">
                                    <th>{i + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.cost}</td>
                                    <td>{parcel.paymentStatus = "Unpaind"}</td>
                                    <td className='space-x-3'>
                                        <button onClick={() => handlePayment(parcel)} className="btn btn-primary text-black">Pay</button>
                                        <button onClick={() => handleDelete(parcel._id)} className="btn hover:btn-error"><FaTrashAlt /></button>
                                    </td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyParcels;