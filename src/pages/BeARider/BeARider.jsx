import React, { useEffect } from 'react';
import Mydiv from '../../components/Mydiv';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { MdInbox } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const BeARider = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { register, control, handleSubmit, setValue } = useForm()
    const serviceCenters = useLoaderData()
    const regionsDuplicate = serviceCenters.map(center => center.region)
    const regions = [...new Set(regionsDuplicate)]
    const riderRegion = useWatch({ control, name: "regions" })
    const districtByRegion = (region) => {
        const regionDisticts = serviceCenters.filter(center => center.region === region)
        const districts = regionDisticts.map(d => d.district)
        return districts
    }
    const handleRiderApplication = (data) => {
        axiosSecure.post('/rider',data)
        .then(res=>{
            console.log(res.data)
            if(res.data.insertedId){
                toast.success("Your Application is Submitted")
            }
            if(res.data.message){
                toast.error(res.data.message)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    // 💡 New: Reset  District when Region changes
    useEffect(() => {
        // Reset to the initial disabled option's value or an empty string
        setValue('district', 'Pick a district');
    }, [riderRegion, setValue]);
    return (
        <Mydiv className={'bg-base-100 rounded-2xl p-12 my-8'}>
            <div className='w-2/3 border-b border-gray-300 pb-8 '>
                <h2 className='text-5xl font-extrabold'>Be A Rider</h2>
                <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <p className='text-3xl font-extrabold mt-8 mb-5'>Tell us about yourself</p>
            <form onSubmit={handleSubmit(handleRiderApplication)} className='w-2/3 mx-auto' >


                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 '>
                    {/* rider Details */}
                    <div>
                        {/*  Name */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Sender Name</legend>
                            <input defaultValue={user?.displayName} required type="text" {...register("name")} className="input w-full" placeholder="Sender Name" />
                        </fieldset>
                        {/*  email */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Sender Email</legend>
                            <input defaultValue={user?.email} required type="email" {...register("email")} className="input w-full" placeholder="Sender Email" />
                        </fieldset>
                        {/*  NID */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">NID No</legend>
                            <input required type="text" {...register("nid")} className="input w-full" placeholder="NID" />
                        </fieldset>
                        {/*  Contact */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Contact</legend>
                            <input required type="text" {...register("contact")} className="input w-full" placeholder="Your Contact" />
                        </fieldset>

                    </div>
                    {/* receiver Details */}
                    <div>
                        {/* age */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Age</legend>
                            <input required type="text" {...register("age")} className="input w-full" placeholder="Your Age" />
                        </fieldset>
                        {/* Bike info */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Bike Reg(optional)</legend>
                            <input type="text" {...register("registation")} className="input w-full" placeholder="Your Bike Registation" />
                        </fieldset>
                        {/* rider region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Region</legend>
                            <select {...register("regions")} defaultValue="Pick a region" className="select w-full">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((region, i) => <option key={i}>{region}</option>)
                                }

                            </select>
                        </fieldset>
                        {/* rider district */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend"> District</legend>
                            <select {...register("district")} defaultValue="Pick a district" className="select w-full">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtByRegion(riderRegion).map((district, i) => <option value={district} key={i}>{district}</option>)
                                }
                            </select>
                        </fieldset>
                    </div>
                </div>
                <input className='btn btn-primary text-black mt-8 w-full' type="submit" value="Submit" />
            </form>
        </Mydiv>
    );
};

export default BeARider;