import { useState } from "react"
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from "./hilightText";
import CourseCard from "./courseCard";
const tabName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]
const ExploreMore = () => {
    // current tab value->free
    const[currentTab,setCurrentTab]=useState(tabName[0]);
    console.log(currentTab,'>>>ct');
    const[courses,setCourses]=useState(HomePageExplore[0].courses);
    console.log(courses,">>cccc")
    const[currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);
    console.log(currentCard,">>ggg");
    const setMyCards=(value)=>{
        setCurrentTab(value);
        console.log(value,">>current value")
        // filter on basis of current tag
        const result=HomePageExplore.filter((course)=>(course.tag===value));
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses.heading);
    }
    
  return (
    <>
    <div>
        <div className="font-semibold text-4xl text-center">
            Unlock <HighlightText text={"Power Of Code"}/>
        </div>
        <p className="text-center text-richblack-300 text-lg font-semibold mt-3 mb-7">
            Learn to build anything You can Imagine
        </p>
        <div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
            {
                tabName.map((element,index)=>{
                    return(
                        <>
                        <div className={`text-[16px] flex flex-row gap-2 ${currentTab===element? "bg-richblack-900 font-medium text-richblack-5":"text-richblack-200"} rounded-full 
                        transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-5 py-2`}
                        key={index}
                        onClick={()=>setMyCards(element)}
                        >{element}</div>
                        </>
                    )
                })
            }
        </div>
        <div className="lg:h-[150px]">
            {/* cours ecard grp */}
            <div className="flex flex-row gap-2">
                {
                    courses.map((element,index)=>{
                        return (
                            <>
                            <div >
                            <CourseCard
                            key={index}
                            cardData={element}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}

                            
                            />
                        
                            </div>
                            </>
                        )
                    })
                }
            </div>


        </div>
        

    </div>
    </>
  )
}

export default ExploreMore