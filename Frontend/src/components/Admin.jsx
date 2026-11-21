import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api';
import { useNavigate } from 'react-router';

const Admin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        console.log("FORM SUBMITTED!", data);
        setMessage('Checking credentials...');
        localStorage.removeItem('token');
        try {
            console.log("SENDING LOGIN REQUEST...");
            const response = await api.post('/auth/login', {
                email: data.email,
                password: data.password,
            });
            if(response.data.success || response.data.token && response.data.user?.role==='admin'){
                localStorage.setItem('token', response.data.token);
                navigate('/admin/dashboard');
            } else{
                localStorage.removeItem('token');
                setMessage('Admin access denied')
            }
        } catch (error) {
            localStorage.removeItem('token');
            setMessage(
                error.response?.data?.message ||
                'Invalid email or password.'
            );
        }
    };

    return (
        <div className='flex flex-col w-full items-center '>
            <div className="flex flex-col w-full max-w-[1080px]  items-center">
                <div className="flex flex-col gap-[10px]">
                    <div className='toptext text-aboutskilltextcol text-[13px] mt-[10px]'>PRIVATE</div>
                    <div className='toptext text-[50px] leading-[0.9] text-navtextcol mt-[10px] mb-[10px] font-instru italic tracking-tighter scale-y-[1.25] font-extralight'>Admin sign in</div>
                    <div className="signin">
                        <div className="p-[20px] bg-navbgcol w-full max-w-full rounded-[30px] border-[1px] border-navbordercolor h-auto">
                            <div className='skills mb-[20px]'>
                                <div className="email">
                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                                        <label className='text-[14px] text-navtextcol pb-[5px]'>Email</label>
                                        <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/ , message: 'Please enter a valid email address', } })} className='bg-navbgcol max-w-[500px] h-[50px] p-[20px] rounded-[20px] focus:outline-hirebgcol border-[1px] border-navbordercolor w-[400px] mb-[10px]' type="text" placeholder="you@example.com" />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm">
                                                {errors.email.message}
                                            </p>
                                        )}
                                        <label className='text-[14px] text-navtextcol pb-[5px]'>Password</label>
                                        <input {...register('password', {required: 'Password is required',minLength: {value:6, message: 'Password must contain at least 6 characters'}})} className='bg-navbgcol max-w-[500px] h-[50px] p-[20px] rounded-[20px] focus:outline-hirebgcol border-[1px] border-navbordercolor w-[400px] mb-[20px]' type="text" placeholder="Password" />
                                        {errors.password && (
                                            <p className="text-red-500 text-sm">
                                                {errors.password.message}
                                            </p>
                                        )}
                                        <button className='bg-navtextcol text-peachbg cursor-pointer px-[15px] py-[10px] rounded-[30px]  hover:-translate-y-[2px] transition-all duration-300 active:scale-[0.9] active:duration-200' type="submit" disabled={isSubmitting}>
                                            {isSubmitting?'Signing In...' : 'Sign In'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
