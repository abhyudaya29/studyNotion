/* eslint-disable no-unused-vars */
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { profileEndPoints } from "../apis";
import { logOut } from "./auth";
import { setLoading,setUser } from "../../slices/profileSlice";
import{toast} from "react-hot-toast"
const{GET_USER_DETAILS_API,GET_USER_ENROLLED_COURSES}=profileEndPoints;
export function getAllUserDetails(token,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("GET",GET_USER_DETAILS_API,null,{
                Authorization:`Bearer ${token}`,

            })
            console.log(response,"UserDetals");
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        dispatch(setUser({...response.data.data,image:userImage}))


        }catch(error){
            console.log(error,"Error in get userdetails");
            dispatch(logOut(navigate))
            console.log("GET_USER_DETAILS API ERROR............", error)
            toast.error("Could Not Get User Details")


        }
        dispatch(setLoading(false))

    

    }
}

export async  function getAllUserEnrolledCourses(token){
    let result=[];
    
    try {
        console.log(result,">>>Result Before api calling")
        const response=await apiConnector("GET",GET_USER_ENROLLED_COURSES,null,{
            Authorization:`Bearer ${token}`
        })
        console.log(response,">>Response of enrolled user courses");
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result=response.data.data;
        console.log(result,">>>Result agter api calling")

        
    } catch (error) {
        console.log(error,"Error in get all enrolled courses")
        toast.error("Could Not Get Enrolled Courses")
    }
    return result
}
