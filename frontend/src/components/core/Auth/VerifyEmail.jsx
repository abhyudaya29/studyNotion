/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from "react-router-dom";
import { sendOTP, signUp } from "../../../services/operations/auth";
import { setSignupData } from "../../../slices/authSlice"
const VerifyEmail = () => {
  const{signupData,loading}=useSelector((state)=>(state.auth))
  console.log(signupData,">signupDatasignupData")
  const[otp,setOtp]=useState("");
  console.log(otp,"//frontend otp")
  const dispatch=useDispatch();
  const navigate=useNavigate()
  useEffect(()=>{
    if(!signupData){
      navigate('/signup')
    }

  },[])
  const handleOnSubmit=(e)=>{
    e.preventDefault();
    const{
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    }=signupData
    dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))
  }
  return (
    <>
    <div className="text-white">
        {
          loading?(<>
          <div>
            Loading....
          </div>
          </>):(
            <>
            <div className='mx-auto flex flex-col  w-11/12 max-w-maxContent items-center py-[160px]'>
            <div>
                <h1 className='text-richblack-5 text-3xl '>Verify Email</h1>
                <p className='text-richblack-5 text-2xl'>A verification code has been sent to you. Enter the code below</p>
                <form onSubmit={handleOnSubmit}>
                  <OtpInput
                  value={otp}
                  
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => (<input {...props} placeholder="-"
                  className=" bg-richblack-800 text-white-5"
                  />)}

                  
                  />
                  <button type='submit'>
                    Verify Email
                  </button>
                </form>
            </div>
            <div className="flex flex-row justify-between">
              <Link to="/login">
                Back to Login
              </Link>
              <button onClick={()=>dispatch(sendOTP(signupData.email))} >
                Resend It
              </button>
            </div>

        </div>
            </>
          )
        }
    </div>
    </>
  )
}

export default VerifyEmail