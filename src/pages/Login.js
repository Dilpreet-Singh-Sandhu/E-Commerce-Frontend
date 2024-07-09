import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if (dataApi.error) {
            toast.error(dataApi.message)
        }

    }

    console.log("data login", data)

    return (
        <section id='login'>
            <div className='mx-auto container p-4'>

                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-full h-20 mx-auto mt-4 border-b-2'>
                        <span className='font-bold text-2xl'>Welcome Back, Shopper!</span><br></br>
                        <span className='font-semibold text-xl'>Login to access your cart and orders.</span>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2 ">
                                <input
                                    type='email'
                                    placeholder='enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 '>
                                <input 
                                    
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                        </div> */}
                        <div className="col-span-full ">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2 flex ">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='enter password'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    className="p-2 relative w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 bg-transparent"
                                />
                                <div className='cursor-pointer absolute text-xl ml-[315px] mt-2' onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                            <Link to={''} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot password ?
                            </Link>
                        </div>

                        {/* <div>
                            <label className='text-sm font-medium leading-6 text-gray-900'>Password </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='enter password'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                            <Link to={''} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot password ?
                            </Link>
                        </div> */}

                        <button className='bg-gray-900 hover:bg-gray-700 text-white px-6 py-2 w-full max-w-[150px] rounded-lg font-bold text-lg hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

                    </form>

                    <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className=' font-bold text-lg text-blue-700 hover:text-blue-700 hover:underline'>Sign up</Link></p>
                </div>


            </div>
        </section>
    )
}

export default Login