/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { getAllCourses } from "../../../../../services/operations/courseDetails";
import { useEffect } from "react";

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
    const fetchCourses=async()=>{
      console.log("Fetching stared")
      const categories=await getAllCourses();
      if(categories.length>0){
        
        setCourseCategory(categories)
      }
    }
    useEffect(()=>{
      fetchCourses()
        

    },[])
  return (
    <div>CourseInformationForm</div>
  )
}

export default CourseInformationForm