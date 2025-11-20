import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';
const CheckPasswordPage = () => {
  const [data, setData] = useState({
    password: "",
    userId: ""
  })
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!location?.state?.name) {
      navigate('/email')
    }
  }, [location?.state?.name, navigate])

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

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`

    try {
      const response = await axios({
        method: 'post',
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password
        },
        withCredentials: true
      })

      toast.success(response.data.message)

      if (response.data.success) {
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token', response?.data?.token)

        setData({
          password: "",
        })
        navigate('/')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }


  return (
    // <div className='mt-5'>
    //   <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>

    //     <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
    //       <PiUserCircle
    //               size={80}
    //             />
    //       <Avatar
    //         width={70}
    //         height={70}
    //         name={location?.state?.name}
    //         imageUrl={location?.state?.profile_pic}
    //       />
    //       <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
    //     </div>

    //     <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>


    //       <div className='flex flex-col gap-1'>
    //         <label htmlFor='password'>Password :</label>
    //         <input
    //           type='password'
    //           id='password'
    //           name='password'
    //           placeholder='enter your password'
    //           className='bg-slate-100 px-2 py-1 focus:outline-primary'
    //           value={data.password}
    //           onChange={handleOnChange}
    //           required
    //         />
    //       </div>

    //       <button
    //         className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
    //       >
    //         Login
    //       </button>

    //     </form>

    //     <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot password ?</Link></p>
    //   </div>
    // </div>

    <div className='min-h-screen bg-slate-100 flex items-center justify-center p-4'>
      <div className='bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden p-8'>

        {/* User Identification Section */}
        <div className='w-fit mx-auto mb-6 flex flex-col items-center gap-3'>
          {/* Avatar Container with shadow */}
          <div className='shadow-md rounded-full overflow-hidden bg-slate-200'>
            <Avatar
              width={80}
              height={80}
              name={location?.state?.name}
              imageUrl={location?.state?.profile_pic}
            />
          </div>
          <div className='text-center'>
            <h2 className='font-bold text-xl text-slate-800'>{location?.state?.name}</h2>
            <p className='text-slate-500 text-sm bg-slate-100 px-2 py-0.5 rounded mt-1'>
              {/* Optional: You could show the email here if you passed it in state, otherwise just "Verify Identity" */}
              Verify your account
            </p>
          </div>
        </div>

        <form className='grid gap-5' onSubmit={handleSubmit}>

          <div className='flex flex-col gap-2'>
            <label htmlFor='password' className='text-slate-600 font-medium text-sm ml-1'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-slate-700'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <button
            className='bg-primary text-white text-lg px-4 py-3 rounded-lg font-bold tracking-wide hover:bg-secondary hover:shadow-lg transition-all duration-300 transform active:scale-95 mt-2'
          >
            Login
          </button>

        </form>

        <p className='my-6 text-center'>
          <Link to={"/forgot-password"} className='text-primary font-semibold hover:underline hover:text-secondary transition-colors'>
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CheckPasswordPage

