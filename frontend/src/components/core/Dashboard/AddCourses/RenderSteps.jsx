import React from 'react'
import { useSelector } from 'react-redux'
import { CiCircleCheck } from "react-icons/ci";
import CourseInformationForm from './CourseInformationForm/CourseInformationForm';
import CourseBuilderForm from './CourseInformationForm/CourseBuilderForm';
import CoursePublishform from './CourseInformationForm/CoursePublishform';
const RenderSteps = () => {
    
    const {step}=useSelector((state)=>state.course)
    const steps=[
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder"

        },
        {
            id:3,
            title:"Publish"
        }
    ]
  return (
    <>
    <div>
        {steps.map((items)=>(
            <>
            <div key={items.id}>
                <div className={`${step===items.id}? "bg-yellow-400 border bg-yellow-50 text-yellow-50":"bg-richblack-800 border-richblack-700 text-richblack-300"`}>
                    {
                        step>items.id?(<CiCircleCheck />):(items.id)
                    }

                </div>
                {items.id!==steps.length?("--------"):("????")}


            </div>
            </>
        ))}
    </div>
    <div>
        {steps.map((item)=>(
            <>
            <div key={item.id}>
                <p>{item.title}</p>
            </div>
            </>
        ))}
    </div>
    {step===1 && <CourseInformationForm/>}
    {step===2 && <CourseBuilderForm/>}
    {step===3 && <CoursePublishform/>}

    </>
  )
}

export default RenderSteps