import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import uploadFile from '../helpers/uploadFile'
import Divider from './Divider'
import axios from 'axios'
import taost from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'


const EditUserDetails = ({onClose,user}) => {
    const [data,setData] = useState({
        
        name : user?.name,  //user?.user, 
        profile_pic : user?.profile_pic
    })
    const uploadPhotoRef = useRef()
    const dispatch = useDispatch()

    useEffect(()=>{
        setData((preve)=>{
            return{
                ...preve,
                name : user.name,
                profile_pic : user?.profile_pic
                //...user
            }
        })
    },[user])

    const handleOnChange = (e)=>{
        const { name, value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleOpenUploadPhoto = (e)=>{
        e.preventDefault()
        e.stopPropagation()

        uploadPhotoRef.current.click()
    }
    const handleUploadPhoto = async(e)=>{
        const file = e.target.files[0]

        const uploadPhoto = await uploadFile(file)

        setData((preve)=>{
        return{
            ...preve,
            profile_pic : uploadPhoto?.url
        }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        e.stopPropagation()
        try {
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`

            const response = await axios({
                method : 'post',
                url : URL,
                data : data,
                withCredentials : true
            })

            console.log('response',response)
            taost.success(response?.data?.message)
            
            if(response.data.success){
                dispatch(setUser(response.data.data))
                onClose()
            }
         
        } catch (error) {
            console.log(error)
            taost.error("Something went wrong")
        }
    }
  return (
    // <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
    //     <div className='bg-white p-4 py-6 m-1 rounded w-full max-w-sm'>
    //         <h2 className='font-semibold'>Profile Details</h2>
    //         <p className='text-sm '>Edit user details</p>

    //         <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
    //             <div className='flex flex-col gap-1'>
    //                 <label htmlFor='name'>Name:</label>
    //                 <input
    //                     type='text'
    //                     name='name'
    //                     id='name'
    //                     value={data.name}
    //                     onChange={handleOnChange}
    //                     className='w-full py-1 px-2 focus:outline-primary border-0.5'
    //                 />
    //             </div>

    //             <div>
    //                 <div>Photo:</div>
    //                 <div className='my-1 flex items-center gap-4'>
    //                     <Avatar
    //                         width={40}
    //                         height={40}
    //                         imageUrl={data?.profile_pic}
    //                         name={data?.name}
    //                     />
    //                     <label htmlFor='profile_pic'>
    //                     <button className='font-semibold' onClick={handleOpenUploadPhoto}>Change Photo</button>
    //                     <input
    //                         type='file'
    //                         id='profile_pic'
    //                         className='hidden'
    //                         onChange={handleUploadPhoto}
    //                         ref={uploadPhotoRef}
    //                     />
    //                     </label>
    //                 </div>
    //             </div>

    //             <Divider/>    
    //             <div className='flex gap-2 w-fit ml-auto '>
    //                 <button onClick={onClose} className='border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white'>Cancel</button>
    //                 <button onClick={handleSubmit} className='border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary'>Save</button>
    //             </div>
    //         </form>
    //     </div>
    // </div>
      <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50'>
          <div className='bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all scale-100 mx-4'>

              {/* Header */}
              <div className='mb-6'>
                  <h2 className='text-2xl font-bold text-gray-800'>Profile Details</h2>
                  <p className='text-sm text-gray-500 mt-1'>Update your personal information</p>
              </div>

              <form className='flex flex-col gap-6' onSubmit={handleSubmit}>

                  {/* Avatar Section - Centered */}
                  <div className='flex flex-col items-center gap-3'>
                      <div className='relative group'>
                          <Avatar
                              width={80}
                              height={80}
                              imageUrl={data?.profile_pic}
                              name={data?.name}
                              className="shadow-md border-2 border-white"
                          />
                      </div>
                      <label htmlFor='profile_pic' className='cursor-pointer'>
                          <button
                              type="button"
                              className='text-sm font-semibold text-primary hover:text-secondary transition-colors py-1 px-3 rounded-full hover:bg-blue-50'
                              onClick={handleOpenUploadPhoto}
                          >
                              Change Profile Photo
                          </button>
                          <input
                              type='file'
                              id='profile_pic'
                              className='hidden'
                              onChange={handleUploadPhoto}
                              ref={uploadPhotoRef}
                          />
                      </label>
                  </div>

                  {/* Name Input */}
                  <div className='flex flex-col gap-2'>
                      <label htmlFor='name' className='text-sm font-medium text-gray-700'>Full Name</label>
                      <input
                          type='text'
                          name='name'
                          id='name'
                          value={data.name}
                          onChange={handleOnChange}
                          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-800 bg-gray-50 focus:bg-white'
                          placeholder='Enter your name'
                      />
                  </div>

                  <Divider />

                  {/* Action Buttons */}
                  <div className='flex justify-end gap-3 mt-2'>
                      <button
                          type="button"
                          onClick={onClose}
                          className='px-5 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors text-sm'
                      >
                          Cancel
                      </button>
                      <button
                          onClick={handleSubmit}
                          className='px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-opacity-90 hover:shadow-lg transition-all text-sm tracking-wide'
                      >
                          Save Changes
                      </button>
                  </div>
              </form>
          </div>
      </div>
  )
}

export default React.memo(EditUserDetails)
