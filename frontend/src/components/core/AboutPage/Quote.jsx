import React from 'react'
import HighlightText from '../HomePage/hilightText'

const Quote = () => {
  return (
    <div className=' w-[1200px] h-[336px] pt-[90px] pb-[120px] pl-[90px] pr-[120px] gap-[10px]'>
        <p className='text-white  text-4xl font-semibold mt-7 w-[1200px] h-[156px]  '>We are passionate about revolutionizing the way we learn. Our innovative platform
            <HighlightText text={"combines technology"}/>
            <span className='text-brown-500'>{" "}expertise </span>and community to create an
            <span className='text-brown-500'>{" "} unparalleled educational experience.</span>
        </p>
    </div>
  )
}

export default Quote