/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"


const CourseInformationForm = () => {
    const{
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    }=useForm()
    const dispatch=useDispatch();
    const{course,editCourse}=useSelector((state)=>state.course);
    const{loading,setLoading}=useState(false);
    const[courseCategory,setCourseCategory]=useState([])
    // useEffect(()=>{
        

    // },[])
  return (
    <div>CourseInformationForm</div>
  )
}

export default CourseInformationForm