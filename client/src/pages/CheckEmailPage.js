import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  })
  const navigate = useNavigate()

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
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`

    try {
      const response = await axios.post(URL, data)

      toast.success(response.data.message)

      if (response.data.success) {
        setData({
          email: "",
        })
        navigate('/password', {
          state: response?.data?.data
        })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }


  return (
    // <div className='mt-5'>
    //   <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>

    //     <div className='w-fit mx-auto mb-2'>
    //       <PiUserCircle
    //         size={80}
    //       />
    //     </div>

    //     <h3>Welcome to Chat app!</h3>

    //     <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>


    //       <div className='flex flex-col gap-1'>
    //         <label htmlFor='email'>Email :</label>
    //         <input
    //           type='email'
    //           id='email'
    //           name='email'
    //           placeholder='Enter your email'
    //           className='bg-slate-100 px-2 py-1 focus:outline-primary'
    //           value={data.email}
    //           onChange={handleOnChange}
    //           required
    //         />
    //       </div>

    //       <button
    //         className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
    //       >
    //         Let's Go
    //       </button>

    //     </form>

    //     <p className='my-3 text-center'>New User ? <Link to={"/register"} className='hover:text-primary font-semibold'>Register</Link></p>
    //   </div>
    // </div>
    <div className='min-h-screen bg-slate-100 flex items-center justify-center p-4'>

      <div className='bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden p-8'>

        <div className='w-fit mx-auto mb-6 flex flex-col items-center gap-2'>
          {/* Icon Container with subtle animation */}
          <div className='text-primary drop-shadow-sm'>
            <PiUserCircle size={80} />
          </div>
          <h3 className='text-2xl font-bold text-slate-800 tracking-tight'>Welcome Back</h3>
          <p className='text-slate-500 text-sm'>Enter your email to continue</p>
        </div>

        <form className='grid gap-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='text-slate-600 font-medium text-sm ml-1'>Email Address</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='john@example.com'
              className='bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-slate-700'
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            className='bg-primary text-white text-lg px-4 py-3 rounded-lg font-semibold tracking-wide hover:bg-secondary hover:shadow-lg transition-all duration-300 transform active:scale-95 mt-2'
          >
            Let's Go
          </button>
        </form>

        <div className='mt-8 text-center'>
          <p className='text-slate-500 text-sm'>
            New to Chat App? <Link to={"/register"} className='text-primary font-bold hover:underline hover:text-secondary transition-colors'>Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CheckEmailPage;
