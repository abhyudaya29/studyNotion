/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setloading,setToken } from "../../slices/authSlice";
import{toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
const{
    LOGIN_API,
    SIGNUP_API,
    SEND_OTP_API,
    RESETPASSWORD_API
}=endpoints

export function sendOTP(email,navigate){
    
    return async(dispatch)=>{
        dispatch(setloading(true));
        try{
            // const navigate=useNavigate()

            const response=await apiConnector("POST",SEND_OTP_API,{email})
            console.log(response,">>send OTP");
            if(!response){
                throw new Error(response.data.message)
            }
            toast.success("OTP Send Successfully");
            navigate("/verify-email");

        }catch(error){
            console.log(error,">>error while sending OTP");
            toast.error("Could Not Send OTP")

        }
        dispatch(setloading(false));

    }

}
export function signUp(
    accountType,firstName,lastName,email,password,confirmPassword,otp,
    navigate
){
    return async(dispatch)=>{
        dispatch(setloading(true));
        try {
            // const navigate=useNavigate()

            const resposne=await apiConnector("POST",SIGNUP_API,{
                accountType,firstName,lastName,email,password,confirmPassword,otp
            })
            console.log(resposne,">>>signup data");
            if(!resposne.data.success){
                throw new Error(resposne.data.message);
            }
            toast.success("SignUp successfully");
            navigate("/login");
            
        } catch (error) {
            console.log("error while signup",error);
            toast.dismiss("Issue In SignUP");
            navigate("/signup")
            
        }
        dispatch(setloading(false));
        
    }
}

export function login(email,password,navigate){
    return async(dispatch)=>{
        dispatch(setloading(true));
        try {
            const response=await apiConnector("POST",LOGIN_API,{
                email,
                password
            })
            if(!response){
                throw new Error(response.data.message);
            }
            console.log(response,">>>respons elogin data");
            toast.success("Login successfully");
            dispatch(setToken(response.data.token));

            
            navigate("/dashboard/my-profile");
        } catch (error) {
            console.log(error,">>error while Login");
            toast.dismiss("Issue In Login");
            navigate("login");


            
        }
    }
}

export  function getPasswordResetToken(email,setEmailSent){
    return async(dispatch)=>{
        dispatch(setloading(true));
        try {
            const response=await apiConnector("POST",RESETPASSWORD_API,{
                email
            });
            console.log(response,">>reset pass response");
            if(!response.data.success){
                throw new Error(response.data.message)

            }
            toast.success("Reset Email Sent");
            setEmailSent(true);


            
        } catch (error) {
            console.log(error,"::error in reset pass");
            toast.dismiss("Issue In Reset Password");
            navigate("/forgot-password")

            
        }
        dispatch(setloading(false));
    }

}