import React from "react";
import FormLogin from './FormLogin.jsx'
import '../src/index.css'


export default function Login(){
    return (
        <div className="flex w-full h-screen bg-pink-100 font-poppins">
        <div className='w-full flex flex-col items-center justify-center lg:w-1/2'>
          
          <FormLogin />
        </div>
      <div className='hidden relative lg:flex w-1/2  items-center justify-center h-full bg-slate-200'>
        
        <div className='w-60 h-60 bg-gradient-to-t from-violet-500 to-pink-500 rounded-full animate-spin' ></div>
        <div className="w-full bottom-0 absolute h-1/2 bg-white/10 backdrop-blur-lg"/>
      </div>
  
    </div>
    )
}