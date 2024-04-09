// /* eslint-disable react/jsx-no-undef */
import {ArrowRightFromLine} from "lucide-react"
import { Link } from "react-router-dom"
import HighlightText from "../components/core/HomePage/hilightText"
import CTAButton from "../components/core/HomePage/Button"
const Home=()=>{
    return (
        <>
        <div className="">
            {/* Section 1 */}
            <div className="realtive mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
                
                    <div className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
                    <button className="flex flex-row gap-2 rounded-full px-10 py-[5]px translate-all duration-200 group-hover:bg-richblack-900 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
                        <Link to={"/signup"}>
                            <p>Become an Instructor</p>
                        </Link>
                            <ArrowRightFromLine />
                        </button>
                    </div>

                    <div className="text-center text-4xl font-semibold mt-7">
                        Empower Your Future With 
                        <HighlightText text={"Coding Skills"}/>
                    </div>
                    <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
                        with our online coding course, you can learn at your own peace, from anywhere in the world,and get access to a wealth of recources, including hands-on projects,quizzes,and personalizef feedback from instructors.
                    </div>

                    <div className="flex flex-row gap-7 mt-8">
                        <CTAButton active={true} linkto={"/signup"}>
                            Learn More

                        </CTAButton >
                        <CTAButton active={false} linkto={"/login"}>
                            Book a Demo
                            

                        </CTAButton>
                    </div>
                
            </div>
            {/* section 2 */}
            {/* section 3 */}
            {/* footer */}
        </div>
        </>
    )
}
export default Home