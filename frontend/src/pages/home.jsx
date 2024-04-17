// /* eslint-disable react/jsx-no-undef */
import {ArrowRightFromLine} from "lucide-react"
import { Link } from "react-router-dom"
import HighlightText from "../components/core/HomePage/hilightText"
import CTAButton from "../components/core/HomePage/Button"
import Video from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/codeBlocks";
// import home_bg from "../assets/Images/bghome.svg"
import TimelineSection from "../components/core/HomePage/timelineSection"
import LearningLanguageSection from "../components/core/HomePage/learningLanguageSection"
import InstructorSection from "../components/core/HomePage/instructorSection"
import Footer from "../components/common/footer"
import ExploreMore from "../components/core/HomePage/exploreMore"
// 
const Home=()=>{
    return (
        <>
        <div className="">
            {/* Section 1 */}
            <div className="realtive mx-auto flex flex-col  w-11/12 max-w-maxContent items-center text-white justify-between">
                
                    <div className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
                    <button className="flex flex-row gap-2 rounded-full px-10 py-[5]px translate-all duration-200 group-hover:bg-richblack-900 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
                        <Link to={"/signup"}>
                            <p>Become an Instructor</p>
                        </Link>
                            <ArrowRightFromLine />
                        </button>
                    </div>

                    <div className="text-center text-4xl font-semibold mt-7 ">
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
                    <div className="mx-3 my-12 shadow-blue-200">
                        <video className="" 
                        muted
                        autoPlay
                        loop
                        src={Video} alt="there us a video" />
                    </div>
                    {/* code section 1 */}

                    <div className="">
                        <CodeBlocks 
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-4xl font-bold">
                                Unlock your coding pottential 
                                <HighlightText text={"coding Potential"}/>
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Our courses are described and taught by industry experts who have years of experience inn filed of Technology"
                        }
                        ctab1={
                            {
                                text:"Try it yourself",
                                linkto:"/signup",
                                active:true,
                            }
                        }
                        ctab2={
                            {
                                text:"Learn more",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        codeblock ={`const motivateYou = async () => {
                            try {
                                const motivationSource = await connectToMotivationSource();
                                const motivationMessage = await motivationSource.getMotivation("Your Goal");
                                console.log(motivationMessage);
                            } catch (error) {
                                console.error("Failed to retrieve motivational ,Trye Once Again:", error);
                            }
                        };
                    }
                    `}
                        
                                
                        
                                
                        codeColor={"text-yellow-25"}
                        />
                        {/* <CodeBlocks/> */}

                    </div>


                    {/* code section 2 */}
                    <div className="">
                        <CodeBlocks 
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="text-4xl font-bold">
                                Start
                                <HighlightText text={"coding in seconds"}/>
                            
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writting real code from your lesson"
                        }
                        ctab1={
                            {
                                text:"Continue Lesson",
                                linkto:"/signup",
                                active:true,
                            }
                        }
                        ctab2={
                            {
                                text:"Learn more",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        codeblock ={`const motivateYou = async () => {
                            try {
                                const motivationSource = await connectToMotivationSource();
                                const motivationMessage = await motivationSource.getMotivation("Your Goal");
                                console.log(motivationMessage);
                            } catch (error) {
                                console.error("Failed to retrieve motivational ,Trye Once Again:", error);
                            }
                        };
                    }
                    `}
                        
                                
                        
                                
                        codeColor={"text-yellow-25"}
                        />
                        {/* <CodeBlocks/> */}

                    </div>
                    <ExploreMore/>
               

                
            </div>
            {/* section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700">
                <div className='homepage_bg h=[333px]'>
                    {/* hiiiii */}
                    <div className="w-11/12 max-w-maxcontent flex flex-col items-center justify-between gap-5 mx-auto">
                        <div className="h-[150px]">

                        </div>
                        <div className="flex flex-row gap-7 text-white">
                            <CTAButton active={true}
                            linkto={'/signup'}
                            >
                            <div className="flex items-center gap-3">
                                Explore full Catalog
                                <ArrowRightFromLine/>
                            </div>

                            </CTAButton>
                            <CTAButton active={false}
                            linkto={"/signup"}
                            >
                                <div>
                                    Learn More
                                </div>

                                

                            </CTAButton>
                        </div>


                    </div>
                    
                    

                </div>
                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
                    <div className="flex flex-row gap-5 mt-[95px]">
                        <div className="text-4xl font-semibold w-[45%]">
                            Get the skills 
                            you need for a<HighlightText text={"Job that is in demand"}/>
                        </div>
                        <div className="flex flex-col gap-10 w-[40%] items-start">
                            <div className="text-[16px]">
                                The modern studyNotion is the dictates its own terms.Today,to be a competitive
                                specialist requires more than professional skills
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                Learn More
                            </CTAButton>
                            
                            
                            
                            <div>

                            </div>

                        </div>

                    </div>


                <TimelineSection/>
                <LearningLanguageSection/>
                </div>
                

            </div>
            
            {/* section 3 */}
            <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter: bg-richblack-900 text-white">
                <InstructorSection/>
                <h2 className="text-center text-4xl font-semibold mt-10">review from Other Learners</h2>
                {/* Review slider */}


            </div>
            {/* footer */}
            <Footer/>
        </div>
        </>
    )
}
export default Home


