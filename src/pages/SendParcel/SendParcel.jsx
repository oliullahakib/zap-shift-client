import React, { useEffect } from 'react';
import Mydiv from '../../components/Mydiv';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { MdInbox } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SendParcel = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { register, control, handleSubmit, setValue } = useForm()
    const serviceCenters = useLoaderData()
    const regionsDuplicate = serviceCenters.map(center => center.region)
    const regions = [...new Set(regionsDuplicate)]
    const senderRegion = useWatch({ control, name: "senderRegions" })
    const receiverRegion = useWatch({ control, name: "receiverRegions" })
    const districtByRegion = (region) => {
        const regionDisticts = serviceCenters.filter(center => center.region === region)
        const districts = regionDisticts.map(d => d.district)
        return districts
    }
    const handleSendParcel = (data) => {

        const isDocument = data.parcelType === 'document'
        const isSameCity = data.senderDistrict === data.recieverDistrict
        const parcelWeight = parseFloat(data.parcelWeight)
        let cost = 0;
        if (isDocument) {
            cost = isSameCity ? 60 : 80;
        } else {
            if (parcelWeight <= 3) {
                cost = isSameCity ? 110 : 150
            } else {
                const minCost = isSameCity ? 110 : 150
                const extraWeight = parcelWeight - 3
                const extraCost = isSameCity ? extraWeight * 40 : extraWeight * 40 + 40
                cost = minCost + extraCost
            }
        }

        Swal.fire({
            title: "Aggree with our cost?",
            text: `Yout total cost ${cost}tk`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Placed!",
                                text: "Your order has been placed.",
                                icon: "success"
                            });
                        }
                    })



            }
        });
    }
    useEffect(() => {
        // Reset to the initial disabled option's value or an empty string
        setValue('senderDistrict', 'Pick a district');
    }, [senderRegion, setValue]);

    // 💡 New: Reset Receiver District when Receiver Region changes
    useEffect(() => {
        // Reset to the initial disabled option's value or an empty string
        setValue('recieverDistrict', 'Pick a district');
    }, [receiverRegion, setValue]);
    return (
        <Mydiv className={'bg-base-100 rounded-2xl p-8 my-8'}>
            <h2 className='text-5xl font-extrabold'>Send A Parcel</h2>
            <p className='text-3xl font-extrabold mt-8 mb-5'>Enter your parcel details</p>
            <form onSubmit={handleSubmit(handleSendParcel)} className='w-2/3 mx-auto' >
                {/* document and parcel details */}
                <div className='border-y border-gray-300 py-5'>
                    <label >
                        <input type="radio" {...register("parcelType")} value={'document'} className="radio mr-2" defaultChecked />
                        Document
                    </label>
                    <label >
                        <input type="radio" {...register("parcelType")} value={'non-document'} className="radio ml-3 mr-2" />
                        Non-Document
                    </label>
                    {/* parcel  */}
                    <div className='flex gap-5'>
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Parcel Name</legend>
                            <input required type="text" className="input w-full" placeholder="Type here" />
                        </fieldset>
                        <fieldset className="fieldset  w-full">
                            <legend className="fieldset-legend">Parcel Weight(KG)</legend>
                            <input {...register("parcelWeight")} required type="number" className="input w-full" placeholder="Type here" />
                        </fieldset>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 '>
                    {/* sender Details */}
                    <div>
                        {/* sender Name */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Sender Name</legend>
                            <input defaultValue={user?.displayName} required type="text" {...register("senderName")} className="input w-full" placeholder="Sender Name" />
                        </fieldset>
                        {/* sender email */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Sender Email</legend>
                            <input defaultValue={user?.email} required type="email" {...register("senderEmail")} className="input w-full" placeholder="Sender Email" />
                        </fieldset>
                        {/* sender address */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Sender Address</legend>
                            <input required type="text" {...register("senderAddress")} className="input w-full" placeholder="Sender Address" />
                        </fieldset>
                        {/* sender region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Region</legend>
                            <select {...register("senderRegions")} defaultValue={`Pick a region`} className="select w-full">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((region, i) => <option value={region} key={i}>{region}</option>)
                                }

                            </select>
                        </fieldset>
                        {/* sender district */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender District</legend>
                            <select {...register("senderDistrict")} defaultValue="Pick a district" className="select w-full">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtByRegion(senderRegion).map((district, i) => <option defaultValue={district} key={i}>{district}</option>)
                                }
                            </select>
                        </fieldset>
                    </div>
                    {/* receiver Details */}
                    <div>
                        {/* reciever Name */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Reciever Name</legend>
                            <input required type="text" {...register("recieverName")} className="input w-full" placeholder="Reciever Name" />
                        </fieldset>
                        {/* reciever eamil */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Reciever Email</legend>
                            <input required type="email" {...register("recieverEmail")} className="input w-full" placeholder="Reciever Email" />
                        </fieldset>
                        {/* reciever address */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Reciever Address</legend>
                            <input required type="text" {...register("recieverAddress")} className="input w-full" placeholder="Reciever Address" />
                        </fieldset>
                        {/* reciever region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Reciver Region</legend>
                            <select {...register("receiverRegions")} defaultValue="Pick a region" className="select w-full">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((region, i) => <option key={i}>{region}</option>)
                                }

                            </select>
                        </fieldset>
                        {/* reciever district */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Reciver District</legend>
                            <select {...register("recieverDistrict")} defaultValue="Pick a district" className="select w-full">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtByRegion(receiverRegion).map((district, i) => <option value={district} key={i}>{district}</option>)
                                }
                            </select>
                        </fieldset>
                    </div>
                </div>
                <input className='btn btn-primary text-black mt-8' type="submit" value="Proceed to Confirm Booking" />
            </form>
        </Mydiv>
    );
};

export default SendParcel;