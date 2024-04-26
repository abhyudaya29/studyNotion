/* eslint-disable no-undef */
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/auth";
import { BounceLoader } from "react-spinners";
const ForgotPassword = () => {
    const[emailSent,setEmailSent]=useState(false);
    const[email,setEmail]=useState("");
    const dispatch=useDispatch();
    const{loading}=useSelector((state)=>state.auth)
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken)
        

    }
  return (
    <>
    <div className="text-white flex justify-center items-center">
        {
            loading?(
                <>
                <div><BounceLoader color="hsla(248, 67%, 53%, 1)"/></div>
                </>
            ):(
                <>
                <div>
                <h1>{
                    !emailSent?"Reset Your Password":"Check Your Emal"
                    }
                </h1>
                <p>
                    {
                        !emailSent?"Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                        :
                        `We have sent the reset email to ${email}`
                    }
                </p>
                <form onSubmit={handleOnSubmit}>
                    {
                        !emailSent &&(
                            <label>
                                <p>Email Address:</p>
                                <input type="email"
                                required
                                name="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder="enter Your email Address"
                                 />
                            </label>
                        )
                    }
                    <button type="submit">
                        {
                            !emailSent?"ResetPassword":"Resend Email"
                        }
                    </button>
                </form>
                <div>
                    <Link to="/login">
                        <p>Back to Login</p>
                    </Link>
                </div>
                </div>

                </>
            )

        }
    </div>
    </>
  )
}

export default ForgotPassword