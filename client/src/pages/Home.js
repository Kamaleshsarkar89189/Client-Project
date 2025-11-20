import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from '../assets/logo.png'
import io from 'socket.io-client'
import { useCallback } from 'react'

const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  console.log('user', user)

  const fetchUserDetails = useCallback(async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
      const response = await axios({
        url: URL,
        withCredentials: true
      })

      dispatch(setUser(response.data.data))

      if (response.data.data.logout) {
        dispatch(logout())
        navigate("/email")
      }
      console.log("current user Details", response)
    } catch (error) {
      console.log("error", error)
    }
  }, [dispatch, navigate])

  useEffect(() => {
    fetchUserDetails()
  }, [fetchUserDetails])

  /***socket connection */
  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem('token')
      },
    })

    socketConnection.on('onlineUser', (data) => {
      console.log(data)
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return () => {
      socketConnection.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const basePath = location.pathname === '/'
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>

      {/* Sidebar: Hidden on mobile if chat is open, always visible on Desktop */}
      <section className={`bg-white ${!basePath && "hidden"} lg:block border-r border-slate-200`}>
        <Sidebar />
      </section>

      {/* Chat Area (Outlet): Hidden if we are at root (basePath) */}
      {/* FIXED: Removed 'lg:block' so it stays hidden on desktop when at Home */}
      <section className={`${basePath && "hidden"} w-full h-full`}>
        <Outlet />
      </section>

      {/* Welcome/Empty State: Only visible at root (basePath) */}
      {/* Uses flex to center content perfectly */}
      <div className={`justify-center items-center flex-col gap-5 hidden ${!basePath ? "hidden" : "lg:flex"} h-full bg-slate-50`}>
        <div className='flex flex-col items-center animate-bounce-slow'>
          <img
            src={logo}
            width={200}
            alt='logo'
            className='drop-shadow-md'
          />
        </div>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-slate-700 mb-1'>Welcome to Chat App</h2>
          <p className='text-lg text-slate-500'>Select a user to send a message</p>
        </div>
      </div>
    </div>
  )
}

export default Home
