import Login from './Login.jsx'
import { useSelector } from 'react-redux'
import { LogOut, UserRound } from 'lucide-react'
import AxiosInstence from '../utils/AxiosInstence.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearUser } from "../redux/userSlice.js";
import toast from 'react-hot-toast'
import FloatingLeaf from '../components/FloatingLeaf.jsx'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useState } from "react";
import BackToPreviousRoute  from '../components/BackToPreviousRoute.jsx'



const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const MySwal = withReactContent(Swal)

  const handleLogout = async () => {
    const result = await MySwal.fire({
      title: 'Confirm logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
    })

    if (result.isConfirmed) {
      try {
        await AxiosInstence.post('/api/auth/logout')
        dispatch(clearUser())
        navigate('/login')
        toast.success('Logged out')
      } catch (err) {
        console.error(err)
        toast.error('Logout failed')
      }
    }
  }

  // User Details fetched using redux ****
  const userDetails = [
    `User_Id:  ${currentUser?._id}`,
    `Name:  ${currentUser?.userName}`,
    `Mobile:  ${currentUser?.mobileNumber}`,
    `Email:  ${currentUser?.email}`,
    `Address:  ${currentUser?.location?.fullAddress}`,
  ]

  // IMGAES*****
  const leafImages = [
    "/images/leaf1.webp",
    "/images/leaf2.png",
    "/images/leaf3.png",
  ];


  const [leaves] = useState(() =>
    Array.from({ length: 4 }, (_, index) => ({
      id: index,
      src: leafImages[
        Math.floor(Math.random() * leafImages.length)
      ],
      left: `${20 + Math.random() * 60}%`,
      size: 30 + Math.random() * 55,
      delay: Math.random() * 4,
      duration: 9 + Math.random() * 15,
    }))
  );

  return (
    <div className='relative h-screen w-full bg-[#FDFBF7] overflow-hidden'>

     <BackToPreviousRoute />
      {
        !currentUser && (
          <Login />
        )
      }

      {/* floating leaf */}
      {leaves.map((leaf) => (
        <FloatingLeaf
          key={leaf.id}
          src={leaf.src}
          left={leaf.left}
          size={leaf.size}
          delay={leaf.delay}
          duration={leaf.duration}
        />
      ))}

      <div className='relative w-full h-full p-4'>

        {/* Navbar for logout  */}
        <nav className='bg-[#F5F2EB] py-2 px-4 flex justify-between items-center rounded-full shadow-sm'>
          <img src='/images/button-svg.png' alt="Profile" className='w-10 h-10 ' />
          <h1 className='text-lg font-poppins text-[#03071E]/80 font-thin '>Profile</h1>
          <div
            onClick={handleLogout}
            className="text-sm shadow-sm bg-white p-2 rounded-full font-thin font-poppins flex items-center justify-center select-none text-[#03071E]/80"> <LogOut strokeWidth={0.75} /> logout</div>
        </nav>

        {/* User Details*** */}
        <section className='flex flex-col gap-3 mt-4 '>
          <div className="flex items-center justify-between px-3 py-1 rounded-full">
            <h2 className='text-lg font-semibold font-poppins text-[#03071E]/80 mb-2'>User Details</h2>
            <div className='bg-[#F5F2EB]  p-2 rounded-full shadow-md'>
              <UserRound strokeWidth={0.75} />
            </div>
          </div>

          {/* userDetails Listsed using map*** */}
          {
            userDetails.map((elem, idx) => {
              return (<p key={idx} className='text-sm font-poppins font-thin text-[#03071E bg-[#F5F2EB] p-4 shadow-md rounded-lg'>{elem}</p>)
            })
          }
        </section>

      </div>
    </div >
  )
}

export default Profile;