/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndPoints } from "../apis"
const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
  } = courseEndPoints

export const getAllCourses=async()=>{
    let result=[]
    try{
        const response=await apiConnector("GET",GET_ALL_COURSE_API);
        if(!response?.data.success){
            throw new Error("Could Not Fetch Course Categories")
        }
        result=response?.data?.data
        console.log(result,">>>result")

    }catch(error){
        console.log("GET_ALL_COURSE_API API ERROR............", error)
        toast.error(error.message)

    }

}
export const fetchCoursesDetails=async(courseId)=>{
    try {
        let result=null
        const response=await apiConnector("POST",COURSE_DETAILS_API,{
            courseId
        })
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result=response.data
        console.log(response,"???reponse")
        
    } catch (error) {
        console.log(error,"Error while getching course details")
        result=error.response.data
        
    }
}