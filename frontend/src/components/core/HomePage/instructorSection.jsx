
import Instructor from "../../../assets/Images/Instructor.png"
import CTAButton from "./Button"
import HighlightText from "./hilightText"
import {ArrowRightFromLine} from "lucide-react"
const InstructorSection = () => {
  return (
    <div className="mt-16">
        <div className="flex flex-row gap-20 items-center">
            <div className="w-[50%]">
                <img  className="shadow-white"src={Instructor} alt="Instructor" />
            </div>
            <div className="w-[50%] flex flex-col gap-10">
                <div className="text-4xl font-semibold w-[50%]">
                    Become an
                    <HighlightText text={"Instructor"}/>
                </div>
                <p className="font-medium text-[16px] w-[80%] text-richblack-300">
                    Instructor from around the world tech millions of students on StudyNotion.We provide the 
                    tools and skills to teach what you love.
                </p>
                <CTAButton
                active={true}
                linkto={"/signup"}
                >
                    <div className="flex flex-row gap-2 items-center">
                        Start Learning Today
                        <ArrowRightFromLine/>
                    </div>

                </CTAButton>

            </div>

        </div>
    </div>
  )
}

export default InstructorSection