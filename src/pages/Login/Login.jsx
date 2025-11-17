import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleLogin = (data) => {
        console.log(data)
    }
    return (
        <div className=' w-full'>
            <div className="card-body w-full justify-center items-center">
                <form onSubmit={handleSubmit(handleLogin)} className="fieldset md:w-96">
                    <label className="label">Email</label>
                    <input {...register("email", { required: 'Email is required.' })} type="email" className="input w-full" placeholder="Email" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    <label className="label">Password</label>
                    <input {...register("password", {
                        required: 'Password is required.',
                        minLength:
                        {
                            value: 6,
                            message: 'Password must be at least 6 characters long.'
                        },
                        pattern: {
                            value: /^(?=.*[A-Z]).+$/,
                            message: 'Password must contain An Uppercase letters.',
                        },
                        validate: (value) => {
                            const lowerCaseReg = /(?=.*[a-z])/
                            if (!lowerCaseReg.test(value)) {
                                return 'Password must include at least one lowercase letter.';
                            }
                            return true
                        }

                    })} type="password" className="input w-full" placeholder="Password" />
                    {errors.password &&
                        <p className='text-red-500'>
                            {errors.password.message}
                        </p>}
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;