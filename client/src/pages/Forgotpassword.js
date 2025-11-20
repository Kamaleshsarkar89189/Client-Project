import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RiLockPasswordLine } from "react-icons/ri"; // Make sure to install react-icons if not present
import axios from 'axios'
import toast from 'react-hot-toast';

const Forgotpassword = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/forgot-password`

    try {
      const response = await axios.post(URL, { email })

      toast.success(response.data.message)

      if (response.data.success) {
        navigate('/email')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className='min-h-screen bg-slate-100 flex items-center justify-center p-4'>
      <div className='bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden p-8'>

        {/* Header / Icon Section */}
        <div className='text-center mb-6'>
          <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary'>
            <RiLockPasswordLine size={30} />
          </div>
          <h3 className='text-2xl font-bold text-slate-800'>Forgot Password?</h3>
          <p className='text-slate-500 text-sm mt-2'>
            Don't worry! Enter your email address below and we'll send you instructions to reset it.
          </p>
        </div>

        <form className='grid gap-5' onSubmit={handleSubmit}>

          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='text-slate-600 font-medium text-sm ml-1'>Email Address</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your registered email'
              className='bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-slate-700'
              value={email}
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            className='bg-primary text-white text-lg px-4 py-3 rounded-lg font-bold tracking-wide hover:bg-secondary hover:shadow-lg transition-all duration-300 transform active:scale-95 mt-2'
          >
            Send Reset Link
          </button>

        </form>

        <div className='mt-8 text-center'>
          <p className='text-slate-500 text-sm'>
            Remember your password? <Link to={"/email"} className='text-primary font-bold hover:underline hover:text-secondary transition-colors'>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Forgotpassword