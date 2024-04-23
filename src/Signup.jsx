import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import { Link } from 'react-router-dom';

function Signup() {
 const navigate = useNavigate();
 const { signIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors,isSubmitting },
  } = useForm()
 
  const onSubmit =async (data) =>{
      const newUser = {
        name: data.name,
        email:data.email,
        password:data.password
      } 
    try{
      const response = await fetch("https://todobackend-suuw.onrender.com/signup/new/user",{
        method:"POST",
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(newUser)
      })
      if (response.ok) {
        console.log("data sent successfully");
        const data = await response.json();
        console.log(data);
        signIn(data);
      navigate("/");
      } else {
        console.error("Failed to send data");
        const data = await response.json();
        console.log(data);
        setError("signingErr",{message:data.error})
      }
  }
  catch(err){
        console.log(err);
  }
     console.log(data)
  }


  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up for a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register("name", {required:{value:true, message: "Name is required"},minLength:{value:3 , message:"Minimum length of name should be 3"}})}
                autoComplete="name"
                
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
              />
            </div>
          {errors.name && <div className='text-red-600 bg-red mt-2'>{errors.name.message}</div>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                {...register("email", {required:{value:true, message: "Email is required"}})}
                autoComplete="email"
              
                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.email && <div className='text-red-600 bg-red mt-2'>{errors.email.message}</div>}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              
            </div>
            <div className="mt-2">
              <input
                {...register("password", {required:{value:true, message: "Password is required"},minLength:{value:3 , message:"Minimum length of password should be 6"}})}
                type="password"
                autoComplete="current-password"
               
                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.password && <div className='text-red-600 bg-red mt-2'>{errors.password.message}</div>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              Sign in
            </button>
            {errors.signingErr && <div className='text-red-600 bg-red mt-2'>{errors.signingErr.message}</div>}
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{' '}
          <Link to="/login" className="font-semibold leading-6 text-amber-500 hover:text-amber-400">
            Log in now
          </Link>
        </p>
      </div>
    </div>
  </>
  )
}


export default Signup

