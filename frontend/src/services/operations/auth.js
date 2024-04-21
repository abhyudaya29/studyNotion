/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setloading,setToken } from "../../slices/authSlice";
import{toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";

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
            // console.log(response.data.user.image)
            const userImage=response.data?.user?.image?(response.data.user.image):(`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`)
            dispatch(setUser({...response.data.user,image:userImage}))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            dispatch(setToken(response.data.token));
            toast.success("Login successfully");

            
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

export function logOut(navigate){
    return (dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logout Successfully");
        navigate('/')
    }
}