import React from 'react'
import { useSelector } from 'react-redux'

const ProfileDropdown = () => {
  const {user}=useSelector((state)=>state.profile);
  console.log(user,">>image")

  return (
    <>
    <div className='mt-4'>
      {/* image */}
      <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
    </div>
    </>
  )
}

export default ProfileDropdown


