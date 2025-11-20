import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [data,setData] = useState({
    name : "",
    email : "",
    password : "",
    profile_pic : ""
  })
  const [uploadPhoto,setUploadPhoto] = useState("")
  const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }

  const handleUploadPhoto = async(e)=>{
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file)

    setUploadPhoto(file)

    setData((preve)=>{
      return{
        ...preve,
        profile_pic : uploadPhoto?.url
      }
    })
  }
  const handleClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`

    try {
        const response = await axios.post(URL,data)
        console.log("response",response)

        toast.success(response.data.message)

        if(response.data.success){
            setData({
              name : "",
              email : "",
              password : "",
              profile_pic : ""
            })

            navigate('/email')

        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    console.log('data',data)
  }


  return (
    // <div className='mt-5'>
    //     <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
    //       <h3>Welcome to Chat app!</h3>

    //       <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
    //           <div className='flex flex-col gap-1'>
    //             <label htmlFor='name'>Name :</label>
    //             <input
    //               type='text'
    //               id='name'
    //               name='name'
    //               placeholder='enter your name' 
    //               className='bg-slate-100 px-2 py-1 focus:outline-primary'
    //               value={data.name}
    //               onChange={handleOnChange}
    //               required
    //             />
    //           </div>

    //           <div className='flex flex-col gap-1'>
    //             <label htmlFor='email'>Email :</label>
    //             <input
    //               type='email'
    //               id='email'
    //               name='email'
    //               placeholder='enter your email' 
    //               className='bg-slate-100 px-2 py-1 focus:outline-primary'
    //               value={data.email}
    //               onChange={handleOnChange}
    //               required
    //             />
    //           </div>

    //           <div className='flex flex-col gap-1'>
    //             <label htmlFor='password'>Password :</label>
    //             <input
    //               type='password'
    //               id='password'
    //               name='password'
    //               placeholder='enter your password' 
    //               className='bg-slate-100 px-2 py-1 focus:outline-primary'
    //               value={data.password}
    //               onChange={handleOnChange}
    //               required
    //             />
    //           </div>

    //           <div className='flex flex-col gap-1'>
    //             <label htmlFor='profile_pic'>Photo :

    //               <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
    //                   <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
    //                     {
    //                       uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
    //                     }
    //                   </p>
    //                   {
    //                     uploadPhoto?.name && (
    //                       <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
    //                         <IoClose/>
    //                       </button>
    //                     )
    //                   }
                      
    //               </div>
                
    //             </label>
                
    //             <input
    //               type='file'
    //               id='profile_pic'
    //               name='profile_pic'
    //               className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
    //               onChange={handleUploadPhoto}
    //             />
    //           </div>


    //           <button
    //            className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
    //           >
    //             Register
    //           </button>

    //       </form>

    //       <p className='my-3 text-center'>Already have account ? <Link to={"/email"} className='hover:text-primary font-semibold'>Login</Link></p>
    //     </div>
    // </div>
    
    <div className='min-h-screen bg-slate-100 flex items-center justify-center p-4'>
      <div className='bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden p-8'>

        <div className='text-center mb-6'>
          <h3 className='text-2xl font-bold text-slate-800'>Create Account</h3>
          <p className='text-slate-500 text-sm'>Join us to start chatting!</p>
        </div>

        <form className='grid gap-5' onSubmit={handleSubmit}>

          {/* Name Input */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='name' className='text-slate-600 font-medium text-sm ml-1'>Full Name</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Enter your name'
              className='bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all'
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='text-slate-600 font-medium text-sm ml-1'>Email Address</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all'
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='password' className='text-slate-600 font-medium text-sm ml-1'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Create a password'
              className='bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          {/* Photo Upload Section */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='profile_pic' className='text-slate-600 font-medium text-sm ml-1'>Profile Photo</label>

            <div className='h-14 bg-slate-50 border border-slate-200 rounded-lg flex justify-center items-center cursor-pointer hover:border-primary hover:bg-slate-100 transition-all relative overflow-hidden'>

              {/* If image exists, show preview */}
              {data.profile_pic ? (
                <div className='w-full h-full flex items-center justify-center relative group'>
                  <img
                    src={data.profile_pic}
                    alt="preview"
                    className='h-full object-contain'
                  />
                  {/* Delete Button Overlay */}
                  <button
                    className='absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-red-600 bg-white rounded-full p-1 shadow-md'
                    onClick={handleClearUploadPhoto}
                    type='button'
                  >
                    <IoClose />
                  </button>
                </div>
              ) : (
                <p className='text-sm text-slate-400'>
                  {uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"}
                </p>
              )}

              <input
                type='file'
                id='profile_pic'
                name='profile_pic'
                className='hidden'
                onChange={handleUploadPhoto}
              />
            </div>
          </div>

          <button
            className='bg-primary text-white text-lg px-4 py-2 rounded-lg font-bold tracking-wide hover:bg-secondary hover:shadow-lg transition-all duration-300 mt-2'
          >
            Register
          </button>

        </form>

        <p className='my-4 text-center text-slate-500 text-sm'>
          Already have an account? <Link to={"/email"} className='text-primary font-bold hover:underline'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
