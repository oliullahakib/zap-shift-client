import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const {creatUser}=useAuth()
    const [show, setShow] = useState(false)
    const {register,handleSubmit,formState:{errors}}=useForm()
    const handleRegister=(data)=>{
        creatUser(data.email,data.password)
        .then(res=>{
            console.log(res.user)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className=' w-full'>
            <div className="card-body w-full justify-center items-center">
                <form onSubmit={handleSubmit(handleRegister)} className="fieldset md:w-96">
                    {/* Name */}
                    <label className="label">Name</label>
                    <input {...register("name",{
                        required:"Name is required",
                        minLength:{
                            value:5,
                            message:"Name should be more than 5 charecters"
                        }
                    })} type="text" className="input w-full" placeholder="Your Name" />
                    {errors.name&&<p className='text-red-400'>{errors.name?.message}</p>}
                    {/* photo */}
                    <label className="label">Photo</label>
                    <input {...register("photo",{required:true})} type="file" className="file-input w-full" />
                   {errors.photo?.type==="required"&&<p className='text-red-400'>Photo is required</p>}
                    {/* email */}
                    <label className="label">Email</label>
                    <input {...register("email",{required:"Email is required"})} type="email" className="input w-full" placeholder="Email" />
                    {errors.email&&<p className='text-red-400'>{errors.email?.message}</p>}

                    {/* password  */}
                    <div className='relative'>
                        <label className="label">Password</label>
                    <input {...register("password",{
                        required:"Password is required",
                        minLength:{
                            value:6,
                            message: 'Password must be at least 6 characters long.'
                        },
                        pattern:{
                            value:/^(?=.*[A-Z]).+$/,
                            message: 'Password must contain An Uppercase letters.',
                        },
                        validate:(value)=>{
                            if(!/^(?=.*[a-z]).+$/.test(value)){
                                return 'Password must include at least one lowercase letter.';
                            }
                            return true
                        }
                    })} type={show?"text":"password"} className="input w-full" placeholder="Password" />
                   {errors.password&&<p className='text-red-400'>{errors.password?.message}</p>}
                   <span onClick={()=>setShow(!show)} className='absolute top-6 right-3'>{show?<FaEyeSlash  size={25}/>:<FaEye size={25} />}</span>
                    </div>
                    <button className="btn btn-primary text-black mt-4">Register</button>
                    <p className='font-semibold'>Already have an account? <Link to={"/login"} className='text-green-400 underline'>Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Register;